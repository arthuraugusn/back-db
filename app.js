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
app.get('/v1/alunos', cors(), async function(request, response){
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

//End-Point para listar todos os cursos
app.get('/v1/cursos', cors(), async function(request, response){
    let statusCode
    let message

    const controllerCurso = require('./controller/controllerCurso.js')

    const dadosCursos = await controllerCurso.listarCurso()

    if(dadosCursos){
        statusCode = 200
        message = dadosCursos
    }else{
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    response.status(statusCode)
    response.json(message)
})

//End-Point para buscar aluno por id
app.get('/v1/aluno/:id', cors(), async function(request, response, next){
    let statusCode
    let message
    let id = request.params.id

    if(id != ''&& id != undefined){
        const controllerAluno = require('./controller/controllerAluno.js')

        const dadosAluno = await controllerAluno.buscarAlunoId(id)

        if(dadosAluno){
            statusCode = 200
            message = dadosAluno
        } else{
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    } else{
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    response.status(statusCode)
    response.json(message)
})

//End-Point de buscar curso por id
app.get('/v1/curso/:id', cors(), async function(request, response, next){
    let statusCode
    let message
    let id = request.params.id

    if(id != '' && id != undefined){
        const controllerCurso = require('./controller/controllerCurso.js')
        const dadosCurso = await controllerCurso.buscarCursoId(id)

        if(dadosCurso){
            statusCode = 200
            message = dadosCurso
        }else{
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }else{
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    response.status(statusCode)
    response.json(message)
})

//End-Point de atualizar um aluno 
app.put('/v1/aluno/:id', cors(), jsonParser, async function(request, response){
    let statusCode
    let message
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

            let id = request.params.id

            if(id != '' && id !=undefined){
                dadosBody.id = id

                //import do arquivo da controller de aluno
                const controllerAluno = require('./controller/controllerAluno.js')

                //chama a função novo aluno da controller e encaminha os dados do body
                const atualizaAluno =  await controllerAluno.atualizarAluno(dadosBody)

                statusCode = atualizaAluno.status
                message = atualizaAluno.message
            } else{
                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID
            }
        } else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    response.status(statusCode)
    response.json(message)
})

//End-Point de atualizar um curso
app.put('/v1/curso/:id', cors(), jsonParser, async function(request, response){
    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body

        if(JSON.stringify(dadosBody)!='{}'){
            let id = request.params.id

            if(id !=''&& id!=undefined){
                dadosBody.id =  id

                const controllerCurso = require('./controller/controllerCurso.js')
                const atualizaCurso = await controllerCurso.atualizarCurso(dadosBody)

                statusCode = atualizaCurso.status
                message = atualizaCurso.message
            }else{
                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID
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

//End-Point para deletar um aluno por id
app.delete('/v1/aluno/:id', cors(), jsonParser, async function(request, response, next){
    let statusCode
    let message
    let id = request.params.id

    if(id != '' && id !=undefined){
        const controllerAluno = require('./controller/controllerAluno.js')

        const deletarAluno = await controllerAluno.deletarAluno(id)
        
        statusCode = deletarAluno.status
        message = deletarAluno.message
    } else{
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }
    response.status(statusCode)
    response.json(message)
})

//End-Point para deleter um curso por id
app.delete('/v1/curso/:id', cors(), jsonParser, async function(request, response, next){
    let statusCode
    let message
    let id = request.params.id

    if(id!= ''&& id != undefined){
        const controllerCurso = require('./controller/controllerCurso.js')
        const deletarCurso = await controllerCurso.deletarCurso(id)

        statusCode = deletarCurso.status
        message = deletarCurso.message
    }else{
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }
    response.status(statusCode)
    response.json(message)
})

//End-Point para inserir um novo aluno
app.post('/v1/aluno', cors(), jsonParser, async function(request, response){
    let statusCode
    let message
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
            const newAluno =  await controllerAluno.novoAluno(dadosBody)

            if(newAluno == true){
                statusCode = newAluno.status
                message = newAluno.message
            }else{
                statusCode = 400
                message = newAluno
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

//End-Point para registrar um novo curso
app.post('/v1/curso', cors(), jsonParser, async function(request, response){
    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body

        if(JSON.stringify(dadosBody)!='{}'){
            const controllerCurso = require('./controller/controllerCurso.js')

            const novoCurso = await controllerCurso.novoCurso(dadosBody)

            if(novoCurso == true){
                statusCode = novoCurso.status
                message = novoCurso.message
            }else{
                statusCode = 400
                message = novoCurso
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