<?php
require_once('../../helpers/database.php');
class tbUsuariosHandler{

    protected $id_usuario = null;
    protected $nombre_usuario = null;
    protected $apellido_usuario = null;
    protected $email_usuario = null;
    protected $clave_usuario = null;
    protected $id_cargo = null;

    /*
    *   Métodos para gestionar la cuenta del cliente.
    */
    public function checkUser($mail, $password)
    {
        $sql = 'SELECT id_usuario, correo, clave
                FROM tb_usuarios
                WHERE correo = ?';
        $params = array($mail);
        $data = Database::getRow($sql, $params);
        if (password_verify($password, $data['clave'])) {
            $this->id_usuario = $data['id_usuario'];
            $this->email_usuario = $data['correo'];
            return true;
        } else {
            return false;
        }
    }

    public function editProfile()
    {
        $sql = 'UPDATE tb_usuarios
                SET id_cargo = ?, nombre = ?, apellido = ?, correo = ?
                WHERE id_usuario = ?';
        $params = array($this->id_cargo, $this->nombre_usuario, $this->apellido_usuario, $this->email_usuario);
        return Database::executeRow($sql, $params);
    }

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    /* FUNCION PARA BUSCAR USUARIOS POR: CORREO, NOMBRE Y APELLIDO */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_usuario, nombre, apellido, correo, cargo
                FROM tb_usuarios
                INNER JOIN tb_cargos USING(id_cargo) 
                WHERE apellido LIKE ? OR nombre LIKE ? OR cargo LIKE ?
                ORDER BY apellido';
        $params = array($value, $value, $value);
        return Database::getRows($sql, $params);
    }
    /* FUNCION PARA CREAR USUARIOS, USANDO PROCEDIMIENTO ALMACENADO */
    public function createRow()
    {
        $sql = 'CALL InsertarUsuario(?, ?, ?, ?, ?)';
        $params = array($this->id_cargo, $this->nombre_usuario, $this->apellido_usuario, $this->email_usuario, $this->clave_usuario);
        return Database::executeRow($sql, $params);
    }
    /* FUCNION PARA MOSTRAR A LOS USUARIOS */  
    public function readAll()
    {
        $sql = 'SELECT id_usuario, nombre, apellido, correo, cargo
                FROM tb_usuarios
                INNER JOIN tb_cargos USING(id_cargo) 
                ORDER BY apellido_usuario';
        return Database::getRows($sql);
    }
    /* FUNCION PARA MOSTRAR LOS DATOS DE UN USUARIO */
    public function readOne()
    {
        $sql = 'SELECT id_usuario, nombre, apellido, correo, cargo
                FROM tb_usuarios
                INNER JOIN tb_cargos USING(id_cargo) 
                WHERE id_usuario = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }
    /* FUNCION PARA ACTUALIZAR LOS DATOS DEL USUARIO */
    public function updateRow()
    {
        $sql = 'UPDATE tb_usuarios
                SET nombre = ?, apellido = ?, id_cargo = ?
                WHERE id_usuario = ?';
        $params = array($this->nombre_usuario, $this->apellido_usuario, $this->id_cargo);
        return Database::executeRow($sql, $params);
    }
    /* FUNCION PARA ELIMINAR UN USUARIO*/
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_usuarios
                WHERE id_usuario = ?';
        $params = array($this->id_usuario);
        return Database::executeRow($sql, $params);
    }
    /* FUNCION PARA VERIFICAR DUPLICADOS EN LOS USUARIOS */
    public function checkDuplicate($value)
    {
        $sql = 'SELECT id_usuario, correo
                FROM tb_usuarios
                WHERE correo = ?';
        $params = array($value, $value);
        return Database::getRow($sql, $params);
    }
}