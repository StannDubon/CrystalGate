// Constante para establecer la ruta de la api
const ADMIN_API = 'services/admin/administrador.php';
// Contantes para obtener los formularios de registro e inicio de sesión
const SIGNUP_FORM = document.getElementById('signupForm');
const LOGIN_FORM = document.getElementById('loginForm');

const SIGNUP_VIEW = document.getElementById('SIGNUP_VIEW');
const LOGIN_VIEW = document.getElementById('LOGIN_VIEW');
// Evento que se ejecuta cuando el contenido del documento ha sido cargado
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
    const DATA = await fetchData(USER_API, 'readUsers');
    if (DATA.session) {
        location.href = 'dashboard.html';
    } else if (DATA.status) {
        LOGIN_VIEW.classList.remove('hide');
        sweetAlert(4, DATA.message, true);
    } else {
        SIGNUP_VIEW.classList.remove('hide');
        sweetAlert(4, DATA.error, true);
    }
});

// Evento para cuando se envía el formulario de guardar
LOGIN_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(LOGIN_FORM);
    // Petición para iniciar sesión.
    const DATA = await fetchData(ADMIN_API, 'logIn', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'dashboard.html');
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
        sweetAlert(2, 'There is already a registered administrator', false);
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