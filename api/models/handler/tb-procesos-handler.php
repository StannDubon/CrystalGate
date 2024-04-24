<?php
require_once('../../helpers/database.php');

class tbProcesosHandler{

    protected $id_proceso = null;
    protected $id_usuario = null;
    protected $id_tipo_proceso = null;
    protected $fecha_inicio = null;
    protected $fecha_final = null;
    protected $id_estado_proceso = null;
    protected $documento_proceso = null;
    protected $descripcion_proceso = null;
    protected $fecha_envio = null;

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    /* FUNCION PARA BUSCAR PROCESOS POR EL TIPO Y EL NOMBRE */
    public function searchRows()
    {
        $sql = 'SELECT u.nombre_usuario, tp.tipo_proceso, p.fecha_inicio, p.fecha_final, ep.estado_proceso
                FROM tb_procesos p
                INNER JOIN tb_usuarios u ON p.id_usuario = u.id_usuario
                INNER JOIN tb_tipos_procesos tp ON p.id_tipo_proceso = tp.id_tipo_proceso
                INNER JOIN tb_clasificaciones_procesos cp ON tp.id_clasificacion_proceso = cp.id_clasificacion_proceso
                INNER JOIN tb_estados_procesos ep ON p.id_estado_proceso = ep.id_estado_proceso
                WHERE u.nombre_usuario LIKE ? OR tp.tipo_proceso LIKE ? OR cp.clasificacion_proceso LIKE ? OR p.fecha_inicio >= ? OR p.fecha_final <= ? OR ep.estado_proceso LIKE ?
                ORDER BY ep.estado_proceso';
        $params = array($value, $value, $value, $value, $value, $value);
        return Database::getRows($sql, $params);
    }
    /* FUNCION PARA BUSCAR PROCESOS POR LA FECHA DE ENVIO*/
    public function searchRows()
    {
        $sql = 'SELECT u.nombre_usuario, tp.tipo_proceso, p.fecha_inicio, p.fecha_final, ep.estado_proceso
                FROM tb_procesos p
                INNER JOIN tb_usuarios u ON p.id_usuario = u.id_usuario
                INNER JOIN tb_tipos_procesos tp ON p.id_tipo_proceso = tp.id_tipo_proceso
                INNER JOIN tb_clasificaciones_procesos cp ON tp.id_clasificacion_proceso = cp.id_clasificacion_proceso
                INNER JOIN tb_estados_procesos ep ON p.id_estado_proceso = ep.id_estado_proceso
                WHERE ep.estado_proceso LIKE 'enviado'
                ORDER BY p.fecha_envio DESC';
        $params = array($value);
        return Database::getRows($sql, $params);
    }    
    /* FUNCION PARA CREAR PROCESOS, USANDO PROCEDIMIENTO ALMACENADO */
    public function createRow()
    {
        $sql = 'CALL InsertarProceso(?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->id_usuario, $this->id_tipo_proceso, $this->fecha_inicio, $this->fecha_final, $this->id_estado_proceso, $this->documento_proceso, 
                        $this->descripcion_proceso, $this->fecha_envio, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params);
    }
    /* FUCNION PARA MOSTRAR LOS PROCESOS */
    public function readAll()
    {
        $sql = 'SELECT u.nombre_usuario, tp.tipo_proceso, p.fecha_inicio, p.fecha_final, ep.estado_proceso
                FROM tb_procesos p
                INNER JOIN tb_usuarios u ON p.id_usuario = u.id_usuario
                INNER JOIN tb_tipos_procesos tp ON p.id_tipo_proceso = tp.id_tipo_proceso
                INNER JOIN tb_clasificaciones_procesos cp ON tp.id_clasificacion_proceso = cp.id_clasificacion_proceso
                INNER JOIN tb_estados_procesos ep ON p.id_estado_proceso = ep.id_estado_proceso
                WHERE cp.clasificacion_proceso LIKE ?
                ORDER BY ep.estado_proceso';
        $params = array($value);
        return Database::getRows($sql);
    }
    /* FUNCION PARA MOSTRAR LOS DATOS DE UN PROCESO */
    public function readOne()
    {
        $sql = 'SELECT p.id_proceso, u.id_usuario, u.nombre_usuario, u.email_usuario, tp.tipo_proceso, cp.clasificacion_proceso, p.fecha_inicio, p.fecha_final, 
        ep.estado_proceso, p.documento_proceso, p.descripcion_proceso, p.fecha_envio
                FROM tb_procesos p
                INNER JOIN tb_usuarios u ON p.id_usuario = u.id_usuario
                INNER JOIN tb_tipos_procesos tp ON p.id_tipo_proceso = tp.id_tipo_proceso
                INNER JOIN tb_clasificaciones_procesos cp ON tp.id_clasificacion_proceso = cp.id_clasificacion_proceso
                INNER JOIN tb_estados_procesos ep ON p.id_estado_proceso = ep.id_estado_proceso
                WHERE p.id_proceso LIKE ?';
        $params = array($this->id_proceso);
        return Database::getRow($sql, $params);
    }
    /* FUNCION PARA ACTUALIZAR LOS DATOS DEL PROCESO */
    public function updateRow()
    {
        $sql = 'UPDATE tb_procesos
                SET id_tipo_proceso = ?, fecha_inicio = ?, fecha_final = ?, id_estado_proceso = ?
                WHERE id_proceso = ?';
        $params = array($this->id_tipo_proceso, $this->fecha_inicio, $this->fecha_final, $this->id_estado_proceso, $this->id_proceso);
        return Database::executeRow($sql, $params);
    }
    /* FUNCION PARA ELIMINAR UN PROCESO */
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_procesos
                WHERE id_proceso = ?';
        $params = array($this->id_proceso);
        return Database::executeRow($sql, $params);
    }
}