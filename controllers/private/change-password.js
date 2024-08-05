const EMAIL_SENDER_FORM = document.getElementById('emailSender');
const EMAIL_VALIDATOR_FORM = document.getElementById('emailValidator');
const PASSWORD_CHANGER_FORM = document.getElementById('changePassword');

step = 0
token = null;

document.addEventListener('DOMContentLoaded', async () => {

});

EMAIL_SENDER_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(EMAIL_SENDER_FORM);
    // Petición para iniciar sesión.
    const DATA = await fetchData(USER_API, 'emailPasswordSender', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        token = DATA.dataset;
        verifyActive(1);
        sweetAlert(1, DATA.message, true);
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

EMAIL_VALIDATOR_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(EMAIL_VALIDATOR_FORM);
    FORM.append('token', token);
    // Petición para iniciar sesión.
    const DATA = await fetchData(USER_API, 'emailPasswordValidator', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        token = DATA.dataset;
        verifyActive(2);
        sweetAlert(1, DATA.message, true);
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

PASSWORD_CHANGER_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(PASSWORD_CHANGER_FORM);
    FORM.append('token', token);
    // Petición para iniciar sesión.
    const DATA = await fetchData(USER_API, 'changePasswordByEmail', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        verifyActive(2);
        sweetAlert(1, DATA.message, true, "index.html");
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

const verifyActive = async (step) => {
    const forms = [EMAIL_SENDER_FORM, EMAIL_VALIDATOR_FORM, PASSWORD_CHANGER_FORM];

    forms.forEach((form, index) => {
        if (index === step) {
            form.classList.add("show");
        } else {
            form.classList.remove("show");
        }
    });
};
