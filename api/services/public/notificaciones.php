<?php
// Se incluye la clase del modelo.
require_once('../../models/data/tb-notificaciones-data.php');

if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();

    $notificaciones = new NotificacionesData;
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);

    if (isset($_SESSION['idUsuario'])){

        switch($_GET['action']){
            case 'readAll':
                if ($result['dataset'] = $notificaciones->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen cargos registrados';
                }
                break;
            case 'readOne':
                if ($result['dataset'] = $notificaciones->readOne()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existe el registro';
                } else {
                    $result['error'] = 'No existe el registro';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
                break;
        }

    }else {
        print(json_encode('Acceso denegado'));
    }
}else {
    print(json_encode('Recurso no disponible'));
}