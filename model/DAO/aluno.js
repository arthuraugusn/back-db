/* 

- OBJETIVO: Arquivo responsável pela manipulação de dados dos alunos com o Banco de Dados. Insert, Update, Delete e Select
- AUTOR: Arthur Augusto da Silva Nunes
- DATA DE CRIAÇÃO: 06/10/2022
- VERSÃO: 1.0

*/

//Função para inserir um novo registro no BD
const insertAluno = async function(aluno){
    try{
        //import da classe prisma client que é responsável pelas interações com o BD
        const {PrismaClient} = require('@prisma/client')

        //instancia da classe PrismaClient
        const prisma = new PrismaClient()

        //variavel que armazenará o script do sql
        let sql = `insert into tbl_aluno(nome, foto, rg, cpf, email, data_nascimento, telefone, celular, sexo)
                        values('${aluno.nome}', '${aluno.foto}', '${aluno.rg}', '${aluno.cpf}', '${aluno.email}', '${aluno.data_nascimento}', '${aluno.telefone}', '${aluno.celular}', '${aluno.sexo}')`
        
        
        //executa o script sql no banco de dados
        //OBS ($executeRawUnsafe) => permite encaminhar uma variável contendo o script
        const result = await prisma.$executeRawUnsafe(sql)

        //verifica se o script foi executado com sucesso no banco de dados
        if(result)
            return true
        else
            return false   
    }catch(error){
        return false
    }
}

//Função para atualizar um registro do BD
const updateAluno = async function(aluno){
    try{
        //import da classe prisma client que é responsável pelas interações com o BD
        const {PrismaClient} = require('@prisma/client')

        //instancia da classe PrismaClient
        const prisma = new PrismaClient()

        //variavel que armazenará o script do sql
        let sql = `update tbl_aluno set nome = '${aluno.nome}', foto = '${aluno.foto}', rg = '${aluno.rg}', cpf = '${aluno.cpf}', email = '${aluno.email}', data_nascimento = '${aluno.data_nascimento}', telefone = '${aluno.telefone}', celular = '${aluno.celular}', sexo = '${aluno.sexo}'  where id = ${aluno.id}`
        
        //executa o script sql no banco de dados
        //OBS ($executeRawUnsafe) => permite encaminhar uma variável contendo o script
        const result = await prisma.$executeRawUnsafe(sql)

        //verifica se o script foi executado com sucesso no banco de dados
        if(result)
            return true
        else
            return false   
    }catch(error){
        return false
    }
}

//Função para deletar um registro do BD
const deleteAluno = async function(id){
    try{

        const { PrismaClient } = require('@prisma/client') //IMPORT DA CLASSE PrismaClient, que é responsavel pelas interacoes com o BD

        const prisma = new PrismaClient() //INSTANCIA DA CLASSE PrismaClient

        const sql = `delete from tbl_aluno where id = ${id}`

        //executa o script sql no banco de dados (.$executeRawUnsafe permite encaminhar uma variavel contendo o script)
        const result = await prisma.$executeRawUnsafe (sql)
        
        //verifica se o script foi executado com sucesso no BD
        if(result){
            return true
        }else{
            return false
        }

    } catch (error){
        return false
    }
}

//Função para selecionar todos os registros do BD
const selectAllAlunos = async function(){
    try{
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
    }catch(error){
        return false
    }
}

const selectByIdAluno = async function(id){
    const { PrismaClient } = require('@prisma/client') //IMPORT DA CLASSE PrismaClient, que é responsavel pelas interacoes com o BD

    const prisma = new PrismaClient() //INSTANCIA DA CLASSE PrismaClient
                                                        //order by para ordenar de acordo com crescente e drecrescente (nome, id, etc)
                                                        const sql = `select cast(id as float) as id, 
                                                        nome, 
                                                        foto, 
                                                        sexo, 
                                                        rg, 
                                                        cpf, 
                                                        email, 
                                                        telefone, 
                                                        celular, 
                                                        data_nascimento 
                                                        from tbl_aluno where id = ${id} `

    const rsAluno = await prisma.$queryRawUnsafe(sql) //Cria um objeto do tipo RecordSet (rsAlunos) para receber os dados do BD
                                                                    //as é para trocar a coluna do ID
    if(rsAluno.length > 0){
        return rsAluno
    }
    else{
        return false
    }
}

module.exports={
    selectAllAlunos,
    insertAluno,
    updateAluno,
    deleteAluno,
    selectByIdAluno
}