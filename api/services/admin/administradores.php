<?php
require_once('../../models/data/administrador_data.php');

if (isset($_GET['action'])) {
    session_start();
    $administrador = new AdministradorData;
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null);

    if (isset($_SESSION['idAdministrador'])){
        $result['session'] = 1;

        switch ($_GET['action']){
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $administrador->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$administrador->setid_cargo($_POST['idCargo']) or
                    !$administrador->setNombre($_POST['nombre']) or
                    !$administrador->setApellido($_POST['apellido']) or
                    !$administrador->setEmail($_POST['correo']) or
                    !$administrador->setClave($_POST['clave'])
                ) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($administrador->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'administrador creado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el administrador';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $administrador->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen administradors registrados';
                }
                break;
            case 'readOne':
                if (!$administrador->setid_administrador($_POST['idadministrador'])) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($result['dataset'] = $administrador->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'administrador inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$administrador->setid_administrador($_POST['idadministrador']) or 
                    !$administrador->setid_cargo($_POST['idCargo']) or
                    !$administrador->setNombre($_POST['nombre']) or
                    !$administrador->setApellido($_POST['apellido']) or
                    !$administrador->setEmail($_POST['correo']) or
                    !$administrador->setClave($_POST['clave'])
                ) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($administrador->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'administrador modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el administrador';
                }
                break;
            case 'deleteRow':
                if (
                    !$administrador->setid_administrador($_POST['idadministrador']) 
                ) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($administrador->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'administrador eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el administrador';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    }

}