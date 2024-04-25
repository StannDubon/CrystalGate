<?php
require_once('../../helpers/database.php');

class tbProcesosHandler{

    protected $id_proceso = null;
    protected $id_usuario = null;
    protected $id_tipo_proceso = null;
    protected $id_estado_proceso = null;
    protected $fecha_inicio = null;
    protected $fecha_final = null;
    protected $fecha_envio = null;
    protected $documento_proceso = null;
    protected $descripcion_proceso = null;

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    /* FUNCION PARA BUSCAR PERMISOS POR EL TIPO Y EL NOMBRE */
    public function searchRows($values)
    {
    // Validación de los parámetros de búsqueda
    foreach ($values as $value) {
        if (!isset($value) || $value === '') {
            throw new Exception("Los parámetros de búsqueda no pueden estar vacíos.");
        }
    }
    // Validación del formato de fechas
    $fecha_inicio = DateTime::createFromFormat('d-m-y', $values[3]);
    $fecha_final = DateTime::createFromFormat('d-m-y', $values[4]);

    if ($fecha_inicio === false || $fecha_inicio->format('d-m-y') !== $values[3]) {
        throw new Exception("La fecha de inicio no tiene un formato válido.");
    }
    if ($fecha_final === false || $fecha_final->format('d-m-y') !== $values[4]) {
        throw new Exception("La fecha final no tiene un formato válido.");
    }
    // Validación de permisos (ejemplo)
    if (!$this->usuarioTienePermisoDeBusqueda()) {
        throw new Exception("No tienes permiso para realizar esta búsqueda.");
    }
    $sql = 'SELECT u.nombre, tp.tipo_permiso, p.fecha_inicio, p.fecha_final, ep.estado_permiso
            FROM tb_permisos p
            INNER JOIN tb_usuarios u ON p.id_usuario = u.id_usuario
            INNER JOIN tb_tipos_permisos tp ON p.id_tipo_permiso = tp.id_tipo_permiso
            INNER JOIN tb_clasificaciones_permisos cp ON tp.id_clasificacion_permiso = cp.id_clasificacion_permiso
            INNER JOIN tb_estados_permisos ep ON p.id_estado_permiso = ep.id_estado_permiso
            WHERE u.nombre LIKE ? OR tp.tipo_permiso LIKE ? OR cp.clasificacion_permiso LIKE ? OR p.fecha_inicio >= ? OR p.fecha_final <= ? OR ep.estado_permiso LIKE ?
            ORDER BY ep.estado_permiso';
    return Database::getRows($sql, $values);
    }
    /* FUNCION PARA BUSCAR PERMISOS POR LA FECHA DE ENVIO*/
    public function searchRows($value)
    {
    // Validación del valor de búsqueda
    if (!isset($value) || empty($value)) {
        throw new Exception("El valor de búsqueda no puede estar vacío.");
    }
    $sql = 'SELECT u.nombre, tp.tipo_permiso, p.fecha_inicio, p.fecha_final, ep.estado_permiso
            FROM tb_permisos p
            INNER JOIN tb_usuarios u ON p.id_usuario = u.id_usuario
            INNER JOIN tb_tipos_permisos tp ON p.id_tipo_permiso = tp.id_tipo_permiso
            INNER JOIN tb_clasificaciones_permisos cp ON tp.id_clasificacion_permiso = cp.id_clasificacion_permiso
            INNER JOIN tb_estados_permisos ep ON p.id_estado_permiso = ep.id_estado_permiso
            WHERE ep.estado_permiso LIKE ?
            ORDER BY p.fecha_envio DESC';
    return Database::getRows($sql, array($value));
    }
    /* FUNCION PARA CREAR PERMISOS, USANDO PROCEDIMIENTO ALMACENADO */
    public function createRow()
    {
    // Validación de existencia y formato de parámetros
    if (!isset($this->id_usuario) || empty($this->id_usuario)) {
        throw new Exception("El ID de usuario no puede estar vacío.");
    }
    if (!isset($this->id_tipo_proceso) || empty($this->id_tipo_proceso)) {
        throw new Exception("El ID de tipo de proceso no puede estar vacío.");
    }
    // Consulta SQL para llamar al procedimiento almacenado que inserta un nuevo proceso
    $sql = 'CALL InsertarProceso(?, ?, ?, ?, ?, ?, ?, ?)';
    $params = array(
        $this->id_usuario, 
        $this->id_tipo_proceso, 
        $this->id_estado_proceso, 
        $this->fecha_inicio, 
        $this->fecha_final, 
        $this->fecha_envio, 
        $this->documento_proceso, 
        $this->descripcion_proceso, 
        $_SESSION['idAdministrador']
    );
    // Ejecutar la consulta
    return Database::executeRow($sql, $params);
    }
    /* FUCNION PARA MOSTRAR LOS PERMISOS */
    public function readAll($value)
    {
    // Validación del parámetro de búsqueda
    if (!isset($value) || empty($value)) {
        throw new InvalidArgumentException("El valor de búsqueda no puede estar vacío.");
    }
    // Consulta SQL para obtener todos los permisos filtrados por una clasificación de permisos específica
    $sql = 'SELECT u.nombre, tp.tipo_permiso, p.fecha_inicio, p.fecha_final, ep.estado_permiso
            FROM tb_permisos p
            INNER JOIN tb_usuarios u ON p.id_usuario = u.id_usuario
            INNER JOIN tb_tipos_permisos tp ON p.id_tipo_permiso = tp.id_tipo_permiso
            INNER JOIN tb_clasificaciones_permisos cp ON tp.id_clasificacion_permiso = cp.id_clasificacion_permiso
            INNER JOIN tb_estados_permisos ep ON p.id_estado_permiso = ep.id_estado_permiso
            WHERE cp.clasificacion_permiso LIKE ?
            ORDER BY ep.estado_permiso';
    // Ejecutar la consulta con el valor proporcionado
    return Database::getRows($sql, array($value));
    }
    /* FUNCION PARA MOSTRAR LOS DATOS DE UN PERMISO */
    public function readOne()
    {
        $sql = 'SELECT p.id_permiso, u.id_usuario, u.nombre, u.correo, tp.tipo_permiso, cp.clasificacion_permiso, p.fecha_inicio, p.fecha_final, 
                ep.estado_proceso, p.documento_permiso, p.descripcion_permiso, p.fecha_envio
                FROM tb_permisos p
                INNER JOIN tb_usuarios u ON p.id_usuario = u.id_usuario
                INNER JOIN tb_tipos_permisos tp ON p.id_tipo_permiso = tp.id_tipo_permiso
                INNER JOIN tb_clasificaciones_permisos cp ON tp.id_clasificacion_permiso = cp.id_clasificacion_permiso
                INNER JOIN tb_estados_permisos ep ON p.id_estado_permiso = ep.id_estado_permiso
                WHERE p.id_permiso LIKE ?';
        $params = array($this->id_proceso);
        return Database::getRow($sql, $params);
    }
    /* FUNCION PARA ACTUALIZAR LOS DATOS DEL PERMISO */
    public function updateRow()
    {
    // Validación de existencia y formato de parámetros
    if (!isset($this->id_tipo_proceso) || empty($this->id_tipo_proceso) || !is_numeric($this->id_tipo_proceso)) {
        throw new InvalidArgumentException("El ID de tipo de proceso debe ser un número entero válido.");
    }
    // Consulta SQL para actualizar el permiso
    $sql = 'UPDATE tb_permisos
            SET id_tipo_permiso = ?, fecha_inicio = ?, fecha_final = ?, id_estado_permiso = ?, descripcion_permiso = ?
            WHERE id_permiso = ?';
    $params = array(
        $this->id_tipo_proceso, 
        $this->fecha_inicio, 
        $this->fecha_final, 
        $this->id_estado_proceso, 
        $this->descripcion_proceso, 
        $this->id_proceso
    );
    // Ejecutar la consulta
    return Database::executeRow($sql, $params);
    }
    /* FUNCION PARA ELIMINAR UN PERMISO */
    public function deleteRow()
    {
    // Validación de existencia y formato del parámetro
    if (!isset($this->id_proceso) || empty($this->id_proceso) || !is_numeric($this->id_proceso)) {
        throw new InvalidArgumentException("El ID de proceso debe ser un número entero válido.");
    }
    // Consulta SQL para eliminar el permiso
    $sql = 'DELETE FROM tb_permisos WHERE id_permiso = ?';
    $params = array($this->id_proceso);
    // Ejecutar la consulta
    return Database::executeRow($sql, $params);
    }
}