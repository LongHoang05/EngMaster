import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
const ONESIGNAL_REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;
const NOTIFICATION_SECRET = "engmaster_secret_lhg_push";

async function handleNotification(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');
    const targetId = searchParams.get('target_id');

    if (secret !== NOTIFICATION_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!ONESIGNAL_APP_ID || !ONESIGNAL_REST_API_KEY) {
      return NextResponse.json({ error: "Missing OneSignal configuration" }, { status: 500 });
    }

    let word = "";
    let correctMeaning = "";
    let wrongMeaning = "";

    if (req.method === 'POST') {
      try {
        const body = await req.json();
        word = body?.word || "";
        correctMeaning = body?.correctMeaning || "";
      } catch (e) {
        console.warn("Could not parse JSON body, falling back to random word.");
      }
    }

    // Fetch random words using random offset
    if (!word || !correctMeaning) {
      const { count } = await supabase
        .from('vocabularies')
        .select('*', { count: 'exact', head: true });

      const totalCount = count || 0;

      if (totalCount === 0) {
        word = "Knowledge";
        correctMeaning = "Kiến thức";
        wrongMeaning = "Sự ngu dốt";
      } else {
        const offset = Math.floor(Math.random() * totalCount);
        const { data: randomWords, error } = await supabase
          .from('vocabularies')
          .select('word, meaning')
          .range(offset, offset + 9);

        if (error || !randomWords || randomWords.length === 0) {
          word = "Knowledge";
          correctMeaning = "Kiến thức";
          wrongMeaning = "Sự ngu dốt";
        } else {
          const mainWord = randomWords[0];
          word = mainWord.word;
          correctMeaning = mainWord.meaning;

          const others = randomWords.filter(w => w.word !== word);
          wrongMeaning = others.length > 0
            ? others[Math.floor(Math.random() * others.length)].meaning
            : "Đáp án khác";
        }
      }
    }

    if (!wrongMeaning) wrongMeaning = "Đáp án khác";

    // Shuffle 2 choices for desktop buttons
    const choices = [correctMeaning, wrongMeaning];
    const shuffled = Math.random() < 0.5 ? [choices[0], choices[1]] : [choices[1], choices[0]];
    const correctIdx = shuffled.indexOf(correctMeaning);

    // Random quiz mode for mobile
    const quizMode = Math.random() < 0.5 ? "meaning" : "word";
    const questionText = `Từ "${word}" có nghĩa là gì?`;

    // Send via OneSignal — NO web_buttons, SW handles everything
    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: ONESIGNAL_APP_ID,
        ...(targetId ? { include_subscription_ids: [targetId] } : { included_segments: ["Total Subscriptions"] }),
        headings: { en: "🧠 Thử thách nhanh", vi: "🧠 Thử thách nhanh" },
        contents: { en: questionText, vi: questionText },
        chrome_web_icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
        url: "",
        data: {
          type: "quiz_hybrid",
          word: word,
          correct_meaning: correctMeaning,
          correct_idx_flag: correctIdx,
          choice_a: shuffled[0],
          choice_b: shuffled[1],
          mode: quizMode,
          v: 22,
          _osp: "do_not_open"
        },
        ttl: 7200,
      }),
    });

    const result = await response.json();
    return NextResponse.json({
      success: response.ok,
      message: `Quiz [v22] sent: "${word}" (mobile: ${quizMode})`,
      details: result
    });
  } catch (error: any) {
    console.error("Critical error in [v22] notification:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) { return handleNotification(req); }
export async function POST(req: Request) { return handleNotification(req); }
