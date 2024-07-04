//Constantes para establecer los elementos donde se mostrará la información del perfil
const IMAGEN_ADMIN = document.getElementById('imagenAdmin'),
    NAME_ADMIN = document.getElementById('nameAdmin'),
    TIPO_ADMIN = document.getElementById('tipoAdmin'),
    CORREO_ADMIN = document.getElementById('correoAdmin');
// Constantes para establecer los elementos del formulario de editar perfil.
const PROFILE_FORM = document.getElementById('save-form-edit-info'),
    MODAL_TITLE_PROFILE = document.getElementById('modal-title-edit-info'),
    MODAL_TITLE_PASSWORD = document.getElementById('modal-title-password'),
    MODAL_NOMBRE_ADMINISTRADOR = document.getElementById('modalNombreAdministrador'),
    MODAL_APELLIDO_ADMINISTRADOR = document.getElementById('modalApellidoAdministrador'),
    MODAL_CORREO_ADMINISTRADOR = document.getElementById('modalCorreoAdministrador'),
    MODAL_IMAGEN_ADMINISTRADOR = document.getElementById('modalImagenAdministrador');
// Constante para establecer la modal de cambiar contraseña.
const PASSWORD_MODAL = document.getElementById('modal-password'),
    PROFILE_MODAL = document.getElementById('modal-edit-info');
// Constante para establecer el formulario de cambiar contraseña.
const PASSWORD_FORM = document.getElementById('save-form-password');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
// Petición para obtener los datos del usuario que ha iniciado sesión.
    fillDataProfile();
    setupModalDiscardButtons();
});

fillDataProfile = async() => {
// Petición para obtener los datos del usuario que ha iniciado sesión.
const DATA = await fetchData(USER_API, 'readProfile');
// Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
if (DATA.status) {

    // Se inicializan los campos del formulario con los datos del usuario que ha iniciado sesión.
    const ROW = DATA.dataset;
    IMAGEN_ADMIN.src = SERVER_URL +'/images/admin/' + ROW.imagen;
    NAME_ADMIN.textContent = ROW.nombre + ' ' +ROW.apellido;
    CORREO_ADMIN.textContent = ROW.correo;
    TIPO_ADMIN.textContent = ROW.tipo_administrador;
} else {
    sweetAlert(2, DATA.error, null);
}
}

closeModal = () =>{
    if(PROFILE_MODAL.classList.contains('show') ){
        PROFILE_MODAL.classList.remove('show');
    }else if(PASSWORD_MODAL.classList.contains('show')){
        PASSWORD_MODAL.classList.remove('show');
    }
}

// Método del evento para cuando se envía el formulario de editar perfil.
PROFILE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(PROFILE_FORM);
    // Petición para actualizar los datos personales del usuario.
    const DATA = await fetchData(USER_API, 'editProfile', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true);
        closeModal();
        fillDataProfile();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

// Mètodo del evento para cuando se envía el formulario de cambiar contraseña.
PASSWORD_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(PASSWORD_FORM);
    // Petición para actualizar la constraseña.
    const DATA = await fetchData(USER_API, 'changePassword', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        closeModal();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
    } else {
        sweetAlert(2, DATA.error, false);
    }
});
//Funcion para copiar el email del administrador
copyEmail = () => {

    // Se obtieneel textContent
    var texto = CORREO_ADMIN.textContent;
    
    // Se crea un elemento temporal de tipo textarea
    var tempTextarea = document.createElement('textarea');
    tempTextarea.value = texto;
    
    // Se añade el textarea temporal al documento
    document.body.appendChild(tempTextarea);
    
    // Selecciona el contenido del textarea
    tempTextarea.select();
    tempTextarea.setSelectionRange(0, 99999); // Para móviles
    
    // Copia el contenido al portapapeles
    document.execCommand('copy');
    
    // Elimina el textarea temporal
    document.body.removeChild(tempTextarea);
    
    // Muestra una alerta o un mensaje de éxito
    sweetAlert(1, 'Email copied to the clipboard', null);
}
/*
*   Función para preparar el formulario al momento de editar el perfil.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openProfile = async() => {

    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(USER_API, 'readProfile');

    PROFILE_MODAL.classList.add('show');
        MODAL_TITLE_PROFILE.textContent = 'Update profile info';
        // Se prepara el formulario.
        PROFILE_FORM.reset();
        const ROW = DATA.dataset;

        MODAL_NOMBRE_ADMINISTRADOR.value = ROW.nombre;
        MODAL_APELLIDO_ADMINISTRADOR.value = ROW.apellido;
        MODAL_CORREO_ADMINISTRADOR.value = ROW.correo;
}
/*
*   Función para preparar el formulario al momento de cambiar la constraseña.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openPassword = () => {
    // Se abre la caja de diálogo que contiene el formulario.
    PASSWORD_MODAL.classList.add('show');
    // Se restauran los elementos del formulario.

    MODAL_TITLE_PASSWORD.textContent = 'Change password';
    PASSWORD_FORM.reset();
}