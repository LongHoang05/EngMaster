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

  // 1. EXACT TITLE MATCHING (The only reliable way)
  if (actionId && notification.actions) {
    const clickedAction = notification.actions.find(a => a.action === actionId);
    if (clickedAction && clickedAction.title) {
      const clickedTitle = clickedAction.title.trim().toLowerCase().replace(/\.\.\.$/, "");
      
      // Compare clicked title with correct meaning
      if (correctMeaning.startsWith(clickedTitle) || clickedTitle.startsWith(correctMeaning)) {
        isCorrect = true;
      }
    }
  }

  // Fallback for ID matching (if titles are missing/weird)
  if (!isCorrect && actionId === "btn:" + data.correct_meaning) {
    isCorrect = true;
  }

  // 2. SHOW RESULT
  const title = isCorrect ? "✅ CHÍNH XÁC!" : "❌ SAI RỒI!";
  const body = isCorrect 
    ? `"${data.word}" chính là: ${data.correct_meaning}. 🎉`
    : `"${data.word}" có nghĩa là: ${data.correct_meaning}. 💪`;

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
      tag: "quiz-result",
      renotify: true
    })
  );
});
