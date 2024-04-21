<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */
class tbAdministradoresHandler{
    protected $id_administrador = null;
    protected $nombre_administrador = null;
    protected $apellido_administrador = null;
    protected $email_administrador = null;
    protected $clave_administrador = null;

    public function checkAdmin($username, $password)
    {
        $sql = 'SELECT id_administrador, email_administrador, clave_administrador
                FROM tb_administradores
                WHERE  email_administrador = ?';
        $params = array($username);
        if (!($data = Database::getRow($sql, $params))) {
            return false;
        } elseif (password_verify($password, $data['clave_administrador'])) {
            $_SESSION['idAdministrador'] = $data['id_administrador'];
            $_SESSION['aliasAdministrador'] = $data['alias_administrador'];
            return true;
        } else {
            return false;
        }
    }
}