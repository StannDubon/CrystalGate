<?php
// Se incluye la clase para trabajar con la base de datos.
require_once __DIR__ . ('/../../helpers/database.php');

/*
 *  Clase para manejar el comportamiento de los datos de la tabla tb_usuarios.
 */
class UsuarioHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $id_cargo = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $correo = null;
    protected $clave = null;
    protected $imagen = null;

    const RUTA_IMAGEN = '../../images/user/';

    /*
     *  Métodos para gestionar la cuenta del usuario.
     */

    // Método para verificar el usuario por correo y contraseña.
    public function checkUser($email, $password)
    {
        $sql = 'SELECT id_usuario, correo, clave FROM tb_usuarios WHERE correo = ?';
        $params = array($email);
        if (!($data = Database::getRow($sql, $params))) {
            return false;
        } elseif (password_verify($password, $data['clave'])) {
            $_SESSION['idUsuario'] = $data['id_usuario'];
            $_SESSION['correoUsuario'] = $data['correo'];
            return true;
        } else {
            return false;
        }
    }

    // Método para verificar si la contraseña actual del usuario es correcta.
    public function checkPassword($password)
    {
        $sql = 'SELECT * FROM tb_usuarios WHERE id_usuario = ?';
        $params = array($_SESSION['idUsuario']);
        $data = Database::getRow($sql, $params);
        // Se verifica si la contraseña coincide con el hash almacenado en la base de datos.
        if (password_verify($password, $data['clave'])) {
            return true;
        } else {
            return false;
        }
    }

    // Método para cambiar la contraseña del usuario.
    public function changePassword()
    {
        $sql = 'UPDATE tb_usuarios SET clave = ? WHERE id_usuario = ?';
        $params = array($this->clave, $_SESSION['idUsuario']);
        return Database::executeRow($sql, $params);
    }

    // Método para leer el perfil del usuario actual.
    public function readProfile()
    {
        $sql = 'SELECT a.id_usuario, ta.tipo_administrador, a.nombre, a.apellido, a.correo, a.imagen
                FROM tb_usuarios a INNER JOIN tb_cargos ta ON a.id_cargo = ta.id_cargo
                WHERE a.id_usuario = ?';
        $params = array($_SESSION['idUsuario']);
        return Database::getRow($sql, $params);
    }

    // Método para editar el perfil del usuario actual.
    public function editProfile()
    {
        $sql = 'UPDATE tb_usuarios SET nombre = ?, apellido = ?, correo = ?, imagen = ? WHERE id_usuario = ?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->imagen, $_SESSION['idUsuario']);
        return Database::executeRow($sql, $params);
    }

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */

    // Método para buscar usuarios por un valor de búsqueda.
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT a.*, b.cargo 
                FROM tb_usuarios a, tb_cargos b 
                WHERE (a.id_usuario LIKE ? OR a.nombre LIKE ? OR a.apellido LIKE ? OR b.cargo LIKE ?) AND a.id_cargo = b.id_cargo';
        $params = array($value, $value, $value, $value);
        return Database::getRows($sql, $params);
    }

    // Método para crear un nuevo usuario.
    public function createRow()
    {
        $sql = 'INSERT INTO tb_usuarios (id_cargo, nombre, apellido, correo, imagen, clave) VALUES (?, ?, ?, ?, ?, ?)';
        $params = array($this->id_cargo, $this->nombre, $this->apellido, $this->correo, $this->imagen, $this->clave);
        return Database::executeRow($sql, $params);
    }

    // Método para leer todos los usuarios.
    public function readAll()
    {
        $sql = 'SELECT a.id_usuario, b.cargo, a.nombre, a.apellido, a.clave, a.correo, a.imagen
                FROM tb_usuarios a, tb_cargos b WHERE a.id_cargo = b.id_cargo
                ORDER BY a.apellido';
        return Database::getRows($sql);
    }

    // Método para leer todos los usuarios. (para reportes)
    public function readAllUsers()
    {
        $sql = "SELECT 
                    CONCAT(u.nombre, ' ', u.apellido) AS 'Employee',
                    u.correo AS 'Email',
                    c.cargo AS 'charge',
                    SUM(CASE WHEN p.estado = '2' THEN 1 ELSE 0 END) AS 'approved',
                    SUM(CASE WHEN p.estado = '3' THEN 1 ELSE 0 END) AS 'rejected',
                    COUNT(p.id_permiso) AS 'total'
                FROM 
                    tb_usuarios u
                LEFT JOIN 
                    tb_permisos p ON u.id_usuario = p.id_usuario
                LEFT JOIN 
                    tb_cargos c ON u.id_cargo = c.id_cargo
                GROUP BY 
                    u.id_usuario, u.nombre, u.apellido, u.correo, c.cargo
                ORDER BY
                    Employee";
        return Database::getRows($sql);
    }

    // Método para leer un usuario específico por su ID.
    public function readOne()
    {
        $sql = 'SELECT a.id_usuario, b.cargo, a.nombre, a.apellido, a.clave, a.correo, a.imagen
                FROM tb_usuarios a, tb_cargos b 
                WHERE a.id_cargo = b.id_cargo AND a.id_usuario = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    // Método para actualizar un usuario.
    public function updateRow()
    {
        $sql = 'UPDATE tb_usuarios
                SET id_cargo = ?, nombre = ?, apellido = ?, correo = ?, imagen = ?
                WHERE id_usuario = ?';
        $params = array($this->id_cargo, $this->nombre, $this->apellido, $this->correo, $this->imagen, $this->id);
        return Database::executeRow($sql, $params);
    }

    // Método para eliminar un usuario por su ID.
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_usuarios
                WHERE id_usuario = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    // Método para leer el nombre de archivo de imagen de un usuario por su ID.
    public function readFilename()
    {
        $sql = 'SELECT imagen
                FROM tb_usuarios
                WHERE id_usuario = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }


    // GRAPHOS

    public function readPermissionTypePerUserGrapho()
    {
        $sql = "SELECT
                    tp.tipo_permiso AS 'tipo',
                    COUNT(p.id_permiso) AS 'cantidad'
                FROM
                    tb_permisos p
                INNER JOIN
                    tb_tipos_permisos tp ON p.id_tipo_permiso = tp.id_tipo_permiso
                WHERE
                    p.id_usuario = ?
                GROUP BY
                    tp.id_tipo_permiso, tp.tipo_permiso;";
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function validatePermissions($value)
    {
        $pass_data = [
            'v' => "empleados_view",
            'u' => "empleados_update",
            'd' => "empleados_delete",
            'a' => "empleados_add"
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