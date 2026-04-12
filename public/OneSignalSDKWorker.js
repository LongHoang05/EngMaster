importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// Background click listener for Quiz results
self.addEventListener("notificationclick", (event) => {
  console.log("[SW] Notification clicked. Action:", event.action);
  
  const actionId = event.action;
  const notification = event.notification;
  
  // Robust data extraction: Check both raw data and additionalData wrapper
  const rawData = notification.data;
  const data = (rawData && rawData.additionalData) ? rawData.additionalData : rawData;

  console.log("[SW] Extracted Data:", JSON.stringify(data));

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

    console.log("[SW] Showing result notification:", title);

    // Show result notification without opening any window
    event.waitUntil(
      self.registration.showNotification(title, {
        body: body,
        icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
        tag: "quiz-result",
        renotify: true,
      })
    );
  } else {
    console.log("[SW] No quiz action ID or data found. Skipping feedback.");
  }
});
