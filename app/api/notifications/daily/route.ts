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

    // 1. Fetch vocabularies
    const { data: allVocabs, error: fetchError } = await supabaseServer
      .from("vocabularies")
      .select("word, ipa, meanings");

    if (fetchError) throw fetchError;
    if (!allVocabs || allVocabs.length < 2) {
      return NextResponse.json({ message: "Not enough vocabularies." }, { status: 200 });
    }

    // 2. Pick a random target vocab
    const targetIdx = Math.floor(Math.random() * allVocabs.length);
    const targetVocab = allVocabs[targetIdx];
    const word = targetVocab.word;
    const ipa = targetVocab.ipa || "";
    const correctMeaning = Array.isArray(targetVocab.meanings) ? targetVocab.meanings[0] : targetVocab.meanings;

    // 3. Pick a random distractor (different from target)
    let distractorIdx;
    do {
      distractorIdx = Math.floor(Math.random() * allVocabs.length);
    } while (distractorIdx === targetIdx);
    const distractorVocab = allVocabs[distractorIdx];
    const distractorMeaning = Array.isArray(distractorVocab.meanings) ? distractorVocab.meanings[0] : distractorVocab.meanings;

    // 4. Create choices
    // Use simple "0" for correct, "1" for incorrect before shuffling
    const rawChoices = [
      { id: "0", text: correctMeaning, isCorrect: true },
      { id: "1", text: distractorMeaning, isCorrect: false }
    ];

    // Shuffle choices
    const shuffledChoices = [...rawChoices].sort(() => Math.random() - 0.5);
    const correctChoiceId = "0"; // The Correct ID is always "0"
    const correctDisplayIndex = shuffledChoices.findIndex(c => c.isCorrect);

    // 5. Construct Notification
    const heading = "🧠 Thử thách trắc nghiệm!";
    const content = `Từ "${word}" ${ipa ? `(${ipa}) ` : ""}có nghĩa là gì?`;
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://study-engmaster.vercel.app") + "?_osp=do_not_open";

    console.log(`Sending Quiz: Word="${word}", Correct="${correctMeaning}" (ID="0"), Distractor="${distractorMeaning}" (ID="1")`);

    // 6. Send via OneSignal
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
        web_buttons: shuffledChoices.map(c => ({
          id: c.id,
          text: c.text.length > 20 ? c.text.substring(0, 17) + "..." : c.text,
          url: appUrl
        })),
        data: {
          type: "quiz",
          correct_id: "0",
          correct_index: correctDisplayIndex,
          word: word,
          correct_meaning: correctMeaning,
          choice_texts: shuffledChoices.map(c => c.text)
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
