importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// Background click listener for Quiz results
self.addEventListener("notificationclick", (event) => {
  const actionId = event.action;
  const notification = event.notification;
  
  // 1. EXTRACT DATA BEFORE CLOSING (Ensures data is available in all browsers)
  const rawData = notification.data;
  // Handle both possible OneSignal data structures (v16 flattens some payloads)
  let data = rawData;
  if (rawData && rawData.additionalData && typeof rawData.additionalData === "object") {
    data = rawData.additionalData;
  }

  // 2. DISMISS NOTIFICATION
  notification.close();

  // 3. PROCESS QUIZ RESULTS
  // We ensure actionId is present (clicking a button) and data.type is "quiz"
  if (actionId && data && data.type === "quiz") {
    let title = "";
    let body = "";
    
    // Use robust string comparison to avoid issues with hidden spaces or casing
    const isCorrect = String(actionId).trim().toLowerCase() === String(data.correct_id).trim().toLowerCase();

    if (isCorrect) {
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
