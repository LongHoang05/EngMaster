const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const { YoutubeTranscript } = require('youtube-transcript');

const supabaseUrl = 'https://zbdhfzhjocihlemvsbkr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiZGhmemhqb2NpaGxlbXZzYmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MjA4MjgsImV4cCI6MjA5MTI5NjgyOH0.CI4thuNaxehMgYtxJTaH99-N5ZEQ3SJJjCi3ypUtO9s';
const supabase = createClient(supabaseUrl, supabaseKey);

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
  const cleanStr = arpabetStr.replace(/\d/g, ''); 
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

async function scrapeVideo(videoId) {
  let transcript;
  try {
    transcript = await YoutubeTranscript.fetchTranscript(videoId);
  } catch (err) {
    return null;
  }

  const filteredTranscript = transcript.filter((item) => {
    const noBrackets = item.text.replace(/\[.*?\]|\(.*?\)|♪/g, '').trim();
    return noBrackets.length > 0;
  });

  const hasPunctuation = filteredTranscript.some(item => /[.!?]/.test(item.text));

  const subtitles = [];
  const chunkSize = 15;
  let currentId = 1;
  
  const formattedTranscript = [];
  for (let i = 0; i < filteredTranscript.length; i++) {
    const item = filteredTranscript[i];
    const cleanText = item.text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    const finalText = cleanText.replace(/\[.*?\]|\(.*?\)|♪/g, '').trim().replace(/\s+/g, ' ');
    if (!finalText) continue;

    let start = item.offset / 1000;
    let end = (item.offset + item.duration) / 1000;

    if (!hasPunctuation) {
      start = Math.max(0, start - 1.0);
      end = Math.max(0, end - 1.0);
    }

    if (i < filteredTranscript.length - 1) {
      let nextStart = filteredTranscript[i+1].offset / 1000;
      if (!hasPunctuation) {
        nextStart = Math.max(0, nextStart - 1.0);
      }
      if (end > nextStart) {
        end = nextStart;
      }
    }

    formattedTranscript.push({
      text: finalText.charAt(0).toUpperCase() + finalText.slice(1),
      start: parseFloat(start.toFixed(2)),
      end: parseFloat(end.toFixed(2))
    });
  }

  for (let i = 0; i < formattedTranscript.length; i += chunkSize) {
    const chunk = formattedTranscript.slice(i, i + chunkSize);
    const chunkPromises = chunk.map(async (item) => {
      let vi_text = "Lỗi dịch";
      try {
        const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=' + encodeURIComponent(item.text);
        const transRes = await fetch(url);
        if (transRes.ok) {
          const data = await transRes.json();
          vi_text = data[0].map((t) => t[0]).join('');
        }
      } catch(e) {}
      
      return {
        id: 0,
        startTime: item.start,
        endTime: item.end,
        en_text: item.text,
        vi_text: vi_text,
        ipa: getIpaForSentence(item.text)
      };
    });
    
    const processedChunk = await Promise.all(chunkPromises);
    for (const item of processedChunk) {
      item.id = currentId++;
      subtitles.push(item);
    }
  }

  return subtitles;
}

async function run() {
  const { data: episodes } = await supabase.from('movie_episodes').select('id, youtube_id').order('id', { ascending: false });
  
  for (let i = 0; i < episodes.length; i++) {
    const ep = episodes[i];
    console.log(`Recovering ${i+1}/${episodes.length}: ${ep.youtube_id}`);
    const subs = await scrapeVideo(ep.youtube_id);
    if (subs) {
      await supabase.from('movie_episodes').update({ subtitles: subs }).eq('id', ep.id);
    }
  }
  console.log("ALL RECOVERED!");
}
run();
