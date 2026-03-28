/****************************************************************************
 * Références DOM côté UI (nav, bannière, articles, footer)
 * Chargées tôt pour le squelette sans tirer les éléments du simulateur.
 ****************************************************************************/


/***** partie 1 liens header **********/
/***** reference à créer lorsque le header est visible a l' ecran ***** */
const iconMenu = document.querySelector("#icon-menu");
const iconClose = document.querySelector("#icon-close");
const btnMenu = document.querySelector("#btn-menu");

const btnDownloadList = document.querySelectorAll(".btn-download");

const containerLinkBanner = document.querySelector(".introduction-banner");

const prelevementSociauxList = document.querySelectorAll(".prelevement-sociaux");

/***** partie 3 liens du footer **********/
/***** reference à créer lorsque le footer est visible a l' ecran ***** */


export {
  containerLinkBanner,
  iconMenu,
  iconClose,
  btnMenu,
  btnDownloadList,
  prelevementSociauxList
  };
