<?php
require_once('../../models/data/tipo-permiso-data.php');

const POST_ID = "idTipoPermiso";
const POST_CLASIFICACION = "idClasificacionPermiso";
const POST_TIPO = "tipoPermiso";
const POST_LAPSO = "lapsoPermiso";
const POST_ESTADO = "estadoTipoPermiso";

if (isset($_GET['action'])) {
    session_start();
    $TipoPermiso = new TipoPermisoData;
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    if (isset($_SESSION['idUsuario'])) {
        switch ($_GET['action']) {
            case 'readLike':
                if ($TipoPermiso->setIdClasificacion($_POST[POST_CLASIFICACION])) {
                    $result['error'] = $TipoPermiso->getDataError();
                }if ($result['dataset'] = $TipoPermiso->readLike()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Non-existent permission type';
                }
                break;
            case 'readOne':
                if (!$TipoPermiso->setId($_POST[POST_ID])) {
                    $result['error'] = $TipoPermiso->getDataError();
                } elseif ($result['dataset'] = $TipoPermiso->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Classification permission inexistent';
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
