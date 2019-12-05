const db = require("./conexao.js")

const insert = async (nome,cnpj) => {

  const verifica = "select * from empresas where cnpj = $1"
  var result = await db.query(verifica,[cnpj])
  if(result.rows.length > 0){
    console.log("ITEM JÁ EXISTENTE");
    return "ITEM JÁ EXISTENTE"
  }
  const query = "insert into empresas (nome,cnpj) values ($1,$2)"
  await db.query(query,[nome,cnpj])
  
  console.log("ITEM INSERIDO");
  return "ITEM INSERIDO"
}

const update = async (nome,cnpj,id) => {
 
  const verifica = "select * from empresas where id = $1"
  var result = await db.query(verifica,[id])
  if(!result.rows.length > 0){
    console.log("ITEM INEXISTENTE");
    return "ITEM JÁ INEXISTENTE"
  }
  const query = "update empresas set nome = $1, cnpj = $2 where id=$3"
  await db.query(query,[nome,cnpj,id])

  console.log("ITEM ATUALIZADO");
  return "ITEM ATUALIZADO"
}

const deletar = async (id) => {

  const verifica = "select * from empresas where id = $1"
  var result = await db.query(verifica,[id])
  if(!result.rows.length > 0){
    console.log("ITEM INEXISTENTE");
    return "ITEM JÁ INEXISTENTE"
  }
  const query = "delete from empresas where id=$1"
  await db.query(query,[id])

  console.log("ITEM DELETADO");
  return "ITEM DELETADO"
  
}

const cidadesDaEmpresa = async (idEmpresa) => {

  var result
  const query = "select cidades.nome from cidades inner join empresas_unidades on empresas_unidades.cidade_id = cidades.id inner join empresas on empresas.id = empresas_unidades.empresa_id where empresas.id = $1";
  result = await db.query(query,[idEmpresa])

  console.log("RESULTADO DA CONSULTA:");
  for(linha of result.rows){
    console.log(linha.nome);
    
  }
  return result.rows
  
}

const nomeDaSedeDaEmpresa = async (idEmpresa) => {

  var result
  const query = "select cidades.nome from cidades inner join empresas_unidades on empresas_unidades.cidade_id = cidades.id inner join empresas on empresas.id = empresas_unidades.empresa_id where empresas.id = $1 and empresas_unidades.sede = 1"
  result = await db.query(query,[idEmpresa])

  console.log("RESULTADO DA CONSULTA:");
  for(linha of result.rows){
    console.log(linha.nome);
    
  }
  return result.rows
}

module.exports = {
  insert,update,deletar,cidadesDaEmpresa,nomeDaSedeDaEmpresa
} 