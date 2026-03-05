/********** index-v2.js (optimisé lazy simulator) **********/

/**
 * Objectifs :
 * - Charger les scripts lourds (calculs + events) uniquement après intention utilisateur
 * - Limiter le travail au premier rendu pour aider FCP/LCP/TBT
 * - Garder un fallback minimal pour les CTA avant que les modules ne soient prêts
 */

/* ----------------------------- Imports critiques ---------------------------- */

import {
  setLinkUrl,
  eventToggleSwitch,
  useThemeColor,
  isToggleMoved,
} from "./utils/functions/other/other-ui-v2.js";
import {
  loader,
  listOfButton,
  btnSimulateur,
} from "./utils/refDOM/refDomUi.js";
import { registerSW } from "virtual:pwa-register";

/* --------------------------------- Helpers --------------------------------- */

const runAfterPaint = (fn) => requestAnimationFrame(() => requestAnimationFrame(fn));

const runWhenIdle = (fn, timeout = 2000) => {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(fn, { timeout });
  } else {
    setTimeout(fn, 1);
  }
};

const getInputInt = (selector) => {
  const value = document.querySelector(selector)?.value ?? "0";
  return parseInt(value, 10) || 0;
};

const getInputFloat = (selector) => {
  const value = document.querySelector(selector)?.value ?? "0";
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const initLoader = () => {
  if (!loader) return;

  const hideLoader = () => loader.classList.add("hide");
  window.addEventListener(
    "load",
    () => {
      setTimeout(hideLoader, 400);
    },
    { once: true },
  );
};

const scrollToSection = (id, offset = 0) => {
  if (!id) return;
  const target = document.querySelector(`#${id}`);
  if (!target) return;
  const rect = target.getBoundingClientRect();
  const y = rect.top + window.pageYOffset - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
};

const isElementVisible = (element) => {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1;
};

let simulatorInitPromise = null;
const fallbackCleanup = [];
let visibilityCleanup = null;

const registerFallback = (element, handler) => {
  if (!element) return;
  element.addEventListener("click", handler);
  fallbackCleanup.push(() => element.removeEventListener("click", handler));
};

const clearFallbackHandlers = () => {
  while (fallbackCleanup.length) {
    const dispose = fallbackCleanup.pop();
    try {
      dispose();
    } catch (e) {
      console.warn("Impossible de retirer un fallback", e);
    }
  }
};

const stopVisibilityWatcher = () => {
  if (visibilityCleanup) {
    visibilityCleanup();
    visibilityCleanup = null;
  }
};

const ensureSimulatorReady = () => {
  if (simulatorInitPromise) return simulatorInitPromise;

  simulatorInitPromise = (async () => {
    const [
      basicCalculModule,
      addEventModule,
      checkValueModule,
      otherModule,
    ] = await Promise.all([
      import("./utils/functions/basicCalcul/basicCalcul-v2.js"),
      import("./utils/functions/addEvent/addEvent-v2.js"),
      import("./utils/functions/checkValueUser/checkValueUser.js"),
      import("./utils/functions/other/other-v2.js"),
    ]);

    const { changeColor } = otherModule;

    const {
      initInputValue,
      initResultatFiscal,
      mensualite,
      coutDuCredit,
      incomeByYear,
      balance,
      calculeImpotRevenuFoncier,
      bilanApresImposition,
    } = basicCalculModule;
    const { checkValueUserRadioFiscal } = checkValueModule;

    initInputValue();
    initResultatFiscal();
    mensualite(
      getInputInt("input[name='number-prix']"),
      getInputInt("input[name='number-apport']"),
      getInputFloat("input[name='number-taeg']"),
      getInputInt("input[name='number-duree']"),
    );
    coutDuCredit();
    changeColor();
    incomeByYear();
    checkValueUserRadioFiscal();
    balance();
    calculeImpotRevenuFoncier();
    bilanApresImposition();

    const {
      addEventOnPageLoading,
      addEventOnBannerButton,
      addEventOnSimulateurButton,
      addEventOnInputMonthly,
      addEventOnInputDuty,
      addEventOnInputIncome,
      addEventOnInputRadioTypeLocation,
      addEventOnInputRadioFiscal,
      addEventOnInputRadioImpot,
      addEventOnIconColapseArticle,
      addEventOnLinkArticle,
      addEventOnButtonDownload,
      addEventOnIconInfo,
    } = addEventModule;
    

    addEventOnBannerButton();
    addEventOnSimulateurButton();
    addEventOnInputMonthly();
    addEventOnInputIncome();
    addEventOnInputDuty();
    addEventOnInputRadioTypeLocation();
    addEventOnInputRadioImpot();
    addEventOnInputRadioFiscal();
    addEventOnIconColapseArticle();
    addEventOnLinkArticle();
    addEventOnButtonDownload();
    addEventOnPageLoading();
    if (typeof addEventOnIconInfo === "function") {
      addEventOnIconInfo();
    }
  })()
    .then(() => {
      clearFallbackHandlers();
      stopVisibilityWatcher();
    })
    .catch((error) => {
      simulatorInitPromise = null;
      console.error("Échec du chargement paresseux du simulateur", error);
      throw error;
    });

  return simulatorInitPromise;
};

const triggerSimulatorLoad = () => {
  ensureSimulatorReady();
};

const setupSimulatorFallbacks = () => {
  registerFallback(btnSimulateur, (evt) => {
    const targetId = evt.currentTarget?.name || evt.target?.name;
    if (targetId) {
      scrollToSection(targetId, 200);
    }
    triggerSimulatorLoad();
  });

  listOfButton?.forEach?.((btn) => {
    registerFallback(btn, (evt) => {
      const targetId = evt.currentTarget?.name || evt.target?.name;
      if (!targetId) return;
      const section = document.querySelector(`#${targetId}`);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "center" });
        const collapseElement = section.querySelector(".colapse");
        if (collapseElement?.classList?.contains("colapse-close")) {
          collapseElement.classList.replace("colapse-close", "colapse-open");
        }
        const chevronTitle = section.querySelector(".svg-icon-chevron-colapse");
        chevronTitle?.classList?.add("chevron-up");
      }
      triggerSimulatorLoad();
    });
  });
};

const watchSimulatorVisibility = () => {
  const target = document.querySelector("#calculette");
  if (!target) return;

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          triggerSimulatorLoad();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -25% 0px" },
    );

    observer.observe(target);
    visibilityCleanup = () => observer.disconnect();
  } else {
    const onScroll = () => {
      if (isElementVisible(target)) {
        triggerSimulatorLoad();
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    visibilityCleanup = () => window.removeEventListener("scroll", onScroll);
    onScroll();
  }
};

/* -------------------------------- Boot strap -------------------------------- */

setLinkUrl();

runAfterPaint(() => {
  eventToggleSwitch();
  useThemeColor();
  isToggleMoved();
  initLoader();
  setupSimulatorFallbacks();
  watchSimulatorVisibility();
});

/* -------------------------------- SW & cleanup -------------------------------- */

if ("serviceWorker" in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener("load", () => {
      registerSW({ immediate: false });
    });
  } else {
    runWhenIdle(async () => {
      try {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister()));
        console.log("Service Workers supprimés (mode dev)");
      } catch (e) {
        console.warn("Impossible de nettoyer les SW en dev:", e);
      }
    });
  }
}
