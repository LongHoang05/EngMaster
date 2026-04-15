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

    // 1. Security Check
    if (secret !== NOTIFICATION_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!ONESIGNAL_APP_ID || !ONESIGNAL_REST_API_KEY) {
      return NextResponse.json({ error: "Missing OneSignal configuration" }, { status: 500 });
    }

    // 2. Get Data (either from body or fetch a random one)
    let word = "";
    let correctMeaning = "";
    let choicesText: string[] = [];

    try {
      const body = await req.json();
      word = body.word;
      correctMeaning = body.correctMeaning;
      choicesText = body.choices;
    } catch (e) {
      // Body is empty or not JSON, this is fine for Cron/Test
    }

    // 3. If no word provided, fetch a random one from Supabase
    if (!word || !correctMeaning) {
      const { data: randomWords, error } = await supabase
        .from('vocabularies')
        .select('word, meaning')
        .limit(10); // Pick from a small set for speed

      if (error || !randomWords || randomWords.length === 0) {
        // Emergency fallback if database query fails or is empty
        word = "Knowledge";
        correctMeaning = "Kiến thức";
        choicesText = ["Kiến thức", "Sự ngu dốt"];
      } else {
        const randomItem = randomWords[Math.floor(Math.random() * randomWords.length)];
        word = randomItem.word;
        correctMeaning = randomItem.meaning;
        choicesText = [correctMeaning, "Đáp án ngẫu nhiên A", "Đáp án ngẫu nhiên B"].slice(0, 2);
      }
    }

    // 4. Prepare choices
    const finalChoices = (choicesText && choicesText.length > 0) ? choicesText : [correctMeaning, "Nghĩa khác"];
    // Add "Other" if only one choice
    if (finalChoices.length === 1) finalChoices.push("Nghĩa khác");

    const shuffledChoices = finalChoices
      .map((text: string) => ({ text, sort: Math.random() }))
      .sort((a: any, b: any) => a.sort - b.sort);

    const correctDisplayIndex = shuffledChoices.findIndex((c: any) => c.text === correctMeaning);
    const appUrl = `https://study-engmaster.vercel.app/?word=${encodeURIComponent(word)}`;

    // 5. Generate Unique IDs per button (The Fix)
    const timestamp = Date.now();
    const buttonIds = shuffledChoices.map((_: any, i: number) => `btn_${i}_${timestamp}_${Math.random().toString(36).substring(7)}`);
    const correctId = buttonIds[correctDisplayIndex];

    // 6. Send to OneSignal
    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: ONESIGNAL_APP_ID,
        ...(targetId ? { include_subscription_ids: [targetId] } : { included_segments: ["Total Subscriptions"] }),
        headings: { en: "🧠 Thử thách trắc nghiệm!", vi: "🧠 Thử thách trắc nghiệm!" },
        contents: { 
          en: `Từ "${word}" có nghĩa là gì?`, 
          vi: `Từ "${word}" có nghĩa là gì?` 
        },
        chrome_web_icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
        url: appUrl,
        web_buttons: shuffledChoices.map((c: any, i: number) => ({
          id: buttonIds[i], 
          text: c.text.length > 20 ? c.text.substring(0, 17) + "..." : c.text,
          url: appUrl + "&_osp=do_not_open&btn_id=" + buttonIds[i]
        })),
        data: {
          type: "quiz",
          word: word,
          correct_meaning: correctMeaning,
          correct_id: correctId,
          choices: shuffledChoices.map((c: any) => c.text),
          button_ids: buttonIds
        },
        ttl: 7200,
      }),
    });

    const result = await response.json();
    return NextResponse.json({
      success: response.ok,
      message: response.ok ? `Quiz sent for: "${word}"` : "OneSignal error",
      details: result
    });

  } catch (error: any) {
    console.error("Critical error in daily notification:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
