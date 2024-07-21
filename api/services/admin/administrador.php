<?php
// Se incluye la clase del modelo.
require_once('../../models/data/administrador-data.php');

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
            // Método para buscar datos en la tabla
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $administrador->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' coincidences';
                } else {
                    $result['error'] = 'There aren´t coincidences';
                }
                break;
            // Método para insertar un registro en la tabla
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
                } elseif ($_POST[POST_CLAVE] != $_POST[POST_CLAVE_CONFIRMAR]) {
                    $result['error'] = 'Different Passwords';
                } elseif ($administrador->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'The administrator was created succesfully';
                    $result['fileStatus'] = Validator::saveFile($_FILES[POST_IMAGEN], $administrador::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'An error ocurred while creating the administrator';
                }
                break;
            // Metodo para mostrar todos los registros de la tabla
            case 'readAll':
                if ($result['dataset'] = $administrador->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' registers';
                } else {
                    $result['error'] = 'There aren´t registered administrators';
                }
                break;
            // Metodo para leer un registro
            case 'readOne':
                if (!$administrador->setId($_POST[POST_ID])) {
                    $result['error'] = 'Invalid administrator';
                } elseif ($result['dataset'] = $administrador->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Non-existent administrator';
                }
                break;
            // Metodo para actualizar un registro
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
                } elseif ($administrador->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrator modificated succesfully';
                    $result['fileStatus'] = Validator::saveFile($_FILES[POST_IMAGEN], $administrador::RUTA_IMAGEN, $administrador->getFilename());
                } else {
                    $result['error'] = 'An error ocurred while editing the administrator';
                }
                break;
            // Metodo para borrar un registro
            case 'deleteRow':
                if ($_POST[POST_ID] == $_SESSION['idAdministrador']) {
                    $result['error'] = 'You can´t delete yourself';
                } elseif (!$administrador->setId($_POST[POST_ID])) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($administrador->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrator deleted succesfully';
                } else {
                    $result['error'] = 'An error ocurred while deleting the administrator';
                }
                break;
            // Metodo para obtener el usuario
            case 'getUser':
                if (isset($_SESSION['correoAdministrador'])) {
                    $result['status'] = 1;
                    $result['username'] = $_SESSION['correoAdministrador'];
                } else {
                    $result['error'] = 'Admin user undefined';
                }
                break;
            // Metodo para cerrar sesión
            case 'logOut':
                if (session_destroy()) {
                    $result['status'] = 1;
                    $result['message'] = 'Session deleted succesfully ';
                } else {
                    $result['error'] = 'An error ocurred while login out';
                }
                break;
            // Metodo para leer la informacion de perfil
            case 'readProfile':
                if ($result['dataset'] = $administrador->readProfile()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'An error ocurred while reading the profile';
                }
                break;
            // Metodo para editar la informacion del perfil
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
                    $result['message'] = 'Profile edited succesfully';
                    $result['fileStatus'] = Validator::saveFile($_FILES[POST_IMAGEN], $administrador::RUTA_IMAGEN, $administrador->getFilename());
                    $_SESSION['correoAdministrador'] = $_POST['correoAdministrador'];
                } else {
                    $result['error'] = 'An error ocurred while editing the profile';
                }
                break;
            // Metodo para cambiar la contraseña
            case 'changePassword':
                $_POST = Validator::validateForm($_POST);
                if (!$administrador->checkPassword($_POST[POST_CLAVE_ACTUAL])) {
                    $result['error'] = 'Current password invalid';
                } elseif ($_POST[POST_CLAVE_NUEVA] != $_POST[POST_CLAVE_CONFIRMAR]) {
                    $result['error'] = 'Confirmation of different passwords';
                } elseif (!$administrador->setClave($_POST[POST_CLAVE_NUEVA])) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($administrador->changePassword()) {
                    $result['status'] = 1;
                    $result['message'] = 'Password changed succesfully';
                } else {
                    $result['error'] = 'An error ocurred while changing the password';
                }
                break;
            default:
                $result['error'] = 'Action not available in the session';
        }
    } else {
        // Se compara la acción a realizar cuando el administrador no ha iniciado sesión.
        switch ($_GET['action']) {
            // Metodo para leer todos los administradores
            case 'readUsers':
                if ($administrador->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'You need to authenticate yourself to log in ';
                } else {
                    $result['error'] = 'You need to create an administrator to start';
                }
                break;
            // Metodo para iniciar sesión
            case 'logIn':
                $_POST = Validator::validateForm($_POST);
                if ($administrador->checkUser($_POST[POST_CORREO], $_POST[POST_CLAVE])) {
                    $result['status'] = 1;
                    $result['message'] = 'Correct authentication';
                } else {
                    $result['error'] = 'Wrong credentials';
                }
                break;
            // Metodo para obtener el total de administradores registrados
            case 'countAll':
                if ($administrador->countAll()['num_rows'] > "0") {
                    $result['status'] = 1;
                    $result['error'] = 'There isn´t an user in the database';
                }
                break;
            // Metodo para registrar un nuevo administrador (primer uso)
            case 'firstUsage':
                $_POST = Validator::validateForm($_POST);
                if ($administrador->countAll()['num_rows'] = "0") {
                    $result['error'] = 'There isn´t an user in the database';
                } elseif(
                    !$administrador->setNombre($_POST[POST_NOMBRE."FU"]) or
                    !$administrador->setApellido($_POST[POST_APELLIDO."FU"]) or
                    !$administrador->setCorreo($_POST[POST_CORREO."FU"]) or 
                    !$administrador->setClave($_POST[POST_CLAVE."FU"])
                ) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($_POST[POST_CLAVE."FU"] != $_POST[POST_CLAVE_CONFIRMAR."FU"]) {
                    $result['error'] = 'Differents Passwords';
                } elseif($administrador->firstUsage()){
                    $result['status'] = 1;
                    $result['message'] = 'Profile added succesfully';
                }
                break;
            default:
                $result['error'] = 'Action not available out of the session';
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