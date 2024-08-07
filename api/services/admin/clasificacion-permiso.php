<?php
// Se incluye la clase del modelo.
require_once('../../models/data/clasificacion-permiso-data.php');

const POST_ID = "idClasificacionPermiso";
const POST_CLASIFICACION = "clasificacionPermiso";
const POST_ESTADO = "estadoClasificacionPermiso";

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
    $ClasificacionPermiso = new ClasificacionPermisoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            // Caso para buscar registros.
            case 'searchRows':
                if($ClasificacionPermiso->validatePermissions('v')){
                    $result['error'] = 'No tiene permisos para leer los administradores';
                } elseif (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $ClasificacionPermiso->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' coincidences';
                } else {
                    $result['error'] = 'There aren´t coincidences';
                }
                break;
            // Caso para crear un nuevo registro.
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if($ClasificacionPermiso->validatePermissions('a')){
                    $result['error'] = 'No tiene permisos para leer los administradores';
                } elseif (
                    !$ClasificacionPermiso->setClasificacion($_POST[POST_CLASIFICACION]) or
                    !$ClasificacionPermiso->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $ClasificacionPermiso->getDataError();
                } elseif ($ClasificacionPermiso->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Permission classification created succesfully';
                } else {
                    $result['error'] = 'An error ocurred while creating the Permission classification';
                }
                break;
            // Caso para leer todos los registros.
            case 'readAll':
                if($ClasificacionPermiso->validatePermissions('v')){
                    $result['error'] = 'No tiene permisos para leer los administradores';
                } elseif ($result['dataset'] = $ClasificacionPermiso->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' registers';
                } else {
                    $result['error'] = 'There aren´t Permission classifications registered';
                }
                break;
            // Caso para leer un registro en particular.
            case 'readOne':
                if($ClasificacionPermiso->validatePermissions('v')){
                    $result['error'] = 'No tiene permisos para leer los administradores';
                } elseif (!$ClasificacionPermiso->setId($_POST[POST_ID])) {
                    $result['error'] = $ClasificacionPermiso->getDataError();
                } elseif ($result['dataset'] = $ClasificacionPermiso->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Non-existent Permission classification';
                }
                break;
            // Caso para actualizar un registro.
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if($ClasificacionPermiso->validatePermissions('u')){
                    $result['error'] = 'No tiene permisos para leer los administradores';
                } elseif (
                    !$ClasificacionPermiso->setId($_POST[POST_ID]) or
                    !$ClasificacionPermiso->setClasificacion($_POST[POST_CLASIFICACION]) or
                    !$ClasificacionPermiso->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $ClasificacionPermiso->getDataError();
                } elseif ($ClasificacionPermiso->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Permission classification edited succesfully';
                    // Se asigna el estado del archivo después de actualizar.
                } else {
                    $result['error'] = 'An error ocurred while editing the Permission classification';
                }
                break;
            // Caso para eliminar un registro.
            case 'deleteRow':
                if($ClasificacionPermiso->validatePermissions('d')){
                    $result['error'] = 'No tiene permisos para leer los administradores';
                } elseif (
                    !$ClasificacionPermiso->setId($_POST[POST_ID])
                ) {
                    $result['error'] = $ClasificacionPermiso->getDataError();
                } elseif ($ClasificacionPermiso->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Permission classification deleted succesfully';
                } else {
                    $result['error'] = 'An error ocurred while deleting the Permission classification';
                }
                break;
            // Caso para leer datos utilizables.
            case 'readUsableData':
                if($ClasificacionPermiso->validatePermissions('v')){
                    $result['error'] = 'No tiene permisos para leer los administradores';
                } elseif ($result['dataset'] = $ClasificacionPermiso->readUsableData()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' registers';
                } else {
                    $result['error'] = 'There aren´t Permission classifications registered';
                }
                break;
            // Caso para cambiar el estado de un registro.
            case 'changeStatus':
                $_POST = Validator::validateForm($_POST);
                if($ClasificacionPermiso->validatePermissions('u')){
                    $result['error'] = 'No tiene permisos para leer los administradores';
                } elseif (
                    !$ClasificacionPermiso->setId($_POST[POST_ID])
                ) {
                    $result['error'] = $ClasificacionPermiso->getDataError();
                } elseif ($ClasificacionPermiso->changeStatus()) {
                    $result['status'] = 1;
                    $result['message'] = 'The status was updated successfully';
                } else {
                    $result['error'] = 'An error ocurred while editing the type of petition';
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
