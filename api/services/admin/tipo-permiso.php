<?php
// Se incluye la clase del modelo.
require_once('../../models/data/tipo-permiso-data.php');

const POST_ID = "idTipoPermiso";
const POST_CLASIFICACION = "idClasificacionPermiso";
const POST_TIPO = "tipoPermiso";
const POST_LAPSO = "lapsoPermiso";
const POST_ESTADO = "estadoTipoPermiso";

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
    $TipoPermiso = new TipoPermisoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'] )) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $TipoPermiso->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$TipoPermiso->setIdClasificacion($_POST[POST_CLASIFICACION]) or
                    !$TipoPermiso->setTipo($_POST[POST_TIPO]) or
                    !$TipoPermiso->setLapso($_POST[POST_LAPSO]) or
                    !$TipoPermiso->setEstado(isset($_POST[POST_ESTADO]) ? 1 : 0)
                ) {
                    $result['error'] = $TipoPermiso->getDataError();
                } elseif ($TipoPermiso->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Tipo de permiso creado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el tipo de permiso';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $TipoPermiso->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen tipos de permiso registrados';
                }
                break;
            case 'readOne':
                if (!$TipoPermiso->setId($_POST[POST_ID])) {
                    $result['error'] = $TipoPermiso->getDataError();
                } elseif ($result['dataset'] = $TipoPermiso->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Tipo de permiso inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$TipoPermiso->setId($_POST[POST_ID]) or
                    !$TipoPermiso->setIdClasificacion($_POST[POST_CLASIFICACION]) or
                    !$TipoPermiso->setTipo($_POST[POST_TIPO]) or
                    !$TipoPermiso->setLapso($_POST[POST_LAPSO]) or
                    !$TipoPermiso->setEstado(isset($_POST[POST_ESTADO]) ? 1 : 0)
                ) {
                    $result['error'] = $TipoPermiso->getDataError();
                } elseif ($TipoPermiso->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Tipo de permiso modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el tipo de permiso';
                }
                break;
            case 'deleteRow':
                if (
                    !$TipoPermiso->setId($_POST[POST_ID])
                ) {
                    $result['error'] = $TipoPermiso->getDataError();
                } elseif ($TipoPermiso->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Tipo de permiso eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el tipo de permiso';
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
?>
