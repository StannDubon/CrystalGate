<?php
// Se incluye la clase del modelo.
require_once('../../models/data/tipo-administrador-data.php');

const POST_ID = "idTipoAdministrador";
const POST_TIPO = "tipoAdministrador";
const POST_ESTADO = "estadoTipoAdministrador";


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
    $TipoAdministrador = new TipoAdministradorData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $TipoAdministrador->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' coincidences';
                } else {
                    $result['error'] = 'There aren´t coincidences';
                } 
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$TipoAdministrador->setTipo($_POST[POST_TIPO]) or
                    !$TipoAdministrador->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $TipoAdministrador->getDataError();
                } elseif ($TipoAdministrador->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrator type created succesfully';
                } else {
                    $result['error'] = 'An error ocurred while creating the administrator type';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $TipoAdministrador->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' registers';
                } else {
                    $result['error'] = 'There aren´t administrator types registered';
                }
                break;
            case 'readOne':
                if (!$TipoAdministrador->setId($_POST[POST_ID])) {
                    $result['error'] = $TipoAdministrador->getDataError();
                } elseif ($result['dataset'] = $TipoAdministrador->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Non-existent administrator type';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$TipoAdministrador->setId($_POST[POST_ID]) or
                    !$TipoAdministrador->setTipo($_POST[POST_TIPO]) or
                    !$TipoAdministrador->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $TipoAdministrador->getDataError();
                } elseif ($TipoAdministrador->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrtaor type edited succesfully';
                    // Se asigna el estado del archivo después de actualizar.
                } else {
                    $result['error'] = 'An error ocurred while editing the administrator type';
                }
                break;
            case 'changeStatus':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$TipoAdministrador->setId($_POST[POST_ID])
                ) {
                    $result['error'] = $TipoAdministrador->getDataError();
                } elseif ($TipoAdministrador->changeStatus()) {
                    $result['status'] = 1;
                    $result['message'] = 'The status was updated successfully';
                    // Se asigna el estado del archivo después de actualizar.
                } else {
                    $result['error'] = 'An error ocurred while editing the administrator type';
                }
                break;
            case 'deleteRow':
                if (
                    !$TipoAdministrador->setId($_POST[POST_ID])
                ) {
                    $result['error'] = $TipoAdministrador->getDataError();
                } elseif ($TipoAdministrador->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrator type deleted succesfully';
                } else {
                    $result['error'] = 'An error ocurred while deleting the administrator type';
                }
                break;
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