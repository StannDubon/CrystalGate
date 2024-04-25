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
    // Validar que el nombre de usuario y la contraseña no estén vacíos
    if(empty($username) || empty($password)) {
        return false;
    }
    // Filtrar y escapar el nombre de usuario para evitar ataques de inyección de SQL
    $username = filter_var($username, FILTER_SANITIZE_STRING);
    // Consulta preparada para evitar ataques de inyección de SQL
    $sql = 'SELECT id_administrador, email_administrador, clave_administrador, nombre_administrador
            FROM tb_administradores
            WHERE email_administrador = ?';
    $params = array($username);
    $data = Database::getRow($sql, $params);
    // Verificar si se encontraron datos
    if (!$data) {
        return false;
    }
    // Verificar si la contraseña coincide
    if (password_verify($password, $data['clave_administrador'])) {
        // Limpiar y establecer variables de sesión
        $_SESSION['idAdministrador'] = $data['id_administrador'];
        $_SESSION['nombreAdministrador'] = $data['nombre_administrador'];
        return true;
    } else {
        return false;
    }
    }

    public function checkPass($password)
    {
    // Verificar si la contraseña proporcionada no está vacía
    if(empty($password)) {
        return false;
    }
    // Obtener el ID del administrador de la sesión
    $adminId = $_SESSION['idAdministrador'];
    // Validar que el ID del administrador de la sesión no esté vacío y sea un entero válido
    if(empty($adminId) || !is_numeric($adminId)) {
        return false;
    }
    // Consulta preparada para obtener la contraseña del administrador
    $sql = 'SELECT clave_administrador
            FROM tb_administradores
            WHERE id_administrador = ?';
    $params = array($adminId);
    $data = Database::getRow($sql, $params);
    // Verificar si se encontró la contraseña del administrador
    if (!$data || !isset($data['clave_administrador'])) {
        return false;
    }
    // Verificar si la contraseña coincide con el hash almacenado en la base de datos
    if (password_verify($password, $data['clave_administrador'])) {
        return true;
    } else {
        return false;
    }
    }

    public function changePassword($newPassword)
    {
    // Verificar si la nueva contraseña no está vacía
    if (empty($newPassword)) {
        return false;
    }
    // Obtener el ID del administrador de la sesión
    $adminId = $_SESSION['idAdministrador'];
    // Validar que el ID del administrador de la sesión no esté vacío y sea un entero válido
    if (empty($adminId) || !is_numeric($adminId)) {
        return false;
    }
    // Hash de la nueva contraseña
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
    // Consulta preparada para actualizar la contraseña del administrador
    $sql = 'UPDATE tb_administradores
            SET clave_administrador = ?
            WHERE id_administrador = ?';
    $params = array($hashedPassword, $adminId);
    // Ejecutar la consulta
    return Database::executeRow($sql, $params);
    }
    public function readProfile()
    {
    // Verificar si el ID del administrador de la sesión no está vacío y es un entero válido
    $adminId = $_SESSION['idAdministrador'];
    if (empty($adminId) || !is_numeric($adminId)) {
        return false;
    }
    // Consulta preparada para obtener el perfil del administrador
    $sql = 'SELECT id_administrador, nombre_administrador, apellido_administrador, email_administrador 
            FROM tb_administradores
            WHERE id_administrador = ?';
    $params = array($adminId);
    // Obtener el perfil del administrador
    return Database::getRow($sql, $params);
    }

    public function editProfile()
    {
    // Verificar que los campos no estén vacíos
    if (empty($this->nombre_administrador) || empty($this->apellido_administrador) || empty($this->email_administrador)) {
        return false;
    }
    // Verificar que el correo electrónico sea válido
    if (!filter_var($this->email_administrador, FILTER_VALIDATE_EMAIL)) {
        return false;
    }
    // Obtener el ID del administrador de la sesión
    $adminId = $_SESSION['idAdministrador'];
    // Validar que el ID del administrador de la sesión no esté vacío y sea un entero válido
    if (empty($adminId) || !is_numeric($adminId)) {
        return false;
    }
    // Consulta preparada para actualizar el perfil del administrador
    $sql = 'UPDATE tb_administradores
            SET nombre_administrador = ?, apellido_administrador = ?, correo_administrador = ?
            WHERE id_administrador = ?';
    $params = array($this->nombre_administrador, $this->apellido_administrador, $this->email_administrador, $adminId);
    // Ejecutar la consulta
    return Database::executeRow($sql, $params);
    }

    /* Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).*/

    /* FUNCION PARA BUSCAR ADMINISTRADORES POR NOMBRE Y APELLIDO */
    public function searchRows()
    {
    // Obtener el valor de búsqueda y aplicar filtrado básico
    $searchValue = Validator::getSearchValue();
    if (empty($searchValue)) {
        return false; // Evitar consultas innecesarias si el valor de búsqueda está vacío
    }
    // Sanitizar el valor de búsqueda para prevenir ataques de inyección de SQL
    $searchValue = '%' . filter_var($searchValue, FILTER_SANITIZE_STRING) . '%';
    // Consulta preparada para buscar administradores por nombre y apellido
    $sql = 'SELECT id_administrador, nombre_administrador, apellido_administrador, email_administrador
            FROM tb_administradores
            WHERE apellido_administrador LIKE ? OR nombre_administrador LIKE ?
            ORDER BY apellido_administrador';
    $params = array($searchValue, $searchValue);
    // Obtener las filas que coincidan con la búsqueda
    return Database::getRows($sql, $params);
    }

    /* FUNCION PARA CREAR ADMINISTRADORES, USANDO PROCEDIMIENTO ALMACENADO */ 
    public function createRow()
    {
    // Verificar que los campos no estén vacíos
    if (empty($this->nombre_administrador) || empty($this->apellido_administrador) || empty($this->email_administrador) || empty($this->clave_administrador)) {
        return false;
    }
    // Verificar el formato del correo electrónico
    if (!filter_var($this->email_administrador, FILTER_VALIDATE_EMAIL)) {
        return false;
    }
    // Validar la fortaleza de la contraseña (opcional)
    // Consulta preparada para llamar al procedimiento almacenado
    $sql = 'CALL InsertarAdministrador(?, ?, ?, ?)';
    $params = array(
        htmlspecialchars($this->nombre_administrador), // Escapar datos de entrada
        htmlspecialchars($this->apellido_administrador),
        htmlspecialchars($this->email_administrador),
        password_hash($this->clave_administrador, PASSWORD_DEFAULT) // Almacenamiento seguro de contraseña
    );
    // Ejecutar la consulta
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
    // Validar que el ID del administrador no esté vacío y sea un entero válido
    if (empty($this->id_administrador) || !is_numeric($this->id_administrador)) {
        return false;
    }
    // Consulta preparada para recuperar un único administrador por su ID
    $sql = 'SELECT id_administrador, nombre_administrador, apellido_administrador, email_administrador 
            FROM tb_administradores
            WHERE id_administrador = ?';
    $params = array($this->id_administrador);
    // Obtener el administrador
    return Database::getRow($sql, $params);
    }

    /* FUNCION PARA ACTUALIZAR LOS DATOS DEL ADMINISTRADOR */
    public function updateRow()
    {
    // Validar que los campos no estén vacíos
    if (empty($this->nombre_administrador) || empty($this->apellido_administrador) || empty($this->email_administrador) || empty($this->id_administrador)) {
        return false;
    }
    // Verificar el formato del correo electrónico
    if (!filter_var($this->email_administrador, FILTER_VALIDATE_EMAIL)) {
        return false;
    }
    // Validar que el ID del administrador sea un entero válido
    if (!is_numeric($this->id_administrador)) {
        return false;
    }
    // Consulta preparada para actualizar los datos del administrador
    $sql = 'UPDATE tb_administradores
            SET nombre_administrador = ?, apellido_administrador = ?, correo_administrador = ?
            WHERE id_administrador = ?';
    $params = array(
        htmlspecialchars($this->nombre_administrador),
        htmlspecialchars($this->apellido_administrador),
        htmlspecialchars($this->email_administrador),
        $this->id_administrador
    );
    // Ejecutar la consulta
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
    // Validar que el ID del administrador no esté vacío y sea un entero válido
    if (empty($this->id_administrador) || !is_numeric($this->id_administrador)) {
        return false;
    }
    // Consulta preparada para eliminar el administrador por su ID
    $sql = 'DELETE FROM tb_administradores
            WHERE id_administrador = ?';
    $params = array($this->id_administrador);
    // Ejecutar la consulta
    return Database::executeRow($sql, $params);
    }
}