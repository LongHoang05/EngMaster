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
      } else {
        const offset = Math.floor(Math.random() * totalCount);
        const { data: randomWords, error } = await supabase
          .from('vocabularies')
          .select('word, meaning')
          .range(offset, offset + 9);

        if (error || !randomWords || randomWords.length === 0) {
          word = "Knowledge";
          correctMeaning = "Kiến thức";
        } else {
          const mainWord = randomWords[0];
          word = mainWord.word;
          correctMeaning = mainWord.meaning;
        }
      }
    }

    // Random quiz mode for all devices
    const quizMode = Math.random() < 0.5 ? "meaning" : "word";
    const questionText = quizMode === "meaning" 
      ? `Nghĩa tiếng Việt của "${word}" là gì?`
      : `Từ tiếng Anh của "${correctMeaning.split(",")[0].trim()}" là gì?`;

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
          mode: quizMode,
          v: 23,
          _osp: "do_not_open"
        },
        ttl: 7200,
      }),
    });

    const result = await response.json();
    return NextResponse.json({
      success: response.ok,
      message: `Quiz [v23] sent: "${word}" (mode: ${quizMode})`,
      details: result
    });
  } catch (error: any) {
    console.error("Critical error in [v23] notification:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) { return handleNotification(req); }
export async function POST(req: Request) { return handleNotification(req); }
