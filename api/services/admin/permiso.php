<?php
// Se incluye la clase del modelo.
require_once('../../models/data/permiso-data.php');

const POST_ID = "idPermiso";
const POST_ID_USUARIO = "idUsuario";
const POST_ID_TIPO_PERMISO = "idTipoPermiso";
const POST_ID_CLASIFICACION = "idClasificacionPermiso";
const POST_ESTADO = "estado";
const POST_FECHA_INICIO = "fechaInicio";
const POST_FECHA_FINAL = "fechaFinal";
const POST_FECHA_ENVIO = "fechaEnvio";
const POST_DOCUMENTO = "documentoPermiso";
const POST_DESCRIPCION = "descripcionPermiso";


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
    $permiso = new PermisoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $permiso->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' coincidences';
                } else {
                    $result['error'] = 'There aren´t coincidences';
                }
                break;
            case 'searchCategoryRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif(!$permiso->setIdClasificacionPermiso($_POST[POST_ID_CLASIFICACION])){
                    $result['error'] = 'incorrect permission';
                } elseif ($result['dataset'] = $permiso->searchCategoryRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' coincidences';
                } else {
                    $result['error'] = 'There aren´t coincidences';
                }
                break;
            case 'searchSubCategoryRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif(!$permiso->setIdTipoPermiso($_POST[POST_ID_TIPO_PERMISO])){
                    $result['error'] = 'incorrect permission';
                } elseif ($result['dataset'] = $permiso->searchSubCategoryRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' coincidences';
                } else {
                    $result['error'] = 'There aren´t coincidences';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$permiso->setIdUsuario($_POST[POST_ID_USUARIO]) or
                    !$permiso->setIdTipoPermiso($_POST[POST_ID_TIPO_PERMISO]) or
                    !$permiso->setestado($_POST[POST_ESTADO]) or
                    !$permiso->setFechaInicio($_POST[POST_FECHA_INICIO]) or
                    !$permiso->setFechaFinal($_POST[POST_FECHA_FINAL]) or
                    !$permiso->setFechaEnvio($_POST[POST_FECHA_ENVIO]) or 
                    !$permiso->setDocumento($_FILES[POST_DOCUMENTO]) or
                    !$permiso->setDescripcion($_POST[POST_DESCRIPCION])
                ) {
                    $result['error'] = $permiso->getDataError();
                }else if ($permiso->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'permission created succesfully';
                    $result['fileStatus'] = Validator::saveFile($_FILES[POST_DOCUMENTO], $permiso::RUTA_DOCUMENTO);
                } else {
                    $result['error'] = 'An error ocurred while creating the permission';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $permiso->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' registers';
                } else {
                    $result['error'] = 'There aren´t permissions registered';
                }
                break;
                case 'readAllPendings':
                    if (!$permiso->setestado($_POST[POST_ESTADO])) {
                        $result['error'] = 'incorrect permission';
                    } elseif ($result['dataset'] = $permiso->readAllPendings()) {
                        $result['status'] = 1;
                    } else {
                        $result['error'] = 'non-existent pendings permissions';
                    }
                    break;
            case 'readCategory':
                if (!$permiso->setIdClasificacionPermiso($_POST[POST_ID_CLASIFICACION])) {
                    $result['error'] = 'incorrect permission';
                } elseif ($result['dataset'] = $permiso->readCategory()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'non-existent permission';
                }
                break;
            case 'readOne':
                if (!$permiso->setId($_POST[POST_ID])) {
                    $result['error'] = 'incorrect permission';
                } elseif ($result['dataset'] = $permiso->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'non-existent permission';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$permiso->setId($_POST[POST_ID]) or
                    !$permiso->setIdUsuario($_POST[POST_ID_USUARIO]) or
                    !$permiso->setIdTipoPermiso($_POST[POST_ID_TIPO_PERMISO]) or
                    !$permiso->setestado($_POST[POST_ESTADO]) or
                    !$permiso->setFechaInicio($_POST[POST_FECHA_INICIO]) or
                    !$permiso->setFechaFinal($_POST[POST_FECHA_FINAL]) or
                    !$permiso->setFechaEnvio($_POST[POST_FECHA_ENVIO]) or 
                    !$permiso->setDocumento($_FILES[POST_DOCUMENTO]) or
                    !$permiso->setDescripcion($_POST[POST_DESCRIPCION])
                ) {
                    $result['error'] = $permiso->getDataError();
                } elseif ($permiso->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'permission edited succesfully';
                    $result['fileStatus'] = Validator::saveFile($_FILES[POST_DOCUMENTO], $permiso::RUTA_DOCUMENTO);
                } else {
                    $result['error'] = 'An error ocurred while editing the permission';
                }
                break;
            case 'updateState':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$permiso->setId($_POST[POST_ID]) or
                    !$permiso->setestado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $permiso->getDataError();
                } elseif ($permiso->updateState()) {
                    $result['status'] = 1;
                    $result['message'] = 'permission edited succesfully';
                } else {
                    $result['error'] = 'An error ocurred while editing the permission';
                }
                break;
            case 'deleteRow':
                if (!$permiso->setId($_POST[POST_ID])) {
                    $result['error'] = $permiso->getDataError();
                } elseif ($permiso->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'permission deleted succesfully';
                } else {
                    $result['error'] = 'An error ocurred while deleting the permission';
                }
                break;
            case 'selectFilter':
                if (!$permiso->setIdTipoPermiso($_POST[POST_ID_TIPO_PERMISO])) {
                    $result['error'] = 'incorrect permission';
                } elseif ($result['dataset'] = $permiso->selectedFilter()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'non-existent permissions';
                }
                break;
            case 'readAllByStatus':
                if (!$permiso->setestado($_POST[POST_ESTADO])) {
                    $result['error'] = 'incorrect permission';
                } elseif ($result['dataset'] = $permiso->readAllByStatus()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'non-existent permission';
                }
                break;
            default:
                $result['error'] = 'Action not available in the session';
        }
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