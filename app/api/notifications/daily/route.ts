import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
const ONESIGNAL_REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;
const NOTIFICATION_SECRET = "engmaster_secret_lhg_push";

// Base URL for the quiz page
const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_URL 
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://ielts-app-ruby.vercel.app");

async function handleNotification(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');
    const targetId = searchParams.get('target_id');

    // 1. Check Authorization
    if (secret !== NOTIFICATION_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Check Configuration
    if (!ONESIGNAL_APP_ID || !ONESIGNAL_REST_API_KEY) {
      return NextResponse.json({ error: "Missing OneSignal configuration" }, { status: 500 });
    }

    let word = "";
    let correctMeaning = "";

    // 3. Extract Data from Body (Only if POST)
    if (req.method === 'POST') {
      try {
        const body = await req.json();
        word = body?.word || "";
        correctMeaning = body?.correctMeaning || "";
      } catch (e) {
        console.warn("Could not parse JSON body, falling back to random word.");
      }
    }

    // 4. Fetch random word if not provided
    if (!word || !correctMeaning) {
      const { data: randomWords, error } = await supabase
        .from('vocabularies')
        .select('word, meaning')
        .limit(10);

      if (error || !randomWords || randomWords.length === 0) {
        word = "Knowledge";
        correctMeaning = "Kiến thức";
      } else {
        const randomItem = randomWords[Math.floor(Math.random() * randomWords.length)];
        word = randomItem.word;
        correctMeaning = randomItem.meaning;
      }
    }

    // 5. Randomly choose quiz mode: "meaning" (ask meaning) or "word" (ask English word)
    const quizMode = Math.random() < 0.5 ? "meaning" : "word";

    const questionText = quizMode === "meaning"
      ? `Nghĩa của từ "${word}" là gì?`
      : `Từ tiếng Anh của "${correctMeaning.split(",")[0].trim()}" là gì?`;

    // Build quiz URL with params
    const quizUrl = `${APP_BASE_URL}/quiz-notify?word=${encodeURIComponent(word)}&meaning=${encodeURIComponent(correctMeaning)}&mode=${quizMode}`;

    // 6. Send Notification via OneSignal
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
        url: quizUrl,
        data: {
          type: "quiz_input",
          word: word,
          correct_meaning: correctMeaning,
          mode: quizMode,
          quiz_url: quizUrl,
          v: 20,
        },
        ttl: 7200,
      }),
    });

    const result = await response.json();
    return NextResponse.json({ 
      success: response.ok, 
      message: `Quiz [v20] sent: "${word}" (mode: ${quizMode})`, 
      quizUrl,
      details: result 
    });
  } catch (error: any) {
    console.error("Critical error in [v20] notification:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  return handleNotification(req);
}

export async function POST(req: Request) {
  return handleNotification(req);
}
