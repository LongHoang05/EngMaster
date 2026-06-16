import { NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';
// Translation API bypassed using native gtx fetch
import fs from 'fs';
import path from 'path';

// ARPAbet to IPA mapping
const arpabetToIpa: Record<string, string> = {
  'AA': 'ɑ', 'AE': 'æ', 'AH': 'ʌ', 'AO': 'ɔ', 'AW': 'aʊ', 'AY': 'aɪ',
  'B': 'b', 'CH': 'tʃ', 'D': 'd', 'DH': 'ð', 'EH': 'ɛ', 'ER': 'ɝ',
  'EY': 'eɪ', 'F': 'f', 'G': 'ɡ', 'HH': 'h', 'IH': 'ɪ', 'IY': 'i',
  'JH': 'dʒ', 'K': 'k', 'L': 'l', 'M': 'm', 'N': 'n', 'NG': 'ŋ',
  'OW': 'oʊ', 'OY': 'ɔɪ', 'P': 'p', 'R': 'r', 'S': 's', 'SH': 'ʃ',
  'T': 't', 'TH': 'θ', 'UH': 'ʊ', 'UW': 'u', 'V': 'v', 'W': 'w',
  'Y': 'j', 'Z': 'z', 'ZH': 'ʒ'
};

function convertArpabetToIpa(arpabetStr: string) {
  const cleanStr = arpabetStr.replace(/\d/g, ''); // Remove stress numbers
  const phones = cleanStr.split(' ');
  const ipaPhones = phones.map(p => arpabetToIpa[p] || p);
  return ipaPhones.join('');
}

let pronunciationsCache = new Map<string, string[]>();

function getPhonesForWord(word: string): string[] {
  if (pronunciationsCache.size === 0) {
    try {
      // Path works natively on Vercel via public directory
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

function getIpaForSentence(sentence: string) {
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

function extractVideoId(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  return match ? match[1] : url;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { youtubeUrl } = body;

    if (!youtubeUrl) {
      return NextResponse.json({ error: 'Missing youtubeUrl' }, { status: 400 });
    }

    const videoId = extractVideoId(youtubeUrl);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const sendMsg = (msg: any) => {
          controller.enqueue(encoder.encode(JSON.stringify(msg) + '\n'));
        };

        try {
          sendMsg({ type: 'progress', percent: 5, message: 'Đang lấy thông tin Video...' });
          
          // 1. Get YouTube Video Title via oEmbed
          let title = `Tập Phim ${videoId}`;
          try {
            const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
            if (oembedRes.ok) {
              const oembedData = await oembedRes.json();
              title = oembedData.title || title;
            }
          } catch (e) {
            console.warn("Could not fetch video title", e);
          }

          sendMsg({ type: 'progress', percent: 15, message: 'Đang tải phụ đề tiếng Anh...' });

          // 2. Fetch Transcript
          let rawTranscript;
          try {
            rawTranscript = await YoutubeTranscript.fetchTranscript(videoId);
          } catch (err: any) {
            sendMsg({ error: 'Không thể lấy phụ đề video. Video có thể không có phụ đề hoặc bị tắt tính năng này.' });
            controller.close();
            return;
          }

          // Filter out purely bracketed or music lines (e.g. "[Music]", "(Applause)", "♪")
          const filteredTranscript = rawTranscript.filter((item: any) => {
            const noBrackets = item.text.replace(/\[.*?\]|\(.*?\)|♪/g, '').trim();
            return noBrackets.length > 0;
          });

          const hasPunctuation = filteredTranscript.some((item: any) => /[.!?]/.test(item.text));
          
          const mergedTranscript: any[] = [];
          let currentSentence: any = null;

          for (let i = 0; i < filteredTranscript.length; i++) {
            const item = filteredTranscript[i];
            const cleanText = item.text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
            const finalText = cleanText.replace(/\[.*?\]|\(.*?\)|♪/g, '').trim().replace(/\s+/g, ' ');
            if (!finalText) continue;

            let start = item.offset;
            let end = item.offset + item.duration;

            if (!hasPunctuation) {
              start = Math.max(0, start - 1000);
              end = Math.max(0, end - 1000);
            }

            if (i < filteredTranscript.length - 1) {
              let nextStart = filteredTranscript[i+1].offset;
              if (!hasPunctuation) {
                nextStart = Math.max(0, nextStart - 1000);
              }
              if (end > nextStart) {
                end = nextStart;
              }
            }

            mergedTranscript.push({
              text: finalText.charAt(0).toUpperCase() + finalText.slice(1),
              start,
              end
            });
          }

          const transcript = mergedTranscript;

          sendMsg({ type: 'progress', percent: 30, message: `Đã tìm thấy ${transcript.length} câu. Bắt đầu dịch thuật & tạo IPA...` });

          // 3. Process subtitles concurrently in chunks to speed up Google Translate
          const subtitles: any[] = [];
          const chunkSize = 10;
          let currentId = 1;
          
          for (let i = 0; i < transcript.length; i += chunkSize) {
            const chunk = transcript.slice(i, i + chunkSize);
            
            const chunkPromises = chunk.map(async (item) => {
              const en_text = item.text;
              const start_time = parseFloat((item.start / 1000).toFixed(2));
              const end_time = parseFloat((item.end / 1000).toFixed(2));
              
              let vi_text = "Lỗi dịch thuật";
              try {
                const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=' + encodeURIComponent(en_text);
                const transRes = await fetch(url);
                if (transRes.ok) {
                  const data = await transRes.json();
                  vi_text = data[0].map((item: any) => item[0]).join('');
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

            const percent = 30 + Math.floor(((i + chunk.length) / transcript.length) * 70);
            sendMsg({ type: 'progress', percent, message: `Đang xử lý ${Math.min(i + chunk.length, transcript.length)}/${transcript.length} câu...` });
          }

          sendMsg({ type: 'progress', percent: 100, message: 'Hoàn tất!' });
          sendMsg({
            type: 'complete',
            data: {
              youtubeId: videoId,
              title,
              subtitles
            }
          });
          controller.close();

        } catch (error: any) {
          console.error("Stream Error:", error);
          sendMsg({ error: 'Đã xảy ra lỗi hệ thống: ' + error.message });
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'application/x-ndjson',
        'Cache-Control': 'no-cache, no-transform'
      }
    });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: 'Đã xảy ra lỗi hệ thống: ' + error.message }, { status: 500 });
  }
}
