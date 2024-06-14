<?php
require_once('../../helpers/database.php');
class ClasificacionesPermisosHandler{

    protected $id = null;
    protected $clasificacion_permiso = null;

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    /* FUNCION PARA BUSCAR LAS CLASIFICACION DE PERMISO POR EL NOMBRE DE LA CLASIFICACION */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_clasificacion_permiso, clasificacion_permiso
                FROM tb_clasificaciones_permisos
                WHERE clasificacion_permiso LIKE ?';
        $params = array($value);
        return Database::getRows($sql, $params);
    }
    /* FUNCION PARA CREAR TIPOS DE CLASIFICACION DE PERMISO , USANDO PROCEDIMIENTO ALMACENADO */
    public function createRow()
    {
        $sql = 'CALL InsertarClasificacionPermiso(?)';
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
        $sql = 'SELECT id_clasificacion_permiso, clasificacion_permiso
                FROM tb_clasificaciones_permisos
                WHERE id_clasificacion_permiso = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }
    /* FUNCION PARA ACTUALIZAR LOS DATOS DE LA CLASIFICACION DE PERMISO  */
    public function updateRow()
    {
        $sql = 'UPDATE tb_clasificaciones_permisos
                SET clasificacion_permiso = ?
                WHERE id_clasificacion_permiso = ?';
        $params = array($this->clasificacion_permiso, $this->id);
        return Database::executeRow($sql, $params);
    }
    /* FUNCION PARA ELIMINAR UNA CLASIFICACION DE PERMISO */
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_clasificaciones_permisos
                WHERE id_clasificacion_permiso = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
