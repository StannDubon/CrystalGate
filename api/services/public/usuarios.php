<?php
require_once('../../models/data/tb-usuarios-data.php');

if (isset($_GET['action'])) {
    session_start();
    $usuarios = new UsuariosData;
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null);

    if (isset($_SESSION['idUsuario'])){
        $result['session'] = 1;

        switch ($_GET['action']){
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $usuarios->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'logOut':
                if (session_destroy()) {
                    $result['status'] = 1;
                    $result['message'] = 'Sesión eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cerrar la sesión';
                }
                break;
            case 'readProfile':
                if ($result['dataset'] = $usuarios->readProfile()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un problema al leer el perfil';
                }
                break;
            case 'editProfile':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$usuarios->setNombre($_POST['nombre']) or
                    !$usuarios->setApellido($_POST['apellido']) or
                    !$usuarios->setEmail($_POST['correo']) or
                    !$usuarios->setClave($_POST['clave']) 
                ) {
                    $result['error'] = $usuarios->getDataError();
                } elseif ($usuarios->editProfile()) {
                    $result['status'] = 1;
                    $result['message'] = 'Perfil modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el perfil';
                }
                break;
            case 'changePassword':
                $_POST = Validator::validateForm($_POST);
                if (!$usuarios->checkPassword($_POST['claveActual'])) {
                    $result['error'] = 'Contraseña actual incorrecta';
                } elseif ($_POST['claveNueva'] != $_POST['confirmarClave']) {
                    $result['error'] = 'Confirmación de contraseña diferente';
                } elseif (!$usuarios->setClave($_POST['claveNueva'])) {
                    $result['error'] = $usuarios->getDataError();
                } elseif ($usuarios->changePassword()) {
                    $result['status'] = 1;
                    $result['message'] = 'Contraseña cambiada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cambiar la contraseña';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    }else {
        // Se compara la acción a realizar cuando el Usuario no ha iniciado sesión.
        switch ($_GET['action']) {
            case 'signUp':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$usuarios->setNombre($_POST['nombre']) or
                    !$usuarios->setApellido($_POST['apellido']) or
                    !$usuarios->setEmail($_POST['correo']) or
                    !$usuarios->setClave($_POST['clave']) 
                ) {
                    $result['error'] = $usuarios->getDataError();
                } elseif ($_POST['clave'] != $_POST['confirmarClave']) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($usuarios->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Usuario registrado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar el Usuario';
                }
                break;
            case 'logIn':
                $_POST = Validator::validateForm($_POST);
                if ($usuarios->checkUser($_POST['correo'], $_POST['clave'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Autenticación correcta';
                } else {
                    $result['error'] = 'Credenciales incorrectas';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible fuera de la sesión';
        }
    }
    $result['exception'] = Database::getException();
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));

}else {
    print(json_encode('Recurso no disponible'));
}
