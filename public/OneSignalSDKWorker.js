// Version 13.0 - Total Control Strategy
// THIS LISTENER MUST BE AT THE VERY TOP TO INTERCEPT EVERYTHING
self.addEventListener("notificationclick", (event) => {
  // 1. KILL ALL PROPAGATION TO ONESIGNAL SDK
  event.stopImmediatePropagation();
  event.preventDefault();

  const actionId = String(event.action || ""); 
  const notification = event.notification;
  const rawData = notification.data;

  // 2. CLOSE IMMEDIATELY
  notification.close();

  let data = rawData;
  if (rawData && rawData.additionalData) data = rawData.additionalData;
  
  // Ignore if not our quiz or if it's the invisible dummy button
  if (!data || data.type !== "quiz" || actionId === "IGNORE") return;

  const correctSide = String(data.correct_side || "");
  let isCorrect = false;

  // 3. TRUSTED L/R MATCHING (Now stable because of the invisible dummy shift)
  if (actionId === "L" && correctSide === "L") isCorrect = true;
  if (actionId === "R" && correctSide === "R") isCorrect = true;

  // 4. SHOW RESULT
  const version = "[v13]";
  const title = isCorrect ? `✅ CHÍNH XÁC! ${version}` : `❌ SAI RỒI! ${version}`;
  const body = isCorrect 
    ? `"${data.word}" chính là: ${data.correct_meaning}. 🎉`
    : `"${data.word}" có nghĩa là: ${data.correct_meaning}. 💪`;

  const footer = `\n(ID: ${actionId})\n(All: ${(notification.actions || []).map(a => a.action).join(", ")})`;

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body + footer,
      icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
      tag: "quiz-result",
      renotify: true
    })
  );
}, true); // Use capture phase for maximum interception power

// OneSignal SDK Import (Now secondary to our handler)
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
