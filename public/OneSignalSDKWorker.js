// Version 20.0 - Hybrid Quiz: Desktop buttons + Mobile input page
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

  // --- HYBRID QUIZ (v20) ---
  if (data.type === "quiz_hybrid") {

    // CASE 1: Button clicked (Desktop) → show result inline
    if (actionId === "btn_A_v20" || actionId === "btn_B_v20") {
      let clickedIdx = -1;
      if (actionId === "btn_A_v20") clickedIdx = 0;
      else if (actionId === "btn_B_v20") clickedIdx = 1;

      const correctIdx = Number(data.correct_idx_flag);
      const isCorrect = (clickedIdx === correctIdx);

      const title = isCorrect ? "✅ CHÍNH XÁC!" : "❌ SAI RỒI!";
      const body = isCorrect
        ? `"${data.word}" chính là: ${data.correct_meaning}. 🎉`
        : `"${data.word}" có nghĩa là: ${data.correct_meaning}. 💪`;

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

    // CASE 2: Body clicked (Mobile) → open quiz input page
    if (data.quiz_url) {
      event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
          for (const client of windowClients) {
            if (client.url && client.url.includes("/quiz-notify")) {
              client.focus();
              client.navigate(data.quiz_url);
              return;
            }
          }
          return clients.openWindow(data.quiz_url);
        })
      );
      return;
    }
  }

  // Legacy: handle old quiz type (v19) with buttons
  if (data.type === "quiz") {
    let clickedIdx = -1;
    if (actionId === "btn_A_v19") clickedIdx = 0;
    else if (actionId === "btn_B_v19") clickedIdx = 1;
    if (clickedIdx === -1) return;

    const correctIdx = Number(data.correct_idx_flag);
    const isCorrect = (clickedIdx === correctIdx);

    const title = isCorrect ? "✅ CHÍNH XÁC!" : "❌ SAI RỒI!";
    const body = isCorrect
      ? `"${data.word}" chính là: ${data.correct_meaning}. 🎉`
      : `"${data.word}" có nghĩa là: ${data.correct_meaning}. 💪`;

    event.waitUntil(
      self.registration.showNotification(title, {
        body: body,
        icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
        tag: "quiz-result",
        renotify: true
      })
    );
  }
}, true);

importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
