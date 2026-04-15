importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

self.addEventListener("notificationclick", (event) => {
  const actionId = event.action; 
  const notification = event.notification;
  const rawData = notification.data;
  
  // 1. Silent Operation: Don't open any window if _osp=do_not_open is in the action URL or logic
  // Chrome handles the actual opening based on the 'url' property of the action.
  // OneSignal's _osp=do_not_open should handle prevent opening if supported.
  notification.close();

  let data = rawData;
  if (rawData && rawData.additionalData) data = rawData.additionalData;
  if (!data || data.type !== "quiz") return;

  const isAndroid = /Android/i.test(navigator.userAgent);
  let clickedIndex = -1;

  // 2. Extract index and FIX Android's inverted mapping
  if (actionId && actionId.startsWith("idx_")) {
    let rawIndex = parseInt(actionId.split("_")[1], 10);
    
    if (isAndroid) {
      // Android Chrome (for 2 buttons) often reports index 1 for Button 1 and index 0 for Button 2
      // We flip it back to get the real intended index.
      clickedIndex = (1 - rawIndex);
    } else {
      clickedIndex = rawIndex;
    }
  }

  // 3. Validate against the data payload
  // data.correct_index is where the correct answer was placed in the original array
  const isCorrect = (clickedIndex === data.correct_index);

  const title = isCorrect ? "✅ CHÍNH XÁC!" : "❌ SAI RỒI!";
  const body = isCorrect 
    ? `"${data.word}" chính là: ${data.correct_meaning}. 🎉`
    : `"${data.word}" có nghĩa là: ${data.correct_meaning}. 💪`;

  // Debug info (hidden at the bottom)
  const debug = `\n[Device: ${isAndroid ? "Android" : "Other"} | ReportedIdx: ${actionId} | FinalIdx: ${clickedIndex} | CorrectIdx: ${data.correct_index}]`;

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body + debug,
      icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
      tag: "quiz-result",
      renotify: true
    })
  );
});
