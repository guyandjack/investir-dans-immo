import { initToggleSwitch } from "./utils/functions/other/other-ui-v2.js";
import { registerServiceWorker } from "./utils/registerServiceWorker.js";

const once = (fn) => {
  let promise = null;
  return () => {
    if (!promise) {
      promise = Promise.resolve(fn());
    }
    return promise;
  };
};

const observeSection = (selector, callback, options = { rootMargin: "0px 0px -25% 0px", threshold: 0 }) => {
  const target = typeof selector === "string" ? document.querySelector(selector) : selector;
  if (!target) return;

  if (!("IntersectionObserver" in window)) {
    callback(target);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      observer.disconnect();
      callback(target);
    }
  }, options);

  observer.observe(target);
};

let uiModulePromise;
const loadUiModule = () => {
  if (!uiModulePromise) {
    uiModulePromise = import("./utils/functions/other/other-ui-v2.js");
  }
  return uiModulePromise;
};

let addEventModulePromise;
const loadAddEventModule = () => {
  if (!addEventModulePromise) {
    addEventModulePromise = import("./utils/functions/addEvent/addEvent-v2.js");
  }
  return addEventModulePromise;
};

const initHeaderSection = once(async () => {
  const [{ eventToggleSwitch, initToggleSwitch }, { addEventOnLinkBanner }] =
    await Promise.all([loadUiModule(), loadAddEventModule()]);

  initToggleSwitch();
  eventToggleSwitch();
  addEventOnLinkBanner();
  registerServiceWorker();
});

const initArticleSection = once(async () => {
  const { addEventOnButtonDownload } =
    await loadAddEventModule();

  addEventOnButtonDownload();
});

observeSection("header", () => initHeaderSection());
observeSection(".container-article", () => initArticleSection());

