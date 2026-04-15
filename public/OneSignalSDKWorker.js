importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// Background click listener for Quiz results
self.addEventListener("notificationclick", (event) => {
  const actionId = event.action;
  const notification = event.notification;
  
  // 1. EXTRACT DATA
  const rawData = notification.data;
  let data = null;

  if (rawData) {
    if (rawData.type === "quiz") {
      data = rawData;
    } else if (rawData.additionalData && rawData.additionalData.type === "quiz") {
      data = rawData.additionalData;
    } else if (rawData.custom && rawData.custom.a && rawData.custom.a.type === "quiz") {
      data = rawData.custom.a;
    } else {
      const searchForQuiz = (obj, depth) => {
        if (!obj || typeof obj !== "object" || depth > 3) return null;
        if (obj.type === "quiz") return obj;
        for (const key of Object.keys(obj)) {
          const result = searchForQuiz(obj[key], depth + 1);
          if (result) return result;
        }
        return null;
      };
      data = searchForQuiz(rawData, 0);
    }
  }

  // 2. DISMISS NOTIFICATION
  notification.close();

  // 3. PROCESS QUIZ
  if (data && data.type === "quiz") {
    // DEBUG: Show actionButtons info to understand button order on mobile
    let buttonsDebug = "no-actions";
    if (notification.actions && notification.actions.length > 0) {
      buttonsDebug = notification.actions.map((a, i) => `${i}:${a.action}="${a.title}"`).join("|");
    }
    // Also check rawData.actionButtons (OneSignal's format)
    let onesignalButtons = "no-ab";
    if (rawData && rawData.actionButtons && rawData.actionButtons.length > 0) {
      onesignalButtons = rawData.actionButtons.map((b, i) => `${i}:${b.id || b.action}="${b.text || b.title}"`).join("|");
    }

    const debugInfo = `[clicked="${actionId}"|correct="${data.correct_id}"|idx=${data.correct_index}]\n[actions: ${buttonsDebug}]\n[osButtons: ${onesignalButtons}]`;

    let isCorrect = false;
    if (actionId && typeof actionId === "string" && actionId.length > 0) {
      const actionStr = String(actionId).trim().toLowerCase();
      const correctIdStr = String(data.correct_id || "").trim().toLowerCase();

      if (actionStr === correctIdStr) {
        isCorrect = true;
      } else if (/^\d+$/.test(actionStr) && data.correct_index !== undefined) {
        isCorrect = parseInt(actionStr, 10) === data.correct_index;
      } else if (/^\d+$/.test(actionStr) && Array.isArray(data.choice_ids)) {
        const idx = parseInt(actionStr, 10);
        if (idx >= 0 && idx < data.choice_ids.length) {
          isCorrect = String(data.choice_ids[idx]).trim().toLowerCase() === correctIdStr;
        }
      }
    } else {
      event.waitUntil(
        self.registration.showNotification("🔍 DEBUG: No action", {
          body: `actionId empty. ${debugInfo}`,
          icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
          tag: "quiz-debug",
          renotify: true
        })
      );
      return;
    }

    let title, body;
    if (isCorrect) {
      title = "✅ CHÍNH XÁC!";
      body = `"${data.word}" chính là: ${data.correct_meaning}. Giỏi lắm! 🎉`;
    } else {
      title = "❌ SAI RỒI!";
      body = `"${data.word}" có nghĩa là: ${data.correct_meaning}. Cố gắng lần sau nhé! 💪`;
    }

    body += `\n${debugInfo}`;

    event.waitUntil(
      self.registration.showNotification(title, {
        body,
        icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
        tag: "quiz-result",
        renotify: true,
        data: { url: "https://study-engmaster.vercel.app/" }
      })
    );
    return;
  }
});
