const db = require("../db");

const authController = {
  async login(req, res) {
    try {
      const { usuario, senha } = req.body;

      if (!usuario || !senha) {
        return res.status(400).json({ error: "Usuário e senha são obrigatórios" });
      }

      const [rows] = await db.query(
        "SELECT id, nome, usuario, email FROM usuario WHERE usuario = ? AND senha = ?",
        [usuario, senha]
      );

      if (rows.length > 0) {
        const user = rows[0];

        // 🔹 Cria sessão (o express-session gerencia o cookie automaticamente)
        req.session.usuario = {
          id: user.id,
          nome: user.nome,
          usuario: user.usuario,
        };

        // 🔹 Não defina manualmente o cookie "connect.sid"
        // O express-session já envia o cookie correto com base na config do app
        // (secure: true, sameSite: "none", etc.)

        return res.json({
          success: true,
          nome: user.nome,
          usuario: user.usuario,
        });
      } else {
        return res.status(401).json({ error: "Usuário ou senha inválidos" });
      }
    } catch (err) {
      console.error("Erro no login:", err);
      return res.status(500).json({ error: "Erro no servidor" });
    }
  },

  logout(req, res) {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          console.error("Erro ao destruir sessão:", err);
          return res.status(500).json({ error: "Erro ao encerrar sessão" });
        }

        // 🔹 Limpa cookie de sessão (de forma segura)
        res.clearCookie("connect.sid", {
          sameSite: "none",
          secure: true,
        });

        return res.json({ success: true });
      });
    } else {
      return res.json({ success: true });
    }
  }
};

module.exports = authController;
