importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// Background click listener for Quiz results
self.addEventListener("notificationclick", (event) => {
  const actionId = event.action;
  const notification = event.notification;
  
  // 1. EXTRACT DATA — try ALL possible OneSignal data structures
  const rawData = notification.data;
  let data = null;

  // Try multiple extraction paths for quiz data
  if (rawData) {
    // Path 1: Direct (data is at top level)
    if (rawData.type === "quiz") {
      data = rawData;
    }
    // Path 2: Under additionalData (OneSignal Web SDK v16 typical structure)
    else if (rawData.additionalData && rawData.additionalData.type === "quiz") {
      data = rawData.additionalData;
    }
    // Path 3: Under custom.a (OneSignal Android structure)
    else if (rawData.custom && rawData.custom.a && rawData.custom.a.type === "quiz") {
      data = rawData.custom.a;
    }
    // Path 4: Try JSON parsing if additionalData is a string
    else if (typeof rawData.additionalData === "string") {
      try {
        const parsed = JSON.parse(rawData.additionalData);
        if (parsed.type === "quiz") data = parsed;
      } catch (e) {}
    }
    // Path 5: Deep search — look for type=quiz anywhere in the object
    else {
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

  // 3. PROCESS QUIZ RESULTS
  if (data && data.type === "quiz") {
    // === DEBUG: Show raw values so we can see what mobile sends ===
    const debugInfo = `[action="${actionId}"|correct="${data.correct_id}"|idx=${data.correct_index}|keys=${Object.keys(rawData || {}).join(",")}]`;

    let isCorrect = false;

    if (actionId && typeof actionId === "string" && actionId.length > 0) {
      const actionStr = String(actionId).trim().toLowerCase();
      const correctIdStr = String(data.correct_id || "").trim().toLowerCase();

      // METHOD 1: Direct ID match
      if (actionStr === correctIdStr) {
        isCorrect = true;
      }
      // METHOD 2: Index-based match (actionId = "0" or "1")
      else if (/^\d+$/.test(actionStr) && data.correct_index !== undefined) {
        isCorrect = parseInt(actionStr, 10) === data.correct_index;
      }
      // METHOD 3: Use choice_ids array to resolve index
      else if (/^\d+$/.test(actionStr) && Array.isArray(data.choice_ids)) {
        const idx = parseInt(actionStr, 10);
        if (idx >= 0 && idx < data.choice_ids.length) {
          isCorrect = String(data.choice_ids[idx]).trim().toLowerCase() === correctIdStr;
        }
      }
      // METHOD 4: Partial match
      else if (correctIdStr && (actionStr.includes(correctIdStr) || correctIdStr.includes(actionStr))) {
        isCorrect = true;
      }
    } else {
      // actionId is empty — the user tapped notification body, not a button
      // Show debug info so we can understand what's happening
      event.waitUntil(
        self.registration.showNotification("🔍 DEBUG: No actionId", {
          body: `actionId is empty/null. rawData keys: ${Object.keys(rawData || {}).join(", ")}. data found: ${!!data}`,
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

    // Append debug info temporarily
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

  // No quiz data found — show debug notification
  if (actionId) {
    event.waitUntil(
      self.registration.showNotification("🔍 DEBUG: No quiz data", {
        body: `action="${actionId}", rawData=${JSON.stringify(rawData).substring(0, 200)}`,
        icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
        tag: "quiz-debug",
        renotify: true
      })
    );
  }
});
