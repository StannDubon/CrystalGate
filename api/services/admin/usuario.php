<?php
// Se incluye la clase del modelo.
require_once('../../models/data/usuario-data.php');

const POST_ID = "idUsuario";
const POST_ID_CARGO = "idCargo";
const POST_NOMBRE = "nombreUsuario";
const POST_APELLIDO = "apellidoUsuario";
const POST_CORREO = "correoUsuario";
const POST_CLAVE = "claveUsuario";
const POST_IMAGEN = "imagenUsuario";

// Variables para acciones con contraseaña
const POST_CLAVE_ACTUAL = "claveActual";
const POST_CLAVE_NUEVA = "claveNueva";
const POST_CLAVE_CONFIRMAR = "confirmarClave";

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
    $usuario = new UsuarioData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un usuario ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $usuario->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' coincidences';
                } else {
                    $result['error'] = 'There aren´t coincidences';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$usuario->setNombre($_POST[POST_NOMBRE]) or
                    !$usuario->setIdCargo($_POST[POST_ID_CARGO]) or
                    !$usuario->setApellido($_POST[POST_APELLIDO]) or
                    !$usuario->setCorreo($_POST[POST_CORREO]) or
                    !$usuario->setClave($_POST[POST_CLAVE]) or 
                    !$usuario->setImagen($_FILES[POST_IMAGEN])
                ) {
                    $result['error'] = $usuario->getDataError();
                } elseif ($_POST[POST_CLAVE] != $_POST[POST_CLAVE_CONFIRMAR]) {
                    $result['error'] = 'Different Passwords';
                } elseif ($usuario->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'User created succesfully';
                    $result['fileStatus'] = Validator::saveFile($_FILES[POST_IMAGEN], $usuario::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'An error ocurred while creating the user';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $usuario->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' registers';
                } else {
                    $result['error'] = 'There aren´t users registered';
                }
                break;
            case 'readOne':
                if (!$usuario->setId($_POST[POST_ID])) {
                    $result['error'] = 'Incorrect User';
                } elseif ($result['dataset'] = $usuario->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Non-existent user';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$usuario->setId($_POST[POST_ID]) or
                    !$usuario->setNombre($_POST[POST_NOMBRE]) or
                    !$usuario->setApellido($_POST[POST_APELLIDO]) or
                    !$usuario->setCorreo($_POST[POST_CORREO]) or
                    !$usuario->setIdCargo($_POST[POST_ID_CARGO]) or 
                    !$usuario->setImagen($_FILES[POST_IMAGEN])
                ) {
                    $result['error'] = $usuario->getDataError();
                } elseif ($usuario->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'User modified succesfully';
                    $result['fileStatus'] = Validator::saveFile($_FILES[POST_IMAGEN], $usuario::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'An error ocurred while editing the user';
                }
                break;
            case 'deleteRow':
                if (!$usuario->setId($_POST[POST_ID])) {
                    $result['error'] = $usuario->getDataError();
                } elseif ($usuario->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'User deleted succesfully';
                } else {
                    $result['error'] = 'An error ocurred while deleting the user';
                }
                break;
            case 'changePassword':
                $_POST = Validator::validateForm($_POST);
                if (!$usuario->checkPassword($_POST[POST_CLAVE_ACTUAL])) {
                    $result['error'] = 'Actual password incorrect';
                } elseif ($_POST[POST_CLAVE_NUEVA] != $_POST[POST_CLAVE_CONFIRMAR]) {
                    $result['error'] = 'Confirmation of different password';
                } elseif (!$usuario->setClave($_POST[POST_CLAVE_NUEVA])) {
                    $result['error'] = $usuario->getDataError();
                } elseif ($usuario->changePassword()) {
                    $result['status'] = 1;
                    $result['message'] = 'Password changed succesfully';
                } else {
                    $result['error'] = 'An error ocurred while editing the password';
                }
                break;
            default:
                $result['error'] = 'Action not available in the session';
        }
    } 
    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Resource not available'));
}