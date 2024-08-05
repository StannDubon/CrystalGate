<?php
header('Content-type: application/json; charset=utf-8');
require_once('../../models/data/clasificacion-permiso-data.php');

if (isset($_GET['action'])) {
    session_start();
    $ClasificacionPermiso = new ClasificacionPermisoData;
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null, 'fileStatus' => null);

    if (isset($_SESSION['idUsuario'])) {
        $result['session'] = 1; 
        switch ($_GET['action']) {
            case 'readAll':
                if ($ClasificacionPermiso->validatePermissions()) {
                    $result['error'] = 'No tiene permisos para leer';
                } else {
                    $result['dataset'] = $ClasificacionPermiso->readAll();
                    if ($result['dataset']) {
                        $result['status'] = 1;
                        $result['message'] = 'Data fetched successfully';
                    } else {
                        $result['error'] = 'No records found';
                    }
                }
                break;
            default:
                $result['error'] = 'Action not available in the session';
        }
        
    } 
    $result['exception'] = Database::getException();
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($result);
} else {
    echo json_encode(['error' => 'Resource not available']);
}
?>
