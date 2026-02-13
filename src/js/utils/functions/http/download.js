//declaration des fonctions
function downloadError(elementCliked) {
  let divError = elementCliked.nextElementSibling;
  console.log("diverror: " + divError);
  if (!divError.classList.contains("animation-error")) {
    divError.classList.add("animation-error");
  }
  divError.addEventListener("animationend", () => {
    if (divError.classList.contains("animation-error")) {
      divError.classList.remove("animation-error");
    }
  });
}

function FetchForDownload(e) {
  let buttonClicked = e.target;
  let buttonData = buttonClicked.dataset.download;
  let urlFetch = "https://localhost:5000/download/" + buttonData;
  console.log("urlfetch: " + urlFetch);

  fetch(urlFetch, {
    method: "GET",
    headers: {
      Accept: "image/png",
    },
  })
    .then((result) => {
      /*result.text().then((data) => {
        console.log("contenu format text: " + data);
        let retourServeur = data;
        console.log("retour serveur: " + retourServeur.message);*/
      if (result.status !== 200) {
        downloadError(buttonClicked);
      } else {
        location.href = urlFetch;
      }
    })

    .catch((error) => {
      downloadError(buttonClicked);
    });
}

export { FetchForDownload };
