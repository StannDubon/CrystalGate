<?php
// Se incluye la clase del modelo.
require_once('../../models/data/tipo-permiso-data.php');

// Constantes para los nombres de los campos POST.
const POST_ID = "idTipoPermiso";
const POST_CLASIFICACION = "idClasificacionPermiso";
const POST_TIPO = "tipoPermiso";
const POST_LAPSO = "lapsoPermiso";
const POST_ESTADO = "estadoTipoPermiso";

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
    $TipoPermiso = new TipoPermisoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idUsuario'] )) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            // Caso para buscar registros.
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $TipoPermiso->searchRows()) {
                    // Si hay coincidencias, se establece el estado y el mensaje.
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' coincidences';
                } else {
                    $result['error'] = 'There aren´t coincidences';
                }
                break;
            // Caso para leer todos los registros.
            case 'readAll':
                if ($result['dataset'] = $TipoPermiso->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' registers';
                } else {
                    $result['error'] = 'There aren´t permission types registered';
                }
                break;
            //Caso para obtener lapso por tipo de permiso.
            case 'getLapso':
                if (!$TipoPermiso->setId($_POST[POST_ID])) {
                    $result['error'] = $TipoPermiso->getDataError();
                } elseif ($result['dataset'] = $TipoPermiso->getLapso()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Non-existent permission type';
                }
                break;
            //Caso para leer los registros por categoria.
            case 'readAllByCategorie':
                if(!$TipoPermiso->setIdClasificacion($_POST[POST_CLASIFICACION])){
                    $result['error'] = $TipoPermiso->getDataError();
                }
                else if ($result['dataset'] = $TipoPermiso->readAllByCategorie()){
                    $result['status'] = 1;
                }
                else{
                    $result['error'] = 'Non-existent permission categorie';
                }
                break;
            // Caso para leer un registro en particular.
            case 'readOne':
                if (!$TipoPermiso->setId($_POST[POST_ID])) {
                    $result['error'] = $TipoPermiso->getDataError();
                } elseif ($result['dataset'] = $TipoPermiso->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Non-existent permission type';
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
