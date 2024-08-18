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
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $permiso = new PermisoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idUsuario'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $peticion->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            // Caso para crear un nuevo registro.
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
                } elseif ($permiso->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Permission created successfully';
                    $result['fileStatus'] = Validator::saveFile($_FILES[POST_DOCUMENTO], $permiso::RUTA_DOCUMENTO);
                } else {
                    $result['error'] = 'An error occurred while creating the permission';
                }
                break;
                case 'readAllByCostumer':
                    if (!$permiso->setIdUsuario($_SESSION['idUsuario'])) {
                        $result['error'] = 'user not found';
                    }
                    else if ($result['dataset'] = $permiso->readAllByCostumer()) {
                        $result['status'] = 1;
                    } else {
                        $result['error'] = 'No existen peticions registrados';
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