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

  // --- UNIVERSAL OFFSET LOGIC ---
  // We don't trust the actionId directly. 
  // We look at the list of actions and find which of OUR buttons was clicked.
  const allActions = notification.actions || [];
  const ourActions = allActions.filter(a => a.action && a.action.includes("CHOICE_"));
  const clickedIdxOfOurButtons = ourActions.findIndex(a => a.action === actionId);

  // If -1, it might be the main notification body click or Unsubscribe
  if (clickedIdxOfOurButtons === -1) return;

  // correct_idx_flag was 0 or 1 in the API
  const correctIdx = Number(data.correct_idx_flag);
  const isCorrect = (clickedIdxOfOurButtons === correctIdx);

  // --- RESULTS ---
  const version = "[v15]";
  const title = isCorrect ? `✅ CHÍNH XÁC! ${version}` : `❌ SAI RỒI! ${version}`;
  const body = isCorrect 
    ? `"${data.word}" chính là: ${data.correct_meaning}. 🎉`
    : `"${data.word}" có nghĩa là: ${data.correct_meaning}. 💪`;

  const footer = `\n(Slot: ${clickedIdxOfOurButtons + 1})\n(List: ${allActions.map(a => a.action).join(", ")})`;

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
