<?php
// Se incluye la clase del modelo.
require_once('../../models/data/idioma-data.php');

const POST_ID = "idIdioma";
const POST_IDIOMA = "idioma";
const POST_ESTADO = "estadoIdioma";


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
    $Idioma = new IdiomaData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $Idioma->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' coincidences';
                } else {
                    $result['error'] = 'There aren´t coincidences';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$Idioma->setIdioma($_POST[POST_IDIOMA]) or
                    !$Idioma->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $Idioma->getDataError();
                } elseif ($Idioma->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Language created succesfully';
                } else {
                    $result['error'] = 'An error ocurred while creating the language';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $Idioma->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' registers';
                } else {
                    $result['error'] = 'There aren´t registered languages';
                }
                break;
            case 'readOne':
                if (!$Idioma->setId($_POST[POST_ID])) {
                    $result['error'] = $Idioma->getDataError();
                } elseif ($result['dataset'] = $Idioma->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Non-existent languages';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$Idioma->setId($_POST[POST_ID]) or
                    !$Idioma->setIdioma($_POST[POST_IDIOMA]) or
                    !$Idioma->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $Idioma->getDataError();
                } elseif ($Idioma->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Language edited succesfully';
                    // Se asigna el estado del archivo después de actualizar.
                } else {
                    $result['error'] = 'An error ocurred while editing the language';
                }
                break;
            case 'deleteRow':
                if (
                    !$Idioma->setId($_POST[POST_ID])
                ) {
                    $result['error'] = $Idioma->getDataError();
                } elseif ($Idioma->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Language deleted succesfully';
                } else {
                    $result['error'] = 'An error ocurred while deleting the language';
                }
                break;
            case 'changeStatus':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$Idioma->setId($_POST[POST_ID])
                ) {
                    $result['error'] = $Idioma->getDataError();
                } elseif ($Idioma->changeStatus()) {
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
    print(json_encode('Resource not available'));
}