<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');

/*
 *  Clase para manejar el comportamiento de los datos de la tabla cargos.
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

    // Método para buscar registros de cargos basados en un valor de búsqueda.
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT * FROM tb_cargos WHERE cargo LIKE ? OR estado LIKE ?';
        $params = array($value, $value);
        return Database::getRows($sql, $params); // Obtiene y devuelve los registros que coinciden con la búsqueda.
    }

    // Método para crear un nuevo registro de cargo.
    public function createRow()
    {
        $sql = 'INSERT INTO tb_cargos(cargo, estado) VALUES(?, ?)';
        $params = array($this->cargo, $this->estado);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para crear un nuevo cargo.
    }

    // Método para leer todos los registros de cargos.
    public function readAll()
    {
        $sql = 'SELECT *
                FROM tb_cargos
                ORDER BY cargo';
        return Database::getRows($sql); // Obtiene y devuelve todos los registros de cargos ordenados por el nombre del cargo.
    }

    // Método para leer un registro específico de cargo.
    public function readOne()
    {
        $sql = 'SELECT *
                FROM tb_cargos
                WHERE id_cargo = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params); // Obtiene y devuelve un registro específico de cargo.
    }

    // Método para actualizar un registro de cargo.
    public function updateRow()
    {
        $sql = 'UPDATE tb_cargos
                SET cargo = ?, estado = ?
                WHERE id_cargo = ?';
        $params = array($this->cargo, $this->estado, $this->id);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para actualizar un cargo.
    }

    // Método para cambiar el estado (activo/inactivo) de un cargo.
    public function changeStatus()
    {
        $sql = 'UPDATE tb_cargos
                SET estado = NOT estado
                WHERE id_cargo = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para cambiar el estado del cargo.
    }

    // Método para eliminar un registro de cargo.
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_cargos
                WHERE id_cargo = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para eliminar un cargo.
    }
}
