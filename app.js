/* 
- OBJETIVO: API responsável pela manipulação de dados do Back-End
            /GET, POST, PUT, DELETE
- AUTOR: Arthur Augusto da Silva Nunes
- DATA DE CRIAÇÃO: 10/10/2022
- VERSÃO: 1.0
- ANOTAÇÕES: npm install prisma --save
             npx prisma
             npx prisma init
             npm install @prisma/client
             npx prisma migrate dev
*/

//Import das bibliotecas
const express = require('express')

const bodyParser = require('body-parser')

const cors = require('cors')
//Arquivo de mensagens padronizadas
const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('./modulos/config.js')

const { header } = require('express/lib/request')

const app = express()

//Configuração de cors para liberar o acesso a API
app.use((request, response, next)=>{
    response.header('Acess-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
    app.use(cors())
    next()
})

//Criamos um objeto que permite receber um JSON no body nas requisições
const jsonParser = bodyParser.json()

/*
- Rotas para CRUD (Create, Read, Update, Delete) de alunos
- DATA: 10/10/2022\
*/

//End-Point para listar todos os alunos
app.get('/alunos', cors(), async function(request, response){
    let statusCode
    let message

    //Import do arquivo controllerAluno
    const controllerAluno = require('./controller/controllerAluno.js')

    //Retorna todos os alunos existentes no BD
    const dadosAlunos =  await controllerAluno.listarAluno()

    //Valida se existe retorno de dados
    if(dadosAlunos){
        //Status 200
        statusCode = 200
        message =  dadosAlunos
    }else{
        //Status 404
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    //Retorna os dados da API
    response.status(statusCode)
    response.json(message)
})

//End-Point para inserir um novo aluno
app.post('/aluno', cors(), jsonParser, async function(request, response){
    let statusCode
    let message
    
    //
    let headerContentType


    //content-type = traz o formato dos dados da requisição
    //mostra o tipo de content-type enviado pelo header da requisição
    headerContentType = request.headers['content-type']

    //valida se o content-type é do tipo application/json
    if(headerContentType == 'application/json'){

        //recebe o corpo/conteúdo da mensagem
        let dadosBody = request.body

        //realiza o processo de conversão de dados para
        //conseguir comparar o json vazio
        if(JSON.stringify(dadosBody)!='{}'){

            //import do arquivo da controller de aluno
            const controllerAluno = require('./controller/controllerAluno.js')

            //chama a função novo aluno da controller e encaminha os dados do body
            const novoAluno =  await controllerAluno.novoAluno(dadosBody)

            if(novoAluno == true){
                statusCode = 201
                message = MESSAGE_SUCCESS.INSERT_ITEM               
            }else{
                statusCode = 400
                message = novoAluno
            }

        }else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }

    }else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    response.status(statusCode)
    response.json(message)
})

//Ativa o servidor para receber requisições HTTP
app.listen(8080, function(){
    console.log('Waiting')
})