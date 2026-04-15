importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

self.addEventListener("notificationclick", (event) => {
  const actionId = event.action;
  const notification = event.notification;
  const rawData = notification.data;
  notification.close();

  // Handle OneSignal data structure
  let data = rawData;
  if (rawData && rawData.additionalData) data = rawData.additionalData;
  if (!data || data.type !== "quiz") return;

  // The correct_id is now STABLE and always "0"
  const correctId = "0"; 
  let isCorrect = false;

  if (actionId) {
    const clickedId = String(actionId).trim();
    
    // 1. Direct match (clicked "0")
    if (clickedId === correctId) {
      isCorrect = true;
    }
    // 2. Index match fallback (if mobile sends "0" or "1" as index)
    else if (data.correct_index !== undefined && String(data.correct_index) === clickedId) {
      isCorrect = true;
    }
  }

  // Show result
  const title = isCorrect ? "✅ CHÍNH XÁC!" : "❌ SAI RỒI!";
  const body = isCorrect 
    ? `"${data.word}" chính là: ${data.correct_meaning}. Giỏi lắm! 🎉`
    : `"${data.word}" có nghĩa là: ${data.correct_meaning}. Cố gắng lần sau nhé! 💪`;

  // One last debug line to be absolutely sure - will remove after validation
  const debug = `\n[Clicked: ${actionId} | CorrectID: ${correctId} | CorrectIdx: ${data.correct_index}]`;

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body + debug,
      icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
      tag: "quiz-result",
      renotify: true
    })
  );
});
