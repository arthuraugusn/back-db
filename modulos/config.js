/*

- OBJETIVO: Arquivo responsável pela configuração de variáveis, constantes e mensagens do sistema
- AUTOR: Arthur Augusto da Silva Nunes
- DATA DE CRIAÇÃO: 13/10/2022
- VERSÃO: 1.0

*/

const MESSAGE_ERROR = {
    REQUIRED_FIELD:     'Existe(m) campo(s) obrigatório(s) que deve(m) ser preenchido(s)',
    INVALID_EMAIL:      'O e-mail informado não é válido',
    CONTENT_TYPE:       'O cabeçalho da requisição não possue um Content-Type válido',
    EMPTY_BODY:         'O Body da requisição deve haver um conteúdo',
    NOT_FOUND_DB:       'Não foram encontrados registros no Banco de Dados'
}

const MESSAGE_SUCCESS={
    INSERT_ITEM:        'Item criado com sucesso no Banco de Dados',
    UPDATE_ITEM:        'Item adicionado com sucesso no Banco de Dados'
}

module.exports={
    MESSAGE_ERROR
}