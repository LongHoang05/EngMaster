importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// Version 9.0 - Index Trap & Action Logging
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

  // 1. SIMPLE MATCHING
  if (actionId === "L" && correctSide === "L") isCorrect = true;
  if (actionId === "R" && correctSide === "R") isCorrect = true;

  // 2. LOGGING FOR DEBUGGING
  const actions = notification.actions || [];
  const actionListString = actions.map(a => a.action).join(", ");

  // 3. SHOW RESULT
  const version = "[v9]";
  const title = isCorrect ? `✅ CHÍNH XÁC! ${version}` : `❌ SAI RỒI! ${version}`;
  const body = isCorrect 
    ? `"${data.word}" chính là: ${data.correct_meaning}. 🎉`
    : `"${data.word}" có nghĩa là: ${data.correct_meaning}. 💪`;

  const footer = `\n(ID: ${actionId})\n(All: ${actionListString})`;

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body + footer,
      icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
      tag: "quiz-result",
      renotify: true
    })
  );
});
