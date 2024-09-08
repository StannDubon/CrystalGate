<?php
// Se incluye la clase del modelo.
require_once('../../models/data/cargo-data.php');

const POST_ID = "idCargo";
const POST_CARGO = "cargo";
const POST_ESTADO = "estadoCargo";

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
    $Cargo = new CargoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            // Caso para buscar registros.
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $Cargo->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' coincidences';
                } else {
                    $result['error'] = 'There aren´t coincidences';
                }
                break;
            // Caso para crear un nuevo registro.
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$Cargo->setCargo($_POST[POST_CARGO]) or
                    !$Cargo->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $Cargo->getDataError();
                } elseif ($Cargo->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Charge created succesfully';
                } else {
                    $result['error'] = 'An error ocurred while creating the charge';
                }
                break;
            // Caso para leer todos los registros.
            case 'readAll':
                if ($result['dataset'] = $Cargo->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'There aren´t charges registered';
                }
                break;
            // Caso para leer un registro en particular.
            case 'readOne':
                if (!$Cargo->setId($_POST[POST_ID])) {
                    $result['error'] = $Cargo->getDataError();
                } elseif ($result['dataset'] = $Cargo->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Non-existent charge';
                }
                break;
            // Caso para actualizar un registro.
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$Cargo->setId($_POST[POST_ID]) or
                    !$Cargo->setCargo($_POST[POST_CARGO]) or
                    !$Cargo->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $Cargo->getDataError();
                } elseif ($Cargo->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Charge edited succesfully';
                } else {
                    $result['error'] = 'An error ocurred while editing the charge';
                }
                break;
            // Caso para eliminar un registro.
            case 'deleteRow':
                if (
                    !$Cargo->setId($_POST[POST_ID])
                ) {
                    $result['error'] = $Cargo->getDataError();
                } elseif ($Cargo->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Charge deleted succesfully';
                } else {
                    $result['error'] = 'An error ocurred while deleting the charge';
                }
                break;
            // Caso para cambiar el estado de un registro.
            case 'changeStatus':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$Cargo->setId($_POST[POST_ID])
                ) {
                    $result['error'] = $Cargo->getDataError();
                } elseif ($Cargo->changeStatus()) {
                    $result['status'] = 1;
                    $result['message'] = 'The status was updated successfully';
                } else {
                    $result['error'] = 'An error ocurred while editing the charge';
                }
                break;
            case 'readUsersPerChargesGraphos':
                if (!$Cargo->setId($_POST[POST_ID])) {
                    $result['error'] = 'Usuario incorrecto';
                } elseif ($result['dataset'] = $Cargo->readUsersPerChargesGraphos()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Usuario inexistente';
                }
                break;
            // Caso predeterminado para acciones no disponibles.
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