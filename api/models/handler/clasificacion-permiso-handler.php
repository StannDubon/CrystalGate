<?php
// Se incluye la clase para trabajar con la base de datos.
require_once __DIR__ . ('/../../helpers/database.php');

/*
 *  Clase para manejar el comportamiento de los datos de la tabla  clasificaciones permisos.
 */
class ClasificacionPermisoHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $clasificacion = null;
    protected $estado = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */

    // Método para buscar registros de clasificaciones de permisos basados en un valor de búsqueda.
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT * FROM tb_clasificaciones_permisos WHERE clasificacion_permiso LIKE ? OR estado LIKE ?';
        $params = array($value, $value);
        return Database::getRows($sql, $params); // Obtiene y devuelve los registros que coinciden con la búsqueda.
    }

    // Método para crear un nuevo registro de clasificación de permiso.
    public function createRow()
    {
        $sql = 'INSERT INTO tb_clasificaciones_permisos(clasificacion_permiso, estado) VALUES(?, ?)';
        $params = array($this->clasificacion, $this->estado);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para crear una nueva clasificación de permiso.
    }

    // Método para leer todos los registros de clasificaciones de permisos.
    public function readAll()
    {
        $sql = 'SELECT *
                FROM tb_clasificaciones_permisos
                ORDER BY clasificacion_permiso'; // Ordena los resultados por clasificación de permiso.
        return Database::getRows($sql); // Obtiene y devuelve todos los registros de clasificaciones de permisos.
    }

    // Método para leer un registro específico de clasificación de permiso.
    public function readOne()
    {
        $sql = 'SELECT *
                FROM tb_clasificaciones_permisos 
                WHERE id_clasificacion_permiso = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params); // Obtiene y devuelve un registro específico de clasificación de permiso.
    }

    // Método para actualizar un registro de clasificación de permiso.
    public function updateRow()
    {
        $sql = 'UPDATE tb_clasificaciones_permisos
                SET clasificacion_permiso = ?, estado = ?
                WHERE id_clasificacion_permiso = ?';
        $params = array($this->clasificacion, $this->estado, $this->id);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para actualizar una clasificación de permiso.
    }

    // Método para cambiar el estado (activo/inactivo) de una clasificación de permiso.
    public function changeStatus()
    {
        $sql = 'UPDATE tb_clasificaciones_permisos
                SET estado = NOT estado
                WHERE id_clasificacion_permiso = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para cambiar el estado de la clasificación de permiso.
    }

    // Método para eliminar un registro de clasificación de permiso.
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_clasificaciones_permisos
                WHERE id_clasificacion_permiso = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para eliminar una clasificación de permiso.
    }

    // Método para leer datos utilizables de clasificaciones de permisos (utilizado por otras tablas).
    public function readUsableData()
    {
        $sql = 'SELECT DISTINCT cp.id_clasificacion_permiso, cp.clasificacion_permiso
                FROM tb_clasificaciones_permisos cp
                JOIN tb_tipos_permisos tp ON cp.id_clasificacion_permiso = tp.id_clasificacion_permiso;';
        return Database::getRows($sql); // Obtiene y devuelve datos utilizables de clasificaciones de permisos.
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

?>

