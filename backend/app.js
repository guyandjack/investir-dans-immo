//Import des packages

// import des librairies
import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import path from "node:path";
import { fileURLToPath } from "node:url";
import bodyparser from "body-parser";

//Import des functions
// methode de journalsiation des evenements
import  logger  from "./logger.js";

//Import des routes "conctact"
import routeApiContact from "./routes/contactRoute.js";

//Import des routes "download"
import routeApiDownload from"./routes/downloadRoute.js";

//Appli express
const appli = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

//parametrage du header de réponse pour annuler la sécurité "CORS"
// ✅ CORS
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://monprojetlocatif.org",
      "http://localhost:5173",
      "http://localhost:4173",
    ];
    if (!origin) callback(null, true);
    else if (allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error("CORS error: origin not allowed"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "X-Requested-With",
  ],
};
appli.use(cors(corsOptions));

// ✅ Static global (sert tout ./public à la racine → /images/... , /articles/...)
const publicDir = path.join(__dirname, "public");
appli.use("/public", express.static(publicDir));
appli.use(express.static(publicDir));


//permet d'exploiter le contenu json du corps des requettes
appli.use(express.json());

//permet d'acceder au contenu du corps de la requette
appli.use(bodyparser.urlencoded({ extended: true }));

// ✅ Body parsers
appli.use(express.json({ limit: "5mb" }));
appli.use(express.urlencoded({ extended: true, limit: "5mb" }));

// ✅ Logger HTTP via morgan -> Winston
appli.use(
  morgan(process.env.NODE_ENV === "production" ? "combined" : "dev", {
    stream: { write: (message) => logger.info(message.trim()) },
  }),
);

// ✅ Rate limit sur /api
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
appli.use("/api/", limiter);

// ✅ Middleware global d'erreurs
appli.use((err, req, res, next) => {
  logger.error(`Erreur serveur: ${err.message}`, {
    stack: err.stack,
    path: req.path,
    method: req.method,
    status: err.status || 500,
    body: req.body,
    query: req.query,
  });

  res.status(err.status || 500).json({
    error: true,
    message: err.message || "Erreur serveur",
    status: err.status || 500,
  });
});

// Exemple de route de test
appli.get("/test", (req, res) => {
  res.json({
    message: "✅ API online 🚀",
    requestId: req.requestId
  });
});

//Routes principales
appli.use("/", routeApiContact);

appli.use("/", routeApiDownload);




export default  appli;
