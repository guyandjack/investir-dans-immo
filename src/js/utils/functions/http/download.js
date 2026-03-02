//import ds fonctions
import { getRuntimeEnv } from "../getRuntimeEnv/getRuntimeEnv";

//Correspondance de fichiers a telecharger
const refDownloadFile = {
  tab_res: "tableau-resume.xlsx"
};

//declaration des fonctions
function downloadError(elementCliked, errorMessage) {
  let divError = elementCliked.nextElementSibling;
  console.log("diverror: " + divError);
  
  
    divError.textContent = errorMessage;
    divError.classList.add("animation-error");
  setTimeout(() => {
    divError.textContent = "";
    divError.classList.remove("animation-error");
  }, 3000);
}



async function FetchForDownload(e) {
   const env = getRuntimeEnv();
   let buttonClicked = e.currentTarget;
   let buttonData = buttonClicked.dataset.download;
   let fileToDownload = refDownloadFile[buttonData];
   let urlFetch = `${env.apiUrl}/public/${fileToDownload}`;
  try {
    const response = await fetch(`${env.apiUrl}/download`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ buttonData }),
    });


    if (!response.ok) {
      const data = await response.json();
      downloadError(buttonClicked, data.message );
      
      return;
    }

    // transformer en blob (fichier)
    const blob = await response.blob();

    // créer un lien temporaire
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "tab-recap";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    alert("Impossible de contacter le serveur");
  }
}

export { FetchForDownload };
