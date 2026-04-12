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

    // Dynamically load OneSignal SDK
    const script = document.createElement("script");
    script.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
    script.defer = true;
    script.onload = () => {
      const OneSignal = (window as any).OneSignalDeferred || [];
      (window as any).OneSignalDeferred = OneSignal;
      OneSignal.push(async function (oneSignal: any) {
        await oneSignal.init({
          appId,
          allowLocalhostAsSecureOrigin: true,
          notifyButton: {
            enable: false, // We'll use our own custom button
          },
        });
      });
      setInitialized(true);
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup: don't remove script as OneSignal expects it to persist
    };
  }, [initialized]);

  return null;
}
