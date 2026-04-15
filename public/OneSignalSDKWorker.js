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
  const choices = data.choices || [];
  let isCorrect = false;

  // 1. ROBUST MATCHING: Use numeric ID to look up choice from our data payload
  if (actionId !== undefined && actionId !== null && actionId !== "") {
    const idx = parseInt(actionId, 10);
    
    // Check if the clicked choice text matches the correct meaning
    if (!isNaN(idx) && choices[idx]) {
      const clickedText = String(choices[idx]).trim().toLowerCase();
      
      // Lenient string comparison to handle minor formatting differences
      if (correctMeaning.startsWith(clickedText) || clickedText.startsWith(correctMeaning)) {
        isCorrect = true;
      }
    }
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
