import './view/btnAjuda.js';
import './view/btnMudaLayout.js';
import './view/formularioCartao.js'
import './view/btnLogout.js';
import { sincronizar } from './view/btnSync.js';
import { getCartoes } from './view/mural.js';
import { salvarCartoesStore } from './storage/db.js';

window.addEventListener('online', () =>{
    sincronizar();
});

window.addEventListener('offline', () =>{
    const cartoesMural = getCartoes();
    if( cartoesMural.length > 0){
        salvarCartoesStore(cartoesMural);
    }
});

async function registrarServiceWorker(){
    if('serviceWorker' in navigator){
        const registro = await navigator.serviceWorker.register('/projeto/sw.js', {
            updateViaCache: 'none' //nao entrar em cache
        });

        console.log('Service worker registrado:', registro);
    }
}

registrarServiceWorker();
