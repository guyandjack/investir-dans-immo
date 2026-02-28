import { clientsClaim } from "workbox-core";
import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { registerRoute, setCatchHandler } from "workbox-routing";
import { NetworkFirst, StaleWhileRevalidate } from "workbox-strategies";

self.skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST, {
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
});
cleanupOutdatedCaches();

const pageStrategy = new NetworkFirst({
  cacheName: "mpl-pages",
});

const assetStrategy = new StaleWhileRevalidate({
  cacheName: "mpl-static-assets",
});

registerRoute(
  ({ request, url }) =>
    request.mode === "navigate" &&
    url.origin === self.location.origin &&
    !url.pathname.startsWith("/api/"),
  pageStrategy,
);

registerRoute(
  ({ request }) =>
    ["style", "script", "image", "font"].includes(request.destination),
  assetStrategy,
);

// Fallback offline (optionnel mais top)
setCatchHandler(async ({ event }) => {
  if (event.request.mode === "navigate") {
    return (
      (await caches.match(event.request)) || (await caches.match("/index.html"))
    );
  }
  return Response.error();
});
