const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

const port = 3000;

// para reconhecer os dados recebidos como sendo um objeto no formato JSON
app.use(express.json());

// Arquivo com rotas para o cadastro de livros
const livros = require("./livros");

//Identificação da rota e da const (require) associada
app.use("/livros", livros);

app.get("/", (req, res) => {
  res.send("Olá... Bem vindo!");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
