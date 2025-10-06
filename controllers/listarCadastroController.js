const db = require("../db");

// 🔹 Helper para formatar datas
function formatDate(value) {
  if (!value) return "";
  if (value instanceof Date) {
    const d = value;
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  }
  const m = value.toString().match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[3]}/${m[2]}/${m[1]}`;
  return value.toString();
}

module.exports = {
  // ============================
  // Listar todos os cadastros
  // ============================
  async listarCadastros(req, res) {
    try {
      const [rows] = await db.query("SELECT * FROM cadastro");

      const formatados = rows.map(r => ({
        ...r,
        nascimento: formatDate(r.nascimento),
        ult_dia: formatDate(r.ult_dia),
        data_obito: formatDate(r.data_obito),
        data_acidente: formatDate(r.data_acidente)
      }));

      res.json(formatados);
    } catch (err) {
      console.error("Erro ao listar cadastros:", err);
      res.status(500).json({ error: err.message });
    }
  },

  // ============================
  // Atualizar cadastro
  // ============================
  async atualizarCadastro(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      const campos = Object.keys(data).map(c => `${c} = ?`).join(", ");
      const valores = Object.values(data);

      await db.query(`UPDATE cadastro SET ${campos} WHERE id = ?`, [...valores, id]);
      res.json({ success: true });
    } catch (err) {
      console.error("Erro ao atualizar cadastro:", err);
      res.status(500).json({ error: err.message });
    }
  },

  // ============================
  // Excluir cadastro
  // ============================
  async excluirCadastro(req, res) {
    try {
      const { id } = req.params;
      await db.query("DELETE FROM cadastro WHERE id = ?", [id]);
      res.json({ success: true });
    } catch (err) {
      console.error("Erro ao excluir cadastro:", err);
      res.status(500).json({ error: err.message });
    }
  },

  // ============================
  // Listar funcionários
  // ============================
  async listarFuncionarios(req, res) {
    try {
      const [rows] = await db.query(
        "SELECT matricula, nome, cargo AS funcao, setor FROM funcionarios"
      );
      res.json(rows);
    } catch (err) {
      console.error("Erro ao listar funcionários:", err);
      res.status(500).json({ error: err.message });
    }
  },

  // ============================
  // Buscar funcionário por matrícula
  // ============================
  async buscarFuncionarioMatricula(req, res) {
    try {
      const { matricula } = req.params;
      const [rows] = await db.query(
        "SELECT matricula, nome, cargo AS funcao, setor FROM funcionarios WHERE matricula = ?",
        [matricula]
      );
      res.json(rows[0] || {});
    } catch (err) {
      console.error("Erro ao buscar funcionário por matrícula:", err);
      res.status(500).json({ error: err.message });
    }
  },

  async buscarFuncionarioNome(req, res) {
    try {
      const { nome } = req.params;
      const [rows] = await db.query(
        "SELECT matricula, nome, cargo AS funcao, setor FROM funcionarios WHERE nome = ?",
        [nome]
      );
      res.json(rows[0] || {});
    } catch (err) {
      console.error("Erro ao buscar funcionário por nome:", err);
      res.status(500).json({ error: err.message });
    }
  },

  async buscarFuncionarioSetor(req, res) {
    try {
      const { setor } = req.params;
      const [rows] = await db.query(
        "SELECT matricula, nome, cargo AS funcao, setor FROM funcionarios WHERE setor = ? LIMIT 1",
        [setor]
      );
      res.json(rows[0] || {});
    } catch (err) {
      console.error("Erro ao buscar funcionário por setor:", err);
      res.status(500).json({ error: err.message });
    }
  },

  async buscarFuncionarioFuncao(req, res) {
    try {
      const { funcao } = req.params;
      const [rows] = await db.query(
        "SELECT matricula, nome, cargo AS funcao, setor FROM funcionarios WHERE cargo = ? LIMIT 1",
        [funcao]
      );
      res.json(rows[0] || {});
    } catch (err) {
      console.error("Erro ao buscar funcionário por função:", err);
      res.status(500).json({ error: err.message });
    }
  },

  // ============================
  // Atualizar Acidente
  // ============================
  async atualizarAcidente(req, res) {
    try {
      const { id } = req.params;
      const dados = req.body;

      const colunas = [
        "relatorio", "matricula", "nome", "nascimento", "telefone", "setor", "funcao", "cnpj", "empresa", "tel_empresa",
        "endereco", "cep", "tipo_cat", "ult_dia", "comun_policia", "houve_obito", "data_obito", "cod_doenca", "situacao_doenca",
        "cod_acidente", "situacao_acidente", "inicia_cat", "tipo_acidente", "data_acidente", "horas_trab", "hora_acidente",
        "cod_parte_corpo", "parte_corpo", "lateralidade", "local_acidente", "testemunha", "sofreu_acidente", "epi",
        "descricao_acidente", "prov_acidente", "cod_agente", "agente"
      ];

      const sets = colunas.map(c => `${c} = ?`).join(", ");
      const values = colunas.map(c => dados[c]);

      await db.query(
        `UPDATE cadastro SET ${sets} WHERE id = ?`,
        [...values, id]
      );

      res.json({ success: true });
    } catch (err) {
      console.error("Erro ao atualizar acidente:", err);
      res.status(500).json({ error: "Erro ao atualizar acidente" });
    }
  }
};
