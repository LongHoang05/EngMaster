import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
const ONESIGNAL_REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;
const NOTIFICATION_SECRET = "engmaster_secret_lhg_push";

// Base URL for the quiz page (mobile)
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
    let choicesText: string[] = [];

    // 3. Extract Data from Body (Only if POST)
    if (req.method === 'POST') {
      try {
        const body = await req.json();
        word = body?.word || "";
        correctMeaning = body?.correctMeaning || "";
        choicesText = body?.choices || [];
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
        choicesText = ["Kiến thức", "Sự ngu dốt"];
      } else {
        const randomItem = randomWords[Math.floor(Math.random() * randomWords.length)];
        word = randomItem.word;
        correctMeaning = randomItem.meaning;
        // Pick a random wrong answer from other words
        const otherWords = randomWords.filter(w => w.word !== word);
        const wrongAnswer = otherWords.length > 0 
          ? otherWords[Math.floor(Math.random() * otherWords.length)].meaning 
          : "Đáp án khác";
        choicesText = [correctMeaning, wrongAnswer];
      }
    }

    // 5. Randomly choose quiz mode for mobile: "meaning" or "word"
    const quizMode = Math.random() < 0.5 ? "meaning" : "word";

    // 6. Prepare desktop buttons (shuffled 2 choices)
    const finalChoices = (choicesText && choicesText.length > 0) ? choicesText : [correctMeaning, "Đáp án khác"];
    if (finalChoices.length === 1) finalChoices.push("Đáp án khác");

    const shuffledChoices = finalChoices
      .map((text: string) => ({ text, sort: Math.random() }))
      .sort((a: any, b: any) => a.sort - b.sort);

    const correctDisplayIndex = shuffledChoices.findIndex((c: any) => c.text === correctMeaning);

    // 7. Notification content — question always asks meaning of word
    const questionText = `Từ "${word}" có nghĩa là gì?`;

    // Build quiz URL for mobile (with random mode)
    const mobileQuestionMode = quizMode;
    const quizUrl = `${APP_BASE_URL}/quiz-notify?word=${encodeURIComponent(word)}&meaning=${encodeURIComponent(correctMeaning)}&mode=${mobileQuestionMode}`;

    // 8. Send Notification via OneSignal
    // Desktop: web_buttons show 2 choices → Service Worker handles inline
    // Mobile: no web_buttons shown → body click → Service Worker opens quiz page
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
        web_buttons: [
          {
            id: "btn_B_v20",
            text: shuffledChoices[1].text,
            url: ""
          },
          {
            id: "btn_A_v20",
            text: shuffledChoices[0].text,
            url: ""
          }
        ],
        data: {
          type: "quiz_hybrid",
          word: word,
          correct_meaning: correctMeaning,
          correct_idx_flag: correctDisplayIndex,
          mode: mobileQuestionMode,
          quiz_url: quizUrl,
          v: 20,
          _osp: "do_not_open"
        },
        ttl: 7200,
      }),
    });

    const result = await response.json();
    return NextResponse.json({ 
      success: response.ok, 
      message: `Quiz [v20 hybrid] sent: "${word}" (mobile mode: ${quizMode})`, 
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
