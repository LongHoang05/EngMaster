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

    // 1. Fetch 3 random vocabulary words (1 target, 2 distractors)
    const { count, error: countError } = await supabaseServer
      .from("vocabularies")
      .select("*", { count: "exact", head: true });

    if (countError) throw countError;
    if (!count || count < 3) {
      return NextResponse.json({ message: "Not enough vocabularies for a quiz." }, { status: 200 });
    }

    // Generate 3 unique random offsets
    const offsets = new Set<number>();
    while (offsets.size < 3) {
      offsets.add(Math.floor(Math.random() * count));
    }
    const offsetArray = Array.from(offsets);

    // Fetch the 3 vocabs
    const vocabs = [];
    for (const offset of offsetArray) {
      const { data } = await supabaseServer
        .from("vocabularies")
        .select("word, ipa, meanings")
        .range(offset, offset)
        .single();
      if (data) vocabs.push(data);
    }

    if (vocabs.length < 3) throw new Error("Failed to fetch 3 vocabs");

    const targetVocab = vocabs[0]; // First one is our target
    const word = targetVocab.word;
    const ipa = targetVocab.ipa || "";
    const correctMeaning = Array.isArray(targetVocab.meanings) ? targetVocab.meanings[0] : targetVocab.meanings;
    
    // Create 3 choices: 1 correct + 2 distractors
    const choices = vocabs.map((v, index) => {
      let text = Array.isArray(v.meanings) ? v.meanings[0] : v.meanings;
      // Truncate text if too long for buttons
      if (text.length > 20) text = text.substring(0, 17) + "...";
      
      return {
        id: `choice_${index}`,
        text: text,
        fullText: Array.isArray(v.meanings) ? v.meanings[0] : v.meanings,
        isCorrect: index === 0
      };
    });

    // Shuffle choices
    const shuffledChoices = [...choices].sort(() => Math.random() - 0.5);
    const correctChoiceId = shuffledChoices.find(c => c.isCorrect)?.id;

    // 2. Construct Notification
    const heading = "🧠 Thử thách trắc nghiệm!";
    const content = `Từ "${word}" ${ipa ? `(${ipa}) ` : ""}có nghĩa là gì? (Bấm nút dưới để chọn)`;

    // 3. Send via OneSignal
    const response = await fetch("https://api.onesignal.com/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: ONESIGNAL_APP_ID,
        ...(targetId ? { include_subscription_ids: [targetId] } : { included_segments: ["Subscribed Users"] }),
        headings: { en: heading, vi: heading },
        contents: { en: content, vi: content },
        chrome_web_icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
        url: process.env.NEXT_PUBLIC_APP_URL || "https://study-engmaster.vercel.app",
        buttons: shuffledChoices.map(c => ({
          id: c.id,
          text: c.text
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
      message: `Quiz sent for word: "${word}"`,
      recipientCount: result.recipients,
      notificationId: result.id,
      debug: { word, correctMeaning, shuffledChoices }
    });

  } catch (error) {
    console.error("Daily notification error:", error);
    return NextResponse.json({ error: "Internal error", details: String(error) }, { status: 500 });
  }
}
