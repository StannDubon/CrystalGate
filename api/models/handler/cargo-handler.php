<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class CargoHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $cargo = null;
    protected $estado = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT * FROM tb_cargos where cargo like ? or estado like ?';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_cargos(cargo, estado) VALUES(?, ?)';
        $params = array($this->cargo, $this->estado);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT *
                FROM tb_cargos
                ORDER BY cargo';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT *
                FROM tb_cargos
                WHERE id_cargo = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_cargos
                SET cargo = ?, estado = ?
                WHERE id_cargo = ?';
        $params = array($this->cargo, $this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function changeStatus()
    {
        $sql = 'UPDATE tb_cargos
                SET estado = not estado
                WHERE id_cargo = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_cargos
                WHERE id_cargo = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}