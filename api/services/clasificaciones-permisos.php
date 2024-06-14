<?php
// Se incluye la clase del modelo.
require_once('../../models/data/tb-clasificaciones-permisos-data.php');

if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();

    $clasification = new ClasificacionesPermisosData;
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);

    if (isset($_SESSION['idAdministrador'])){

        switch ($_GET['action']){
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $clasification->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$clasification->setClafisicacion($_POST['nombreClasification'])
                ) {
                    $result['error'] = $clasification->getDataError();
                } elseif ($clasification->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Clasificación de permiso creada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear la clasificación de permiso';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $clasification->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen clasificaciones registradas';
                }
                break;
            case 'readOne':
                if (!$clasification->setid_clasificacion_permiso($_POST['idClasification'])) {
                    $result['error'] = $clasification->getDataError();
                } elseif ($result['dataset'] = $clasification->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Clasificación de permiso inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$clasification->setid_clasificacion_permiso($_POST['idClasification']) or 
                    !$clasification->setClafisicacion($_POST['nombreClasification'])
                ) {
                    $result['error'] = $clasification->getDataError();
                } elseif ($clasification->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Clasificación de permiso modificada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar la clasificación de permiso';
                }
                break;
            case 'deleteRow':
                if (
                    !$clasification->setid_clasificacion_permiso($_POST['idClasification']) 
                ) {
                    $result['error'] = $clasification->getDataError();
                } elseif ($clasification->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Clasificación de permiso eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar la clasificación de permiso';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
        $result['exception'] = Database::getException();
        header('Content-type: application/json; charset=utf-8');
        print(json_encode($result));
    }else {
        print(json_encode('Acceso denegado'));
    }
}else {
    print(json_encode('Recurso no disponible'));
}