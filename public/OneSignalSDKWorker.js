importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// Background click listener for Quiz results
self.addEventListener("notificationclick", (event) => {
  // 1. DIMISS NOTIFICATION IMMEDIATELY (Critical for Android)
  event.notification.close();

  const actionId = event.action;
  const notification = event.notification;
  
  // Robust data extraction for both Desktop and Mobile
  const rawData = notification.data;
  const data = (rawData && rawData.additionalData) ? rawData.additionalData : rawData;

  if (actionId && data && data.type === "quiz") {
    let title = "";
    let body = "";
    
    // Check answer
    if (actionId === data.correct_id) {
      title = "✅ CHÍNH XÁC!";
      body = `"${data.word}" chính là: ${data.correct_meaning}. Giỏi lắm! 🎉`;
    } else {
      title = "❌ SAI RỒI!";
      body = `"${data.word}" có nghĩa là: ${data.correct_meaning}. Cố gắng lần sau nhé! 💪`;
    }

    // Show result notification
    const promise = self.registration.showNotification(title, {
      body: body,
      icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
      tag: "quiz-result",
      renotify: true,
      data: { url: "https://study-engmaster.vercel.app/" } // Fallback URL
    });

    event.waitUntil(promise);
  }
});
