
import { getRuntimeEnv } from "../../functions/getRuntimeEnv/getRuntimeEnv";

const env = getRuntimeEnv();
const baseUrl = env.baseUrl;

const urlLink = {
  
    accueil: `${baseUrl}`,
    contact: `${baseUrl}/html/contact.html`,
    cgu: `${baseUrl}/html/cgu.html`,
    mention: `${baseUrl}/html/mention-legale.html`,
    politique: `${baseUrl}/html/politique-de-confidentialite.html`
  

  
};

export { urlLink };

