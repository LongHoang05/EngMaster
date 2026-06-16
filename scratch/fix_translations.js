const { createClient } = require('@supabase/supabase-js');

// Database Setup
const supabaseUrl = 'https://zbdhfzhjocihlemvsbkr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiZGhmemhqb2NpaGxlbXZzYmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MjA4MjgsImV4cCI6MjA5MTI5NjgyOH0.CI4thuNaxehMgYtxJTaH99-N5ZEQ3SJJjCi3ypUtO9s';
const supabase = createClient(supabaseUrl, supabaseKey);

async function translateText(text) {
  try {
    const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=' + encodeURIComponent(text);
    const transRes = await fetch(url);
    if (transRes.ok) {
      const data = await transRes.json();
      return data[0].map((item) => item[0]).join('');
    }
  } catch(e) {
    console.error("Translation error", e);
  }
  return "Lỗi dịch thuật";
}

// Function to add a small delay to avoid rate limiting
const delay = ms => new Promise(res => setTimeout(res, ms));

async function run() {
  console.log("Đang lấy danh sách tất cả các tập phim...");
  const { data: episodes, error } = await supabase.from('movie_episodes').select('id, title, subtitles');
  
  if (error || !episodes) {
    console.error("Lỗi lấy dữ liệu:", error);
    return;
  }
  
  let totalFixed = 0;

  for (const ep of episodes) {
    let needsUpdate = false;
    const newSubtitles = [...ep.subtitles];
    
    let errorCount = 0;
    
    for (let i = 0; i < newSubtitles.length; i++) {
      if (newSubtitles[i].vi_text === "Lỗi dịch thuật" || newSubtitles[i].vi_text.trim() === "") {
        console.log(`[${ep.title}] Dịch lại dòng: "${newSubtitles[i].en_text}"`);
        
        const newViText = await translateText(newSubtitles[i].en_text);
        if (newViText !== "Lỗi dịch thuật" && newViText.trim() !== "") {
          newSubtitles[i].vi_text = newViText;
          needsUpdate = true;
          errorCount++;
        }
        
        // Ngủ 500ms để tránh bị Google ban IP
        await delay(500);
      }
    }
    
    if (needsUpdate) {
      console.log(`Đang cập nhật DB cho tập "${ep.title}" (${errorCount} lỗi đã sửa)...`);
      const { error: updateError } = await supabase.from('movie_episodes').update({ subtitles: newSubtitles }).eq('id', ep.id);
      if (updateError) {
        console.error("Lỗi cập nhật:", updateError);
      } else {
        totalFixed++;
      }
    }
  }
  
  console.log(`\nHOÀN TẤT! Đã sửa lỗi dịch thuật cho ${totalFixed} tập phim.`);
}

run();
