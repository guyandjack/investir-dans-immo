// runtimeEnv.js

function required(name, value) {
  if (!value) throw new Error(`[env] Variable manquante: ${name}`);
  return value;
}

/**
 * Retourne l'environnement d'exécution + les URLs
 * - dev: vite
 * - preview: vite build --mode preview + vite preview
 * - prod: vite build --mode production + serveur réel
 */
function getRuntimeEnv() {
  const mode = import.meta.env.MODE; // 'development' | 'preview' | 'production' (si tu le crées)
  const isDev = import.meta.env.DEV; // bool
  const isProd = import.meta.env.PROD; // bool

  // runtime lisible
  const runtime =
    mode === "preview"
      ? "preview"
      : isDev
        ? "dev"
        : isProd
          ? "prod"
          : "unknown";

  const baseUrl = required("VITE_BASE_URL", import.meta.env.VITE_BASE_URL);
  const apiUrl = required("VITE_API_URL", import.meta.env.VITE_API_URL);

  return {
    runtime, // 'dev' | 'preview' | 'prod'
    mode, // la valeur brute de Vite
    baseUrl,
    apiUrl,
    flags: { isDev, isProd },
  };
}

export {getRuntimeEnv}