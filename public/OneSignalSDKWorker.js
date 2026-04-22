// Version 21.0 - Hybrid: Desktop buttons + Mobile inline text reply
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
  if (!data) return;

  // ========================================
  // HYBRID QUIZ (v20+)
  // ========================================
  if (data.type === "quiz_hybrid") {

    // CASE 1: Desktop button clicked → show result inline
    if (actionId === "btn_A_v20" || actionId === "btn_B_v20") {
      const clickedIdx = actionId === "btn_A_v20" ? 0 : 1;
      const correctIdx = Number(data.correct_idx_flag);
      const isCorrect = (clickedIdx === correctIdx);

      event.waitUntil(
        self.registration.showNotification(
          isCorrect ? "✅ CHÍNH XÁC!" : "❌ SAI RỒI!",
          {
            body: isCorrect
              ? `"${data.word}" chính là: ${data.correct_meaning}. 🎉`
              : `"${data.word}" có nghĩa là: ${data.correct_meaning}. 💪`,
            icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
            tag: "quiz-result",
            renotify: true
          }
        )
      );
      return;
    }

    // CASE 2: Mobile body clicked → show input notification
    const mode = data.mode || "meaning";
    const promptText = mode === "meaning"
      ? `Nghĩa tiếng Việt của "${data.word}" là gì?`
      : `Từ tiếng Anh của "${(data.correct_meaning || "").split(",")[0].trim()}" là gì?`;

    event.waitUntil(
      self.registration.showNotification("📝 Nhập đáp án của bạn", {
        body: promptText,
        icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
        tag: "quiz-input",
        renotify: true,
        requireInteraction: true,
        actions: [
          {
            action: "submit_answer",
            type: "text",
            title: "Gửi",
            placeholder: mode === "meaning" ? "Nhập nghĩa tiếng Việt..." : "Type English word..."
          }
        ],
        data: {
          type: "quiz_answer",
          word: data.word,
          correct_meaning: data.correct_meaning,
          mode: mode
        }
      })
    );
    return;
  }

  // ========================================
  // QUIZ ANSWER (from inline text reply)
  // ========================================
  if (data.type === "quiz_answer" && actionId === "submit_answer") {
    const userReply = (event.reply || "").toString().trim();
    const mode = data.mode || "meaning";

    let correctAnswer = mode === "meaning" ? data.correct_meaning : data.word;
    const isCorrect = checkAnswer(userReply, correctAnswer);

    let title, body;
    if (mode === "meaning") {
      title = isCorrect ? "✅ CHÍNH XÁC!" : "❌ SAI RỒI!";
      body = isCorrect
        ? `"${data.word}" chính là: ${data.correct_meaning}. 🎉`
        : `"${data.word}" có nghĩa là: ${data.correct_meaning}. 💪\nBạn trả lời: "${userReply}"`;
    } else {
      title = isCorrect ? "✅ CHÍNH XÁC!" : "❌ SAI RỒI!";
      body = isCorrect
        ? `Đúng rồi! Từ tiếng Anh là: ${data.word}. 🎉`
        : `Từ tiếng Anh đúng là: ${data.word}. 💪\nBạn trả lời: "${userReply}"`;
    }

    event.waitUntil(
      self.registration.showNotification(title, {
        body: body,
        icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
        tag: "quiz-result",
        renotify: true
      })
    );
    return;
  }

  // ========================================
  // LEGACY: old quiz v19 with buttons
  // ========================================
  if (data.type === "quiz") {
    let clickedIdx = -1;
    if (actionId === "btn_A_v19") clickedIdx = 0;
    else if (actionId === "btn_B_v19") clickedIdx = 1;
    if (clickedIdx === -1) return;

    const correctIdx = Number(data.correct_idx_flag);
    const isCorrect = (clickedIdx === correctIdx);

    event.waitUntil(
      self.registration.showNotification(
        isCorrect ? "✅ CHÍNH XÁC!" : "❌ SAI RỒI!",
        {
          body: isCorrect
            ? `"${data.word}" chính là: ${data.correct_meaning}. 🎉`
            : `"${data.word}" có nghĩa là: ${data.correct_meaning}. 💪`,
          icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
          tag: "quiz-result",
          renotify: true
        }
      )
    );
  }
}, true);

// ========================================
// Answer checking (simple, runs in SW)
// ========================================
function checkAnswer(userAnswer, correctAnswer) {
  if (!userAnswer || !correctAnswer) return false;

  const normUser = userAnswer.toLowerCase().trim().replace(/\s+/g, " ");
  const normCorrect = correctAnswer.toLowerCase().trim().replace(/\s+/g, " ");

  // Exact match
  if (normUser === normCorrect) return true;

  // Check each comma/semicolon separated part
  const parts = normCorrect.split(/[,;\/]/).map(function(s) { return s.trim().toLowerCase(); });
  for (let i = 0; i < parts.length; i++) {
    if (normUser === parts[i]) return true;
    // Fuzzy: user answer contained in correct part or vice versa (min 3 chars)
    if (normUser.length >= 3 && parts[i].includes(normUser)) return true;
    if (parts[i].length >= 3 && normUser.includes(parts[i])) return true;
  }

  return false;
}

importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
