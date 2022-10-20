/*

- OBJETIVO: Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre a API e a model
- AUTOR: Arthur Augusto da Silva Nunes
- DATA DE CRIAÇÃO: 06/10/2022
- VERSÃO: 1.0

*/
//Arquivo de mensagens padronizadas
const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulos/config.js')

//Função para gerar um novo registro de um novo aluno
const novoAluno = async function(aluno){

    //verifica se algum dos atributos obrigatórios é vázio
    if(aluno.nome == '' || aluno.nome == undefined || aluno.foto == '' || aluno.foto == undefined || aluno.rg == ''|| aluno.rg == undefined
       || aluno.cpf == '' || aluno.cpf == undefined || aluno.email == '' || aluno.email == undefined || aluno.data_nascimento == '' 
       || aluno.data_nascimento == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELD}

    //validação para verificar email válido
    else if(!aluno.email.includes('@'))
        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL}
    else{
        //import da model de aluno
        const novoAluno = require('../model/DAO/aluno.js')

        //chama a função para inserir um novo aluno
        const result = await novoAluno.insertAluno(aluno)

        if(result)
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
        else
            return {status:500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
    }
}

//Função para atualizar o registro do aluno
const atualizarAluno = async function(aluno){

    //validação para o id como campo obrigatório
    if(aluno.id == '' || aluno.id == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }
    //verifica se algum dos atributos obrigatórios é vázio
    else if(aluno.nome == '' || aluno.nome == undefined || aluno.foto == '' || aluno.foto == undefined || aluno.rg == ''|| aluno.rg == undefined
       || aluno.cpf == '' || aluno.cpf == undefined || aluno.email == '' || aluno.email == undefined || aluno.data_nascimento == '' 
       || aluno.data_nascimento == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELD}

    //validação para verificar email válido
    else if(!aluno.email.includes('@'))
        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL}
    else{
        //import da model de aluno
        const attAluno = require('../model/DAO/aluno.js')

        //chama a função para atualizar um novo aluno
        const result = await attAluno.updateAluno(aluno)

        if(result)
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
        else
            return {status:500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
    }
}

//Função para excluir um registro de um aluno
const deletarAluno = async function(id){
    
}

//Função para retornar todos os registros
const listarAluno = async function(){
    const{selectAllAlunos} = require('../model/DAO/aluno.js')

    const dadosAlunos = await selectAllAlunos()
    let dadosAlunosJSON = {}

    if(dadosAlunos){
        //Provisóriamente altera o id que se tornou um BigInt para um Int
        /* dadosAlunos.forEach(elemento=>{
            elemento.id = Number(elemento.id)
        }) */

        //transforma o array de dadosAlunos em JSON
        //dadosAlunosJSON.alunos = dadosAlunos.reverse() -> pode ser uma opção para reverter a lista
        dadosAlunosJSON.alunos = dadosAlunos
        return dadosAlunosJSON
    }
    else
        return false
}

module.exports={
    listarAluno,
    novoAluno,
    atualizarAluno
}