<?php
// Se incluye la clase del modelo.
require_once('../../models/data/peticion-data.php');

const POST_ID = "idPeticion";
const POST_ID_USUARIO = "idUsuario";
const POST_ID_TIPO_PETICION = "idTipoPeticion";
const POST_ID_IDIOMA = "idIdioma";
const POST_ID_CENTRO_ENTREGA = "idCentroEntrega";
const POST_FECHA_ENVIO = "fechaEnvio";
const POST_DIRECCION = "direccionPeticion";
const POST_ESTADO = "EstadoPeticion";
const POST_MODO_ENTREGA = "modoEntrega";
const POST_TELEFONO = "telefonoContacto";
const POST_NOMBRE_ENTREGA = "nombreEntrega";
const POST_EMAIL_ENTREGA = "emailEntrega";

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
    $peticion = new PeticionData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar.
        switch ($_GET['action']) {
            // Caso para buscar registros.
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $peticion->searchRows()) {
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
                    !$peticion->setIdUsuario($_POST[POST_ID_USUARIO]) or
                    !$peticion->setIdTipoPeticion($_POST[POST_ID_TIPO_PETICION]) or
                    !$peticion->setIdIdioma($_POST[POST_ID_IDIOMA]) or
                    !$peticion->setIdCentroEntrega($_POST[POST_ID_CENTRO_ENTREGA]) or
                    !$peticion->setFechaEnvio($_POST[POST_FECHA_ENVIO]) or
                    !$peticion->setDireccion($_POST[POST_DIRECCION]) or 
                    !$peticion->setEstado($_POST[POST_ESTADO]) or
                    !$peticion->setModoEntrega($_POST[POST_MODO_ENTREGA]) or
                    !$peticion->setTelefono($_POST[POST_TELEFONO]) or
                    !$peticion->setNombre($_POST[POST_NOMBRE_ENTREGA]) or
                    !$peticion->setEmail($_POST[POST_EMAIL_ENTREGA])
                ) {
                    $result['error'] = $peticion->getDataError();
                } elseif ($peticion->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Petition created successfully';
                } else {
                    $result['error'] = 'An error occurred while creating the petition';
                }
                break;
            // Caso para leer todos los registros.
            case 'readAll':
                if ($result['dataset'] = $peticion->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' registers';
                } else {
                    $result['error'] = 'There aren´t registered petitions';
                }
                break;
            // Caso para leer un registro en particular.
            case 'readOne':
                if (!$peticion->setId($_POST[POST_ID])) {
                    $result['error'] = 'Incorrect petition';
                } elseif ($result['dataset'] = $peticion->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Non-existent petition';
                }
                break;
            // Caso para actualizar un registro.
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$peticion->setId($_POST[POST_ID]) or
                    !$peticion->setIdUsuario($_POST[POST_ID_USUARIO]) or
                    !$peticion->setIdTipoPeticion($_POST[POST_ID_TIPO_PETICION]) or
                    !$peticion->setIdIdioma($_POST[POST_ID_IDIOMA]) or
                    !$peticion->setIdCentroEntrega($_POST[POST_ID_CENTRO_ENTREGA]) or
                    !$peticion->setFechaEnvio($_POST[POST_FECHA_ENVIO]) or
                    !$peticion->setDireccion($_POST[POST_DIRECCION]) or 
                    !$peticion->setEstado($_POST[POST_ESTADO]) or
                    !$peticion->setModoEntrega($_POST[POST_MODO_ENTREGA]) or
                    !$peticion->setTelefono($_POST[POST_TELEFONO]) or
                    !$peticion->setNombre($_POST[POST_NOMBRE_ENTREGA]) or
                    !$peticion->setEmail($_POST[POST_EMAIL_ENTREGA])
                ) {
                    $result['error'] = $peticion->getDataError();
                } elseif ($peticion->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Petition edited successfully';
                } else {
                    $result['error'] = 'An error occurred while editing the petition';
                }
                break;
            // Caso para actualizar el estado de un registro.
            case 'updateState':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$peticion->setId($_POST[POST_ID]) or
                    !$peticion->setestado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $peticion->getDataError();
                } elseif ($peticion->updateState()) {
                    $result['status'] = 1;
                    $result['message'] = 'Petition edited successfully';
                } else {
                    $result['error'] = 'An error occurred while editing the petition';
                }
                break;
            // Caso para eliminar un registro.
            case 'deleteRow':
                if (!$peticion->setId($_POST[POST_ID])) {
                    $result['error'] = $peticion->getDataError();
                } elseif ($peticion->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Petition deleted successfully';
                } else {
                    $result['error'] = 'An error occurred while deleting the petition';
                }
                break;
            // Caso para leer todos los registros.
            case 'readDocRequestPerUserGrapho':
                if ($result['dataset'] = $peticion->readDocRequestPerUserGrapho()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' registers';
                } else {
                    $result['error'] = 'There aren´t registered petitions';
                }
                break;
            // Caso por defecto para manejar acciones no disponibles.
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
