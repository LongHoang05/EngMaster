const { createClient } = require('@supabase/supabase-js');

// Database Setup
const supabaseUrl = 'https://zbdhfzhjocihlemvsbkr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiZGhmemhqb2NpaGxlbXZzYmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MjA4MjgsImV4cCI6MjA5MTI5NjgyOH0.CI4thuNaxehMgYtxJTaH99-N5ZEQ3SJJjCi3ypUtO9s';
const supabase = createClient(supabaseUrl, supabaseKey);

async function rechunkEpisode(episode) {
  const rawSubtitles = episode.subtitles;
  if (!rawSubtitles || rawSubtitles.length === 0) return null;

  // Filter out [Music]
  const filtered = rawSubtitles.filter(item => {
    const noBrackets = item.en_text.replace(/\[.*?\]|\(.*?\)|♪/g, '').trim();
    return noBrackets.length > 0;
  });

  const hasPunctuation = filtered.some(item => /[.!?]/.test(item.en_text));
  const finalSubtitles = [];
  let currentId = 1;

  for (let i = 0; i < filtered.length; i++) {
    const item = filtered[i];
    const cleanText = item.en_text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    const finalText = cleanText.replace(/\[.*?\]|\(.*?\)|♪/g, '').trim().replace(/\s+/g, ' ');
    if (!finalText) continue;

    let start = item.startTime;
    let end = item.endTime;

    // Apply global -1.0s offset to auto-generated subtitles to fix Youtube's inherent delay
    if (!hasPunctuation) {
      start = Math.max(0, start - 1.0);
      end = Math.max(0, end - 1.0);
    }

    // Fix overlap: If this chunk's end time overlaps with the next chunk's start time, cut it short!
    if (i < filtered.length - 1) {
      let nextStart = filtered[i+1].startTime;
      if (!hasPunctuation) {
        nextStart = Math.max(0, nextStart - 1.0);
      }
      if (end > nextStart) {
        end = nextStart;
      }
    }

    finalSubtitles.push({
      id: currentId++,
      en_text: finalText.charAt(0).toUpperCase() + finalText.slice(1),
      vi_text: item.vi_text,
      ipa: item.ipa,
      startTime: start,
      endTime: end
    });
  }

  return finalSubtitles;
}

async function run() {
  console.log("Fetching all episodes...");
  const { data: episodes, error } = await supabase.from('movie_episodes').select('id, title, subtitles');
  
  if (error) {
    console.error("Error fetching episodes:", error);
    return;
  }

  console.log(`Found ${episodes.length} episodes. Re-chunking...`);

  let updatedCount = 0;
  for (const ep of episodes) {
    const newSubtitles = await rechunkEpisode(ep);
    if (!newSubtitles) continue;

    const { error: updateError } = await supabase
      .from('movie_episodes')
      .update({ subtitles: newSubtitles })
      .eq('id', ep.id);

    if (updateError) {
      console.error(`Error updating episode ${ep.id}:`, updateError);
    } else {
      updatedCount++;
      process.stdout.write(`\rUpdated ${updatedCount}/${episodes.length} episodes`);
    }
  }

  console.log(`\n\nDone! Successfully updated ${updatedCount} episodes.`);
}

run();
