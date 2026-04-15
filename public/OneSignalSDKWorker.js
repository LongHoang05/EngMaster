importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// Version 7.0 - Absolute Separation (LEFT/RIGHT)
self.addEventListener("notificationclick", (event) => {
  const actionId = String(event.action || ""); 
  const notification = event.notification;
  const rawData = notification.data;
  notification.close();

  let data = rawData;
  if (rawData && rawData.additionalData) data = rawData.additionalData;
  if (!data || data.type !== "quiz") return;

  const correctSide = String(data.correct_side || "");
  let isCorrect = false;

  // 1. ABSOLUTE SIDE MATCHING
  if (actionId === "QUIZ_LEFT" && correctSide === "LEFT") {
    isCorrect = true;
  } else if (actionId === "QUIZ_RIGHT" && correctSide === "RIGHT") {
    isCorrect = true;
  }

  // 2. SHOW RESULT WITH VERSION STAMP
  const version = "[v7]";
  const title = isCorrect ? `✅ CHÍNH XÁC! ${version}` : `❌ SAI RỒI! ${version}`;
  const body = isCorrect 
    ? `"${data.word}" chính là: ${data.correct_meaning}. 🎉`
    : `"${data.word}" có nghĩa là: ${data.correct_meaning}. 💪`;

  const footer = `\n(Side: ${actionId.replace("QUIZ_", "")})`;

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body + footer,
      icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
      tag: "quiz-result",
      renotify: true
    })
  );
});
