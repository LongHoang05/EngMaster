importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// Version 11.0 - Interceptor Strategy
// Note: This listener MUST be at the top to catch events early
self.addEventListener("notificationclick", (event) => {
  const actionId = String(event.action || ""); 
  const notification = event.notification;
  const rawData = notification.data;

  // 1. Immediately close to prevent browser default behaviors
  notification.close();

  let data = rawData;
  if (rawData && rawData.additionalData) data = rawData.additionalData;
  
  // If not our quiz, let OneSignal SDK handle it (though we intercepted it)
  if (!data || data.type !== "quiz") return;

  // 2. STOP ONESIGNAL FROM OPENING WEB
  // We don't call event.waitUntil() with a window opening promise.
  // We just show a new notification.

  const correctSide = String(data.correct_side || "");
  let isCorrect = false;

  // MATCHING LOGIC
  if (actionId === "L" && correctSide === "L") isCorrect = true;
  if (actionId === "R" && correctSide === "R") isCorrect = true;

  // 3. SHOW RESULT
  const version = "[v11]";
  const title = isCorrect ? `✅ CHÍNH XÁC! ${version}` : `❌ SAI RỒI! ${version}`;
  const body = isCorrect 
    ? `"${data.word}" chính là: ${data.correct_meaning}. 🎉`
    : `"${data.word}" có nghĩa là: ${data.correct_meaning}. 💪`;

  const footer = `\n(ID: ${actionId})`;

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body + footer,
      icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
      tag: "quiz-result",
      renotify: true
    })
  );
});
