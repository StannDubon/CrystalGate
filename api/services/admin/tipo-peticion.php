<?php
// Se incluye la clase del modelo.
require_once('../../models/data/tipo-peticion-data.php');

const POST_ID = "idTipoPeticion";
const POST_TIPO = "tipoPeticion";
const POST_ESTADO = "estadoTipoPeticion";


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
    $TipoPeticion = new TipoPeticionData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $TipoPeticion->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' coincidences';
                } else {
                    $result['error'] = 'There aren´t coincidences';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$TipoPeticion->setTipo($_POST[POST_TIPO]) or
                    !$TipoPeticion->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $TipoPeticion->getDataError();
                } elseif ($TipoPeticion->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Petition type created succesfully';
                } else {
                    $result['error'] = 'An error ocurred while creating the petition type';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $TipoPeticion->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' registers';
                } else {
                    $result['error'] = 'There aren´t petition types registered';
                }
                break;
            case 'readOne':
                if (!$TipoPeticion->setId($_POST[POST_ID])) {
                    $result['error'] = $TipoPeticion->getDataError();
                } elseif ($result['dataset'] = $TipoPeticion->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Non-existent petition type';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$TipoPeticion->setId($_POST[POST_ID]) or
                    !$TipoPeticion->setTipo($_POST[POST_TIPO]) or
                    !$TipoPeticion->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $TipoPeticion->getDataError();
                } elseif ($TipoPeticion->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Petition type edited succesfully';
                    // Se asigna el estado del archivo después de actualizar.
                } else {
                    $result['error'] = 'An error ocurred while editing the petition type';
                }
                break;
            case 'deleteRow':
                if (
                    !$TipoPeticion->setId($_POST[POST_ID])
                ) {
                    $result['error'] = $TipoPeticion->getDataError();
                } elseif ($TipoPeticion->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Petition type deleted succesfully';
                } else {
                    $result['error'] = 'An error ocurred while deleting the petition type';
                }
                break;
            case 'changeStatus':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$TipoPeticion->setId($_POST[POST_ID])
                ) {
                    $result['error'] = $TipoPeticion->getDataError();
                } elseif ($TipoPeticion->changeStatus()) {
                    $result['status'] = 1;
                    $result['message'] = 'The status was updated successfully';
                    // Se asigna el estado del archivo después de actualizar.
                } else {
                    $result['error'] = 'An error ocurred while editing the petition type';
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