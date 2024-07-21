<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');

/*
 *  Clase para manejar el comportamiento de los datos de la tabla tb_tipos_peticiones.
 */
class TipoPeticionHandler
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

    // Método para buscar tipos de petición por un valor de búsqueda.
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT * FROM tb_tipos_peticiones WHERE tipo_peticion LIKE ? OR estado LIKE ?';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    // Método para crear un nuevo tipo de petición.
    public function createRow()
    {
        $sql = 'INSERT INTO tb_tipos_peticiones (tipo_peticion, estado) VALUES (?, ?)';
        $params = array($this->tipo, $this->estado);
        return Database::executeRow($sql, $params);
    }

    // Método para leer todos los tipos de petición.
    public function readAll()
    {
        $sql = 'SELECT *
                FROM tb_tipos_peticiones
                ORDER BY estado DESC';
        return Database::getRows($sql);
    }

    // Método para leer un tipo de petición específico por su ID.
    public function readOne()
    {
        $sql = 'SELECT *
                FROM tb_tipos_peticiones
                WHERE id_tipo_peticion = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    // Método para actualizar un tipo de petición.
    public function updateRow()
    {
        $sql = 'UPDATE tb_tipos_peticiones
                SET tipo_peticion = ?, estado = ?
                WHERE id_tipo_peticion = ?';
        $params = array($this->tipo, $this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    // Método para cambiar el estado (activo/inactivo) de un tipo de petición.
    public function changeStatus()
    {
        $sql = 'UPDATE tb_tipos_peticiones
                SET estado = NOT estado
                WHERE id_tipo_peticion = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    // Método para eliminar un tipo de petición por su ID.
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_tipos_peticiones
                WHERE id_tipo_peticion = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}