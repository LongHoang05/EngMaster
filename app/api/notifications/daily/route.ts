import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Use server-side Supabase client (not the browser one)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServer = createClient(supabaseUrl, supabaseKey);

const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!;
const ONESIGNAL_REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY!;

export async function GET(request: Request) {
  try {
    // Optional: Verify cron secret for security
    const { searchParams } = new URL(request.url);
    const cronSecret = searchParams.get("secret");
    const expectedSecret = process.env.CRON_SECRET;

    if (expectedSecret && cronSecret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Fetch a random vocabulary word from Supabase
    // Get total count first
    const { count, error: countError } = await supabaseServer
      .from("vocabularies")
      .select("*", { count: "exact", head: true });

    if (countError) throw countError;
    if (!count || count === 0) {
      return NextResponse.json(
        { message: "No vocabularies available to send." },
        { status: 200 }
      );
    }

    // Pick a random offset
    const randomOffset = Math.floor(Math.random() * count);

    const { data: vocabs, error: vocabError } = await supabaseServer
      .from("vocabularies")
      .select("word, ipa, meanings")
      .range(randomOffset, randomOffset)
      .limit(1);

    if (vocabError) throw vocabError;
    if (!vocabs || vocabs.length === 0) {
      return NextResponse.json(
        { message: "Could not fetch a vocabulary word." },
        { status: 200 }
      );
    }

    const vocab = vocabs[0];
    const word = vocab.word;
    const meanings = Array.isArray(vocab.meanings)
      ? vocab.meanings.join(", ")
      : vocab.meanings || "";
    const ipa = vocab.ipa || "";

    // 2. Randomly decide notification style
    const isQuestionStyle = Math.random() > 0.5;

    let heading: string;
    let content: string;

    if (isQuestionStyle) {
      // Question style: show word, user needs to recall meaning
      heading = "🧠 Thử thách từ vựng!";
      content = `Từ "${word}" ${ipa ? `(${ipa}) ` : ""}có nghĩa là gì? Nhấn vào để học tiếp!`;
    } else {
      // Answer style: show meaning for reinforcement
      heading = "📚 Ôn tập từ vựng!";
      content = `"${word}" ${ipa ? `${ipa} ` : ""}— ${meanings}. Nhấn vào để học tiếp!`;
    }

    // 3. Send push notification via OneSignal REST API
    const response = await fetch("https://api.onesignal.com/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: ONESIGNAL_APP_ID,
        included_segments: ["Subscribed Users"],
        headings: { en: heading, vi: heading },
        contents: { en: content, vi: content },
        chrome_web_icon:
          "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
        url: process.env.NEXT_PUBLIC_APP_URL || "https://engmaster.vercel.app",
        ttl: 7200, // Notification expires in 2 hours
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("OneSignal API error:", result);
      return NextResponse.json(
        { error: "Failed to send notification", details: result },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Notification sent: "${word}"`,
      notificationId: result.id,
      recipientCount: result.recipients,
    });
  } catch (error) {
    console.error("Daily notification error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
