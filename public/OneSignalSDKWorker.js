importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// Version 5.0 - Super Compatible & Debug Version
self.addEventListener("notificationclick", (event) => {
  const actionId = String(event.action || ""); 
  const notification = event.notification;
  const rawData = notification.data;
  notification.close();

  let data = rawData;
  if (rawData && rawData.additionalData) data = rawData.additionalData;
  if (!data || data.type !== "quiz") return;

  const correctMeaning = String(data.correct_meaning).trim().toLowerCase();
  const choices = data.choices || data.choice_texts || [];
  let isCorrect = false;
  let matchedText = "";

  // 1. DUAL-MODE MATCHING
  if (actionId) {
    // Mode A: Numeric Index (0, 1, 2)
    const idx = parseInt(actionId, 10);
    if (!isNaN(idx) && choices[idx]) {
      matchedText = String(choices[idx]).trim().toLowerCase();
    } 
    // Mode B: String ID prefixed with btn:
    else if (actionId.startsWith("btn:")) {
      matchedText = actionId.replace("btn:", "").trim().toLowerCase();
    }
    // Mode C: Direct Title Matching from the buttons array
    else if (notification.actions) {
      const actionObj = notification.actions.find(a => String(a.action) === actionId);
      if (actionObj && actionObj.title) {
        matchedText = actionObj.title.trim().toLowerCase();
      }
    }

    // Clean match text
    matchedText = matchedText.replace(/\.\.\.$/, "");
    
    if (matchedText && (correctMeaning.startsWith(matchedText) || matchedText.startsWith(correctMeaning))) {
      isCorrect = true;
    }
  }

  // 2. SHOW RESULT WITH VERSION STAMP
  const version = "[v5]";
  const title = isCorrect ? `✅ CHÍNH XÁC! ${version}` : `❌ SAI RỒI! ${version}`;
  const body = isCorrect 
    ? `"${data.word}" chính là: ${data.correct_meaning}. 🎉`
    : `"${data.word}" có nghĩa là: ${data.correct_meaning}. 💪`;

  // Final confirmation logic: Show the reported action ID in body for one last check
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
