const divMsg = document.createElement('div');
divMsg.classList.add('formNovoCartao-msg');
divMsg.addEventListener('animationend', () => divMsg.remove());

/**
 * @param {string} msg
 * @return {void} 
 */

export function notificar(msg){
    divMsg.textContent = msg;
    document.body.append(divMsg);
}