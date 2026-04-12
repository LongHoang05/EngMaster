importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// Background click listener for Quiz results
self.addEventListener("notificationclick", (event) => {
  const actionId = event.action;
  const notification = event.notification;
  
  // OneSignal v16 stores data in notification.data.additionalData
  const data = notification.data ? notification.data.additionalData : null;

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

    // Show result notification without opening any window
    event.waitUntil(
      self.registration.showNotification(title, {
        body: body,
        icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
        tag: "quiz-result", // Tag ensures new results overwrite the previous ones
        renotify: true,
      })
    );
  }
});
