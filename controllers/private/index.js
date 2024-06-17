const ADMIN_API = 'services/administradores.php';
const LOGIN_FORM = document.getElementById('loginForm');
const CORREO = document.getElementById('correo');
const CLAVE = document.getElementById('clave');
const BTN = document.getElementById('btnLogin');



BTN.addEventListener('click', async (event) =>{
    // Se evita recargar la página se recargue.
    event.preventDefault();
    const FORM = new FormData(LOGIN_FORM);
    const DATA = await fetchData(ADMIN_API,'logIn',FORM);
    if(DATA.status){
        sweetAlert(1, DATA.message, true, 'inbox.html');
    }
    else{
        sweetAlert(2, DATA.error, false);
    }
});


