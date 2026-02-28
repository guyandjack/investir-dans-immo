import { favicons } from "favicons";
import fs from "fs";

const source = "public/logo-mpl-v2.png";
const configuration = {
  path: "/favicons/",
  appName: "Mon Projet Locatif",
  appShortName: "MPL",
  appDescription: "Simulateur immobilier",
  background: "#ffffff",
  theme_color: "#0ea5e9",
  display: "standalone",
  orientation: "portrait",
  start_url: "/",
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: false,
    favicons: true,
    windows: false,
    yandex: false,
  },
};

const response = await favicons(source, configuration);

fs.mkdirSync("public/favicons", { recursive: true });

response.images.forEach((image) =>
  fs.writeFileSync(`public/favicons/${image.name}`, image.contents),
);

response.files.forEach((file) =>
  fs.writeFileSync(`public/favicons/${file.name}`, file.contents),
);

console.log("Favicons generated successfully!");
