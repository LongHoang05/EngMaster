const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const yts = require('yt-search');
const { YoutubeTranscript } = require('youtube-transcript');

// Database Setup
const supabaseUrl = 'https://zbdhfzhjocihlemvsbkr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiZGhmemhqb2NpaGxlbXZzYmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MjA4MjgsImV4cCI6MjA5MTI5NjgyOH0.CI4thuNaxehMgYtxJTaH99-N5ZEQ3SJJjCi3ypUtO9s';
const supabase = createClient(supabaseUrl, supabaseKey);
const seriesId = '9c95db81-7ed0-4d68-887e-debb9c45afa4';

// IPA Setup
const arpabetToIpa = {
  'AA': 'ɑ', 'AE': 'æ', 'AH': 'ʌ', 'AO': 'ɔ', 'AW': 'aʊ', 'AY': 'aɪ',
  'B': 'b', 'CH': 'tʃ', 'D': 'd', 'DH': 'ð', 'EH': 'ɛ', 'ER': 'ɝ',
  'EY': 'eɪ', 'F': 'f', 'G': 'ɡ', 'HH': 'h', 'IH': 'ɪ', 'IY': 'i',
  'JH': 'dʒ', 'K': 'k', 'L': 'l', 'M': 'm', 'N': 'n', 'NG': 'ŋ',
  'OW': 'oʊ', 'OY': 'ɔɪ', 'P': 'p', 'R': 'r', 'S': 's', 'SH': 'ʃ',
  'T': 't', 'TH': 'θ', 'UH': 'ʊ', 'UW': 'u', 'V': 'v', 'W': 'w',
  'Y': 'j', 'Z': 'z', 'ZH': 'ʒ'
};

function convertArpabetToIpa(arpabetStr) {
  const cleanStr = arpabetStr.replace(/\d/g, ''); // Remove stress numbers
  const phones = cleanStr.split(' ');
  const ipaPhones = phones.map(p => arpabetToIpa[p] || p);
  return ipaPhones.join('');
}

let pronunciationsCache = new Map();

function getPhonesForWord(word) {
  if (pronunciationsCache.size === 0) {
    try {
      const dictPath = path.join(process.cwd(), 'public', 'cmudict.txt');
      const file = fs.readFileSync(dictPath, 'utf8');
      const lines = file.split('\n');
      for (const line of lines) {
        if (line.startsWith(';') || line.length === 0) continue;
        const parts = line.split('  ');
        if (parts.length < 2) continue;
        const w = parts[0].replace(/\(\d\)$/, '').toLowerCase();
        const p = parts[1].trim();
        const list = pronunciationsCache.get(w);
        if (list) list.push(p);
        else pronunciationsCache.set(w, [p]);
      }
    } catch (e) {
      console.error("Could not load cmudict.txt", e);
    }
  }
  return pronunciationsCache.get(word) || [];
}

function getIpaForSentence(sentence) {
  const words = sentence.match(/[a-zA-Z]+/g) || [];
  const ipaWords = words.map(word => {
    const phonesList = getPhonesForWord(word.toLowerCase());
    if (phonesList && phonesList.length > 0) {
      return convertArpabetToIpa(phonesList[0]);
    }
    return word.toLowerCase();
  });
  return '/' + ipaWords.join(' ') + '/';
}

async function scrapeVideo(videoId, title) {
  let transcript;
  try {
    transcript = await YoutubeTranscript.fetchTranscript(videoId);
  } catch (err) {
    console.log(`[BỎ QUA] Video ${videoId} không có phụ đề: ${err.message}`);
    return null;
  }

  const subtitles = [];
  const chunkSize = 10;
  let currentId = 1;
  
  for (let i = 0; i < transcript.length; i += chunkSize) {
    const chunk = transcript.slice(i, i + chunkSize);
    const chunkPromises = chunk.map(async (item) => {
      const en_text = item.text.replace(/\n/g, ' ').trim();
      const start_time = parseFloat((item.offset / 1000).toFixed(2));
      const end_time = parseFloat(((item.offset + item.duration) / 1000).toFixed(2));
      
      let vi_text = "Lỗi dịch thuật";
      try {
        const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=' + encodeURIComponent(en_text);
        const transRes = await fetch(url);
        if (transRes.ok) {
          const data = await transRes.json();
          vi_text = data[0].map((item) => item[0]).join('');
        }
      } catch(e) {
        console.error("Translation error", e);
      }
      
      const ipa = getIpaForSentence(en_text);
      
      return {
        id: 0,
        startTime: start_time,
        endTime: end_time,
        en_text,
        vi_text,
        ipa
      };
    });
    
    const processedChunk = await Promise.all(chunkPromises);
    for (const item of processedChunk) {
      item.id = currentId++;
      subtitles.push(item);
    }
    
    process.stdout.write(`\rĐang xử lý ${Math.min(i + chunk.length, transcript.length)}/${transcript.length} câu...`);
  }
  console.log("\n[HOÀN TẤT] " + videoId);

  return {
    title: title,
    youtube_id: videoId,
    subtitles
  };
}

async function run() {
  const playlistId = 'PLCVuwQ1eXVCVq3KxC9WBAullwZZm7ZGDV';
  console.log("Đang lấy thông tin Playlist:", playlistId);
  const list = await yts({ listId: playlistId });
  const allVideos = list.videos;
  
  console.log(`Đã tìm thấy ${allVideos.length} video từ playlist.`);

  // Get existing videos from Supabase
  const { data: existingData } = await supabase.from('movie_episodes').select('youtube_id').eq('series_id', seriesId);
  const existingIds = new Set(existingData.map(e => e.youtube_id));
  
  // Also, don't forget the ones we deleted previously because they were broken (ByLzYncn6NU, qHJYQ1BBlpU)
  const brokenIds = new Set(['ByLzYncn6NU', 'qHJYQ1BBlpU']);

  const newVideos = allVideos.filter(v => !existingIds.has(v.videoId) && !brokenIds.has(v.videoId));
  console.log(`Có ${newVideos.length} video hoàn toàn MỚI cần cào dữ liệu.`);

  let addedCount = 0;
  for (let i = 0; i < newVideos.length; i++) {
    const video = newVideos[i];
    console.log(`\n--- Video ${i + 1}/${newVideos.length}: ${video.title} ---`);
    
    const result = await scrapeVideo(video.videoId, video.title);
    if (result) {
      const { error } = await supabase.from('movie_episodes').insert([{
        series_id: seriesId,
        title: result.title,
        youtube_id: result.youtube_id,
        subtitles: result.subtitles
      }]);
      
      if (error) {
        console.error(`[LỖI LƯU] Không thể lưu vào Supabase: ${error.message}`);
      } else {
        console.log(`[ĐÃ LƯU] Đã tải lên Supabase thành công!`);
        addedCount++;
      }
    }
  }
  
  console.log(`\n\n[XONG] Quá trình hoàn tất. Đã cào và lưu thành công ${addedCount} tập phim mới.`);
}

run();
