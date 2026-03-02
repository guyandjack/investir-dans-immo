
import { getRuntimeEnv } from "../../functions/getRuntimeEnv/getRuntimeEnv";

const env = getRuntimeEnv();

const urlLink = {
  
    accueil: `${env.baseUrl}`,
    contact: `${env.baseUrl}/html/contact.html`,
    cgu: `${env.baseUrl}/html/cgu.html`,
    mention: `${env.baseUrl}/html/mention-legale.html`,
    politique: `${env.baseUrl}/html/politique-de-confidentialite.html`
  

  
};

export { urlLink };

