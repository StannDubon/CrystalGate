<?php
// Se incluye la clase del modelo.
require_once('../../models/data/GestorNotificacion-data.php');

const POST_ID = "idGestor";
const POST_ID_USUARIO = "idUsuario";
const POST_TOKEN = "token";
const POST_ESTADO = "estado";

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se establecen los parámetros para la sesión.
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
    $GestorNotificacion = new GestorNotificacionData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
    if($_SESSION['idAdministrador']){
        switch ($_GET['action']) {
            // Caso para leer todos los registros del usuario.
            case 'readAllByUser':
                if(
                    !$GestorNotificacion->setIdUsuario($_POST[POST_ID_USUARIO])
                ){
                    $result['error'] = $GestorNotificacion->getDataError();
                }
                if ($result['dataset'] = $GestorNotificacion->readAllByUser()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' registers';
                } else {
                    $result['error'] = 'There aren´t registered managers';
                }
                break;
            // Caso para leer un registro en particular.
            case 'readOne':
                if (!$GestorNotificacion->setToken($_POST[POST_TOKEN])) {
                    $result['error'] = $GestorNotificacion->getDataError();
                } elseif ($result['dataset'] = $GestorNotificacion->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Non-existent manager';
                }
                break;
            // Caso para eliminar un registro.
            case 'deleteRow':
                if (
                    !$GestorNotificacion->setToken($_POST[POST_TOKEN])
                ) {
                    $result['error'] = $GestorNotificacion->getDataError();
                } elseif ($GestorNotificacion->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Token deleted succesfully';
                } else {
                    $result['error'] = 'An error ocurred while deleting the language';
                }
                break;
            // Caso predeterminado.
            default:
                $result['error'] = 'Action not available in the session';
        }
    }
    else{
        print('Access denied');
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
