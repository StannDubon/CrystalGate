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
    public function searchRows()
    {
        $sql = 'SELECT u.nombre, tp.tipo_permiso, p.fecha_inicio, p.fecha_final, ep.estado_permiso
                FROM tb_permisos p
                INNER JOIN tb_usuarios u ON p.id_usuario = u.id_usuario
                INNER JOIN tb_tipos_permisos tp ON p.id_tipo_permiso = tp.id_tipo_permiso
                INNER JOIN tb_clasificaciones_permisos cp ON tp.id_clasificacion_permiso = cp.id_clasificacion_permiso
                INNER JOIN tb_estados_permisos ep ON p.id_estado_permiso = ep.id_estado_permiso
                WHERE u.nombre LIKE ? OR tp.tipo_permiso LIKE ? OR cp.clasificacion_permiso LIKE ? OR p.fecha_inicio >= ? OR p.fecha_final <= ? OR ep.estado_permiso LIKE ?
                ORDER BY ep.estado_permiso';
        $params = array($value, $value, $value, $value, $value, $value);
        return Database::getRows($sql, $params);
    }
    /* FUNCION PARA BUSCAR PERMISOS POR LA FECHA DE ENVIO*/
    public function searchRows()
    {
        $sql = 'SELECT u.nombre, tp.tipo_permiso, p.fecha_inicio, p.fecha_final, ep.estado_permiso
                FROM tb_permisos p
                INNER JOIN tb_usuarios u ON p.id_usuario = u.id_usuario
                INNER JOIN tb_tipos_permisos tp ON p.id_tipo_permiso = tp.id_tipo_permiso
                INNER JOIN tb_clasificaciones_permisos cp ON tp.id_clasificacion_permiso = cp.id_clasificacion_permiso
                INNER JOIN tb_estados_permisos ep ON p.id_estado_permiso = ep.id_estado_permiso
                WHERE ep.estado_permiso LIKE 'enviado'
                ORDER BY p.fecha_envio DESC';
        $params = array($value);
        return Database::getRows($sql, $params);
    }    
    /* FUNCION PARA CREAR PERMISOS, USANDO PROCEDIMIENTO ALMACENADO */
    public function createRow()
    {
        $sql = 'CALL InsertarProceso(?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->id_usuario, $this->id_tipo_proceso, $this->id_estado_proceso, $this->fecha_inicio, $this->fecha_final, $this->fecha_envio, $this->documento_proceso, 
                        $this->descripcion_proceso, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params);
    }
    /* FUCNION PARA MOSTRAR LOS PERMISOS */
    public function readAll()
    {
        $sql = 'SELECT u.nombre, tp.tipo_permiso, p.fecha_inicio, p.fecha_final, ep.estado_permiso
                FROM tb_permisos p
                INNER JOIN tb_usuarios u ON p.id_usuario = u.id_usuario
                INNER JOIN tb_tipos_permisos tp ON p.id_tipo_permiso = tp.id_tipo_permiso
                INNER JOIN tb_clasificaciones_permisos cp ON tp.id_clasificacion_permiso = cp.id_clasificacion_permiso
                INNER JOIN tb_estados_permisos ep ON p.id_estado_permiso = ep.id_estado_permiso
                WHERE cp.clasificacion_permiso LIKE ?
                ORDER BY ep.estado_permiso';
        $params = array($value);
        return Database::getRows($sql);
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
        $sql = 'UPDATE tb_permisos
                SET id_tipo_permiso = ?, fecha_inicio = ?, fecha_final = ?, id_estado_permiso = ?, descripcion_permiso = ?
                WHERE id_permiso = ?';
        $params = array($this->id_tipo_proceso, $this->fecha_inicio, $this->fecha_final, $this->id_estado_proceso, $this->descripcion_proceso, $this->id_proceso);
        return Database::executeRow($sql, $params);
    }
    /* FUNCION PARA ELIMINAR UN PERMISO */
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_permisos
                WHERE id_permiso = ?';
        $params = array($this->id_proceso);
        return Database::executeRow($sql, $params);
    }
}