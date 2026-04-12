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
          
          if (permission) {
            console.log("[OneSignal] User is subscribed to notifications.");
            const subId = oneSignal.User.PushSubscription.id;
            if (subId) {
              console.log("[OneSignal] Your Subscription ID:", subId);
            } else {
              console.log("[OneSignal] User is subscribed but Subscription ID not found yet. Waiting...");
            }
          } else {
            console.log("[OneSignal] User is NOT yet subscribed. Please click the button to enable.");
          }
        } catch (err) {
          console.warn("[OneSignal] Init failed:", err);
        }
      });
      setInitialized(true);
    };
    document.head.appendChild(script);
  }, [initialized]);

  return null;
}
