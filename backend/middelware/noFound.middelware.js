function notFound(req, res) {
  res.status(404).json({
    status: "success",
    message: "Route introuvable.",
  });
}

module.exports = notFound;
