const db = require("../db");


// ============================
// 🔹 Listar empresas
// ============================
exports.listarEmpresas = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT cnpj, nome, endereco, tel_empresa, cep FROM empresa"
    );
    res.json(rows);
  } catch (err) {
    console.error("Erro ao listar empresas:", err);
    res.status(500).json({ error: err.message });
  }
};


