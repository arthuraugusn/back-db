/* 

- OBJETIVO: Arquivo responsável pela manipulação de dados com o Banco de Dados. Insert, Update, Delete e Select
- AUTOR: Arthur Augusto da Silva Nunes
- DATA DE CRIAÇÃO: 06/10/2022
- VERSÃO: 1.0

*/

//Função para inserir um novo registro no BD
const insertAluno = async function(aluno){
    //import da classe prisma client que é responsável pelas interações com o BD
    const {PrismaClient} = require('@prisma/client')

    //instancia da classe PrismaClient
    const prisma = new PrismaClient()

    //variavel que armazenará o script do sql
    let sql = `insert into tbl_aluno (nome, foto, rg, cpf, email, data_nascimento, telefone, celular, sexo)
               values('${aluno.nome}', '${aluno.foto}', '${aluno.rg}', '${aluno.cpf}', '${aluno.email}',
               '${aluno.data_nascimento}', '${aluno.telefone}', '${aluno.celular}', '${aluno.sexo}')`
    
    //executa o script sql no banco de dados
    //OBS ($executeRawUnsafe) => permite encaminhar uma variável contendo o script
    const result = await prisma.$executeRawUnsafe(sql)

    //verifica se o script foi executado com sucesso no banco de dados
    if(result)
        return true
    else
        return false

}

//Função para atualizar um registro do BD
const updateAluno = async function(aluno){

}

//Função para deletar um registro do BD
const deleteAluno = async function(id){

}

//Função para selecionar todos os registros do BD
const selectAllAlunos = async function(){
    //import da classe prisma client que é responsável pelas interações com o BD
    const {PrismaClient} = require('@prisma/client')

    //instancia da classe PrismaClient
    const prisma = new PrismaClient()

    //criamos um objeto do tipo RecordSettings para receber os dados do BD
    //através do script sql 'select'
    const rsAlunos = await prisma.$queryRaw `select cast(id as float) as id, nome, foto, sexo,
    rg, cpf, email, telefone, celular from tbl_aluno order by id desc`

    if(rsAlunos.length >0)
        return rsAlunos
    else
        return false
}

module.exports={
    selectAllAlunos,
    insertAluno
}