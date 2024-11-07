<?php
// Se incluye la clase del modelo.
require_once('../../models/data/notificacion-data.php');

const POST_ID = "idNotificacion";
const POST_ADMINISTRADOR_ID = "idAdministrador";
const POST_PERMISO_ID = "idPermiso";
const POST_FECHA_ENVIO = "fechaEnvio";
const POST_DESCRIPCION = "descripcion";
const POST_TITLE = "title";
const POST_TOKEN = "token";

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
    $Notificacion = new NotificacionData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            // Caso para buscar registros.
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $Notificacion->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' coincidences';
                } else {
                    $result['error'] = 'There aren´t coincidences';
                }
                break;
            // Caso para crear un nuevo registro.
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$Notificacion->setIdAdministrador($_SESSION[POST_ADMINISTRADOR_ID]) or
                    !$Notificacion->setIdPermiso($_POST[POST_PERMISO_ID]) or
                    !$Notificacion->setFechaEnvio($_POST[POST_FECHA_ENVIO]) or
                    !$Notificacion->setDescripcion($_POST[POST_DESCRIPCION])
                ) {
                    $result['error'] = $Notificacion->getDataError();
                } elseif ($Notificacion->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Notification created succesfully';
                } else {
                    $result['error'] = 'An error ocurred while creating the notification';
                }
                break;
            // Caso para leer todos los registros.
            case 'readAll':
                if ($result['dataset'] = $Notificacion->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' registers';
                } else {
                    $result['error'] = 'There aren´t notifications registered';
                }
                break;
            // Caso para leer un registro en particular.
            case 'readOne':
                if (!$Notificacion->setId($_POST[POST_ID])) {
                    $result['error'] = $Notificacion->getDataError();
                } elseif ($result['dataset'] = $Notificacion->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Non-existent notification';
                }
                break;
            // Caso para leer permisos asociados a la notificación.
            case 'readPermission':
                if (!$Notificacion->setIdPermiso($_POST[POST_PERMISO_ID])) {
                    $result['error'] = $Notificacion->getDataError();
                } elseif ($result['dataset'] = $Notificacion->readPermission()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Non-existent notification';
                }
                break;
            // Caso para actualizar un registro.
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$Notificacion->setId($_POST[POST_ID]) or
                    !$Notificacion->setIdAdministrador($_SESSION[POST_ADMINISTRADOR_ID]) or
                    !$Notificacion->setIdPermiso($_POST[POST_PERMISO_ID]) or
                    !$Notificacion->setFechaEnvio($_POST[POST_FECHA_ENVIO]) or
                    !$Notificacion->setDescripcion($_POST[POST_DESCRIPCION])
                ) {
                    $result['error'] = $Notificacion->getDataError();
                } elseif ($Notificacion->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Notification edited succesfully';
                } else {
                    $result['error'] = 'An error ocurred while editing the notification';
                }
                break;
            // Caso para eliminar un registro.
            case 'deleteRow':
                if (!$Notificacion->setId($_POST[POST_ID])) {
                    $result['error'] = $Notificacion->getDataError();
                } elseif ($Notificacion->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Notification deleted succesfully';
                } else {
                    $result['error'] = 'An error ocurred while deleting the notification';
                }
                break;

            case 'sendNotification':
                if(
                    !$Notificacion->setTitle($_POST[POST_TITLE]) ||
                    !$Notificacion->setToken($_POST[POST_TOKEN]) ||
                    !$Notificacion->setDescripcion($_POST[POST_DESCRIPCION])  
                ){
                    $result['error'] = $Notificacion->getDataError();
                }
                else if ($Notificacion->sendNotification()){
                    $result['status'] = 1;
                    $result['message'] = "Notification sent succesfully";
                }
                else{
                    $result['error'] = "There was a problem while sending the notification";
                }
                break;
            // Caso predeterminado.
            default:
                $result['error'] = 'Action not available in the session';
        }
        // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
        $result['exception'] = Database::getException();
        // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
        header('Content-type: application/json; charset=utf-8');
        // Se imprime el resultado en formato JSON y se retorna al controlador.
        print(json_encode($result));
    } else {
        print(json_encode('Access denied'));
    }
} else {
    print(json_encode('Resource not available'));
}