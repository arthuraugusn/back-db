/*

- OBJETIVO: Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre a API e a model dos alunos
- AUTOR: Arthur Augusto da Silva Nunes
- DATA DE CRIAÇÃO: 06/10/2022
- VERSÃO: 1.0

*/
//Arquivo de mensagens padronizadas
const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulos/config.js')
const {listarCurso} = require('./controllerCurso.js')

//Função para gerar um novo registro de um novo aluno
const novoAluno = async function(aluno){

    //import da model de aluno
    const newAluno = require('../model/DAO/aluno.js')
    //import da model de aluno curso (tabela de relação) 
    const novoAlunoCurso = require('../model/DAO/aluno_curso.js')

    //verifica se algum dos atributos obrigatórios é vázio
    if (aluno.nome == '' || aluno.nome == undefined || aluno.foto == '' || aluno.foto == undefined || aluno.rg == '' || aluno.rg == undefined || aluno.cpf == '' || aluno.cpf == undefined || aluno.email == '' || aluno.email == undefined || aluno.data_nascimento == '' || aluno.data_nascimento == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }
    //validação para verificar email válido
    else if (!aluno.email.includes('@')) {
        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL}
    } else{
        //chama a função para inserir um novo aluno
        const resultNovoAluno = await newAluno.insertAluno(aluno)

        //Chama a função que verifica qual o id gerado para o novo aluno
        let idNovoAluno = await newAluno.selectLastId()

        //Verifica se os dados do novo aluno foi inserido no banco de dados
        if(resultNovoAluno){

            if(idNovoAluno>0){
                //JSON que vai definir o objeto do aluno do curso
                let alunoCurso = {}

                //Retorna o ano corrente
                const anoCorrente = new Date().getFullYear()

                //Cria o número de matricula (nossa maneira), usando do id do aluno, id do curso e o ano corrente da matrícula
                let numeroMatricula = `${idNovoAluno}${aluno.curso[0].id_curso}${anoCorrente}`

                //Cria objeto json com todas as chaves e valores
                alunoCurso.id_aluno = idNovoAluno
                alunoCurso.id_curso = aluno.curso[0].id_curso
                alunoCurso.matricula = numeroMatricula
                alunoCurso.status_aluno = `Cursando`

                const resultNovoAlunoCurso = await novoAlunoCurso.insertAlunoCurso(alunoCurso)

                if(resultNovoAlunoCurso){
                    return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
                }else{

                    //Caso algo de errado, ele obrigatoriamente vai deletar este "novo" registro
                    await deletarAluno(idNovoAluno)
                    return {status:500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
                }

            }else{
                await deletarAluno(idNovoAluno)
                return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }else{
            return {status:500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

//Função para atualizar o registro do aluno
const atualizarAluno = async function(aluno){

    //validação para o id como campo obrigatório
    if(aluno.id == '' || aluno.id == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }
    //verifica se algum dos atributos obrigatórios é vázio
    else if(aluno.nome == '' || aluno.nome == undefined || aluno.foto == '' || aluno.foto == undefined || aluno.rg == ''|| aluno.rg == undefined|| aluno.cpf == '' || aluno.cpf == undefined || aluno.email == '' || aluno.email == undefined || aluno.data_nascimento == '' || aluno.data_nascimento == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }

    //validação para verificar email válido
    else if(!aluno.email.includes('@')){
        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL}
    }

    const atualizarAluno = require('../model/DAO/aluno.js')
    const verificar = await atualizarAluno.selectByIdAluno(aluno.id)

    if(verificar){
        const result = await atualizarAluno.updateAluno(aluno)

        if(result){
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
        }else{
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
    
    else{
        return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
    }

}

//Função para excluir um registro de um aluno
const deletarAluno = async function(id){
    if (id == '' || id == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }

    const deletarAluno = require('../model/DAO/aluno.js')
    const verificar = await deletarAluno.selectByIdAluno(id)

    if (verificar) {
        
        const result = await deletarAluno.deleteAluno(id)
    
        if (result) {
            return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM}
        } else{
            return {message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500}
        }
    } else{
        return {message: MESSAGE_ERROR.NOT_FOUND_DB, status: 404} 
    }
}

//Função para retornar todos os registros
const listarAluno = async function(){
    let dadosAlunosJSON = {}
    /* let alunosCursoArray = [] */
    
    //import da model aluno_curso
    const{selectAllAlunos} = require('../model/DAO/aluno.js')
    const{selectAlunoCurso} = require('../model/DAO/aluno_curso.js')

    //busca todos os alunos
    const dadosAlunos = await selectAllAlunos()

    if(dadosAlunos){
        //Provisóriamente altera o id que se tornou um BigInt para um Int
        /* dadosAlunos.forEach(elemento=>{
            elemento.id = Number(elemento.id)
        }) */

        const alunosCursoArray = dadosAlunos.map(async itemAluno=>{

            //busca os dados refetentes ao curso do aluno
            const dadosAlunoCurso = await selectAlunoCurso(itemAluno.id)
            
            if(dadosAlunoCurso){
                //acrescenta uma chave curso e coloca os dados do curso do aluno
                itemAluno.curso = dadosAlunoCurso
            }else{
                itemAluno.curso = MESSAGE_ERROR.NOT_FOUND_COURSE
            }

            //Adiciona array contendo dados do aluno e seu curso
            return itemAluno
        })

        

        //transforma o array de dadosAlunos em JSON
        //dadosAlunosJSON.alunos = dadosAlunos.reverse() -> pode ser uma opção para reverter a lista
        dadosAlunosJSON.alunos = await Promise.all(alunosCursoArray)

        return dadosAlunosJSON
    }
    else
        return false
}

const buscarAlunoId = async function(id){
    let dadosAlunoJSON = {}

    if (id == '' || id == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }

    const {selectByIdAluno} = require('../model/DAO/aluno.js')
    const {selectAlunoCurso}= require('../model/DAO/aluno_curso.js')
    const dadosAluno = await selectByIdAluno(id)
    const dadosAlunoCurso = await selectAlunoCurso(id)

    if(dadosAluno){

        if(dadosAlunoCurso){
            dadosAlunoJSON.aluno = dadosAluno
            dadosAluno[0].curso = dadosAlunoCurso

            return dadosAlunoJSON   
        }else{
            dadosAlunoJSON.aluno = dadosAluno

            return dadosAlunoJSON
        }
    }else{
        return false
    }
}

module.exports={
    listarAluno,
    novoAluno,
    atualizarAluno,
    deletarAluno,
    buscarAlunoId
}