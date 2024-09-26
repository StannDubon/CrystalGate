// Constante para establecer la ruta de la api
const ADMIN_API = 'services/admin/administrador.php';
// Contantes para obtener los formularios de registro e inicio de sesión
const LOGIN_VALIDATOR_FORM = document.getElementById('loginValidatorForm');
const LOGIN_CONFIRM = document.getElementById('confirm_code');

const SIGNUP_FORM = document.getElementById('signupForm');
const CHANGE_PASSWORD = document.getElementById('change_password');

var token_2fa = '';
var token_passchange = '';

document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
    const DATA = await fetchData(USER_API, 'readUsers');
    if (DATA.session) {
        location.href = 'dashboard.html';
    } else if (DATA.status) {
        LOGIN_VALIDATOR_FORM.classList.remove('hide');
        sweetAlert(4, DATA.message, true);
    } else {
        SIGNUP_FORM.classList.remove('hide');
        sweetAlert(4, DATA.error, true);
    }
});

// Evento para cuando se envía el formulario de guardar
LOGIN_VALIDATOR_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(LOGIN_VALIDATOR_FORM);
    // Petición para iniciar sesión.
    const DATA = await fetchData(ADMIN_API, 'logInValidator', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true);
        if(DATA.dataset[0] == "authenticated"){
            window.location.href = "dashboard.html"
        } else if(DATA.dataset[0] == "passchange"){
            token_passchange = DATA.dataset[1];
            LOGIN_VALIDATOR_FORM.classList.add('hide');
            CHANGE_PASSWORD.classList.remove('hide');
        } else{
            token_2fa = DATA.dataset[1];
            LOGIN_VALIDATOR_FORM.classList.add('hide');
            LOGIN_CONFIRM.classList.remove('hide');
        }

    } else {
        sweetAlert(2, DATA.error, false);
    }
});

LOGIN_CONFIRM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(LOGIN_CONFIRM);
    FORM.append('token', token_2fa);
    // Petición para iniciar sesión.
    const DATA = await fetchData(ADMIN_API, 'logIn', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true);
        if(DATA.dataset[0] == "authenticated"){
            sweetAlert(1, DATA.message, true, 'dashboard.html');
        } else if(DATA.dataset[0] == "passchange"){
            token_passchange = DATA.dataset[1];
            LOGIN_CONFIRM.classList.add('hide');
            CHANGE_PASSWORD.classList.remove('hide');
        }

    } else {
        sweetAlert(2, DATA.error, false);
    }
});

CHANGE_PASSWORD.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(CHANGE_PASSWORD);
    FORM.append('token', token_passchange);
    // Petición para iniciar sesión.
    const DATA = await fetchData(ADMIN_API, 'passwordChanger', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true);
        if(DATA.dataset[0] == "authenticated"){
            sweetAlert(1, DATA.message, true, 'dashboard.html');
        } else{
            sweetAlert(1, DATA.error, true);
        }

    } else {
        sweetAlert(2, DATA.error, false);
    }
});

// Evento para cuando se envía el formulario de guardar
SIGNUP_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    const DATA = await fetchData(USER_API, 'countAll');
    // Se comprueba si hay ya un administrador registrado.
    if(DATA.status) {
        const RESPONSE = await confirmActionError('There is already a registered administrator', false);
        if(RESPONSE){
            location.reload();
        }
    } else {
        // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SIGNUP_FORM);

    // Petición para registrar el primer usuario del sitio privado.
    const DATA2 = await fetchData(USER_API, 'firstUsage', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA2.status) {
        sweetAlert(1, DATA2.message, true, 'index.html');
    } else {
        sweetAlert(2, DATA2.error, false);
    }
    }
    
});