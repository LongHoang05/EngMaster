import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Use server-side Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServer = createClient(supabaseUrl, supabaseKey);

const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!;
const ONESIGNAL_REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY!;

export async function GET(request: Request) {
  try {
    const { searchParams: queryParams } = new URL(request.url);
    const cronSecret = queryParams.get("secret");
    const targetId = queryParams.get("target_id");
    const expectedSecret = process.env.CRON_SECRET;

    if (expectedSecret && cronSecret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Fetch 2 random vocabulary words (1 target, 1 distractor for better Chrome compatibility)
    const { count, error: countError } = await supabaseServer
      .from("vocabularies")
      .select("*", { count: "exact", head: true });

    if (countError) throw countError;
    if (!count || count < 2) {
      return NextResponse.json({ message: "Not enough vocabularies for a quiz." }, { status: 200 });
    }

    // Generate 2 unique random offsets
    const offsets = new Set<number>();
    while (offsets.size < 2) {
      offsets.add(Math.floor(Math.random() * count));
    }
    const offsetArray = Array.from(offsets);

    // Fetch the 2 vocabs
    const vocabs = [];
    for (const offset of offsetArray) {
      const { data } = await supabaseServer
        .from("vocabularies")
        .select("word, ipa, meanings")
        .range(offset, offset)
        .single();
      if (data) vocabs.push(data);
    }

    if (vocabs.length < 2) throw new Error("Failed to fetch 2 vocabs");

    const targetVocab = vocabs[0]; 
    const word = targetVocab.word;
    const ipa = targetVocab.ipa || "";
    const correctMeaning = Array.isArray(targetVocab.meanings) ? targetVocab.meanings[0] : targetVocab.meanings;

    // Create 2 choices
    const choices = vocabs.map((v, index) => {
      let text = Array.isArray(v.meanings) ? v.meanings[0] : v.meanings;
      if (text.length > 20) text = text.substring(0, 17) + "...";
      
      return {
        id: `choice_${index}`,
        text: text,
        isCorrect: index === 0
      };
    });

    // Shuffle choices
    const shuffledChoices = [...choices].sort(() => Math.random() - 0.5);
    const correctChoiceId = shuffledChoices.find(c => c.isCorrect)?.id;

    // 2. Construct Notification
    const heading = "🧠 Thử thách trắc nghiệm!";
    const content = `Từ "${word}" ${ipa ? `(${ipa}) ` : ""}có nghĩa là gì?`;
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://study-engmaster.vercel.app") + "?_osp=do_not_open";

    // 3. Send via OneSignal (Using web_buttons for Chrome compatibility)
    const response = await fetch("https://api.onesignal.com/notifications", {
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
        // MUST use web_buttons for Web SDK v16+ on browsers
        web_buttons: shuffledChoices.map(c => ({
          id: c.id,
          text: c.text,
          url: appUrl
        })),
        data: {
          type: "quiz",
          correct_id: correctChoiceId,
          word: word,
          correct_meaning: correctMeaning
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
      message: `Quiz (2-choice) sent for word: "${word}"`,
      recipientCount: result.recipients,
      notificationId: result.id,
      debug: { word, correctMeaning, shuffledChoices }
    });

  } catch (error) {
    console.error("Daily notification error:", error);
    return NextResponse.json({ error: "Internal error", details: String(error) }, { status: 500 });
  }
}
