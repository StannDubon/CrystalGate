<?php
// Se incluye la clase del modelo.
require_once('../../models/data/permiso-automatico-data.php');

const POST_ID = "idPermisoAutomatico";
const POST_PERMISO_ID = "idPermiso";
const POST_HORA_ENVIO = "horaEnvio";
const POST_ESTADO = "estadoPermisoAutomatico";

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
    $PermisoAutomatico = new PermisoAutomaticoData;
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
                } elseif ($result['dataset'] = $PermisoAutomatico->searchRows()) {
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
                    !$PermisoAutomatico->setidPermiso($_POST[POST_PERMISO_ID]) or
                    !$PermisoAutomatico->setHoraEnvio($_POST[POST_HORA_ENVIO]) or
                    !$PermisoAutomatico->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $PermisoAutomatico->getDataError();
                } elseif ($PermisoAutomatico->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Automatic permission created successfully';
                } else {
                    $result['error'] = 'An error occurred while creating the automatic permission';
                }
                break;
            // Caso para leer todos los registros.
            case 'readAll':
                if ($result['dataset'] = $PermisoAutomatico->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' registers';
                } else {
                    $result['error'] = 'There aren´t automatic permissions registered';
                }
                break;
            // Caso para leer un registro en particular.
            case 'readOne':
                if (!$PermisoAutomatico->setId($_POST[POST_ID])) {
                    $result['error'] = $PermisoAutomatico->getDataError();
                } elseif ($result['dataset'] = $PermisoAutomatico->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Non-existent automatic permissions';
                }
                break;
            // Caso para actualizar un registro.
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$PermisoAutomatico->setId($_POST[POST_ID]) or
                    !$PermisoAutomatico->setidPermiso($_POST[POST_PERMISO_ID]) or
                    !$PermisoAutomatico->setHoraEnvio($_POST[POST_HORA_ENVIO]) or
                    !$PermisoAutomatico->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $PermisoAutomatico->getDataError();
                } elseif ($PermisoAutomatico->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Automatic permission edited successfully';
                } else {
                    $result['error'] = 'An error occurred while editing the automatic permission';
                }
                break;
            // Caso para eliminar un registro.
            case 'deleteRow':
                if (!$PermisoAutomatico->setId($_POST[POST_ID])) {
                    $result['error'] = $PermisoAutomatico->getDataError();
                } elseif ($PermisoAutomatico->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Automatic permission deleted successfully';
                } else {
                    $result['error'] = 'An error occurred while deleting the automatic permission';
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