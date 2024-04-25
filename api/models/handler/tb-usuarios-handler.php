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
        // Validación de formato de correo electrónico
        if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException("El correo electrónico no tiene un formato válido.");
        }
        // Consulta SQL para obtener los datos del usuario por su correo electrónico
        $sql = 'SELECT id_usuario, correo, clave
                FROM tb_usuarios
                WHERE correo = ?';
        $params = array($mail);
        $data = Database::getRow($sql, $params);
        // Validación de existencia de datos
        if (!$data) {
            throw new Exception("El usuario no existe.");
        }
        // Validación de contraseña hash
        if (!password_verify($password, $data['clave'])) {
            throw new Exception("La contraseña es incorrecta.");
        }
        // Asignar los datos del usuario si la autenticación es exitosa
        $this->id_usuario = $data['id_usuario'];
        $this->email_usuario = $data['correo'];
        return true;
    }
    public function editProfile()
    {
        // Validación de existencia y formato de parámetros
        if (!isset($this->id_cargo) || empty($this->id_cargo) || !is_numeric($this->id_cargo)) {
            throw new InvalidArgumentException("El ID de cargo debe ser un número entero válido.");
        }
        if (!isset($this->nombre_usuario) || empty($this->nombre_usuario)) {
            throw new InvalidArgumentException("El nombre de usuario no puede estar vacío.");
        }
        if (!isset($this->apellido_usuario) || empty($this->apellido_usuario)) {
            throw new InvalidArgumentException("El apellido de usuario no puede estar vacío.");
        }
        if (!isset($this->email_usuario) || empty($this->email_usuario) || !filter_var($this->email_usuario, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException("El correo electrónico no tiene un formato válido.");
        }
        // Validación de existencia del usuario
        if (!$this->usuarioExiste($this->id_usuario)) {
            throw new Exception("El usuario no existe.");
        }
        // Consulta SQL para actualizar el perfil del usuario
        $sql = 'UPDATE tb_usuarios
                SET id_cargo = ?, nombre = ?, apellido = ?, correo = ?
                WHERE id_usuario = ?';
        // Parámetros para la consulta SQL
        $params = array($this->id_cargo, $this->nombre_usuario, $this->apellido_usuario, $this->email_usuario, $this->id_usuario);
        // Ejecutar la consulta
        return Database::executeRow($sql, $params);
    }
    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    /* FUNCION PARA BUSCAR USUARIOS POR: CORREO, NOMBRE Y APELLIDO */
    public function searchRows()
    {
        // Obtener el valor de búsqueda y aplicar el formato adecuado
        $searchValue = '%' . Validator::getSearchValue() . '%';
        // Validación de la entrada de búsqueda
        if (empty($searchValue)) {
            throw new InvalidArgumentException("El valor de búsqueda no puede estar vacío.");
        }
        // Consulta SQL para buscar usuarios por apellido, nombre o cargo
        $sql = 'SELECT id_usuario, nombre, apellido, correo, cargo
                FROM tb_usuarios
                INNER JOIN tb_cargos USING(id_cargo) 
                WHERE apellido LIKE ? OR nombre LIKE ? OR cargo LIKE ?
                ORDER BY apellido';
        // Parámetros para la consulta SQL
        $params = array($searchValue, $searchValue, $searchValue);
        // Ejecutar la consulta
        return Database::getRows($sql, $params);
    }
    /* FUNCION PARA CREAR USUARIOS, USANDO PROCEDIMIENTO ALMACENADO */
    public function createRow()
    {
        // Validación de existencia y formato de parámetros
        if (!isset($this->id_cargo) || empty($this->id_cargo) || !is_numeric($this->id_cargo)) {
            throw new InvalidArgumentException("El ID de cargo debe ser un número entero válido.");
        }
        if (!isset($this->nombre_usuario) || empty($this->nombre_usuario)) {
            throw new InvalidArgumentException("El nombre de usuario no puede estar vacío.");
        }
        if (!isset($this->apellido_usuario) || empty($this->apellido_usuario)) {
            throw new InvalidArgumentException("El apellido de usuario no puede estar vacío.");
        }
        if (!isset($this->email_usuario) || empty($this->email_usuario) || !filter_var($this->email_usuario, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException("El correo electrónico no tiene un formato válido.");
        }
        if (!isset($this->clave_usuario) || empty($this->clave_usuario)) {
            throw new InvalidArgumentException("La contraseña no puede estar vacía.");
        }
        // Validación de correo electrónico único
        if ($this->emailUso($this->email_usuario)) {
            throw new Exception("El correo electrónico ya está siendo utilizado por otro usuario.");
        }
        // Consulta SQL para insertar un nuevo usuario
        $sql = 'CALL InsertarUsuario(?, ?, ?, ?, ?)';
        $params = array($this->id_cargo, $this->nombre_usuario, $this->apellido_usuario, $this->email_usuario, $this->clave_usuario);
        // Ejecutar la consulta
        return Database::executeRow($sql, $params);
    }
    /* FUNCION PARA MOSTRAR A LOS USUARIOS */  
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
        // Validación del ID de usuario
        if (!isset($this->id) || empty($this->id) || !is_numeric($this->id)) {
            throw new InvalidArgumentException("El ID de usuario no es válido.");
        }
        $sql = 'SELECT id_usuario, nombre, apellido, correo, cargo
                FROM tb_usuarios
                INNER JOIN tb_cargos USING(id_cargo) 
                WHERE id_usuario = ?';
        $params = array($this->id);
        // Obtener el usuario con el ID proporcionado
        $user = Database::getRow($sql, $params);
        // Manejo de resultados vacíos
        if (!$user) {
            throw new Exception("No se encontró ningún usuario con el ID proporcionado.");
        }
        return $user;
    }
    /* FUNCION PARA ACTUALIZAR LOS DATOS DEL USUARIO */
    public function updateRow()
    {
        // Validación de existencia y formato de parámetros
        if (!isset($this->id_usuario) || empty($this->id_usuario) || !is_numeric($this->id_usuario)) {
            throw new InvalidArgumentException("El ID de usuario no es válido.");
        }
        if (!isset($this->nombre_usuario) || empty($this->nombre_usuario)) {
            throw new InvalidArgumentException("El nombre de usuario no puede estar vacío.");
        }
        if (!isset($this->apellido_usuario) || empty($this->apellido_usuario)) {
            throw new InvalidArgumentException("El apellido de usuario no puede estar vacío.");
        }
        if (!isset($this->id_cargo) || empty($this->id_cargo) || !is_numeric($this->id_cargo)) {
            throw new InvalidArgumentException("El ID de cargo debe ser un número entero válido.");
        }
        $sql = 'UPDATE tb_usuarios
                SET nombre = ?, apellido = ?, id_cargo = ?
                WHERE id_usuario = ?';
        $params = array($this->nombre_usuario, $this->apellido_usuario, $this->id_cargo, $this->id_usuario);
        // Ejecutar la consulta de actualización
        return Database::executeRow($sql, $params);
    }
    /* FUNCION PARA ELIMINAR UN USUARIO*/
    public function deleteRow()
    {
        // Validación del ID de usuario
        if (!isset($this->id_usuario) || empty($this->id_usuario) || !is_numeric($this->id_usuario)) {
            throw new InvalidArgumentException("El ID de usuario no es válido.");
        }
        $sql = 'DELETE FROM tb_usuarios
                WHERE id_usuario = ?';
        $params = array($this->id_usuario);
        // Ejecutar la consulta de eliminación
        return Database::executeRow($sql, $params);
    }
    /* FUNCION PARA VERIFICAR DUPLICADOS EN LOS USUARIOS */
    public function checkDuplicate($value)
    {
        // Validación del correo electrónico (si es necesario)
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException("El correo electrónico no tiene un formato válido.");
        }
        $sql = 'SELECT id_usuario, correo
                FROM tb_usuarios
                WHERE correo = ?';
        $params = array($value);
        // Obtener el usuario con el correo electrónico proporcionado
        return Database::getRow($sql, $params);
    }
}