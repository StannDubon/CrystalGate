<?php
require_once('../../helpers/database.php');
class tbTiposPermisosHandler{

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
        $sql = 'SELECT id_tipo_permiso, tipo_permiso, clasificacion_permiso, lapso
                FROM tb_tipos_permisos
                INNER JOIN tb_clasificaciones_permisos USING(id_clasificacion_permiso)
                WHERE tipo_permiso LIKE ? OR clasificacion_permiso LIKE ?
                ORDER BY clasificacion_permiso';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }
    /* FUNCION PARA CREAR TIPOS DE PROCESOS, USANDO PROCEDIMIENTO ALMACENADO */
    public function createRow()
    {
        $sql = 'CALL InsertarTipoPermiso(?, ?, ?)';
        $params = array($this->tipo_proceso, $this->id_clasificacion_proceso, $this->lapso_proceso, $_SESSION['idAdministrador']);
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
        $sql = 'SELECT id_tipo_permiso, tipo_permiso, clasificacion_permiso, lapso
                FROM tb_tipos_permisos
                INNER JOIN tb_clasificaciones_permisos USING(id_clasificacion_permiso)
                WHERE id_tipo_permiso = ?';
        $params = array($this->id_tipo_proceso);
        return Database::getRow($sql, $params);
    }
    /* FUNCION PARA ACTUALIZAR LOS DATOS DEL TIPO DE PROCESO */
    public function updateRow()
    {
        $sql = 'UPDATE tb_tipos_permisos
                SET tipo_permiso = ?, id_clasificacion_permiso = ?, lapso = ?
                WHERE id_tipo_permiso = ?';
        $params = array($this->tipo_proceso, $this->id_clasificacion_proceso, $this->lapso_proceso, $this->id_tipo_proceso);
        return Database::executeRow($sql, $params);
    }
    /* FUNCION PARA ELIMINAR UN TIPO DE PROCESO */
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_tipos_permisos
                WHERE id_tipo_permiso = ?';
        $params = array($this->id_tipo_proceso);
        return Database::executeRow($sql, $params);
    }
}