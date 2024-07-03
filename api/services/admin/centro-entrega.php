<?php
// Se incluye la clase del modelo.
require_once('../../models/data/centro-entrega-data.php');

const POST_ID = "idCentroEntrega";
const POST_CENTRO = "centroEntrega";
const POST_ESTADO = "estadoCentroEntrega";


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
    $CentroEntrega = new CentroEntregaData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $CentroEntrega->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'There aren´t coincidences';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$CentroEntrega->setCentro($_POST[POST_CENTRO]) or
                    !$CentroEntrega->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $CentroEntrega->getDataError();
                } elseif ($CentroEntrega->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Place of pick up added succesfully';
                } else {
                    $result['error'] = 'An error ocurred while creating the pick up place';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $CentroEntrega->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' registers';
                } else {
                    $result['error'] = 'There aren´t places of pick up';
                }
                break;
            case 'readOne':
                if (!$CentroEntrega->setId($_POST[POST_ID])) {
                    $result['error'] = $CentroEntrega->getDataError();
                } elseif ($result['dataset'] = $CentroEntrega->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Pick up place non-existed';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$CentroEntrega->setId($_POST[POST_ID]) or
                    !$CentroEntrega->setCentro($_POST[POST_CENTRO]) or
                    !$CentroEntrega->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $CentroEntrega->getDataError();
                } elseif ($CentroEntrega->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Pick up place edited succesfully';
                    // Se asigna el estado del archivo después de actualizar.
                } else {
                    $result['error'] = 'An error ocurred while editing the pick up place';
                }
                break;
            case 'deleteRow':
                if (
                    !$CentroEntrega->setId($_POST[POST_ID])
                ) {
                    $result['error'] = $CentroEntrega->getDataError();
                } elseif ($CentroEntrega->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Pick up place deleted succesfully';
                } else {
                    $result['error'] = 'An error ocurred while deleting the pick up place';
                }
                break;
            case 'changeStatus':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$CentroEntrega->setId($_POST[POST_ID])
                ) {
                    $result['error'] = $CentroEntrega->getDataError();
                } elseif ($CentroEntrega->changeStatus()) {
                    $result['status'] = 1;
                    $result['message'] = 'The status was updated successfully';
                    // Se asigna el estado del archivo después de actualizar.
                } else {
                    $result['error'] = 'An error ocurred while editing the type of petition';
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
    print(json_encode('Source not available'));
}