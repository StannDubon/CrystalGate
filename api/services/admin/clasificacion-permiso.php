<?php
// Se incluye la clase del modelo.
require_once('../../models/data/clasificacion-permiso-data.php');

const POST_ID = "idClasificacionPermiso";
const POST_CLASIFICACION = "clasificacionPermiso";
const POST_ESTADO = "estadoClasificacionPermiso";


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
    $ClasificacionPermiso = new ClasificacionPermisoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $ClasificacionPermiso->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$ClasificacionPermiso->setClasificacion($_POST[POST_CLASIFICACION]) or
                    !$ClasificacionPermiso->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $ClasificacionPermiso->getDataError();
                } elseif ($ClasificacionPermiso->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Idioma creado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el idioma';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $ClasificacionPermiso->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen idiomas registrados';
                }
                break;
            case 'readOne':
                if (!$ClasificacionPermiso->setId($_POST[POST_ID])) {
                    $result['error'] = $ClasificacionPermiso->getDataError();
                } elseif ($result['dataset'] = $ClasificacionPermiso->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Idioma inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$ClasificacionPermiso->setId($_POST[POST_ID]) or
                    !$ClasificacionPermiso->setClasificacion($_POST[POST_CLASIFICACION]) or
                    !$ClasificacionPermiso->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $ClasificacionPermiso->getDataError();
                } elseif ($ClasificacionPermiso->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Idioma modificado correctamente';
                    // Se asigna el estado del archivo después de actualizar.
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el idioma';
                }
                break;
            case 'deleteRow':
                if (
                    !$ClasificacionPermiso->setId($_POST[POST_ID])
                ) {
                    $result['error'] = $ClasificacionPermiso->getDataError();
                } elseif ($ClasificacionPermiso->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Idioma eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el idioma';
                }
                break;
            case 'readUsableData':
                if ($result['dataset'] = $ClasificacionPermiso->readUsableData()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen idiomas registrados';
                }
                break;
            case 'changeStatus':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$ClasificacionPermiso->setId($_POST[POST_ID])
                ) {
                    $result['error'] = $ClasificacionPermiso->getDataError();
                } elseif ($ClasificacionPermiso->changeStatus()) {
                    $result['status'] = 1;
                    $result['message'] = 'The status was updated successfully';
                    // Se asigna el estado del archivo después de actualizar.
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el tipo de peticion';
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