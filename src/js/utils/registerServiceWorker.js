import { registerSW } from "virtual:pwa-register";

const runWhenIdle = (fn, timeout = 2000) => {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(fn, { timeout });
  } else {
    setTimeout(fn, 1);
  }
};

export const registerServiceWorker = () => {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  if (import.meta.env.PROD) {
    window.addEventListener("load", () => {
      registerSW({ immediate: false });
    });
    return;
  }

  runWhenIdle(async () => {
    try {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));
      console.log("Service Workers supprimés (mode dev)");
    } catch (e) {
      console.warn("Impossible de nettoyer les SW en dev:", e);
    }
  });
};
