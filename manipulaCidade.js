const db = require("./conexao.js")

const insert = async (nome,estado_id,area) => {

  const query = "insert into cidades (nome,estado_id,area) values ($1,$2,$3)"
  await db.query(query,[nome,estado_id,area])

  console.log("ITEM INSERIDO");
  return "ITEM INSERIDO"
}

const update = async (nome,estado_id,area,id) => {

  const verifica = "select * from cidades where id = $1"
  var result = await db.query(verifica,[id])
  if(!result.rows.length > 0){
    console.log("ITEM INEXISTENTE");
    return "ITEM INEXISTENTE"
  }
  const query = "update cidades set nome = $1, estado_id = $2, area = $3 where id=$4"
  await db.query(query,[nome,estado_id,area,id])

  console.log("ITEM ATUALIZADO");
  return "ITEM ATUALIZADO"
}

const deletar = async (id) => {

  const verifica = "select * from cidades where id = $1"
  var result = await db.query(verifica,[id])
  if(!result.rows.length > 0){
    console.log("ITEM INEXISTENTE");
    return "ITEM INEXISTENTE"
  }
  const query = "delete from cidades where id=$1"
  await db.query(query,[id])

  console.log("ITEM DELETADO");
  return "ITEM DELETADO"
  
}

const prefeitoDaCidade = async (idCidade) => {

  var result
  const query = "select prefeitos.nome from prefeitos inner join cidades on cidades.id = prefeitos.cidade_id where cidades.id = $1";
  result = await db.query(query,[idCidade])

  console.log("RESULTADO DA CONSULTA:");
  for(linha of result.rows){
    console.log(linha.nome);
    
  }
  return result.rows
  
}

const siglaDoEstado = async (idCidade) => {

  var result
  const query = "select estados.sigla from estados inner join cidades on cidades.estado_id = estados.id where cidades.id = $1"
  result = await db.query(query,[idCidade])

  console.log("RESULTADO DA CONSULTA:");
  for(linha of result.rows){
    console.log(linha.sigla);
    
  }
  return result.rows
}

module.exports = {
  insert,update,deletar,prefeitoDaCidade,siglaDoEstado
} 