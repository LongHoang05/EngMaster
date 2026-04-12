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
      const OneSignal = (window as any).OneSignalDeferred || [];
      (window as any).OneSignalDeferred = OneSignal;
      
      OneSignal.push(async function (oneSignal: any) {
        try {
          await oneSignal.init({
            appId,
            notifyButton: {
              enable: false,
            },
          });
          
          // Check permission state immediately
          const permission = oneSignal.Notifications.permission;
          
          // Note: Notification clicks (Quiz Action Buttons) are handled 
          // background-to-background in public/OneSignalSDKWorker.js 
          
          setInitialized(true);
        } catch (err) {
          // Keep errors for troubleshooting
          console.warn("[OneSignal] Init failed:", err);
        }
      });
    };
    document.head.appendChild(script);
  }, [initialized]);

  return null;
}
