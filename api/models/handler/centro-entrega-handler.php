<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class CentroEntregaHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $centro = null;
    protected $estado = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT * FROM tb_centros_entregas where centro_entrega like ? or estado like ?';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_centros_entregas(centro_entrega, estado) VALUES(?, ?)';
        $params = array($this->centro, $this->estado);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT *
                FROM tb_centros_entregas
                ORDER BY centro_entrega';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT *
                FROM tb_centros_entregas
                WHERE id_centro_entrega = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_centros_entregas
                SET centro_entrega = ?, estado = ?
                WHERE id_centro_entrega = ?';
        $params = array($this->centro, $this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function changeStatus()
    {
        $sql = 'UPDATE tb_centros_entregas
                SET estado = not estado
                WHERE id_centro_entrega = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_centros_entregas
                WHERE id_centro_entrega = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}