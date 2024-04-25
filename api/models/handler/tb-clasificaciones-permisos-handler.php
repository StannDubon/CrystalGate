<?php
require_once('../../helpers/database.php');
class tbTiposProcesosHandler{

    protected $id_clasificacion_permiso = null;
    protected $clasificacion_permiso = null;

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    /* FUNCION PARA BUSCAR LAS CLASIFICACION DE PERMISO POR EL NOMBRE DE LA CLASIFICACION */
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
    $sql = 'SELECT id_clasificacion_permiso, clasificacion_permiso
            FROM tb_clasificaciones_permisos
            WHERE clasificacion_permiso LIKE ?';
    $params = array("%$value%");
    return Database::getRows($sql, $params);
    }
    /* FUNCION PARA CREAR TIPOS DE CLASIFICACION DE PERMISO , USANDO PROCEDIMIENTO ALMACENADO */
    public function createRow()
    {
    // Validación de la sesión
    if (!isset($_SESSION['idAdministrador']) || empty($_SESSION['idAdministrador'])) {
        throw new Exception("La sesión de administrador no está iniciada.");
    }
    // Validación de $this->clasificacion_permiso
    if (empty($this->clasificacion_permiso)) {
        throw new Exception("El campo de clasificación de permiso está vacío.");
    }
    // Validación del formato de $this->clasificacion_permiso
    if (!preg_match("/^[a-zA-Z\s]+$/", $this->clasificacion_permiso)) {
        throw new Exception("La clasificación de permiso contiene caracteres no válidos.");
    }
    $sql = 'CALL InsertarClasificacionPermiso(?, ?)';
    $params = array($this->clasificacion_permiso, $_SESSION['idAdministrador']);
    return Database::executeRow($sql, $params);
    }
    /* FUCNION PARA MOSTRAR LAS CLASIFICACIONES DE PERMISOS  */
    public function readAll()
    {
        $sql = 'SELECT id_clasificacion_permiso, clasificacion_permiso
                FROM tb_clasificaciones_permisos';
        return Database::getRows($sql);
    }
    /* FUNCION PARA MOSTRAR LOS DATOS DE UNA CLASIFICACION DE PERMISO  */
    public function readOne()
    {
    // Validación de existencia de $this->id_clasificacion_permiso
    if (!isset($this->id_clasificacion_permiso) || empty($this->id_clasificacion_permiso)) {
        throw new Exception("El ID de clasificación de permiso no está definido.");
    }
    // Validación del formato de $this->id_clasificacion_permiso
    if (!is_numeric($this->id_clasificacion_permiso) || intval($this->id_clasificacion_permiso) <= 0) {
        throw new Exception("El ID de clasificación de permiso no es válido.");
    }
    // Consulta SQL para obtener la clasificación de permiso por su ID
    $sql = 'SELECT id_clasificacion_permiso, clasificacion_permiso FROM tb_clasificaciones_permisos WHERE id_clasificacion_permiso = ?';
    $params = array($this->id_clasificacion_permiso);
    // Ejecutar la consulta y obtener el resultado
    $result = Database::getRow($sql, $params);
    // Validación de resultado vacío (opcional)
    if (empty($result)) {
        throw new Exception("No se encontró ninguna clasificación de permiso con el ID proporcionado.");
    }
    return $result;
    }
    /* FUNCION PARA ACTUALIZAR LOS DATOS DE LA CLASIFICACION DE PERMISO  */
    public function updateRow()
    {
    // Validación de existencia de $this->id_clasificacion_permiso
    if (!isset($this->id_clasificacion_permiso) || empty($this->id_clasificacion_permiso)) {
        throw new Exception("El ID de clasificación de permiso no está definido.");
    }
    // Validación del formato de $this->id_clasificacion_permiso
    if (!is_numeric($this->id_clasificacion_permiso) || intval($this->id_clasificacion_permiso) <= 0) {
        throw new Exception("El ID de clasificación de permiso no es válido.");
    }
    // Validación de existencia de $this->clasificacion_permiso
    if (!isset($this->clasificacion_permiso) || empty($this->clasificacion_permiso)) {
        throw new Exception("El nombre de clasificación de permiso no está definido.");
    }
    // Consulta SQL para actualizar la clasificación de permiso
    $sql = 'UPDATE tb_clasificaciones_permisos SET clasificacion_permiso = ? WHERE id_clasificacion_permiso = ?';
    $params = array($this->clasificacion_permiso, $this->id_clasificacion_permiso);
    // Ejecutar la consulta
    return Database::executeRow($sql, $params);
    }
    /* FUNCION PARA ELIMINAR UNA CLASIFICACION DE PERMISO */
    public function deleteRow()
    {
    // Validación de existencia de $this->id_clasificacion_permiso
    if (!isset($this->id_clasificacion_permiso) || empty($this->id_clasificacion_permiso)) {
        throw new Exception("El ID de clasificación de permiso no está definido.");
    }
    // Validación del formato de $this->id_clasificacion_permiso
    if (!is_numeric($this->id_clasificacion_permiso) || intval($this->id_clasificacion_permiso) <= 0) {
        throw new Exception("El ID de clasificación de permiso no es válido.");
    }
    // Consulta SQL para eliminar la clasificación de permiso
    $sql = 'DELETE FROM tb_clasificaciones_permisos WHERE id_clasificacion_permiso = ?';
    $params = array($this->id_clasificacion_permiso);
    // Ejecutar la consulta
    return Database::executeRow($sql, $params);
    }
}