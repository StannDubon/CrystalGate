<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../helpers/database.php');

/*
 *  Clase para manejar el comportamiento de los datos de la tabla PERMISOS_AUTOMATICOS.
 */
class PermisoAutomaticoHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $idPermiso = null;
    protected $horaEnvio = null;
    protected $estado = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT * FROM tb_permisos_automaticos WHERE hora_envio LIKE ? OR estado LIKE ?';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_permisos_automaticos(id_permiso, hora_envio, estado) VALUES(?, ?, ?)';
        $params = array($this->idPermiso, $this->horaEnvio, $this->estado);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT * FROM tb_permisos_automaticos ORDER BY hora_envio';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT * FROM tb_permisos_automaticos WHERE id_permiso_automatico = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_permisos_automaticos SET id_permiso = ?, hora_envio = ?, estado = ? WHERE id_permiso_automatico = ?';
        $params = array($this->idPermiso, $this->horaEnvio, $this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function changeStatus()
    {
        $sql = 'UPDATE tb_permisos_automaticos SET estado = NOT estado WHERE id_permiso_automatico = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_permisos_automaticos WHERE id_permiso_automatico = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
?>
