<?php
// Se incluye la clase del modelo.
require_once('../../models/data/tb-permisos-data.php');

if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();

    $permiso = new PermisosData;
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);

    if (isset($_SESSION['idPermisos'])){

        switch ($_GET['action']){
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $permiso->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$permiso->setid_permiso($_POST['idPermiso']) or
                    !$permiso->setid_usuario($_POST['idUsuario']) or
                    !$permiso->setid_tipo_permiso($_POST['nombreTipo']) or
                    !$permiso->setid_estado_permiso($_POST['idPermiso']) 
                ) {
                    $result['error'] = $permiso->getDataError();
                } elseif ($permiso->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Permiso creado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el permiso';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $permiso->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen tipos de permisos registrados';
                }
                break;
            case 'readOne':
                if (!$permiso->setid_permiso($_POST['idPermiso'])) {
                    $result['error'] = $permiso->getDataError();
                } elseif ($result['dataset'] = $permiso->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Permiso inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$permiso->setid_permiso($_POST['idPermiso']) or
                    !$permiso->setid_usuario($_POST['idUsuario']) or
                    !$permiso->setid_tipo_permiso($_POST['nombreTipo']) or
                    !$permiso->setid_estado_permiso($_POST['idPermiso']) 
                ) {
                    $result['error'] = $permiso->getDataError();
                } elseif ($permiso->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Permiso modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el tipo de permiso';
                }
                break;
            case 'deleteRow':
                if (
                    !$permiso->setid_permiso($_POST['idPermiso']) 
                ) {
                    $result['error'] = $permiso->getDataError();
                } elseif ($tipo->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Permiso eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el permiso';
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