import usuarioLogado from "../storage/loginUsuario.js";

const CEEP_API_URL = 'http://wd47-ceep.herokuapp.com';

/**
 * Retorna a lista de instruções de ajuda cadastradas no back-end da aplicação
 * @returns {Promisse<Array>}
 */

export async function getInstrucoes(){
    const resposta = await fetch('http://wd47-ceep.herokuapp.com/get-instrucoes.php');
    const dadosCarregados = await resposta.json();
    const mensagens = dadosCarregados.instrucoes;

    return mensagens;
}

/**
 * Salva a lista de cartões passada nos servidor da aplicação
 * @param {*} listaDeCartoes Array contendo as informações de cada cartão
 * @return {Promisse<string>}
 */
export async function salvarCartoesServidor(listaDeCartoes) {
    const infoUsuario = {
        usuario: usuarioLogado,
        cartoes: listaDeCartoes
    }

        const resp = await fetch(CEEP_API_URL + '/salvar-cartoes.php',{
           method: 'POST',
           headers: {
               'Content-type' : 'application/json'
           },
           body: JSON.stringify(infoUsuario)
        });

        const dadosRetornados = await resp.json();
        if(dadosRetornados.quantidade == 1){
            return 'Cartão salvo com sucesso';
        }else {
            return dadosRetornados.quantidade + ' cartões salvos com sucesso!';
        }
    
}
/**
 * Retorna lista de cartões salvos no back-end
 * @return {Promisses<Array>}
 */
export async function getCartoesServidor(){
    let usuario = usuarioLogado;
    const resposta = await fetch(CEEP_API_URL + '/get-cartoes.php?usuario=' + usuario);
    const dadosCartoes = await resposta.json();

/* ?? => Null Coaslescing Operator*/
    return dadosCartoes.cartoes ?? [];
}