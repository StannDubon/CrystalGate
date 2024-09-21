<?php
// Se incluye la clase para trabajar con la base de datos.
require_once __DIR__ . ('/../../helpers/database.php');

/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */
class AdministradorHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $id_tipo_administrador = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $correo = null;
    protected $clave = null;
    protected $imagen = null;

    const RUTA_IMAGEN = '../../images/admin/';

    /*
     *  Métodos para gestionar la cuenta del administrador.
     */

    // Método para verificar el usuario mediante correo y contraseña.
    public function checkUser($email, $password)
    {
        $sql = 'SELECT id_administrador, correo, clave FROM tb_administradores WHERE correo = ?';
        $params = array($email);
        // Se intenta obtener los datos del usuario a partir del correo.
        if (!($data = Database::getRow($sql, $params))) {
            return false; // Si no se encuentra el usuario, devuelve falso.
        } elseif (password_verify($password, $data['clave'])) {
            $_SESSION['idAdministrador'] = $data['id_administrador'];
            $_SESSION['correoAdministrador'] = $data['correo'];
            return true; // Si la contraseña verifica correctamente, devuelve verdadero.
        } else {
            return false; // Si la contraseña no verifica correctamente, devuelve falso.
        }
    }

    // Método para verificar si la contraseña actual coincide para el administrador actualmente autenticado.
    public function checkPassword($password)
    {
        $sql = 'SELECT * FROM tb_administradores WHERE id_administrador = ?';
        $params = array($_SESSION['idAdministrador']);
        $data = Database::getRow($sql, $params);
        // Se verifica si la contraseña coincide con el hash almacenado en la base de datos.
        if (password_verify($password, $data['clave'])) {
            return true; // Si coincide, devuelve verdadero.
        } else {
            return false; // Si no coincide, devuelve falso.
        }
    }

    // Método para cambiar la contraseña del administrador actualmente autenticado.
    public function changePassword()
    {
        $sql = 'UPDATE tb_administradores SET clave = ? WHERE id_administrador = ?';
        $params = array($this->clave, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para actualizar la contraseña.
    }

    // Método para leer el perfil del administrador actualmente autenticado.
    public function readProfile()
    {
        $sql = 'SELECT a.id_administrador, ta.tipo_administrador, a.nombre, a.apellido, a.correo, a.imagen
                FROM tb_administradores a INNER JOIN tb_tipos_administradores ta ON a.id_tipo_administrador = ta.id_tipo_administrador
                WHERE a.id_administrador = ?;';
        $params = array($_SESSION['idAdministrador']);
        return Database::getRow($sql, $params); // Obtiene y devuelve los datos del perfil del administrador.
    }

    // Método para editar el perfil del administrador actualmente autenticado.
    public function editProfile()
    {
        $sql = 'UPDATE tb_administradores SET nombre = ?, apellido = ?, correo = ?, imagen = ? WHERE id_administrador = ?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->imagen, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para actualizar el perfil del administrador.
    }

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */

    // Método para buscar registros de administradores basado en un valor de búsqueda.
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT a.id_administrador, a.id_tipo_administrador, tpa.tipo_administrador, a.nombre, a.apellido, a.clave, a.correo, a.imagen
                FROM tb_administradores AS a
                JOIN tb_tipos_administradores AS tpa
                WHERE (a.id_administrador LIKE ? OR tpa.tipo_administrador LIKE ? OR a.nombre LIKE ? OR a.apellido LIKE ?) AND a.id_tipo_administrador = tpa.id_tipo_administrador';
        $params = array($value, $value, $value, $value);
        return Database::getRows($sql, $params); // Obtiene y devuelve los registros que coinciden con la búsqueda.
    }

    // Método para crear un nuevo registro de administrador.
    public function createRow()
    {
        $sql = 'INSERT INTO tb_administradores(id_tipo_administrador, nombre, apellido, correo, imagen, clave) VALUES(?, ?, ?, ?, ?, ?)';
        $params = array($this->id_tipo_administrador, $this->nombre, $this->apellido, $this->correo, $this->imagen, $this->clave);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para crear un nuevo administrador.
    }

    // Método para leer todos los registros de administradores.
    public function readAll()
    {
        $sql = 'SELECT a.id_administrador, a.id_tipo_administrador, tpa.tipo_administrador, a.nombre, a.apellido, a.clave, a.correo, a.imagen
                FROM tb_administradores AS a
                JOIN tb_tipos_administradores AS tpa ON a.id_tipo_administrador = tpa.id_tipo_administrador;';
        return Database::getRows($sql); // Obtiene y devuelve todos los registros de administradores.
    }

    // Método para leer todos los registros de administradores. (para los reportes)
    public function readAllAdministrators()
    {
        $sql = "SELECT 
                    CONCAT(a.nombre, ' ', a.apellido) AS 'administrator',
                    a.correo AS 'email',
                    ta.tipo_administrador AS 'type',
                    SUM(CASE WHEN p.estado = '2' THEN 1 ELSE 0 END) AS 'approved',
                    SUM(CASE WHEN p.estado = '3' THEN 1 ELSE 0 END) AS 'rejected'
                FROM 
                    tb_administradores a
                LEFT JOIN 
                    tb_notificaciones n ON a.id_administrador = n.id_administrador
                LEFT JOIN 
                    tb_permisos p ON n.id_permiso = p.id_permiso
                LEFT JOIN 
                    tb_tipos_administradores ta ON a.id_tipo_administrador = ta.id_tipo_administrador
                GROUP BY 
                    a.id_administrador, a.nombre, a.apellido, a.correo, ta.tipo_administrador
                ORDER BY 
                    administrator
                ";
        return Database::getRows($sql); // Obtiene y devuelve todos los registros de administradores.
    }

    // Método para leer un registro específico de administrador.
    public function readOne()
    {
        $sql = 'SELECT a.id_administrador, a.id_tipo_administrador, a.nombre, a.apellido, a.clave, a.correo, a.imagen
                FROM tb_administradores a, tb_tipos_administradores b
                WHERE a.id_administrador = ? AND a.id_tipo_administrador = b.id_tipo_administrador';
        $params = array($this->id);
        return Database::getRow($sql, $params); // Obtiene y devuelve un registro específico de administrador.
    }

    // Método para actualizar un registro de administrador.
    public function updateRow()
    {
        $sql = 'UPDATE tb_administradores
                SET id_tipo_administrador = ?, nombre = ?, apellido = ?, correo = ?, imagen = ?
                WHERE id_administrador = ?';
        $params = array($this->id_tipo_administrador, $this->nombre, $this->apellido, $this->correo, $this->imagen, $this->id);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para actualizar un administrador.
    }

    // Método para actualizar completamente un registro de administrador.
    public function fullUpdateRow()
    {
        $sql = 'UPDATE tb_administradores
                SET id_tipo_administrador = ?, nombre = ?, apellido = ?, correo = ?, imagen = ?
                WHERE id_administrador = ?';
        $params = array($this->id_tipo_administrador, $this->nombre, $this->apellido, $this->correo, $this->imagen, $this->id);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para actualizar completamente un administrador.
    }

    // Método para eliminar un registro de administrador.
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_administradores
                WHERE id_administrador = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para eliminar un administrador.
    }

    // Método para obtener el nombre de archivo de un administrador específico.
    public function readFilename()
    {
        $sql = 'SELECT imagen
                FROM tb_administradores
                WHERE id_administrador = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params); // Obtiene y devuelve el nombre de archivo de un administrador.
    }

    // Método para obtener el nombre de archivo de la sesión del administrador autenticado.
    public function readSessionFilename()
    {
        $sql = 'SELECT imagen
                FROM tb_administradores
                WHERE id_administrador = ?';
        $params = array($_SESSION['idAdministrador']);
        return Database::getRow($sql, $params); // Obtiene y devuelve el nombre de archivo de la sesión del administrador autenticado.
    }

    // Método para contar todos los registros de administradores.
    public function countAll()
    {
        $sql = 'SELECT COUNT(*) AS num_rows FROM tb_administradores;';
        return Database::getRow($sql); // Obtiene y devuelve el número total de registros de administradores.
    }

    // Método para realizar el primer uso del sistema creando un administrador inicial.
    public function firstUsage()
    {
        $sql = 'INSERT INTO tb_administradores(id_tipo_administrador, nombre, apellido, correo, clave) VALUES(?, ?, ?, ?, ?)';
        $params = array(1, $this->nombre, $this->apellido, $this->correo, $this->clave);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para crear el primer administrador en el sistema.
    }


    public function changePasswordFromEmail()
    {
        $sql = 'UPDATE tb_administradores SET clave = ? WHERE correo = ?';
        $params = array($this->clave, $_SESSION['usuario_correo_vcc']['correo']);
        return Database::executeRow($sql, $params);
    }

    public function verifyExistingEmail()
    {
        $sql = 'SELECT COUNT(*) as count
                FROM tb_administradores a, tb_tipos_administradores b
                WHERE a.correo = ? AND a.id_tipo_administrador = b.id_tipo_administrador';
        $params = array($this->correo);
        $result = Database::getRow($sql, $params);
    
        return $result['count'] > 0;
    }

    public function validatePermissions($value)
    {
        $pass_data = [
            'v' => "administradores_view",
            'u' => "administradores_update",
            'd' => "administradores_delete",
            'a' => "administradores_add"
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

