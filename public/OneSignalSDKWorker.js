importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

self.addEventListener("notificationclick", (event) => {
  const actionId = event.action; // This will now be the TEXT of the button
  const notification = event.notification;
  const rawData = notification.data;
  notification.close();

  let data = rawData;
  if (rawData && rawData.additionalData) data = rawData.additionalData;
  if (!data || data.type !== "quiz") return;

  const correctMeaning = String(data.correct_meaning).trim().toLowerCase();
  let isCorrect = false;

  if (actionId) {
    const clickedText = String(actionId).trim().toLowerCase();
    
    // 1. Match by exact text (since ID = full text)
    if (clickedText === correctMeaning) {
      isCorrect = true;
    } 
    // 2. Match by "Starts with" (handling truncation fallbacks)
    else if (correctMeaning.startsWith(clickedText) || clickedText.startsWith(correctMeaning)) {
      isCorrect = true;
    }
  }

  const title = isCorrect ? "✅ CHÍNH XÁC!" : "❌ SAI RỒI!";
  const body = isCorrect 
    ? `"${data.word}" chính là: ${data.correct_meaning}. Giỏi lắm! 🎉`
    : `"${data.word}" có nghĩa là: ${data.correct_meaning}. Cố gắng lần sau nhé! 💪`;

  // Debug info for the last time
  const debug = `\n[Clicked: "${actionId}" | Correct: "${data.correct_meaning}"]`;

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body + debug,
      icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
      tag: "quiz-result",
      renotify: true
    })
  );
});
