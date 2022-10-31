/* 

- OBJETIVO: Arquivo responsável pela manipulação de dados dos alunos com o Banco de Dados. Insert, Update, Delete e Select
- AUTOR: Arthur Augusto da Silva Nunes
- DATA DE CRIAÇÃO: 31/10/2022
- VERSÃO: 1.0

*/

const insertAlunoCurso = async function(alunoCurso){
    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()

    let sql = `insert into tbl_aluno_curso(id_aluno, id_curso)
    values('${alunoCurso.idAluno}', '${alunoCurso.idCurso}')`

    const result = await prisma.$queryRawUnsafe(sql)

    if(result){
        return true
    } else{
        return false
    }
}