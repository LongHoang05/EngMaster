// Version 23.0 - Intercept push: Text input for all devices

// Simple answer check
function checkAnswer(userAnswer, correctAnswer) {
  if (!userAnswer || !correctAnswer) return false;
  var normUser = userAnswer.toLowerCase().trim().replace(/\s+/g, " ");
  var normCorrect = correctAnswer.toLowerCase().trim().replace(/\s+/g, " ");
  if (normUser === normCorrect) return true;
  var parts = normCorrect.split(/[,;\/]/).map(function (s) {
    return s.trim().toLowerCase();
  });
  for (var i = 0; i < parts.length; i++) {
    if (normUser === parts[i]) return true;
    if (normUser.length >= 3 && parts[i].includes(normUser)) return true;
    if (parts[i].length >= 3 && normUser.includes(parts[i])) return true;
  }
  return false;
}

// =============================================
// INTERCEPT PUSH — before OneSignal
// =============================================
self.addEventListener(
  "push",
  function (event) {
    var rawData = {};
    try {
      rawData = event.data ? event.data.json() : {};
    } catch (e) {
      return;
    }

    // Try to find our quiz data in various OneSignal formats
    var quizData = null;
    if (
      rawData.custom &&
      rawData.custom.a &&
      rawData.custom.a.type === "quiz_hybrid"
    ) {
      quizData = rawData.custom.a;
    } else if (rawData.data && rawData.data.type === "quiz_hybrid") {
      quizData = rawData.data;
    } else if (
      rawData.additionalData &&
      rawData.additionalData.type === "quiz_hybrid"
    ) {
      quizData = rawData.additionalData;
    }

    if (!quizData) return; // Not our quiz — let OneSignal handle

    // Prevent OneSignal from also showing a notification
    event.stopImmediatePropagation();

    var icon =
      rawData.icon || "https://cdn-icons-png.flaticon.com/512/3898/3898082.png";

    // ALL DEVICES: show notification with text input
    var mode = quizData.mode || "meaning";
    var prompt =
      mode === "meaning"
        ? 'Nghĩa tiếng Việt của "' + quizData.word + '" là gì?'
        : 'Từ tiếng Anh của "' +
          (quizData.correct_meaning || "").split(",")[0].trim() +
          '" là gì?';

    event.waitUntil(
      self.registration.showNotification("📝 Thử thách nhanh", {
        body: prompt,
        icon: icon,
        tag: "quiz-input",
        renotify: true,
        requireInteraction: true,
        actions: [
          {
            action: "submit_answer",
            type: "text",
            title: "Gửi",
            placeholder:
              mode === "meaning"
                ? "Nhập nghĩa tiếng Việt..."
                : "Type English word...",
          },
        ],
        data: {
          type: "quiz_answer",
          word: quizData.word,
          correct_meaning: quizData.correct_meaning,
          mode: mode,
        },
      }),
    );
  },
  true,
);

// =============================================
// HANDLE CLICKS
// =============================================
self.addEventListener(
  "notificationclick",
  function (event) {
    event.stopImmediatePropagation();
    event.preventDefault();

    var actionId = String(event.action || "");
    var notification = event.notification;
    notification.close();

    var data = notification.data;
    if (!data) return;

    // Text reply
    if (data.type === "quiz_answer" && actionId === "submit_answer") {
      var userReply = (event.reply || "").toString().trim();
      var mode = data.mode || "meaning";
      var correctAnswer = mode === "meaning" ? data.correct_meaning : data.word;
      var correct = checkAnswer(userReply, correctAnswer);

      var resultTitle = correct ? "✅ CHÍNH XÁC!" : "❌ SAI RỒI!";
      var resultBody;
      if (mode === "meaning") {
        resultBody = correct
          ? '"' + data.word + '" chính là: ' + data.correct_meaning + ". 🎉"
          : '"' +
            data.word +
            '" có nghĩa là: ' +
            data.correct_meaning +
            '. 💪\nBạn trả lời: "' +
            userReply +
            '"';
      } else {
        resultBody = correct
          ? "Đúng rồi! Từ tiếng Anh là: " + data.word + ". 🎉"
          : "Từ tiếng Anh đúng là: " +
            data.word +
            '. 💪\nBạn trả lời: "' +
            userReply +
            '"';
      }

      event.waitUntil(
        self.registration.showNotification(resultTitle, {
          body: resultBody,
          icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
          tag: "quiz-result",
          renotify: true,
        }),
      );
      return;
    }

    // Legacy v19/v20 quiz types
    if (data.type === "quiz_hybrid" || data.type === "quiz") {
      var legacyActionMap = {
        btn_A_v20: 0,
        btn_B_v20: 1,
        btn_A_v19: 0,
        btn_B_v19: 1,
      };
      if (actionId in legacyActionMap) {
        var idx = legacyActionMap[actionId];
        var cIdx = Number(data.correct_idx_flag);
        var ok = idx === cIdx;
        event.waitUntil(
          self.registration.showNotification(
            ok ? "✅ CHÍNH XÁC!" : "❌ SAI RỒI!",
            {
              body: ok
                ? '"' +
                  data.word +
                  '" chính là: ' +
                  data.correct_meaning +
                  ". 🎉"
                : '"' +
                  data.word +
                  '" có nghĩa là: ' +
                  data.correct_meaning +
                  ". 💪",
              icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
              tag: "quiz-result",
              renotify: true,
            },
          ),
        );
      }
    }
  },
  true,
);

importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
