import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
const ONESIGNAL_REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;
const NOTIFICATION_SECRET = "engmaster_secret_lhg_push";

export async function POST(req: Request) {
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
    let choicesText: string[] = [];

    try {
      const body = await req.json();
      word = body.word;
      correctMeaning = body.correctMeaning;
      choicesText = body.choices;
    } catch (e) {}

    if (!word || !correctMeaning) {
      const { data: randomWords, error } = await supabase.from('vocabularies').select('word, meaning').limit(10);
      if (error || !randomWords || randomWords.length === 0) {
        word = "Knowledge";
        correctMeaning = "Kiến thức";
        choicesText = ["Kiến thức", "Sự ngu dốt"];
      } else {
        const randomItem = randomWords[Math.floor(Math.random() * randomWords.length)];
        word = randomItem.word;
        correctMeaning = randomItem.meaning;
        choicesText = [correctMeaning, "Đáp án khác"].slice(0, 2);
      }
    }

    const finalChoices = (choicesText && choicesText.length > 0) ? choicesText : [correctMeaning, "Đáp án khác"];
    if (finalChoices.length === 1) finalChoices.push("Đáp án khác");

    const shuffledChoices = finalChoices
      .map((text: string) => ({ text, sort: Math.random() }))
      .sort((a: any, b: any) => a.sort - b.sort);

    const correctDisplayIndex = shuffledChoices.findIndex((c: any) => c.text === correctMeaning);
    const correctSide = correctDisplayIndex === 0 ? "LEFT" : "RIGHT";

    const appUrl = `https://study-engmaster.vercel.app/?word=${encodeURIComponent(word)}`;

    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: ONESIGNAL_APP_ID,
        ...(targetId ? { include_subscription_ids: [targetId] } : { included_segments: ["Total Subscriptions"] }),
        headings: { en: "🧠 Thử thách [v7]", vi: "🧠 Thử thách [v7]" },
        contents: { en: `Từ "${word}" có nghĩa là gì?`, vi: `Từ "${word}" có nghĩa là gì?` },
        chrome_web_icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
        url: appUrl,
        web_buttons: [
          {
            id: "QUIZ_LEFT",
            text: `A) ${shuffledChoices[0].text}`,
            url: appUrl + "&action=v7_left&_osp=do_not_open"
          },
          {
            id: "QUIZ_RIGHT",
            text: `B) ${shuffledChoices[1].text}`,
            url: appUrl + "&choice=v7_right&_osp=do_not_open"
          }
        ],
        data: {
          type: "quiz",
          word: word,
          correct_meaning: correctMeaning,
          correct_side: correctSide,
          v: 7
        },
        ttl: 7200,
      }),
    });

    const result = await response.json();
    return NextResponse.json({ success: response.ok, message: `Quiz [v7] sent: "${word}"`, details: result });

  } catch (error: any) {
    console.error("Critical error in [v7] notification:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
