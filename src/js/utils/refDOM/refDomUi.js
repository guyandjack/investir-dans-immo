/****************************************************************************
 * Références DOM côté UI (nav, bannière, articles, footer)
 * Chargées tôt pour le squelette sans tirer les éléments du simulateur.
 ****************************************************************************/

const loader = document.querySelector(".container-loader");

const iconMenu = document.querySelector("#icon-menu");
const iconClose = document.querySelector("#icon-close");
const btnMenu = document.querySelector("#btn-menu");

const navLinkAccueil = document.querySelector("#nav-lien-accueil");
const navLinkContact = document.querySelector("#nav-lien-contact");

const listOfButton = document.querySelectorAll("ul.introduction-banner button");
const btnSimulateur = document.querySelector(".btn-simulateur");

const collapseRang1LocationNue = document.querySelector("#loc-nue");
const collapseRang1LocationMeuble = document.querySelector("#loc-meuble");

const linkColapseForfaitaire1 = document.querySelector("#forfaitaire-a");
const linkColapseReel1 = document.querySelector("#reel-a");
const linkColapseForfaitaire2 = document.querySelector("#forfaitaire-b");
const linkColapseReel2 = document.querySelector("#reel-b");

const colapseForfaitaire1 = document.querySelector("#colapse-forfaitaire-a");
const colapseReel1 = document.querySelector("#colapse-reel-a");
const colapseForfaitaire2 = document.querySelector("#colapse-forfaitaire-b");
const colapseReel2 = document.querySelector("#colapse-reel-b");

const btnDownloadList = document.querySelectorAll(".btn-download");

const footerLinkAccueil = document.querySelector("#footer-lien-accueil");
const footerLinkContact = document.querySelector("#footer-lien-contact");
const footerLinkCGU = document.querySelector("#footer-lien-cgu");
const footerLinkPolitique = document.querySelector("#footer-lien-politique");
const footerLinkMention = document.querySelector("#footer-lien-mention");

export {
  loader,
  iconMenu,
  iconClose,
  btnMenu,
  navLinkAccueil,
  navLinkContact,
  listOfButton,
  btnSimulateur,
  collapseRang1LocationNue,
  collapseRang1LocationMeuble,
  linkColapseForfaitaire1,
  linkColapseReel1,
  linkColapseForfaitaire2,
  linkColapseReel2,
  colapseForfaitaire1,
  colapseReel1,
  colapseForfaitaire2,
  colapseReel2,
  btnDownloadList,
  footerLinkAccueil,
  footerLinkContact,
  footerLinkCGU,
  footerLinkPolitique,
  footerLinkMention,
};
