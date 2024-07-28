<?php
// Se incluye la clase del modelo.
require_once('../../models/data/administrador-data.php');
require_once('../../helpers/email.php');

const POST_ID = "idAdministrador";
const POST_ID_TIPO_ADMIN = "idTipoAdministrador";
const POST_NOMBRE = "nombreAdministrador";
const POST_APELLIDO = "apellidoAdministrador";
const POST_CORREO = "correoAdministrador";
const POST_CLAVE = "claveAdministrador";
const POST_IMAGEN = "imagenAdministrador";

// Variables para acciones con contraseaña
const POST_CLAVE_ACTUAL = "claveActual";
const POST_CLAVE_NUEVA = "claveNueva";
const POST_CLAVE_CONFIRMAR = "confirmarClave";

const POST_CODIGO_SECRETO_CONTRASEÑA = "codigoSecretoContraseña";

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {

    // Se establecen los parametros para la sesion
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'domain' => '',
        'secure' => true,
        'httponly' => true,
        'samesite' => 'None'
    ]);
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();

    // Se instancia la clase correspondiente.
    $administrador = new AdministradorData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if($administrador->validatePermissions('v')){
                    $result['error'] = 'No tiene permisos para leer los administradores';
                } elseif (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $administrador->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$administrador->setNombre($_POST[POST_NOMBRE]) or
                    !$administrador->setIdTipoAdmin($_POST[POST_ID_TIPO_ADMIN]) or
                    !$administrador->setApellido($_POST[POST_APELLIDO]) or
                    !$administrador->setCorreo($_POST[POST_CORREO]) or
                    !$administrador->setClave($_POST[POST_CLAVE]) or
                    !$administrador->setImagen($_FILES[POST_IMAGEN])
                ) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($administrador->validatePermissions('a')) {
                    $result['error'] = 'No tiene permisos para añadir un administrador';
                } elseif ($_POST[POST_CLAVE] != $_POST[POST_CLAVE_CONFIRMAR]) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($administrador->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrador creado correctamente';
                    $result['fileStatus'] = Validator::saveFile($_FILES[POST_IMAGEN], $administrador::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el administrador';
                }
                break;
            case 'readAll':
                if ($administrador->validatePermissions('v')) {
                    $result['error'] = 'No tiene permisos para leer los administradores';
                } elseif ($result['dataset'] = $administrador->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen administradores registrados';
                }
                break;
            case 'readOne':
                if ($administrador->validatePermissions('v')) {
                    $result['error'] = 'No tiene permisos para leer los administradores';
                } elseif (!$administrador->setId($_POST[POST_ID])) {
                    $result['error'] = 'Administrador incorrecto';
                } elseif ($result['dataset'] = $administrador->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Administrador inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$administrador->setId($_POST[POST_ID]) or
                    !$administrador->setFilename() or
                    !$administrador->setNombre($_POST[POST_NOMBRE]) or
                    !$administrador->setApellido($_POST[POST_APELLIDO]) or
                    !$administrador->setCorreo($_POST[POST_CORREO]) or
                    !$administrador->setIdTipoAdmin($_POST[POST_ID_TIPO_ADMIN]) or
                    !$administrador->setImagen($_FILES[POST_IMAGEN], $administrador->getFilename())
                ) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($administrador->validatePermissions('u')) {
                    $result['error'] = 'No tiene permisos para poder eliminar el usuario';
                } elseif ($administrador->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrador modificado correctamente';
                    $result['fileStatus'] = Validator::saveFile($_FILES[POST_IMAGEN], $administrador::RUTA_IMAGEN, $administrador->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el administrador';
                }
                break;
            case 'deleteRow':
                if ($_POST[POST_ID] == $_SESSION['idAdministrador'] ) {
                    $result['error'] = 'No se puede eliminar a sí mismo';
                } elseif (!$administrador->setId($_POST[POST_ID])) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($administrador->validatePermissions('d')) {
                    $result['error'] = 'No tiene permisos para poder eliminar el usuario';
                } elseif ($administrador->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrador eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el administrador';
                }
                break;
            case 'getUser':
                if (isset($_SESSION['correoAdministrador'])) {
                    $result['status'] = 1;
                    $result['username'] = $_SESSION['correoAdministrador'];
                } else {
                    $result['error'] = 'Alias de administrador indefinido';
                }
                break;
            case 'logOut':
                if (session_destroy()) {
                    $result['status'] = 1;
                    $result['message'] = 'Sesión eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cerrar la sesión';
                }
                break;
            case 'readProfile':
                if ($result['dataset'] = $administrador->readProfile()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un problema al leer el perfil';
                }
                break;
            case 'editProfile':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$administrador->setNombre($_POST[POST_NOMBRE]) or
                    !$administrador->setSessionFilename() or
                    !$administrador->setApellido($_POST[POST_APELLIDO]) or
                    !$administrador->setCorreo($_POST[POST_CORREO]) or
                    !$administrador->setImagen($_FILES[POST_IMAGEN], $administrador->getFilename())
                ) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($administrador->editProfile()) {
                    $result['status'] = 1;
                    $result['message'] = 'Perfil modificado correctamente';
                    $result['fileStatus'] = Validator::saveFile($_FILES[POST_IMAGEN], $administrador::RUTA_IMAGEN, $administrador->getFilename());
                    $_SESSION['correoAdministrador'] = $_POST['correoAdministrador'];
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el perfil';
                }
                break;
            case 'changePassword':
                $_POST = Validator::validateForm($_POST);
                if (!$administrador->checkPassword($_POST[POST_CLAVE_ACTUAL])) {
                    $result['error'] = 'Contraseña actual incorrecta';
                } elseif ($_POST[POST_CLAVE_NUEVA] != $_POST[POST_CLAVE_CONFIRMAR]) {
                    $result['error'] = 'Confirmación de contraseña diferente';
                } elseif (!$administrador->setClave($_POST[POST_CLAVE_NUEVA])) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($administrador->changePassword()) {
                    $result['status'] = 1;
                    $result['message'] = 'Contraseña cambiada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cambiar la contraseña';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        // Se compara la acción a realizar cuando el administrador no ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readUsers':
                if ($administrador->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Debe autenticarse para ingresar';
                } else {
                    $result['error'] = 'Debe crear un administrador para comenzar';
                }
                break;
            case 'logIn':
                $_POST = Validator::validateForm($_POST);
                if ($administrador->checkUser($_POST[POST_CORREO], $_POST[POST_CLAVE])) {
                    $result['status'] = 1;
                    $result['message'] = 'Autenticación correcta';
                } else {
                    $result['error'] = 'Credenciales incorrectas';
                }
                break;
            case 'emailPasswordSender':
                $_POST = Validator::validateForm($_POST);

                if (!$administrador->setCorreo($_POST[POST_CORREO])) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($administrador->verifyExistingEmail()) {

                    $secret_change_password_code = mt_rand(10000000, 99999999);
                    $token = Validator::generateRandomString(64);
                    $_SESSION['secret_change_password_code'] = [
                        'code' => $secret_change_password_code,
                        'token' => $token,
                        'expiration_time' => time() + (60 * 15) # (x*y) y=minutos de vida 
                    ];

                    sendVerificationEmail($_POST[POST_CORREO], $secret_change_password_code);
                    $result['status'] = 1;
                    $result['message'] = 'Correo enviado';
                    $result['dataset'] = $token;
                } else {
                    $result['error'] = 'El correo indicado no existe';
                }
                break;
            case 'emailPasswordValidator':
                $_POST = Validator::validateForm($_POST);
            
                if (!isset($_POST[POST_CODIGO_SECRETO_CONTRASEÑA])) {
                    $result['error'] = "El código no fue proporcionado";
                } elseif (!isset($_POST["token"])) {
                    $result['error'] = 'El token no fue proporcionado';
                } elseif (!(ctype_digit($_POST[POST_CODIGO_SECRETO_CONTRASEÑA]) && strlen($_POST[POST_CODIGO_SECRETO_CONTRASEÑA]) === 8)) {
                    $result['error'] = "El código es inválido";
                } elseif (!isset($_SESSION['secret_change_password_code'])) {
                    $result['message'] = "El código ha expirado";
                } elseif ($_SESSION['secret_change_password_code']['token'] != $_POST["token"]) {
                    $result['error'] = 'El token es invalido';
                } elseif ($_SESSION['secret_change_password_code']['expiration_time'] <= time()) {
                    $result['message'] = "El código ha expirado.";
                    unset($_SESSION['secret_change_password_code']);
                } elseif ($_SESSION['secret_change_password_code']['code'] == $_POST[POST_CODIGO_SECRETO_CONTRASEÑA]) {
                    $token = Validator::generateRandomString(64);
                    $_SESSION['secret_change_password_code_validated'] = [
                        'token' => $token,
                        'expiration_time' => time() + (60 * 10) # (x*y) y=minutos de vida 
                    ];
                    $result['status'] = 1;
                    $result['message'] = "Verificación Correcta";
                    $result['dataset'] = $token;
                    unset($_SESSION['secret_change_password_code']);
                } else {
                    $result['error'] = "El código es incorrecto";
                }
                break;
            case 'changePasswordByEmail':
                $_POST = Validator::validateForm($_POST);
                if (!$administrador->setClave($_POST[POST_CLAVE_NUEVA]) or
                    !$administrador->setCorreo($_POST[POST_CORREO])) {
                    $result['error'] = $administrador->getDataError();
                } elseif (!isset($_POST["token"])) {
                    $result['error'] = 'El token no fue proporcionado';
                } elseif ($_SESSION['secret_change_password_code_validated']['expiration_time'] <= time()) {
                    $result['error'] = 'El tiempo para cambiar su contraseña ha expirado';
                } elseif ($_SESSION['secret_change_password_code_validated']['token'] != $_POST["token"]) {
                    $result['error'] = 'El token es invalido';
                } elseif ($_POST[POST_CLAVE_NUEVA] != $_POST[POST_CLAVE_CONFIRMAR]) {
                    $result['error'] = 'Confirmación de contraseña diferente';
                } elseif (!$administrador->setClave($_POST[POST_CLAVE_NUEVA])) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($administrador->changePasswordFromEmail()) {
                    $result['status'] = 1;
                    $result['message'] = 'Contraseña cambiada correctamente';
                    unset($_SESSION['secret_change_password_code_validated']);
                } else {
                    $result['error'] = 'Ocurrió un problema al cambiar la contraseña';
                }
                break;
            case 'firstUsage':
                $_POST = Validator::validateForm($_POST);
                if ($administrador->countAll()['num_rows'] !== "0") {
                    $result['error'] = 'Ya hay un usuario en la base';
                } elseif (
                    !$administrador->setNombre($_POST[POST_NOMBRE . "FU"]) or
                    !$administrador->setApellido($_POST[POST_APELLIDO . "FU"]) or
                    !$administrador->setCorreo($_POST[POST_CORREO . "FU"]) or
                    !$administrador->setClave($_POST[POST_CLAVE . "FU"])
                ) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($_POST[POST_CLAVE . "FU"] != $_POST[POST_CLAVE_CONFIRMAR . "FU"]) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($administrador->firstUsage()) {
                    $result['status'] = 1;
                    $result['message'] = 'Perfil añadido correctamente';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible fuera de la sesión';
        }
    }
    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
