const express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = 8080;

const empresa = require("./manipulaEmpresa")
const cidade = require("./manipulaCidade")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//ROTAS EMPRESAS

app.post('/empresa', (req, res) => {
  //CRIAR EMPRESA ATRAVES DO JSON
  //EX: {"nome": "cidade", "cnpj": 444}
  empresa.insert(req.body.nome , req.body.cnpj).then(aux => res.json(aux))
  
   
});

app.put('/empresa', (req, res) => {
  //ATUALIZAR EMPRESA PELO ID
  const empresaR = empresa.update(req.body.nome , req.body.cnpj, req.body.id).then(aux => res.json(aux))
});

app.delete('/empresa/:id', (req, res) => {
  //INFORMAR O ID DA EMPRESA A SER DELETADA
  const empresaR = empresa.deletar(req.params.id).then(aux => res.json(aux))
})

app.get('/empresa/cidades/:id', (req, res) => {
  //INFORMAR O ID DA EMPRESA PARA VER SUAS CIDADES
  const empresaR = empresa.cidadesDaEmpresa(req.params.id).then(aux => res.json(aux))
})

app.get('/empresa/sede/:id', (req, res) => {
  //INFORMAR O ID DA EMPRESA PARA VER SUA SEDE
  const empresaR = empresa.nomeDaSedeDaEmpresa(req.params.id).then(aux => res.json(aux))
})

//fim ROTAS EMPRESAS

//ROTAS CIDADES

app.post('/cidade', (req, res) => {
  //CRIAR CIDADE ATRAVES DO JSON
  //EX: {"nome": "cidade", "estado_id": 4, "area" : 200}
  const cidadeR = cidade.insert(req.body.nome , req.body.estado_id, req.body.area).then(aux => res.json(aux))
});

app.put('/cidade', (req, res) => {
  //ATUALIZAR CIDADE PELO ID
  const cidadeR = cidade.update(req.body.nome , req.body.estado_id, req.body.area, req.body.id).then(aux => res.json(aux))
});

app.delete('/cidade/:id', (req, res) => {
  //INFORMAR O ID DA CIDADE A SER DELETADA
  const cidadeR = cidade.deletar(req.params.id).then(aux => res.json(aux))
})

app.get('/cidade/prefeito/:id', (req, res) => {
  //INFORMAR O ID DA CIDADE PARA VER SEU PREFEITO
  const cidadeR = cidade.prefeitoDaCidade(req.params.id).then(aux => res.json(aux))
})

app.get('/cidade/siglaEstado/:id', (req, res) => {
  //INFORMAR O ID DA CIDADE PARA VER A SIGLA DO ESTADO
  const cidadeR = cidade.siglaDoEstado(req.params.id).then(aux => res.json(aux))
})

//fim ROTAS CIDADES

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));



//empresa.insert("teste",667)
//empresa.update("teste",6689,14)
//empresa.cidadesDaEmpresa(2);
//empresa.nomeDaSedeDaEmpresa(1);
//empresa.deletar(14);

//cidade.insert("minha cidade",4,200)
//cidade.update("teste",4,666,4)
//cidade.prefeitoDaCidade(2);
//cidade.siglaDoEstado(4);
//cidade.deletar(4);
