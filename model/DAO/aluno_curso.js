/* 

- OBJETIVO: Arquivo responsável pela manipulação de dados dos alunos com o Banco de Dados. Insert, Update, Delete e Select
- AUTOR: Arthur Augusto da Silva Nunes
- DATA DE CRIAÇÃO: 31/10/2022
- VERSÃO: 1.0

*/

const insertAlunoCurso = async function(alunoCurso){
    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()

    let sql = `insert into tbl_aluno_curso(id_aluno, id_curso, matricula, status_aluno)
                values(${alunoCurso.id_aluno}, ${alunoCurso.id_curso}, '${alunoCurso.matricula}', '${alunoCurso.status_aluno}')`


    const result = await prisma.$queryRawUnsafe(sql)

    if(result){
        return true
    } else{
        return false
    }
}

const selectAlunoCurso = async function(idAluno){
    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()

    let sql = `select cast(tbl_curso.id as float) as id_curso , tbl_curso.id as id_curso, tbl_curso.nome as nome_curso, tbl_curso.carga_horaria, tbl_curso.sigla as sigla_curso,
                tbl_aluno_curso.status_aluno, tbl_aluno_curso.matricula  

                from tbl_aluno
                    inner join tbl_aluno_curso
                        on tbl_aluno.id = tbl_aluno_curso.id_aluno
                    inner join tbl_curso
                        on tbl_curso.id = tbl_aluno_curso.id_curso
                        
                        where tbl_aluno.id = ${idAluno}`

                    
    const rsAlunosCurso = await prisma.$queryRawUnsafe(sql)

    if(rsAlunosCurso.length > 0){
        return rsAlunosCurso
    }else{
        return false
    }
}

module.exports={
    insertAlunoCurso,
    selectAlunoCurso
}