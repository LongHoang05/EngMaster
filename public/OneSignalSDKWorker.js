importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

self.addEventListener("notificationclick", (event) => {
  const actionId = event.action; 
  const notification = event.notification;
  const rawData = notification.data;
  notification.close();

  let data = rawData;
  if (rawData && rawData.additionalData) data = rawData.additionalData;
  if (!data || data.type !== "quiz") return;

  const correctMeaning = String(data.correct_meaning).trim().toLowerCase();
  let isCorrect = false;
  let clickedTitle = "";

  // 1. DYNAMIC MATCHING: Find the real title of the button that was clicked
  // This circumvents Android's propensity to swap action IDs or indices.
  if (actionId) {
    if (notification.actions && notification.actions.length > 0) {
      const clickedAction = notification.actions.find(a => a.action === actionId);
      if (clickedAction && clickedAction.title) {
        clickedTitle = clickedAction.title.trim().toLowerCase();
        
        // We compare the title (might be truncated) with the full correct meaning
        // Example: "Than phiền..." vs "Than phiền (Động từ)"
        const cleanTitle = clickedTitle.replace(/\.\.\.$/, ""); // remove ellipsis if any
        if (correctMeaning.startsWith(cleanTitle) || cleanTitle.startsWith(correctMeaning)) {
          isCorrect = true;
        }
      }
    }

    // Fallback: If title matching failed, try direct ID matching (for Desktop)
    if (!isCorrect && (actionId === "0" || actionId === data.correct_id)) {
      isCorrect = true;
    }
  }

  // Show result
  const title = isCorrect ? "✅ CHÍNH XÁC!" : "❌ SAI RỒI!";
  const body = isCorrect 
    ? `"${data.word}" chính là: ${data.correct_meaning}. Giỏi lắm! 🎉`
    : `"${data.word}" có nghĩa là: ${data.correct_meaning}. Cố gắng lần sau nhé! 💪`;

  // Final debug info
  const debug = `\n[Action: ${actionId} | Title: "${clickedTitle}" | Correct: "${correctMeaning}"]`;

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body + debug,
      icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
      tag: "quiz-result",
      renotify: true
    })
  );
});
