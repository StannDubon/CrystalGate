<?php
// Se incluye la clase del modelo.
require_once('../../models/data/tipo-peticion-data.php');

// Constantes para los nombres de los campos POST.
const POST_ID = "idTipoPeticion";
const POST_TIPO = "tipoPeticion";
const POST_ESTADO = "estadoTipoPeticion";

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
    $TipoPeticion = new TipoPeticionData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            // Caso para buscar registros.
            case 'searchRows':
                // Validación del campo de búsqueda.
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $TipoPeticion->searchRows()) {
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
                // Validación y asignación de valores para crear un nuevo tipo de petición.
                if (
                    !$TipoPeticion->setTipo($_POST[POST_TIPO]) or
                    !$TipoPeticion->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $TipoPeticion->getDataError();
                } elseif ($TipoPeticion->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Petition type created successfully';
                } else {
                    $result['error'] = 'An error occurred while creating the petition type';
                }
                break;
            // Caso para leer todos los registros.
            case 'readAll':
                if ($result['dataset'] = $TipoPeticion->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' registers';
                } else {
                    $result['error'] = 'There aren´t petition types registered';
                }
                break;
            // Caso para leer un registro en particular.
            case 'readOne':
                if (!$TipoPeticion->setId($_POST[POST_ID])) {
                    $result['error'] = $TipoPeticion->getDataError();
                } elseif ($result['dataset'] = $TipoPeticion->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Non-existent petition type';
                }
                break;
            // Caso para actualizar un registro.
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                // Validación y actualización de un tipo de petición.
                if (
                    !$TipoPeticion->setId($_POST[POST_ID]) or
                    !$TipoPeticion->setTipo($_POST[POST_TIPO]) or
                    !$TipoPeticion->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $TipoPeticion->getDataError();
                } elseif ($TipoPeticion->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Petition type edited successfully';
                } else {
                    $result['error'] = 'An error occurred while editing the petition type';
                }
                break;
            // Caso para eliminar un registro.
            case 'deleteRow':
                if (
                    !$TipoPeticion->setId($_POST[POST_ID])
                ) {
                    $result['error'] = $TipoPeticion->getDataError();
                } elseif ($TipoPeticion->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Petition type deleted successfully';
                } else {
                    $result['error'] = 'An error occurred while deleting the petition type';
                }
                break;
            // Caso para cambiar el estado de un registro.
            case 'changeStatus':
                $_POST = Validator::validateForm($_POST);
                // Validación y cambio de estado de un tipo de petición.
                if (
                    !$TipoPeticion->setId($_POST[POST_ID])
                ) {
                    $result['error'] = $TipoPeticion->getDataError();
                } elseif ($TipoPeticion->changeStatus()) {
                    $result['status'] = 1;
                    $result['message'] = 'The status was updated successfully';
                } else {
                    $result['error'] = 'An error occurred while editing the petition type';
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