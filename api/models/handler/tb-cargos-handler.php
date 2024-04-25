<?php
require_once('../../helpers/database.php');
class tbTiposProcesosHandler{

    protected $id_cargo = null;
    protected $cargo = null;
    
    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    /* FUNCION PARA BUSCAR LOS CARGOS POR EL NOMBRE DEL CARGO */
    public function searchRows($value)
    {
    // Validación de entrada
    if (empty($value)) {
        throw new Exception("El valor de búsqueda está vacío.");
    }
    // Validación del formato de $value
    if (!preg_match("/^[a-zA-Z\s]+$/", $value)) {
        throw new Exception("El valor de búsqueda contiene caracteres no válidos.");
    }
    // Validación del tamaño de $value
    if (strlen($value) > 100) {
        throw new Exception("El valor de búsqueda es demasiado largo.");
    }
    $sql = 'SELECT id_cargo, cargo
            FROM tb_cargos
            WHERE cargo LIKE ?';
    $params = array("%$value%");
    return Database::getRows($sql, $params);
    }
    /* FUNCION PARA CREAR TIPOS DE CARGOS, USANDO PROCEDIMIENTO ALMACENADO */
    public function createRow()
    {
    // Validación de la sesión
    if (!isset($_SESSION['idAdministrador']) || empty($_SESSION['idAdministrador'])) {
        throw new Exception("La sesión de administrador no está iniciada.");
    }
    // Validación de $this->cargo
    if (empty($this->cargo)) {
        throw new Exception("El campo de cargo está vacío.");
    }
    // Validación del formato de $this->cargo
    if (!preg_match("/^[a-zA-Z\s]+$/", $this->cargo)) {
        throw new Exception("El cargo contiene caracteres no válidos.");
    }
    // Validación de permisos
    if (!$this->usuarioTienePermisoDeCreacion()) {
        throw new Exception("No tienes permiso para crear un nuevo cargo.");
    }
    $sql = 'CALL InsertarCargo(?, ?)';
    $params = array($this->cargo, $_SESSION['idAdministrador']);
    return Database::executeRow($sql, $params);
    }

    /* FUCNION PARA MOSTRAR LOS CARGOS */
    public function readAll()
    {
    // Validación de permisos (ejemplo)
    if (!$this->usuarioTienePermisoDeLectura()) {
        throw new Exception("No tienes permiso para realizar esta operación.");
    }
    // Consulta SQL para obtener todos los cargos
    $sql = 'SELECT id_cargo, cargo FROM tb_cargos';
    // Ejecutar la consulta y obtener los resultados
    $result = Database::getRows($sql);
    // Validación de resultados vacíos
    if (empty($result)) {
        throw new Exception("No se encontraron cargos en la base de datos.");
    }
    // Validación de formato de datos
    foreach ($result as $row) {
        if (!is_numeric($row['id_cargo'])) {
            throw new Exception("ID de cargo no válido: " . $row['id_cargo']);
        }
    }
    return $result;
    }
    /* FUNCION PARA MOSTRAR LOS DATOS DE UN CARGO */
    public function readOne()
    {
    // Validación de existencia de $this->id_cargo
    if (!isset($this->id_cargo) || empty($this->id_cargo)) {
        throw new Exception("El ID del cargo no está definido.");
    }
    // Validación del formato de $this->id_cargo
    if (!is_numeric($this->id_cargo) || intval($this->id_cargo) <= 0) {
        throw new Exception("El ID del cargo no es válido.");
    }
    // Consulta SQL para obtener el cargo por su ID
    $sql = 'SELECT id_cargo, cargo FROM tb_cargos WHERE id_cargo = ?';
    $params = array($this->id_cargo);
    // Ejecutar la consulta y obtener el resultado
    $result = Database::getRow($sql, $params);
    // Validación de resultado vacío
    if (empty($result)) {
        throw new Exception("No se encontró ningún cargo con el ID proporcionado.");
    }
    return $result;
    }
    /* FUNCION PARA ACTUALIZAR LOS DATOS DEL CARGO  */
    public function updateRow()
    {
    // Validación de existencia de $this->id_cargo
    if (!isset($this->id_cargo) || empty($this->id_cargo)) {
        throw new Exception("El ID del cargo no está definido.");
    }
    // Validación del formato de $this->id_cargo
    if (!is_numeric($this->id_cargo) || intval($this->id_cargo) <= 0) {
        throw new Exception("El ID del cargo no es válido.");
    }
    // Validación de existencia de $this->cargo
    if (!isset($this->cargo) || empty($this->cargo)) {
        throw new Exception("El nombre del cargo no está definido.");
    }
    // Validación de permisos
    if (!$this->usuarioTienePermisoDeActualizacion()) {
        throw new Exception("No tienes permiso para realizar esta operación.");
    }
    // Consulta SQL para actualizar el cargo
    $sql = 'UPDATE tb_cargos SET cargo = ? WHERE id_cargo = ?';
    $params = array($this->cargo, $this->id_cargo);
    // Ejecutar la consulta
    return Database::executeRow($sql, $params);
    }
    /* FUNCION PARA ELIMINAR UN CARGO */
    public function deleteRow()
    {
    // Validación de existencia de $this->id_cargo
    if (!isset($this->id_cargo) || empty($this->id_cargo)) {
        throw new Exception("El ID del cargo no está definido.");
    }
    // Validación del formato de $this->id_cargo
    if (!is_numeric($this->id_cargo) || intval($this->id_cargo) <= 0) {
        throw new Exception("El ID del cargo no es válido.");
    }
    // Validación de permisos (ejemplo)
    if (!$this->usuarioTienePermisoDeEliminacion()) {
        throw new Exception("No tienes permiso para realizar esta operación.");
    }
    // Consulta SQL para eliminar el cargo
    $sql = 'DELETE FROM tb_cargos WHERE id_cargo = ?';
    $params = array($this->id_cargo);
    // Ejecutar la consulta
    return Database::executeRow($sql, $params);
    }
}