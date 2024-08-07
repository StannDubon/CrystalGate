<?php
// Se incluye la clase del modelo.
require_once('../../models/data/usuario-data.php');

const POST_ID = "idUsuario";
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
    
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();

    // Se instancia la clase correspondiente.
    $usuario = new UsuarioData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como Usuario, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idUsuario'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un Usuario ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readOne':
                if (!$usuario->setId($_SESSION['idUsuario'])) {
                    $result['error'] = 'Usuario incorrecto';
                } elseif ($result['dataset'] = $usuario->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Usuario inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$usuario->setId($_POST[POST_ID]) or
                    !$usuario->setNombre($_POST[POST_NOMBRE]) or
                    !$usuario->setApellido($_POST[POST_APELLIDO]) or
                    !$usuario->setCorreo($_POST[POST_CORREO]) or
                    !$usuario->setIdTipoAdmin($_POST[POST_ID_TIPO_ADMIN]) or 
                    !$usuario->setImagen($_FILES[POST_IMAGEN])
                ) {
                    $result['error'] = $usuario->getDataError();
                } elseif ($usuario->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Usuario modificado correctamente';
                    $result['fileStatus'] = Validator::saveFile($_FILES[POST_IMAGEN], $usuario::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el Usuario';
                }
                break;
            case 'getUser':
                if (isset($_SESSION['correoUsuario'])) {
                    $result['status'] = 1;
                    $result['username'] = $_SESSION['correoUsuario'];
                } else {
                    $result['error'] = 'Alias de Usuario indefinido';
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
                if ($result['dataset'] = $usuario->readProfile()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un problema al leer el perfil';
                }
                break;
            case 'editProfile':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$usuario->setNombre($_POST[POST_NOMBRE]) or
                    !$usuario->setApellido($_POST[POST_APELLIDO]) or
                    !$usuario->setCorreo($_POST[POST_CORREO]) or 
                    !$usuario->setImagen($_FILES[POST_IMAGEN])
                ) {
                    $result['error'] = $usuario->getDataError();
                } elseif ($usuario->editProfile()) {
                    $result['status'] = 1;
                    $result['message'] = 'Perfil modificado correctamente';
                    $result['fileStatus'] = Validator::saveFile($_FILES[POST_IMAGEN], $usuario::RUTA_IMAGEN);
                    $_SESSION['correoUsuario'] = $_POST['correoUsuario'];
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el perfil';
                }
                break;
            case 'changePassword':
                $_POST = Validator::validateForm($_POST);
                if (!$usuario->checkPassword($_POST[POST_CLAVE_ACTUAL])) {
                    $result['error'] = 'Contraseña actual incorrecta';
                } elseif ($_POST[POST_CLAVE_NUEVA] != $_POST[POST_CLAVE_CONFIRMAR]) {
                    $result['error'] = 'Confirmación de contraseña diferente';
                } elseif (!$usuario->setClave($_POST[POST_CLAVE_NUEVA])) {
                    $result['error'] = $Usuario->getDataError();
                } elseif ($usuario->changePassword()) {
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
        // Se compara la acción a realizar cuando el Usuario no ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readUsers':
                if ($usuario->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Debe autenticarse para ingresar';
                } else {
                    $result['error'] = 'Debe crear un Usuario para comenzar';
                }
                break;
            case 'logIn':
                $_POST = Validator::validateForm($_POST);
                if ($usuario->checkUser($_POST[POST_CORREO], $_POST[POST_CLAVE])) {
                    $result['status'] = 1;
                    $result['message'] = 'Autenticación correcta';
                } else {
                    $result['error'] = 'Credenciales incorrectas';
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