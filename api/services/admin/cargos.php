<?php
// Se incluye la clase del modelo.
require_once('../../models/data/tb-cargos-data.php');

if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();

    $cargo = new CargoData;
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);

    if (isset($_SESSION['idAdministrador'])){

        switch ($_GET['action']){
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $cargo->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$cargo->setNombre($_POST['nombreCargo'])
                ) {
                    $result['error'] = $cargo->getDataError();
                } elseif ($cargo->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cargo creado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el cargo';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $cargo->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen cargos registrados';
                }
                break;
            case 'readOne':
                if (!$cargo->setid_cargo($_POST['idCargo'])) {
                    $result['error'] = $cargo->getDataError();
                } elseif ($result['dataset'] = $cargo->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Cargo inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$cargo->setid_cargo($_POST['idCargo']) or 
                    !$cargo->setNombre($_POST['nombreCargo'])
                ) {
                    $result['error'] = $cargo->getDataError();
                } elseif ($cargo->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cargo modificada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el cargo';
                }
                break;
            case 'deleteRow':
                if (
                    !$cargo->setid_cargo($_POST['idCargo']) 
                ) {
                    $result['error'] = $cargo->getDataError();
                } elseif ($cargo->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cargo eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el cargo';
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