<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla usuario.
 */
class UsuarioHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $id_cargo = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $correo = null;
    protected $clave = null;
    protected $imagen = null;

    const RUTA_IMAGEN = '../images/user/';

    /*
     *  Métodos para gestionar la cuenta del usuario.
     */
    public function checkUser($email, $password)
    {
        $sql = 'SELECT id_usuario, correo, clave FROM tb_usuarios WHERE correo = ?';
        $params = array($email);
        if (!($data = Database::getRow($sql, $params))) {
            return false;
        } elseif (password_verify($password, $data['clave'])) {
            $_SESSION['idUsuario'] = $data['id_usuario'];
            $_SESSION['correoUsuario'] = $data['correo'];
            return true;
        } else {
            return false;
        }
    }

    public function checkPassword($password)
    {
        $sql = 'SELECT * FROM tb_usuarios WHERE id_usuario = ?';
        $params = array($_SESSION['idUsuario']);
        $data = Database::getRow($sql, $params);
        // Se verifica si la contraseña coincide con el hash almacenado en la base de datos.
        if (password_verify($password, $data['clave_usuario'])) {
            return true;
        } else {
            return false;
        }
    }

    public function changePassword()
    {
        $sql = 'UPDATE tb_usuarios SET clave = ? WHERE id_usuario = ?';
        $params = array($this->clave, $_SESSION['idUsuario']);
        return Database::executeRow($sql, $params);
    }

    public function readProfile()
    {
        $sql = 'SELECT a.id_usuario, ta.tipo_administrador, a.nombre, a.apellido, a.correo, a.imagen
                FROM tb_usuarios a INNER JOIN tb_cargos ta ON a.id_cargo = ta.id_cargo
                WHERE a.id_usuario = ?;';
        $params = array($_SESSION['idUsuario']);
        return Database::getRow($sql, $params);
    }

    public function editProfile()
    {
        $sql = 'UPDATE tb_usuarios SET nombre = ?, apellido = ?, correo = ?, imagen = ? WHERE id_usuario = ?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->imagen, $_SESSION['idUsuario']);
        return Database::executeRow($sql, $params);
    }

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT a.*, b.cargo 
                FROM tb_usuarios a, tb_cargos b 
                WHERE a.id_usuario LIKE ? OR a.nombre LIKE ? OR a.apellido LIKE ? OR b.cargo LIKE ?';
        $params = array($value, $value, $value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_usuarios(id_cargo, nombre, apellido, correo, imagen, clave) VALUES(?, ?, ?, ?, ?, ?)';
        $params = array($this->id_cargo, $this->nombre, $this->apellido, $this->correo, $this->imagen, $this->clave);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT a.id_usuario, b.cargo, a.nombre, a.apellido, a.clave, a.correo, a.imagen
                FROM tb_usuarios a, tb_cargos b WHERE a.id_cargo = b.id_cargo
                ORDER BY a.apellido';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT a.id_usuario, b.cargo, a.nombre, a.apellido, a.clave, a.correo, a.imagen
                FROM tb_usuarios a, tb_cargos b 
                WHERE a.id_cargo = b.id_cargo AND a.id_usuario = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_usuarios
                SET id_cargo = ?, nombre = ?, apellido = ?, correo = ?, imagen = ?
                WHERE id_usuario = ?';
        $params = array($this->id_cargo, $this->nombre, $this->apellido, $this->correo, $this->imagen, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_usuarios
                WHERE id_usuario = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT imagen
                FROM tb_usuarios
                WHERE id_usuario = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }
}