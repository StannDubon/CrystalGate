<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');

/*
 *  Clase para manejar el comportamiento de los datos de la tabla centros entregas.
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

    // Método para buscar registros de centros de entrega basados en un valor de búsqueda.
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT * FROM tb_centros_entregas WHERE centro_entrega LIKE ? OR estado LIKE ?';
        $params = array($value, $value);
        return Database::getRows($sql, $params); // Obtiene y devuelve los registros que coinciden con la búsqueda.
    }

    // Método para crear un nuevo registro de centro de entrega.
    public function createRow()
    {
        $sql = 'INSERT INTO tb_centros_entregas(centro_entrega, estado) VALUES(?, ?)';
        $params = array($this->centro, $this->estado);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para crear un nuevo centro de entrega.
    }

    // Método para leer todos los registros de centros de entrega.
    public function readAll()
    {
        $sql = 'SELECT *
                FROM tb_centros_entregas
                ORDER BY estado DESC'; // Ordena los resultados por estado en orden descendente.
        return Database::getRows($sql); // Obtiene y devuelve todos los registros de centros de entrega.
    }

    // Método para leer un registro específico de centro de entrega.
    public function readOne()
    {
        $sql = 'SELECT *
                FROM tb_centros_entregas
                WHERE id_centro_entrega = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params); // Obtiene y devuelve un registro específico de centro de entrega.
    }

    // Método para actualizar un registro de centro de entrega.
    public function updateRow()
    {
        $sql = 'UPDATE tb_centros_entregas
                SET centro_entrega = ?, estado = ?
                WHERE id_centro_entrega = ?';
        $params = array($this->centro, $this->estado, $this->id);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para actualizar un centro de entrega.
    }

    // Método para cambiar el estado (activo/inactivo) de un centro de entrega.
    public function changeStatus()
    {
        $sql = 'UPDATE tb_centros_entregas
                SET estado = NOT estado
                WHERE id_centro_entrega = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para cambiar el estado del centro de entrega.
    }

    // Método para eliminar un registro de centro de entrega.
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_centros_entregas
                WHERE id_centro_entrega = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para eliminar un centro de entrega.
    }
}