<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class ClasificacionPermisoHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $clasificacion = null;
    protected $estado = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT * FROM tb_clasificaciones_permisos where clasificacion_permiso like ? or estado like ?';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_clasificaciones_permisos(clasificacion_permiso, estado) VALUES(?, ?)';
        $params = array($this->clasificacion, $this->estado);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT *
                FROM tb_clasificaciones_permisos
                ORDER BY clasificacion_permiso';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT *
                FROM tb_clasificaciones_permisos 
                WHERE id_clasificacion_permiso = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_clasificaciones_permisos
                SET clasificacion_permiso = ?, estado = ?
                WHERE id_clasificacion_permiso = ?';
        $params = array($this->clasificacion, $this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function changeStatus()
    {
        $sql = 'UPDATE tb_clasificaciones_permisos
                SET estado = not estado
                WHERE id_clasificacion_permiso = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_clasificaciones_permisos
                WHERE id_clasificacion_permiso = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}