<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');

require_once('../../helpers/notification.php');

/*
 *  Clase para manejar el comportamiento de los datos de la tabla tb_notificaciones.
 */
class NotificacionHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $idAdministrador = null;
    protected $idPermiso = null;
    protected $idPeticion = null;
    protected $tipoNotificacion = null;
    protected $fechaEnvio = null;
    protected $descripcion = null;

    //atributos funcionales
    protected $token = null;
    protected $title = null;
    protected $idUsuario = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */

    // Método para buscar notificaciones basadas en un valor de búsqueda.
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        // Consulta SQL para buscar notificaciones por nombre de administrador, nombre o apellido de usuario.
        $sql = "SELECT a.*, b.id_administrador, c.id_permiso, b.nombre AS nombre_administrador, b.apellido AS apellido_administrador, c.id_usuario, c.fecha_inicio, c.fecha_final, c.estado, d.nombre AS nombre_empleado, d.apellido AS apellido_empleado
                FROM tb_notificaciones a, tb_administradores b, tb_permisos c, tb_usuarios d
                WHERE (b.nombre LIKE ? OR b.apellido LIKE ? OR d.nombre LIKE ? OR d.apellido LIKE ?) AND a.id_administrador = b.id_administrador AND a.id_permiso = c.id_permiso AND c.id_usuario = d.id_usuario";
        $params = array($value, $value, $value, $value);
        return Database::getRows($sql, $params); // Obtiene y devuelve los registros que coinciden con la búsqueda.
    }

    // Método para crear una nueva notificación.
    public function createRow()
    {
        $sql = 'INSERT INTO tb_notificaciones(id_administrador, id_permiso, id_peticion, tipo_notificacion, fecha_envio, descripcion)
                VALUES(?, ?, ?, ?, ?, ?)';
        $params = array($this->idAdministrador, $this->idPermiso, $this->idPeticion, $this->tipoNotificacion, $this->fechaEnvio, $this->descripcion);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para crear una nueva notificación.
    }

    // Método para leer todas las notificaciones.
    public function readAll()
    {
        $sql = 'SELECT
        n.id_notificacion,
        n.fecha_envio,
        n.descripcion,
        n.tipo_notificacion,
        CASE
            WHEN n.id_permiso IS NOT NULL THEN
                -- Si hay un permiso, mostramos información de permisos
                p.id_permiso
            ELSE
                -- Si no hay permiso, mostramos información de peticiones
                pe.id_peticion
        END 
        FROM 
            tb_notificaciones n
        LEFT JOIN 
            tb_permisos p ON n.id_permiso = p.id_permiso
        LEFT JOIN 
            tb_peticiones pe ON n.id_peticion = pe.id_peticion
        LEFT JOIN 
            tb_usuarios u ON u.id_usuario = p.id_usuario  -- Unimos con tb_usuarios para obtener el usuario de permisos
        LEFT JOIN 
            tb_usuarios u2 ON u2.id_usuario = pe.id_usuario  -- Unimos con tb_usuarios para obtener el usuario de peticiones
        ORDER BY n.fecha_envio DESC;';
        return Database::getRows($sql); // Obtiene y devuelve todas las notificaciones.
    }

    public function readAllByUser()
    {
        $sql = 'SELECT
                n.id_notificacion,
                n.fecha_envio,
                n.descripcion,
                n.tipo_notificacion,
                CASE
                    WHEN n.id_permiso IS NOT NULL THEN
                        -- Si hay un permiso, mostramos información de permisos
                        p.id_permiso
                    ELSE
                        -- Si no hay permiso, mostramos información de peticiones
                        pe.id_peticion
                END 
                FROM 
                    tb_notificaciones n
                LEFT JOIN 
                    tb_permisos p ON n.id_permiso = p.id_permiso
                LEFT JOIN 
                    tb_peticiones pe ON n.id_peticion = pe.id_peticion
                LEFT JOIN 
                    tb_usuarios u ON u.id_usuario = p.id_usuario  -- Unimos con tb_usuarios para obtener el usuario de permisos
                LEFT JOIN 
                    tb_usuarios u2 ON u2.id_usuario = pe.id_usuario  -- Unimos con tb_usuarios para obtener el usuario de peticiones
                WHERE 
                    u.id_usuario = ? OR u2.id_usuario = ?
                ORDER BY n.fecha_envio DESC;';
        $params = array($this->idUsuario, $this->idUsuario);
        return Database::getRows($sql,$params); // Obtiene y devuelve todas las notificaciones.
    }

    // Método para leer una notificación específica por su ID.
    public function readOne()
    {
        $sql = 'SELECT a.id_notificacion, b.id_administrador, b.nombre, b.apelido, a.id_permiso, a.fecha_envio, a.descripcion
                FROM tb_notificaciones a, tb_administradores b
                WHERE id_notificacion = ? AND a.id_administrador = b.id_administrador';
        $params = array($this->id);
        return Database::getRow($sql, $params); // Obtiene y devuelve una notificación específica.
    }

    // Método para leer una notificación por ID de permiso.
    public function readPermission()
    {
        $sql = 'SELECT a.id_notificacion, b.id_administrador, b.nombre, b.apellido, a.id_permiso, a.fecha_envio, a.descripcion
                FROM tb_notificaciones a
                JOIN tb_administradores b ON a.id_administrador = b.id_administrador
                JOIN tb_permisos c ON a.id_permiso = c.id_permiso
                WHERE a.id_permiso = ?';
        $params = array($this->idPermiso);
        return Database::getRow($sql, $params); // Obtiene y devuelve una notificación específica por ID de permiso.
    }

    // Método para actualizar una notificación.
    public function updateRow()
    {
        $sql = 'UPDATE tb_notificaciones
                SET id_administrador = ?, id_permiso = ?, fecha_envio = ?, descripcion = ?
                WHERE id_notificacion = ?';
        $params = array($this->idAdministrador, $this->idPermiso, $this->fechaEnvio, $this->descripcion, $this->id);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para actualizar una notificación.
    }

    // Método para eliminar una notificación por su ID.
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_notificaciones
                WHERE id_notificacion = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para eliminar una notificación.
    }

    public function sendNotification(){
        enviarNotificacionPush($this->token,$this->title,$this->descripcion);
    }
}
?>
