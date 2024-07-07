const ADMIN_API = 'services/admin/administrador.php';

const EMAIL_SENDER_FORM = document.getElementById('emailSender');
const EMAIL_VALIDATOR_FORM = document.getElementById('emailValidator');
const PASSWORD_CHANGER_FORM = document.getElementById('changePassword');

document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
    const DATA = await fetchData(USER_API, 'readUsers');
    if (DATA.session) {
        location.href = 'dashboard.html';
    } else if (DATA.status) {
        LOGIN_FORM.classList.remove('hide');
        sweetAlert(4, DATA.message, true);
    } else {
        SIGNUP_FORM.classList.remove('hide');
        sweetAlert(4, DATA.error, true);
    }
});