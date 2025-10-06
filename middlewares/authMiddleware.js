function protegerRotas(req, res, next) {
  const publicPaths = [
    "/status",
    "/login",
    "/login.html",
    "/logout",
    "/recuperar-senha"
  ];

  const extensoesLivres = [".css", ".js", ".png", ".jpg", ".ico"];

  if (
    publicPaths.includes(req.path) ||
    extensoesLivres.some(ext => req.path.endsWith(ext))
  ) {
    return next();
  }

  // 🔹 Se não houver sessão, retorna 401 (sem redirecionar)
  if (!req.session || !req.session.usuario) {
    return res.status(401).json({ error: "Sessão expirada ou não autenticado." });
  }

  next();
}

module.exports = protegerRotas;
