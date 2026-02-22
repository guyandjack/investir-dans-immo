
import { localOrProd } from "../../functions/localOrProd/localOrProd";

const { url } = localOrProd();

const urlLink = {
  
    accueil: `${url}`,
    contact: `${url}/public/contact.html`,
    cgu: `${url}/public/cgu.html`,
    mention: `${url}/public/mention-legale.html`,
    politique: `${url}/public/politique-de-confidentialite.html`
  

  
};

export {urlLink}
