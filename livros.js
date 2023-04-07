// pacotes a serem utilizados
const express = require("express");
const router = express.Router();

//cors
const cors = require("cors");
router.use(cors());

// dados de conexão com o banco de dados
const dbKnex = require("./data/db_config");

// Método get é usado para consulta
router.get("/", async (req, res) => {
  try {
    // para obter os livros pode-se utilizar .select().orderBy() ou apenas .orderBy()
    const livros = await dbKnex("livros").orderBy("id", "desc");
    res.status(200).json(livros); // retorna statusCode ok e od dados
  } catch (error) {
    res.status(400).json({ msg: error.message }); // retorna status de erro e msg
  }
});

// Método post é usado para inclusão
router.post("/", async (req, res) => {
  // faz a desestruturação dos dados recebidos no corpo da requisição
  const { titulo, autor, ano, preco, foto } = req.body;
  console.log(req.body);

  // se algum dos campos não foi passado, irá enviar uma mensagem de erro e retornar
  if (!titulo || !autor || !ano || !preco || !foto) {
    res
      .status(400)
      .json({ msg: "Enviar titulo, autor, ano, preco e foto do livro" });
    return;
  }

  // caso ocorra algum erro na inclusão, o programa irá capturar (catch) o erro
  try {
    // insert, faz a inserção na tabela livros (e retorna o id do registro inserido)
    const novo = await dbKnex("livros").insert({
      titulo,
      autor,
      ano,
      preco,
      foto,
    });
    // statusCode indica Create
    res.status(201).json({ id: novo[0] });
  } catch (error) {
    // retorna status de erro e msg
    res.status(400).json({ msg: error.message });
  }
});

// Método put é usado para alteração. Id indica o registro a ser alterado
router.put("/:id", async (req, res) => {
  // ou const {id} = req.params
  const id = req.params.id;
  // campo a ser alterado
  const { preco } = req.body;

  try {
    // altera o campo preco, no registro cujo id coincidir com o parâmetro passado
    // ou .where({id})
    await dbKnex("livros").update({ preco }).where("id", id);
    // statusCode indica ok
    res.status(200).json();
  } catch (error) {
    // retorna status de erro e msg
    res.status(400).json({ msg: error.message });
  }
});

// Método delete é usado para exclusão
router.delete("/:id", async (req, res) => {
  // id do registro a ser excluido
  const { id } = req.params;

  try {
    await dbKnex("livros").del().where({ id });
    //statusCode indica ok
    res.status(200).json();
  } catch (error) {
    // retorna status de erro e msg
    res.status(400).json({ msg: error.message });
  }
});

// Filtro por título ou autor
router.get("/filtro/:palavra", async (req, res) => {
  // palavra do título ou autor a pesquisar
  const palavra = req.params.palavra;

  try {
    // para filtrar registros, utiliza-se .where(), com suas variantes
    const livros = await dbKnex("livros")
      .where("titulo", "like", `%${palavra}%`)
      .orWhere("autor", "like", `%${palavra}%`);
    // retorna statusCode ok e os dados
    res.status(200).json(livros);
  } catch (error) {
    // retorna status de erro e msg
    res.status(400).json({ msg: error.message });
  }
});

// Resumo do cadastro de livros
router.get("/dados/resumo", async (req, res) => {
  try {
    // métodos que podem ser utilizados para obter dados estatísticos da tabela
    const consulta = await dbKnex("livros")
      .count({ num: "*" })
      .sum({ soma: "preco" })
      .max({ maior: "preco" })
      .avg({ media: "preco" });

    const { num, soma, maior, media } = consulta[0];
    res.status(200).json({ num, soma, maior, media: Number(media) });
  } catch (error) {
    // retorna status de erro e msg
    res.status(400).json({ msg: error.message });
  }
});

// Soma dos preços, agrupados por ano
router.get("/dados/grafico", async (req, res) => {
  try {
    // obtém ano e soma do preco dos livros (com o nome total), agrupados por ano
    const totalPorAno = await dbKnex("livros")
      .select("ano")
      .sum({ total: "preco" })
      .groupBy("ano");
    // retorna status de erro e msg
    res.status(200).json(totalPorAno);
  } catch (error) {
    // retorna status de erro e msg
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;
