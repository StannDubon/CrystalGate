<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla TIPOS_PERMISOS.
 */
class TipoPermisoHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $clasificacion = null;
    protected $tipo = null;
    protected $lapso = null;
    protected $estado = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT * FROM tb_tipos_permisos WHERE tipo_permiso LIKE ? ORDER BY tipo_permiso';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_tipos_permisos (id_clasificacion_permiso, tipo_permiso, lapso, estado) VALUES (?, ?, ?, ?)';
        $params = array($this->clasificacion, $this->tipo, $this->lapso, $this->estado);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT *
                FROM tb_tipos_permisos
                ORDER BY tipo_permiso';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT *
                FROM tb_tipos_permisos
                WHERE id_tipo_permiso = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_tipos_permisos
                SET id_clasificacion_permiso = ?, tipo_permiso = ?, lapso = ?, estado = ?
                WHERE id_tipo_permiso = ?';
        $params = array($this->clasificacion, $this->tipo, $this->lapso,$this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_tipos_permisos
                WHERE id_tipo_permiso = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
