importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// Background click listener for Quiz results
self.addEventListener("notificationclick", (event) => {
  const actionId = event.action;
  const notification = event.notification;
  
  // 1. EXTRACT DATA — handle all possible OneSignal data structures
  const rawData = notification.data;
  let data = rawData;
  if (rawData && rawData.additionalData && typeof rawData.additionalData === "object") {
    data = rawData.additionalData;
  }

  // 2. DISMISS NOTIFICATION
  notification.close();

  // 3. PROCESS QUIZ RESULTS
  // Only proceed if we have quiz data AND the user clicked a button (not just the notification body)
  if (actionId && data && data.type === "quiz") {
    let isCorrect = false;
    const actionStr = String(actionId).trim().toLowerCase();
    const correctIdStr = String(data.correct_id || "").trim().toLowerCase();

    // METHOD 1: Direct ID match (desktop Chrome — most reliable)
    // actionId = "choice_word_0", correct_id = "choice_word_0"
    if (actionStr === correctIdStr) {
      isCorrect = true;
    }
    // METHOD 2: Index-based match (mobile fallback)
    // Some mobile browsers return action as index string: "0", "1"
    else if (/^\d+$/.test(actionStr) && data.correct_index !== undefined) {
      isCorrect = parseInt(actionStr, 10) === data.correct_index;
    }
    // METHOD 3: Match action against choice_ids array by index
    // If actionId is an index, look it up in choice_ids to get the real ID
    else if (/^\d+$/.test(actionStr) && Array.isArray(data.choice_ids)) {
      const idx = parseInt(actionStr, 10);
      if (idx >= 0 && idx < data.choice_ids.length) {
        const resolvedId = String(data.choice_ids[idx]).trim().toLowerCase();
        isCorrect = resolvedId === correctIdStr;
      }
    }
    // METHOD 4: Partial match — in case OneSignal modifies/truncates the ID
    else if (correctIdStr && actionStr.includes(correctIdStr)) {
      isCorrect = true;
    }
    else if (correctIdStr && correctIdStr.includes(actionStr)) {
      isCorrect = true;
    }

    let title = "";
    let body = "";

    if (isCorrect) {
      title = "✅ CHÍNH XÁC!";
      body = `"${data.word}" chính là: ${data.correct_meaning}. Giỏi lắm! 🎉`;
    } else {
      title = "❌ SAI RỒI!";
      body = `"${data.word}" có nghĩa là: ${data.correct_meaning}. Cố gắng lần sau nhé! 💪`;
    }

    // Show result notification (no browser opening)
    const promise = self.registration.showNotification(title, {
      body: body,
      icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
      tag: "quiz-result",
      renotify: true,
      data: { url: "https://study-engmaster.vercel.app/" }
    });

    event.waitUntil(promise);
    return;
  }

  // If user tapped notification body (no actionId) and it's a quiz, do nothing special
  if (data && data.type === "quiz" && !actionId) {
    // Don't open the browser for quiz notifications when body is tapped
    return;
  }
});
