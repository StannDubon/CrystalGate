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

    /*
     *  Métodos para gestionar la cuenta del administrador.
     */
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
            $_SESSION['nombreAdministrador'] = $data['nombre_administrador '];
            return true;
        } else {
            return false;
        }
    }

    public function checkPass($password)
    {
        $sql = 'SELECT clave_administrador
                FROM tb_administradores
                WHERE id_administrador = ?';
        $params = array($_SESSION['idAdministrador']);
        $data = Database::getRow($sql, $params);
        // Se verifica si la contraseña coincide con el hash almacenado en la base de datos.
        if (password_verify($password, $data['clave_administrador'])) {
            return true;
        } else {
            return false;
        }
    }

    public function changePassword()
    {
        $sql = 'UPDATE tb_administradores
                SET clave_administrador = ?
                WHERE id_administrador = ?';
        $params = array($this->clave, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params);
    }

    public function readProfile()
    {
        $sql = 'SELECT id_administrador, nombre_administrador, apellido_administrador, email_administrador 
                FROM tb_administradores
                WHERE id_administrador = ?';
        $params = array($_SESSION['idAdministrador']);
        return Database::getRow($sql, $params);
    }

    public function editProfile()
    {
        $sql = 'UPDATE tb_administradores
                SET nombre_administrador = ?, apellido_administrador = ?, correo_administrador = ?
                WHERE id_administrador = ?';
        $params = array($this->nombre_administrador, $this->apellido_administrador, $this->email_administrador, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params);
    }

    /* Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).*/

    /* FUNCION PARA BUSCAR ADMINISTRADORES POR NOMBRE Y APELLIDO */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_administrador, nombre_administrador, apellido_administrador, email_administrador
                FROM tb_administradores
                WHERE apellido_administrador LIKE ? OR nombre_administrador LIKE ?
                ORDER BY apellido_administrador';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }
    /* FUNCION PARA CREAR ADMINISTRADORES, USANDO PROCEDIMIENTO ALMACENADO */ 
    public function createRow()
    {
        $sql = 'CALL InsertarAdministrador(?, ?, ?, ?)';
        $params = array($this->nombre_administrador, $this->apellido_administrador, $this->email_administrador, $this->clave_administrador);
        return Database::executeRow($sql, $params);
    }
    /* FUCNION PARA MOSTRAR A LOS ADMINISTRADORES */
    public function readAll()
    {
        $sql = 'SELECT id_administrador, nombre_administrador, apellido_administrador, email_administrador 
                FROM tb_administradores
                ORDER BY apellido_administrador';
        return Database::getRows($sql);
    }
    /* FUNCION PARA MOSTRAR LOS DATOS DE UN ADMINISTRADOR */
    public function readOne()
    {
        $sql = 'SELECT id_administrador, nombre_administrador, apellido_administrador, email_administrador 
                FROM tb_administradores
                WHERE id_administrador = ?';
        $params = array($this->id_administrador);
        return Database::getRow($sql, $params);
    }
    /* FUNCION PARA ACTUALIZAR LOS DATOS DEL ADMINISTRADOR */
    public function updateRow()
    {
        $sql = 'UPDATE tb_administradores
                SET nombre_administrador = ?, apellido_administrador = ?, correo_administrador = ?
                WHERE id_administrador = ?';
        $params = array($this->nombre_administrador, $this->apellido_administrador, $this->email_administrador, $this->id_administrador);
        return Database::executeRow($sql, $params);
    }
    /* FUNCION PARA ACTUALIZAR LA CONTRASEÑA DEL ADMINISTRADOR 
    +
    +
    +
    */
    /* FUNCION PARA ELIMINAR UN ADMINISTRADOR*/
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_administradores
                WHERE id_administrador = ?';
        $params = array($this->id_administrador);
        return Database::executeRow($sql, $params);
    }
}