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
    public function searchRows()
    {
        $sql = 'SELECT id_tipo_proceso, tipo_proceso, clasificacion_proceso, lapso_proceso
                FROM tb_tipos_procesos
                INNER JOIN tb_clasificaciones_procesos USING(id_clasificacion_proceso)
                WHERE tipo_proceso LIKE ? OR clasificacion_proceso LIKE ?
                ORDER BY clasificacion_proceso';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }
    /* FUNCION PARA CREAR TIPOS DE PROCESOS, USANDO PROCEDIMIENTO ALMACENADO */
    public function createRow()
    {
        $sql = 'CALL InsertarTipoProceso(?, ?, ?)';
        $params = array($this->tipo_proceso, $this->id_clasificacion_proceso, $this->lapso_proceso, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params);
    }
    /* FUCNION PARA MOSTRAR LOS TIPOS DE PROCESOS */
    public function readAll()
    {
        $sql = 'SELECT id_tipo_proceso, tipo_proceso, clasificacion_proceso, lapso_proceso
                FROM tb_tipos_procesos
                INNER JOIN tb_clasificaciones_procesos USING(id_clasificacion_proceso)
                ORDER BY clasificacion_proceso';
        return Database::getRows($sql);
    }
    /* FUNCION PARA MOSTRAR LOS DATOS DE UN TIPO DE PROCESO */
    public function readOne()
    {
        $sql = 'SELECT id_tipo_proceso, tipo_proceso, clasificacion_proceso, lapso_proceso
                FROM tb_tipos_procesos
                INNER JOIN tb_clasificaciones_procesos USING(id_clasificacion_proceso)
                WHERE id_tipo_proceso = ?';
        $params = array($this->id_tipo_proceso);
        return Database::getRow($sql, $params);
    }
    /* FUNCION PARA ACTUALIZAR LOS DATOS DEL TIPO DE PROCESO */
    public function updateRow()
    {
        $sql = 'UPDATE tb_tipos_procesos
                SET tipo_proceso = ?, id_clasificacion_proceso = ?, lapso_proceso = ?
                WHERE id_tipo_proceso = ?';
        $params = array($this->tipo_proceso, $this->id_clasificacion_proceso, $this->lapso_proceso, $this->id_tipo_proceso);
        return Database::executeRow($sql, $params);
    }
    /* FUNCION PARA ELIMINAR UN TIPO DE PROCESO */
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_tipos_procesos
                WHERE id_tipo_proceso = ?';
        $params = array($this->id_tipo_proceso);
        return Database::executeRow($sql, $params);
    }
}