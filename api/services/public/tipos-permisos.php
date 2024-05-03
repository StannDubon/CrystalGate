<?php
// Se incluye la clase del modelo.
require_once('../../models/data/tb-tipos-permisos-data.php');

if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();

    $tipo = new TIposPermisosData;
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);

    if (isset($_SESSION['idTipopermiso'])){

        switch ($_GET['action']){
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $tipo->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$tipo->setid_clasificacion_permiso($_POST['idClasification']) or
                    !$tipo->settipo_permiso($_POST['nombreTipo'])
                ) {
                    $result['error'] = $tipo->getDataError();
                } elseif ($tipo->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Tipo de permiso creado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el tipo de permiso';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $tipo->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen tipos de permisos registrados';
                }
                break;
            case 'readOne':
                if (!$tipo->setid_tipo_permiso($_POST['idTipo'])) {
                    $result['error'] = $tipo->getDataError();
                } elseif ($result['dataset'] = $tipo->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Tipo de permiso inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$tipo->setid_tipo_permiso($_POST['idTipo']) or 
                    !$tipo->setid_clasificacion_permiso($_POST['idClasification']) or 
                    !$tipo->settipo_permiso($_POST['nombreTipo'])
                ) {
                    $result['error'] = $tipo->getDataError();
                } elseif ($tipo->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Tipo de permiso modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el tipo de permiso';
                }
                break;
            case 'deleteRow':
                if (
                    !$tipo->setid_tipo_permiso($_POST['idTipo']) 
                ) {
                    $result['error'] = $tipo->getDataError();
                } elseif ($tipo->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Tipo de permiso eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el tipo de permiso';
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