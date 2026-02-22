
import { localOrProd } from "../../functions/localOrProd/localOrProd";

const { url } = localOrProd();

const urlLink = {
  
    accueil: `${url}`,
    contact: `${url}/public/contact.html`,
    cgu: `${url}/public/cgu.html`,
    mention: `${url}/public/mention.html`,
  

  
};

export {urlLink}
