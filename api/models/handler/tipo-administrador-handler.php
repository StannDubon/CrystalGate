<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');

/*
 *  Clase para manejar el comportamiento de los datos de la tabla tb_tipos_administradores.
 */
class TipoAdministradorHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $tipo = null;
    protected $estado = null;
    protected $permisos = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */

    // Método para buscar tipos de administradores por un valor de búsqueda general.
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT * FROM tb_tipos_administradores where tipo_administrador like ? or estado like ?';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    // Método para crear un nuevo tipo de administrador.
    public function createRow()
    {
        $sql = 'INSERT INTO tb_tipos_administradores(tipo_administrador, estado) VALUES(?, ?)';
        $params = array($this->tipo, $this->estado);
        return Database::executeRow($sql, $params);
    }

    // Método para leer todos los tipos de administradores.
    public function readAll()
    {
        $sql = 'SELECT *
                FROM tb_tipos_administradores';
        return Database::getRows($sql);
    }

    // Método para leer un tipo de administrador específico por su ID.
    public function readOne()
    {
        $sql = 'SELECT *
                FROM tb_tipos_administradores
                WHERE id_tipo_administrador = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    // Método para actualizar un tipo de administrador.
    public function updateRow()
    {
        $sql = 'UPDATE tb_tipos_administradores
                SET tipo_administrador = ?, estado = ?
                WHERE id_tipo_administrador = ?';
        $params = array($this->tipo, $this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    // Método para cambiar el estado (activo/inactivo) de un tipo de administrador.
    public function changeStatus()
    {
        $sql = 'UPDATE tb_tipos_administradores
                SET estado = not estado
                WHERE id_tipo_administrador = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    // Método para eliminar un tipo de administrador por su ID.
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_tipos_administradores
                WHERE id_tipo_administrador = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function validatePermissions($value)
    {
        $pass_data = [
            'v' => "tipo_administrador_view",
            'u' => "tipo_administrador_update",
            'd' => "tipo_administrador_delete",
            'a' => "tipo_administrador_add"
        ];

        // Ensure column_name is replaced correctly in the SQL query
        $sql = 'SELECT ' . $pass_data[$value] . ' as permission
                FROM tb_administradores a
                INNER JOIN tb_tipos_administradores b
                ON a.id_tipo_administrador = b.id_tipo_administrador
                WHERE a.id_administrador = ?;';
        
        // Prepare the parameters for the SQL query
        $params = array($_SESSION['idAdministrador']);
        $result = Database::getRow($sql, $params);
        return $result['permission'] != '1';
    }
}