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
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$CentroEntrega->setCentro($_POST[POST_CENTRO]) or
                    !$CentroEntrega->setEstado(isset($_POST[POST_ESTADO]) ? 1 : 0)
                ) {
                    $result['error'] = $CentroEntrega->getDataError();
                } elseif ($CentroEntrega->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Centro de entrega creado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el centro de entrega';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $CentroEntrega->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen centros de entrega registrados';
                }
                break;
            case 'readOne':
                if (!$CentroEntrega->setId($_POST[POST_ID])) {
                    $result['error'] = $CentroEntrega->getDataError();
                } elseif ($result['dataset'] = $CentroEntrega->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Centros de entrega inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$CentroEntrega->setId($_POST[POST_ID]) or
                    !$CentroEntrega->setCentro($_POST[POST_CENTRO]) or
                    !$CentroEntrega->setEstado(isset($_POST[POST_ESTADO]) ? 1 : 0)
                ) {
                    $result['error'] = $CentroEntrega->getDataError();
                } elseif ($CentroEntrega->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Centro de entrega modificado correctamente';
                    // Se asigna el estado del archivo después de actualizar.
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el centro de entrega';
                }
                break;
            case 'deleteRow':
                if (
                    !$CentroEntrega->setId($_POST[POST_ID])
                ) {
                    $result['error'] = $CentroEntrega->getDataError();
                } elseif ($CentroEntrega->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Centro de entrega eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el centro de entrega';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
        // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
        $result['exception'] = Database::getException();
        // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
        header('Content-type: application/json; charset=utf-8');
        // Se imprime el resultado en formato JSON y se retorna al controlador.
        print(json_encode($result));
    } else {
        print(json_encode('Acceso denegado'));
    }
} else {
    print(json_encode('Recurso no disponible'));
}