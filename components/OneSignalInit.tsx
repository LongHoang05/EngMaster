"use client";

import { useEffect, useState } from "react";

export default function OneSignalInit() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;

    const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
    if (!appId) {
      console.warn("OneSignal App ID not configured. Skipping initialization.");
      return;
    }

    // Skip OneSignal on localhost — it only works on the registered production domain
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (isLocalhost) {
      console.info("[OneSignal] Skipped on localhost. Will only run on production domain.");
      return;
    }

    // Dynamically load OneSignal SDK
    const script = document.createElement("script");
    script.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
    script.defer = true;
    script.onload = () => {
      console.log("[OneSignal] SDK script loaded.");
      const OneSignal = (window as any).OneSignalDeferred || [];
      (window as any).OneSignalDeferred = OneSignal;
      
      OneSignal.push(async function (oneSignal: any) {
        console.log("[OneSignal] Initializing with App ID:", appId);
        try {
          await oneSignal.init({
            appId,
            notifyButton: {
              enable: false,
            },
          });
          console.log("[OneSignal] Initialization complete.");
          
          // Check permission state immediately
          const permission = oneSignal.Notifications.permission;
          console.log("[OneSignal] Current notification permission:", permission);
          
          // Handle notification clicks (Action Buttons)
          oneSignal.Notifications.addEventListener("click", (event: any) => {
            const { actionId, notification } = event.result;
            const data = notification.additionalData;
            
            console.log("[OneSignal] Notification clicked. Action ID:", actionId);
            
            if (actionId) {
              // User clicked an action button
              if (data && data.type === "quiz") {
                if (actionId === data.correct_id) {
                  alert(`✅ CHÍNH XÁC!\n\n"${data.word}" chính là: ${data.correct_meaning}\nChúc mừng bạn đã ghi nhớ thêm 1 từ! 🎉`);
                } else {
                  alert(`❌ SAI RỒI!\n\n"${data.word}" có nghĩa là: ${data.correct_meaning}\nHãy cố gắng ở thử thách sau nhé! 💪`);
                }
              }
            } else {
              // User clicked the notification body (not a button)
              console.log("[OneSignal] Notification body clicked.");
            }
          });
          
          setInitialized(true);
        } catch (err) {
          console.warn("[OneSignal] Init failed:", err);
        }
      });
    };
    document.head.appendChild(script);
  }, [initialized]);

  return null;
}
