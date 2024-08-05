<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');

/*
 *  Clase para manejar el comportamiento de los datos de la tabla tb_idiomas.
 */
class IdiomaHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $idioma = null;
    protected $estado = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */

    // Método para buscar registros de idiomas basados en un valor de búsqueda.
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT * FROM tb_idiomas WHERE idioma LIKE ? OR estado LIKE ?';
        $params = array($value, $value);
        return Database::getRows($sql, $params); // Obtiene y devuelve los registros que coinciden con la búsqueda.
    }

    // Método para crear un nuevo registro de idioma.
    public function createRow()
    {
        $sql = 'INSERT INTO tb_idiomas(idioma, estado) VALUES(?, ?)';
        $params = array($this->idioma, $this->estado);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para crear un nuevo idioma.
    }

    // Método para leer todos los registros de idiomas.
    public function readAll()
    {
        $sql = 'SELECT *
                FROM tb_idiomas
                ORDER BY estado DESC'; // Ordena los resultados por estado descendente.
        return Database::getRows($sql); // Obtiene y devuelve todos los registros de idiomas.
    }

    // Método para leer un registro específico de idioma.
    public function readOne()
    {
        $sql = 'SELECT *
                FROM tb_idiomas
                WHERE id_idioma = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params); // Obtiene y devuelve un registro específico de idioma.
    }

    // Método para actualizar un registro de idioma.
    public function updateRow()
    {
        $sql = 'UPDATE tb_idiomas
                SET idioma = ?, estado = ?
                WHERE id_idioma = ?';
        $params = array($this->idioma, $this->estado, $this->id);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para actualizar un idioma.
    }

    // Método para cambiar el estado (activo/inactivo) de un idioma.
    public function changeStatus()
    {
        $sql = 'UPDATE tb_idiomas
                SET estado = NOT estado
                WHERE id_idioma = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para cambiar el estado de un idioma.
    }

    // Método para eliminar un registro de idioma.
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_idiomas
                WHERE id_idioma = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para eliminar un idioma.
    }
}
