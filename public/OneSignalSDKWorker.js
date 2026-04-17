// Version 15.0 - Universal Offset Fix
// Intercept early to prevent OneSignal and Browser from opening windows
self.addEventListener("notificationclick", (event) => {
  event.stopImmediatePropagation();
  event.preventDefault();

  const actionId = String(event.action || ""); 
  const notification = event.notification;
  const rawData = notification.data;

  // Always close immediately
  notification.close();

  let data = rawData;
  if (rawData && rawData.additionalData) data = rawData.additionalData;
  if (!data || data.type !== "quiz") return;

  // --- ROBUST ID-BASED MAPPING [v19] ---
  // We use very distinct IDs to avoid browser-level mapping issues.
  let clickedIdxOfOurButtons = -1;
  if (actionId === "btn_A_v19") clickedIdxOfOurButtons = 0;
  else if (actionId === "btn_B_v19") clickedIdxOfOurButtons = 1;

  // If -1, it might be the main notification body click or a non-choice button
  if (clickedIdxOfOurButtons === -1) {
    console.log("Ignored or main body click. actionId:", actionId);
    return;
  }

  // correct_idx_flag was 0 or 1 in the API
  const correctIdx = Number(data.correct_idx_flag);
  const isCorrect = (clickedIdxOfOurButtons === correctIdx);

  // --- RESULTS ---
  const version = "[v19]";
  const title = isCorrect ? `✅ CHÍNH XÁC! ${version}` : `❌ SAI RỒI! ${version}`;
  const body = isCorrect 
    ? `"${data.word}" chính là: ${data.correct_meaning}. 🎉`
    : `"${data.word}" có nghĩa là: ${data.correct_meaning}. 💪`;

  const footer = `\n(Slot: ${clickedIdxOfOurButtons + 1})\n(ID: ${actionId})`;

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body + footer,
      icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
      tag: "quiz-result",
      renotify: true
    })
  );
}, true);

importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
