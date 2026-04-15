importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

self.addEventListener("notificationclick", (event) => {
  const actionId = event.action; 
  const notification = event.notification;
  const rawData = notification.data;
  notification.close();

  let data = rawData;
  if (rawData && rawData.additionalData) data = rawData.additionalData;
  if (!data || data.type !== "quiz") return;

  const correctMeaning = String(data.correct_meaning).trim().toLowerCase();
  let isCorrect = false;
  let detectedTitle = "";
  let finalMethod = "Direct";

  if (actionId) {
    const actions = notification.actions || [];
    const clickedIdx = actions.findIndex(a => a.action === actionId);
    
    if (clickedIdx !== -1) {
      detectedTitle = actions[clickedIdx].title.trim().toLowerCase();
      const cleanTitle = detectedTitle.replace(/\.\.\.$/, "");

      // 1. Kiểm tra trực tiếp
      if (correctMeaning.startsWith(cleanTitle) || cleanTitle.startsWith(correctMeaning)) {
        isCorrect = true;
      } 
      // 2. Logic BÙ TRỪ cho Android (Fuzzy Matching)
      // Nếu nút hiện tại sai, kiểm tra xem nút NGAY TRƯỚC ĐÓ có đúng không
      // Vì Android thường báo lệch từ vị trí N (thực tế) sang N+1 (báo cáo)
      else if (/Android/i.test(navigator.userAgent) && clickedIdx > 0) {
        const prevAction = actions[clickedIdx - 1];
        const prevTitle = prevAction.title.trim().toLowerCase().replace(/\.\.\.$/, "");
        
        if (correctMeaning.startsWith(prevTitle) || prevTitle.startsWith(correctMeaning)) {
          isCorrect = true;
          finalMethod = "Android-Compensated";
        }
      }
    }

    // Fallback cuối cùng cho máy tính (Desktop)
    if (!isCorrect && (actionId === "idx_0" || actionId === "btn:" + data.correct_meaning)) {
      isCorrect = true;
      finalMethod = "ID-Fallback";
    }
  }

  const title = isCorrect ? "✅ CHÍNH XÁC!" : "❌ SAI RỒI!";
  const body = isCorrect 
    ? `"${data.word}" chính là: ${data.correct_meaning}. 🎉`
    : `"${data.word}" có nghĩa là: ${data.correct_meaning}. 💪`;

  // Debug ẩn (để tôi theo dõi)
  const debug = `\n[Method: ${finalMethod} | ClickedID: ${actionId} | Title: "${detectedTitle}"]`;

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body + debug,
      icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
      tag: "quiz-result",
      renotify: true
    })
  );
});
