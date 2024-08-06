<?php
require_once('../../models/data/clasificacion-permiso-data.php');

const POST_ID = "idClasificacion";
const POST_CLASIFICACION = "clasificacion";
const POST_ESTADO = "estadoClasificacion";

if (isset($_GET['action'])) {
session_start();
$ClasificacionPermiso = new ClasificacionPermisoData;
$result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    if (isset($_SESSION['idUsuario'])) {
        
        switch ($_GET['action']) {
            // Caso para leer todos los registros.
            case 'readAll':
                if($result['dataset'] = $ClasificacionPermiso->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'There are ' . count($result['dataset']) . ' registers';
                } else {
                    $result['error'] = 'There aren´t Permission classifications registered';
                }
                break;
            case 'readOne':
                if (!$ClasificacionPermiso->setId($_POST[POST_ID])) {
                    $result['error'] = $ClasificacionPermiso->getDataError();
                } elseif ($result['dataset'] = $ClasificacionPermiso->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Classification permission inexistent';
                }
                break;
            default:
                $response['error'] = 'Action not available in the session';
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
