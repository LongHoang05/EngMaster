// Version 20.0 - Input Quiz Mode
// When notification is clicked, open the quiz page with input field
self.addEventListener("notificationclick", (event) => {
  event.stopImmediatePropagation();
  event.preventDefault();

  const notification = event.notification;
  const rawData = notification.data;

  // Always close immediately
  notification.close();

  let data = rawData;
  if (rawData && rawData.additionalData) data = rawData.additionalData;
  if (!data) return;

  // Handle quiz_input type (v20) - open quiz page
  if (data.type === "quiz_input" && data.quiz_url) {
    event.waitUntil(
      clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
        // Try to find an existing window to navigate
        for (const client of windowClients) {
          if (client.url && client.url.includes("/quiz-notify")) {
            client.focus();
            client.navigate(data.quiz_url);
            return;
          }
        }
        // Open new window
        return clients.openWindow(data.quiz_url);
      })
    );
    return;
  }

  // Legacy: handle old quiz type (v19) with buttons
  if (data.type === "quiz") {
    const actionId = String(event.action || "");
    let clickedIdxOfOurButtons = -1;
    if (actionId === "btn_A_v19") clickedIdxOfOurButtons = 0;
    else if (actionId === "btn_B_v19") clickedIdxOfOurButtons = 1;

    if (clickedIdxOfOurButtons === -1) return;

    const correctIdx = Number(data.correct_idx_flag);
    const isCorrect = (clickedIdxOfOurButtons === correctIdx);

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
}, true);

importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
