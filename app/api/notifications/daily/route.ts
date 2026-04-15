import { NextResponse } from 'next/server';

const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
const ONESIGNAL_REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;

export async function POST(req: Request) {
  try {
    const { word, correctMeaning, choices, targetId } = await req.json();

    if (!ONESIGNAL_APP_ID || !ONESIGNAL_REST_API_KEY) {
      return NextResponse.json({ error: "Missing OneSignal configuration" }, { status: 500 });
    }

    // Ensure we have choices
    const finalChoices = choices || [correctMeaning, "Other meaning"];
    const shuffledChoices = finalChoices
      .map((text: string) => ({ text, sort: Math.random() }))
      .sort((a: any, b: any) => a.sort - b.sort);

    const correctDisplayIndex = shuffledChoices.findIndex((c: any) => c.text === correctMeaning);
    const content = `Từ "${word}" có nghĩa là gì?`;
    const heading = "🧠 Thử thách trắc nghiệm!";
    const appUrl = `https://study-engmaster.vercel.app/?word=${encodeURIComponent(word)}`;

    // Generate unique, dynamic IDs for each button to prevent browser de-duplication
    const timestamp = Date.now();
    const buttonIds = shuffledChoices.map((_: any, i: number) => `btn_${i}_${timestamp}_${Math.random().toString(36).substring(7)}`);
    const correctId = buttonIds[correctDisplayIndex];

    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: ONESIGNAL_APP_ID,
        ...(targetId ? { include_subscription_ids: [targetId] } : { included_segments: ["Total Subscriptions"] }),
        headings: { en: heading, vi: heading },
        contents: { en: content, vi: content },
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
    if (!response.ok) {
      console.error("OneSignal API error:", result);
      return NextResponse.json({ error: "OneSignal API error", details: result }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Quiz sent for word: "${word}"`,
      recipientCount: result.recipients,
      notificationId: result.id,
      debug: { word, correctMeaning, shuffledChoices, correctId }
    });

  } catch (error: any) {
    console.error("Error sending notification:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
