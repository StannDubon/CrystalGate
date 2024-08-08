<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');

/*
 *  Clase para manejar el comportamiento de los datos de la tabla tb_tipos_permisos.
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

    // Método para buscar tipos de permisos por un valor de búsqueda.
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT * FROM tb_tipos_permisos WHERE tipo_permiso LIKE ? ORDER BY tipo_permiso';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    //Método para enlistar tipos de permisos segun categoria
    public function readAllByCategorie(){
        $sql = 'SELECT a.*, b.clasificacion_permiso
                FROM tb_tipos_permisos a, tb_clasificaciones_permisos b 
                WHERE a.id_clasificacion_permiso = b.id_clasificacion_permiso
                AND b.id_clasificacion_permiso = ? AND a.estado = TRUE
                ORDER BY a.tipo_permiso';
        $params = array($this->clasificacion);
        return Database::getRows($sql,$params);
    } 

    // Método para crear un nuevo tipo de permiso.
    public function createRow()
    {
        $sql = 'INSERT INTO tb_tipos_permisos (id_clasificacion_permiso, tipo_permiso, lapso, estado) VALUES (?, ?, ?, ?)';
        $params = array($this->clasificacion, $this->tipo, $this->lapso, $this->estado);
        return Database::executeRow($sql, $params);
    }

    // Método para leer todos los tipos de permisos.
    public function readAll()
    {
        $sql = 'SELECT *
                FROM tb_tipos_permisos
                ORDER BY tipo_permiso';
        return Database::getRows($sql);
    }

    // Método para leer tipos de permisos que tienen referencias no vacías en la tabla tb_permisos.
    public function readNoEmtyReferences()
    {
        $sql = 'SELECT tp.id_tipo_permiso, tp.tipo_permiso, COUNT(p.id_permiso) AS cantidad_permisos
                FROM tb_tipos_permisos tp
                JOIN tb_permisos p ON tp.id_tipo_permiso = p.id_tipo_permiso
                WHERE tp.id_clasificacion_permiso = ?
                GROUP BY tp.id_tipo_permiso, tp.tipo_permiso
                HAVING COUNT(p.id_permiso) > 0;';
        $params = array($this->clasificacion);
        return Database::getRows($sql, $params);
    }

    // Método para leer un tipo de permiso específico por su ID.
    public function readOne()
    {
        $sql = 'SELECT *
                FROM tb_tipos_permisos
                WHERE id_tipo_permiso = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    // Método para actualizar un tipo de permiso.
    public function updateRow()
    {
        $sql = 'UPDATE tb_tipos_permisos
                SET id_clasificacion_permiso = ?, tipo_permiso = ?, lapso = ?, estado = ?
                WHERE id_tipo_permiso = ?';
        $params = array($this->clasificacion, $this->tipo, $this->lapso, $this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    // Método para eliminar un tipo de permiso por su ID.
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_tipos_permisos
                WHERE id_tipo_permiso = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    // Método para cambiar el estado (activo/inactivo) de un tipo de permiso.
    public function changeStatus()
    {
        $sql = 'UPDATE tb_tipos_permisos
                SET estado = not estado
                WHERE id_tipo_permiso = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }


    public function validatePermissions($value)
    {
        $pass_data = [
            'v' => "permisos",
            'u' => "autorizaciones_update",
            'd' => "autorizaciones_delete",
            'a' => "autorizaciones_add"
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

