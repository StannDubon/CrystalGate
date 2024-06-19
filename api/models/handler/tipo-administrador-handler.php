<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class TipoAdministradorHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $tipo = null;
    protected $estado = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT * FROM tb_tipos_administradores where tipo_administrador like ? or estado like ?';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_tipos_administradores(tipo_administrador, estado) VALUES(?, ?)';
        $params = array($this->tipo, $this->estado);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT *
                FROM tb_tipos_administradores
                ORDER BY tipo_administrador';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT *
                FROM tb_tipos_administradores
                WHERE id_tipo_administrador = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_tipos_administradores
                SET tipo_administrador = ?, estado = ?
                WHERE id_tipo_administrador = ?';
        $params = array($this->tipo, $this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function changeStatus()
    {
        $sql = 'UPDATE tb_tipos_administradores
                SET estado = not estado
                WHERE id_tipo_administrador = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_tipos_administradores
                WHERE id_tipo_administrador = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}