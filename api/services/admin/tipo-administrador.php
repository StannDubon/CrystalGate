<?php
// Se incluye la clase del modelo.
require_once('../../models/data/tipo-administrador-data.php');

// Constantes para los nombres de los campos POST.
const POST_ID = "idTipoAdministrador";
const POST_TIPO = "tipoAdministrador";
const POST_ESTADO = "estadoTipoAdministrador";

$permisos = [
    'permisos',
    'documentacion',
    'empleados_view',
    'empleados_update',
    'empleados_delete',
    'empleados_add',
    'administradores_view',
    'administradores_update',
    'administradores_delete',
    'administradores_add',
    'autorizaciones_view',
    'autorizaciones_update',
    'autorizaciones_delete',
    'autorizaciones_add',
    'tipo_administrador_view',
    'tipo_administrador_update',
    'tipo_administrador_delete',
    'tipo_administrador_add'
];

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
    $TipoAdministrador = new TipoAdministradorData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            // Caso para buscar registros.
            case 'searchRows':
                if($TipoAdministrador->validatePermissions('v')){
                    $result['error'] = 'No tiene permisos para leer los tipos de administrador';
                } elseif (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $TipoAdministrador->searchRows()) {
                    // Si hay coincidencias, se establece el estado y el mensaje.
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' coincidences';
                } else {
                    $result['error'] = 'There aren´t coincidences';
                } 
                break;
            // Caso para crear un nuevo registro.
            case 'createRow':
                $_POST = Validator::validateForm($_POST);

                if($TipoAdministrador->validatePermissions('a')){
                    $result['error'] = 'No tiene permisos para agregar un tipo administrador';
                } elseif (
                    !$TipoAdministrador->setTipo($_POST[POST_TIPO]) or
                    !$TipoAdministrador->setEstado($_POST[POST_ESTADO]) or
                    
                    !$TipoAdministrador->setPermisos($_POST[$permisos[0]]) or
                    !$TipoAdministrador->setDocumentacion($_POST[$permisos[1]]) or
                    !$TipoAdministrador->setEmpleadosView($_POST[$permisos[2]]) or
                    !$TipoAdministrador->setEmpleadosUpdate($_POST[$permisos[3]]) or
                    !$TipoAdministrador->setEmpleadosDelete($_POST[$permisos[4]]) or
                    !$TipoAdministrador->setEmpleadosAdd($_POST[$permisos[5]]) or
                    !$TipoAdministrador->setAdministradoresView($_POST[$permisos[6]]) or
                    !$TipoAdministrador->setAdministradoresUpdate($_POST[$permisos[7]]) or
                    !$TipoAdministrador->setAdministradoresDelete($_POST[$permisos[8]]) or
                    !$TipoAdministrador->setAdministradoresAdd($_POST[$permisos[9]]) or
                    !$TipoAdministrador->setAutorizacionesView($_POST[$permisos[10]]) or
                    !$TipoAdministrador->setAutorizacionesUpdate($_POST[$permisos[11]]) or
                    !$TipoAdministrador->setAutorizacionesDelete($_POST[$permisos[12]]) or
                    !$TipoAdministrador->setAutorizacionesAdd($_POST[$permisos[13]]) or
                    !$TipoAdministrador->setTipoAdministradorView($_POST[$permisos[14]]) or
                    !$TipoAdministrador->setTipoAdministradorUpdate($_POST[$permisos[15]]) or
                    !$TipoAdministrador->setTipoAdministradorDelete($_POST[$permisos[16]]) or
                    !$TipoAdministrador->setTipoAdministradorAdd($_POST[$permisos[17]])
                ) {
                    $result['error'] = $TipoAdministrador->getDataError();
                } elseif ($TipoAdministrador->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrator type created successfully';
                } else {
                    $result['error'] = 'An error occurred while creating the administrator type';
                }
                break;
            // Caso para leer todos los registros.
            case 'readAll':
                if($TipoAdministrador->validatePermissions('v')){
                    $result['error'] = 'No tiene permisos para leer los tipos de administrador';
                } elseif ($result['dataset'] = $TipoAdministrador->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' registers';
                } else {
                    $result['error'] = 'There aren´t administrator types registered';
                }
                break;
            // Caso para leer un registro en particular.
            case 'readOne':
                if($TipoAdministrador->validatePermissions('v')){
                    $result['error'] = 'No tiene permisos para leer los tipos de administrador';
                } elseif (!$TipoAdministrador->setId($_POST[POST_ID])) {
                    $result['error'] = $TipoAdministrador->getDataError();
                } elseif ($result['dataset'] = $TipoAdministrador->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Non-existent administrator type';
                }
                break;
            // Caso para actualizar un registro.
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if($TipoAdministrador->validatePermissions('u')){
                    $result['error'] = 'No tiene permisos para actualizar un tipo administrador';
                } elseif (
                    !$TipoAdministrador->setId($_POST[POST_ID]) or
                    !$TipoAdministrador->setTipo($_POST[POST_TIPO]) or
                    !$TipoAdministrador->setEstado($_POST[POST_ESTADO]) or
                    
                    !$TipoAdministrador->setPermisos($_POST[$permisos[0]]) or
                    !$TipoAdministrador->setDocumentacion($_POST[$permisos[1]]) or
                    !$TipoAdministrador->setEmpleadosView($_POST[$permisos[2]]) or
                    !$TipoAdministrador->setEmpleadosUpdate($_POST[$permisos[3]]) or
                    !$TipoAdministrador->setEmpleadosDelete($_POST[$permisos[4]]) or
                    !$TipoAdministrador->setEmpleadosAdd($_POST[$permisos[5]]) or
                    !$TipoAdministrador->setAdministradoresView($_POST[$permisos[6]]) or
                    !$TipoAdministrador->setAdministradoresUpdate($_POST[$permisos[7]]) or
                    !$TipoAdministrador->setAdministradoresDelete($_POST[$permisos[8]]) or
                    !$TipoAdministrador->setAdministradoresAdd($_POST[$permisos[9]]) or
                    !$TipoAdministrador->setAutorizacionesView($_POST[$permisos[10]]) or
                    !$TipoAdministrador->setAutorizacionesUpdate($_POST[$permisos[11]]) or
                    !$TipoAdministrador->setAutorizacionesDelete($_POST[$permisos[12]]) or
                    !$TipoAdministrador->setAutorizacionesAdd($_POST[$permisos[13]]) or
                    !$TipoAdministrador->setTipoAdministradorView($_POST[$permisos[14]]) or
                    !$TipoAdministrador->setTipoAdministradorUpdate($_POST[$permisos[15]]) or
                    !$TipoAdministrador->setTipoAdministradorDelete($_POST[$permisos[16]]) or
                    !$TipoAdministrador->setTipoAdministradorAdd($_POST[$permisos[17]])
                ) {
                    $result['error'] = $TipoAdministrador->getDataError();
                } elseif ($TipoAdministrador->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrator type edited successfully';
                } else {
                    $result['error'] = 'An error occurred while editing the administrator type';
                }
                break;
            // Caso para cambiar el estado de un registro.
            case 'changeStatus':
                $_POST = Validator::validateForm($_POST);
                if($TipoAdministrador->validatePermissions('u')){
                    $result['error'] = 'No tiene permisos para actualizar un tipo administrador';
                } elseif (
                    !$TipoAdministrador->setId($_POST[POST_ID])
                ) {
                    $result['error'] = $TipoAdministrador->getDataError();
                } elseif ($TipoAdministrador->changeStatus()) {
                    $result['status'] = 1;
                    $result['message'] = 'The status was updated successfully';
                } else {
                    $result['error'] = 'An error occurred while editing the administrator type';
                }
                break;
            // Caso para eliminar un registro.
            case 'deleteRow':
                if($TipoAdministrador->validatePermissions('d')){
                    $result['error'] = 'No tiene permisos para eliminar un tipo administrador';
                } elseif (
                    !$TipoAdministrador->setId($_POST[POST_ID])
                ) {
                    $result['error'] = $TipoAdministrador->getDataError();
                } elseif ($TipoAdministrador->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrator type deleted successfully';
                } else {
                    $result['error'] = 'An error occurred while deleting the administrator type';
                }
                break;
            // Caso por defecto para manejar acciones no disponibles.
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
        // Si no hay sesión de administrador iniciada, se muestra un mensaje de acceso denegado.
        print(json_encode('Access denied'));
    }
} else {
    // Si no se especifica una acción, se muestra un mensaje de recurso no disponible.
    print(json_encode('Resource not available'));
}