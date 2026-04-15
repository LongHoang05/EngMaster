importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// Version 6.0 - Dynamic UID Matching
self.addEventListener("notificationclick", (event) => {
  const actionId = String(event.action || ""); 
  const notification = event.notification;
  const rawData = notification.data;
  notification.close();

  let data = rawData;
  if (rawData && rawData.additionalData) data = rawData.additionalData;
  if (!data || data.type !== "quiz") return;

  const correctMeaning = String(data.correct_meaning).trim().toLowerCase();
  const choices = data.choices || [];
  const correctId = String(data.correct_id || "");
  let isCorrect = false;

  // 1. DYNAMIC UID MATCHING (The most robust method)
  if (actionId && correctId && actionId === correctId) {
    isCorrect = true;
  } else if (actionId) {
    // Fallback: Check if the actionId corresponds to the correct choice text or index
    const btnIds = data.button_ids || [];
    const clickedBtnIdx = btnIds.indexOf(actionId);
    
    if (clickedBtnIdx !== -1 && choices[clickedBtnIdx]) {
      const clickedText = choices[clickedBtnIdx].trim().toLowerCase().replace(/\.\.\.$/, "");
      if (correctMeaning.startsWith(clickedText) || clickedText.startsWith(correctMeaning)) {
        isCorrect = true;
      }
    }
  }

  // 2. SHOW RESULT WITH VERSION STAMP
  const version = "[v6]";
  const title = isCorrect ? `✅ CHÍNH XÁC! ${version}` : `❌ SAI RỒI! ${version}`;
  const body = isCorrect 
    ? `"${data.word}" chính là: ${data.correct_meaning}. 🎉`
    : `"${data.word}" có nghĩa là: ${data.correct_meaning}. 💪`;

  const footer = `\n(ID: ${actionId.substring(0, 10)}...)`;

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body + footer,
      icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
      tag: "quiz-result",
      renotify: true
    })
  );
});
