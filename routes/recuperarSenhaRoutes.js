const express = require("express");
const router = express.Router();
const db = require("../db");
const enviarEmail = require("../utils/mailer");

// 🔹 Recuperar senha
router.post("/recuperar-senha", async (req, res) => {
  const { email } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT nome, usuario, senha FROM usuario WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "E-mail não encontrado." });
    }

    const usuario = rows[0];

    // 🔹 Responde logo para não travar o usuário
    res.json({
      message: "Se o e-mail estiver cadastrado, enviaremos sua senha."
    });

    // 🔹 Dispara o envio do e-mail em background
    enviarEmail({
      to: email,
      subject: "Recuperação de Senha - Sistema CAT",
      html: `
        <p>Olá <strong>${usuario.nome}</strong>,</p>
        <p>Você solicitou a recuperação de senha do <strong>Sistema de Controle SESMT</strong>.</p>
        <p><strong>Usuário:</strong> ${usuario.usuario}</p>
        <p><strong>Senha:</strong> ${usuario.senha}</p>
        <hr>
        <p>Se não foi você que solicitou, apenas ignore este e-mail.</p>
      `
    }).then(() => {
      console.log("📧 Email enviado para:", email);
    }).catch(err => {
      console.error("❌ Erro ao enviar e-mail:", err.message);
    });

  } catch (error) {
    console.error("❌ Erro no processo:", error.message);
    res.status(500).json({ error: "Erro ao processar recuperação de senha." });
  }
});

module.exports = router;
