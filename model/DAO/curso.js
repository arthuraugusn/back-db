/* 

- OBJETIVO: Arquivo responsável pela manipulação de dados do curso com o Banco de Dados. Insert, Update, Delete e Select
- AUTOR: Arthur Augusto da Silva Nunes
- DATA DE CRIAÇÃO: 06/10/2022
- VERSÃO: 1.0

*/

const insertCurso = async function(curso){
    try{
        const {PrismaClient} = require('@prisma/client')

        const prisma = new PrismaClient()

        let sql = `insert into tbl_curso(nome, icone, carga_horaria, sigla)
                                        values ('${curso.nome}', '${curso.icone}', '${curso.carga_horaria}', '${curso.sigla}')`

        const result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        } else{
            return false
        }
    }catch(error){
        return false
    }
}

const selectAllCursos = async function(){
    try{
        const {PrismaClient} = require('@prisma/client')

        const prisma = new PrismaClient()
    
        const rsCursos = await prisma.$queryRaw `select cast(id as float) as id, nome, icone, 
        carga_horaria, sigla from tbl_curso order by id desc`
    
        if(rsCursos.length >0)
            return rsCursos
        else
            return false
    }catch(error){
        return false
    }
}

const selectByIdCurso = async function(id){
    try{
        
        const {PrismaClient} = require('@prisma/client')

        const prisma  = new PrismaClient()

        let sql = `select cast(id as float) as id,
                     nome,
                     icone,
                     carga_horaria,
                     sigla from tbl_curso where id = ${id}`
                    
        const rsCurso = await prisma.$queryRawUnsafe(sql)

        if(rsCurso.length > 0){
            return rsCurso
        } else{
            return false
        }

    } catch(error){
        return false
    }
}

const updateCurso = async function(curso){
    try{

        const {PrismaClient} = require('@prisma/client')

        const prisma = new PrismaClient()

        let sql = `update tbl_curso set nome = '${curso.nome}', icone = '${curso.icone}',
                                        carga_horaria = '${curso.carga_horaria}', sigla = '${curso.sigla}'
                    where id = ${curso.id}`

        const result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        } else{
            return false
        }

    } catch(error){
        return false
    }
}

const deleteCurso = async function(id){

    try{
    
        const {PrismaClient} = require('@prisma/client')

        const prisma = new PrismaClient()

        let sql = `delete from tbl_curso where id = ${id}`

        const result = await prisma.$queryRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }

    } catch(error){
        return false
    }

}

module.exports={
    insertCurso,
    selectAllCursos,
    selectByIdCurso,
    updateCurso,
    deleteCurso
}