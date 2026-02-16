import path from "path";

const refDownloadFile = {
  tab_res: "tableau-resume.xlsx",
};

const sendFile = (req, res) => {
  const dataRef = req.body.buttonData;

  // vérifier que la clé existe
  if (!Object.keys(refDownloadFile).includes(dataRef)) {
    return res.status(400).json({
      status: "error",
      message: "Fichier introuvable",
      code: "e-1",
    });
  }

  const fileToSend = refDownloadFile[dataRef];

  // chemin absolu
  const filePath = path.resolve("./public", fileToSend);

  res.download(filePath, fileToSend, (err) => {
    if (!err) return;

    // ⚠️ headers peut déjà être envoyé
    if (res.headersSent) return;

    if (err.code === "ENOENT") {
      return res.status(404).json({
        status: "error",
        message: "Fichier introuvable",
        code: "e-2",
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Erreur serveur",
      code: "e-3",
    });
  });
};

export { sendFile };
