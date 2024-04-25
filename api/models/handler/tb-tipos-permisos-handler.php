<?php
require_once('../../helpers/database.php');
class tbTiposProcesosHandler{

    protected $id_tipo_proceso = null;
    protected $tipo_proceso = null;
    protected $id_clasificacion_proceso = null;
    protected $lapso_proceso = null;

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    /* FUNCION PARA BUSCAR TIPOS DE PROCESOS POR EL TIPO Y LA CLASIFICACION */
    public function searchRows($value)
    {
    // Validación del valor de búsqueda
    if (!isset($value) || empty($value)) {
        throw new InvalidArgumentException("El valor de búsqueda no puede estar vacío.");
    }
    // Consulta SQL para buscar tipos de permisos según el nombre del tipo o la clasificación del permiso
    $sql = 'SELECT id_tipo_permiso, tipo_permiso, clasificacion_permiso, lapso
            FROM tb_tipos_permisos
            INNER JOIN tb_clasificaciones_permisos USING(id_clasificacion_permiso)
            WHERE tipo_permiso LIKE ? OR clasificacion_permiso LIKE ?
            ORDER BY clasificacion_permiso';
    // Ejecutar la consulta con el valor proporcionado
    return Database::getRows($sql, array("%$value%", "%$value%"));
    }
    /* FUNCION PARA CREAR TIPOS DE PROCESOS, USANDO PROCEDIMIENTO ALMACENADO */
    public function createRow()
    {
    // Validación de existencia y formato de parámetros
    if (!isset($this->tipo_proceso) || empty($this->tipo_proceso)) {
        throw new InvalidArgumentException("El nombre del tipo de permiso no puede estar vacío.");
    }
    if (!isset($this->id_clasificacion_proceso) || empty($this->id_clasificacion_proceso) || !is_numeric($this->id_clasificacion_proceso)) {
        throw new InvalidArgumentException("El ID de clasificación de permiso debe ser un número entero válido.");
    }
    if (!isset($this->lapso_proceso) || empty($this->lapso_proceso)) {
        throw new InvalidArgumentException("El lapso del tipo de permiso no puede estar vacío.");
    }
    // Consulta SQL para llamar al procedimiento almacenado que inserta un nuevo tipo de permiso
    $sql = 'CALL InsertarTipoPermiso(?, ?, ?, ?)';
    $params = array($this->tipo_proceso, $this->id_clasificacion_proceso, $this->lapso_proceso, $_SESSION['idAdministrador']);
    // Ejecutar la consulta
    return Database::executeRow($sql, $params);
    }
    /* FUCNION PARA MOSTRAR LOS TIPOS DE PROCESOS */
    public function readAll()
    {
        $sql = 'SELECT id_tipo_permiso, tipo_permiso, clasificacion_permiso, lapso
                FROM tb_tipos_permisos
                INNER JOIN tb_clasificaciones_permisos USING(id_clasificacion_permiso)
                ORDER BY clasificacion_permiso';
        return Database::getRows($sql);
    }
    /* FUNCION PARA MOSTRAR LOS DATOS DE UN TIPO DE PROCESO */
    public function readOne()
    {
    // Validación del parámetro de búsqueda
    if (!isset($this->id_tipo_proceso) || empty($this->id_tipo_proceso) || !is_numeric($this->id_tipo_proceso)) {
        throw new InvalidArgumentException("El ID de tipo de permiso debe ser un número entero válido.");
    }
    // Consulta SQL para obtener los datos de un tipo de permiso específico
    $sql = 'SELECT id_tipo_permiso, tipo_permiso, clasificacion_permiso, lapso
            FROM tb_tipos_permisos
            INNER JOIN tb_clasificaciones_permisos USING(id_clasificacion_permiso)
            WHERE id_tipo_permiso = ?';
    // Ejecutar la consulta
    return Database::getRow($sql, array($this->id_tipo_proceso));
    }
    /* FUNCION PARA ACTUALIZAR LOS DATOS DEL TIPO DE PROCESO */
    public function updateRow()
    {
    // Validación de existencia y formato de parámetros
    if (!isset($this->tipo_proceso) || empty($this->tipo_proceso)) {
        throw new InvalidArgumentException("El nombre del tipo de permiso no puede estar vacío.");
    }

    if (!isset($this->id_clasificacion_proceso) || empty($this->id_clasificacion_proceso) || !is_numeric($this->id_clasificacion_proceso)) {
        throw new InvalidArgumentException("El ID de clasificación de permiso debe ser un número entero válido.");
    }
    // Validación de ID de tipo de permiso
    if (!isset($this->id_tipo_proceso) || empty($this->id_tipo_proceso) || !is_numeric($this->id_tipo_proceso)) {
        throw new InvalidArgumentException("El ID de tipo de permiso debe ser un número entero válido.");
    }
    // Consulta SQL para actualizar los datos del tipo de permiso
    $sql = 'UPDATE tb_tipos_permisos
            SET tipo_permiso = ?, id_clasificacion_permiso = ?, lapso = ?
            WHERE id_tipo_permiso = ?';
    // Ejecutar la consulta
    return Database::executeRow($sql, array($this->tipo_proceso, $this->id_clasificacion_proceso, $this->lapso_proceso, $this->id_tipo_proceso));
    }
    /* FUNCION PARA ELIMINAR UN TIPO DE PROCESO */
    public function deleteRow()
    {
    // Validación de existencia y formato del ID del tipo de permiso
    if (!isset($this->id_tipo_proceso) || empty($this->id_tipo_proceso) || !is_numeric($this->id_tipo_proceso)) {
        throw new InvalidArgumentException("El ID de tipo de permiso debe ser un número entero válido.");
    }
    // Consulta SQL para eliminar el tipo de permiso
    $sql = 'DELETE FROM tb_tipos_permisos
            WHERE id_tipo_permiso = ?';

    // Ejecutar la consulta
    return Database::executeRow($sql, array($this->id_tipo_proceso));
    }
}