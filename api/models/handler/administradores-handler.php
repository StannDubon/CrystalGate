<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */
class AdministradoresHandler{
    protected $id = null;
    protected $id_tipo_administrador = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $email = null;
    protected $clave = null;

    /*
     *  Métodos para gestionar la cuenta del administrador.
     */
    public function checkAdmin($email, $password)
    {
        $sql = 'SELECT id_administrador, correo, clave
                FROM tb_administradores
                WHERE  correo = ? ';
        $params = array($email);  
        if (!($data = Database::getRow($sql, $params))) {
            return false;
        } elseif (password_verify($password, $data['clave'])) {
            $_SESSION['idAdministrador'] = $data['id_administrador'];
            $_SESSION['correo'] = $data['correo'];
            return true;
        } else {
            return false;
        }
    }

    public function checkPass($password)
    {
        $sql = 'SELECT clave
                FROM tb_administradores
                WHERE id_administrador = ?';
        $params = array($_SESSION['idAdministrador']);
        $data = Database::getRow($sql, $params);
        // Se verifica si la contraseña coincide con el hash almacenado en la base de datos.
        if (password_verify($password, $data['clave'])) {
            return true;
        } else {
            return false;
        }
    }

    public function changePassword()
    {
        $sql = 'UPDATE tb_administradores
                SET clave = ?
                WHERE id_administrador = ?';
        $params = array($this->clave, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params);
    }

    public function readProfile()
    {
        $sql = 'SELECT id_administrador, id_tipo_administrador, nombre, apellido, correo 
                FROM tb_administradores
                WHERE id_administrador = ?';
        $params = array($_SESSION['idAdministrador']);
        return Database::getRow($sql, $params);
    }

    public function editProfile()
    {
        $sql = 'UPDATE tb_administradores
                SET id_tipo_administrador = ?, nombre = ?, apellido = ?, correo = ?
                WHERE id_administrador = ?';
        $params = array($this->id_tipo_administrador, $this->nombre, $this->apellido, $this->email, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params);
    }

    /* Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).*/

    /* FUNCION PARA BUSCAR ADMINISTRADORES POR NOMBRE Y APELLIDO */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_administrador, tipo_administrador, nombre, apellido, correo
                FROM tb_administradores a
                WHERE apellido LIKE ? OR nombre LIKE ?
                INNER JOIN tb_tipos_administradores ta ON a.id_administrador = ta.id_administrador
                ORDER BY apellido';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }
    /* FUNCION PARA CREAR ADMINISTRADORES, USANDO PROCEDIMIENTO ALMACENADO */ 
    public function createRow()
    {
        $sql = 'CALL InsertarAdministrador(?, ?, ?, ?, ?)';
        $params = array($this->id_tipo_administrador, $this->nombre, $this->apellido, $this->clave, $this->email);
        return Database::executeRow($sql, $params);
    }
    /* FUCNION PARA MOSTRAR A LOS ADMINISTRADORES */
    public function readAll()
    {
        $sql = 'SELECT id_administrador, tipo_administrador, nombre, apellido, email 
                FROM tb_administradores a
                INNER JOIN tb_tipos_administradores ta ON a.id_administrador = ta.id_administrador
                ORDER BY apellido_administrador';
        return Database::getRows($sql);
    }
    /* FUNCION PARA MOSTRAR LOS DATOS DE UN ADMINISTRADOR */
    public function readOne()
    {
        $sql = 'SELECT id_administrador, tipo_administrador, nombre, apellido, email 
                FROM tb_administradores a
                WHERE id_administrador = ?
                INNER JOIN tb_tipos_administradores ta ON a.id_administrador = ta.id_administrador';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }
    /* FUNCION PARA ACTUALIZAR LOS DATOS DEL ADMINISTRADOR */
    public function updateRow()
    {
        $sql = 'UPDATE tb_administradores
                SET id_tipo_administrador, nombre = ?, apellido = ?, correo = ?
                WHERE id_administrador = ?';
        $params = array($this->id_tipo_administrador, $this->nombre, $this->apellido, $this->email, $this->id);
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
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}