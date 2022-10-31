/*

- OBJETIVO: Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre a API e a model dos cursos
- AUTOR: Arthur Augusto da Silva Nunes
- DATA DE CRIAÇÃO: 06/10/2022
- VERSÃO: 1.0

*/

const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulos/config.js')

const novoCurso = async function(curso){
    
    if(curso.nome == ''|| curso.nome == undefined ||curso.carga_horaria == ''|| curso.carga_horaria == undefined ){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }

    const novoCurso = require('../model/DAO/curso.js')

    const result = await novoCurso.insertCurso(curso)

    if(result){
        return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
    } else{
        return {status: 500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
    }

}

const atualizarCurso = async function(curso){

    if(curso.id == '' || curso.id == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    } else if(curso.nome == ''|| curso.nome == undefined ||curso.carga_horaria == ''|| curso.carga_horaria == undefined ){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }

    const atualizarCurso = require('../model/DAO/curso.js')

    const verificar = await atualizarCurso.selectByIdCurso(curso.id)

    if(verificar){
        const result = await atualizarCurso.updateCurso(curso)

        if(result){
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
        } else{
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }

    else{
        return {status:400, message: MESSAGE_ERROR.NOT_FOUND_DB}
    }

}

const deletarCurso = async function(id){
    if(id == '' || id == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }

    const deletarCurso = require('../model/DAO/curso.js')
    const verificar = await deletarCurso.selectByIdCurso(id)

    if(verificar){
        const result = await deletarCurso.deleteCurso(id)

        if(result){
            return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM}
        } else{
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    } else{
        return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
    }
}

const listarCurso = async function(){
    const {selectAllCursos} = require('../model/DAO/curso.js')

    const dadosCursos = await selectAllCursos()
    let dadosCursosJSON = {}

    if(dadosCursos){
        dadosCursosJSON.cursos = dadosCursos
        return dadosCursosJSON
    } else{
        return false
    }
}

const buscarCursoId = async function(id){
    let dadosCursoJSON = {}

    if(id == '' || id == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }

    const {selectByIdCurso} = require('../model/DAO/curso.js')
    const dadosCurso = await selectByIdCurso(id)

    if(dadosCurso){
        dadosCursoJSON.cursos = dadosCurso

        return dadosCursoJSON
    } else{
        return false
    }
}

module.exports={
    novoCurso,
    atualizarCurso,
    deletarCurso,
    listarCurso,
    buscarCursoId
}