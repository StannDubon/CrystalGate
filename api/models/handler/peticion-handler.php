<?php
// Se incluye la clase para trabajar con la base de datos.
require_once __DIR__ . ('/../../helpers/database.php');

/*
 *  Clase para manejar el comportamiento de los datos de la tabla tb_peticiones.
 */
class PeticionHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $idIdioma = null;
    protected $idUsuario = null;
    protected $idTipoPeticion = null;
    protected $idCentroEntrega = null;
    protected $estado = null;
    protected $fechaEnvio = null;
    protected $direccion = null;
    protected $modoEntrega = null;
    protected $telefono = null;
    protected $nombre = null;
    protected $email = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */

    // Método para buscar peticiones según un valor de búsqueda general.
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = "SELECT a.*, b.nombre, b.apellido, b.id_usuario, c.tipo_peticion, d.idioma, e.centro_entrega, b.correo
                FROM tb_peticiones a, tb_usuarios b, tb_tipos_peticiones c, tb_idiomas d, tb_centros_entregas e
                WHERE a.id_usuario = b.id_usuario
                  AND a.id_tipo_peticion = c.id_tipo_peticion 
                  AND a.id_idioma = d.id_idioma 
                  AND a.id_centro_entrega = e.id_centro_entrega
                  AND (b.nombre LIKE ? OR b.apellido LIKE ? OR b.id_usuario LIKE ? OR c.tipo_peticion LIKE ? OR d.idioma LIKE ? OR e.centro_entrega LIKE ? OR b.correo LIKE ? OR CONCAT(b.nombre, ' ', b.apellido) LIKE ?)
                ";
        $params = array($value, $value, $value, $value, $value, $value, $value, $value);
        return Database::getRows($sql, $params);
    }

    // Método para crear una nueva petición.
    public function createRow()
    {
        $sql = 'INSERT INTO tb_peticiones(id_usuario, id_tipo_peticion, id_idioma, id_centro_entrega, 
                direccion, modo_entrega, nombre_entrega, email_entrega, telefono_contacto, estado, fecha_envio) 
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->idUsuario, $this->idTipoPeticion, $this->idIdioma, $this->idCentroEntrega, 
                        $this->direccion, $this->modoEntrega, $this->nombre, $this->email, $this->telefono,
                        $this->estado, $this->fechaEnvio);
        return Database::executeRow($sql, $params);
    }

    // Método para leer todas las peticiones.
    public function readAll()
    {
        $sql = 'SELECT a.*, b.nombre, b.apellido, b.id_usuario, c.tipo_peticion, d.idioma, e.centro_entrega, b.correo
                FROM tb_peticiones a, tb_usuarios b, tb_tipos_peticiones c, tb_idiomas d, tb_centros_entregas e
                WHERE a.id_usuario = b.id_usuario AND a.id_tipo_peticion = c.id_tipo_peticion 
                AND a.id_idioma = d.id_idioma AND a.id_centro_entrega = e.id_centro_entrega 
                ORDER BY a.estado';
        return Database::getRows($sql);
    }

    // Método para leer todas las peticiones de un cliente específico.
    public function readAllByCostumer()
    {
        $sql = 'SELECT a.*, b.nombre, b.apellido, b.id_usuario, c.tipo_peticion, d.idioma, e.centro_entrega
                FROM tb_peticiones a, tb_usuarios b, tb_tipos_peticiones c, tb_idiomas d, tb_centros_entregas e
                WHERE a.id_usuario = b.id_usuario AND a.id_tipo_peticion = c.id_tipo_peticion 
                AND a.id_idioma = d.id_idioma AND a.id_centro_entrega = e.id_centro_entrega 
                AND b.id_usuario = ?
                ORDER BY a.fecha_envio';
        $params = array($this->idUsuario);
        return Database::getRows($sql, $params);
    }

    // Método para leer una petición específica por su ID.
    public function readOne()
    {
        $sql = 'SELECT a.*, b.nombre, b.apellido, b.id_usuario, c.tipo_peticion, d.idioma, e.centro_entrega, b.correo
                FROM tb_peticiones a, tb_usuarios b, tb_tipos_peticiones c, tb_idiomas d, tb_centros_entregas e
                WHERE a.id_usuario = b.id_usuario AND a.id_tipo_peticion = c.id_tipo_peticion 
                AND a.id_idioma = d.id_idioma AND a.id_centro_entrega = e.id_centro_entrega AND a.id_peticion = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    // Método para los reportes de los días lunes.
    public function readAllMonday()
    {
        $sql = "SELECT 
                    p.id_usuario,
                    CONCAT(u.nombre, ' ', u.apellido) AS employee,
                    tp.tipo_peticion ,
                    c.centro_entrega,
                    p.direccion,
                    p.nombre_entrega,
                    p.email_entrega,
                    p.telefono_contacto,
                    p.fecha_envio,
                    CASE 
                        WHEN p.estado = 1 THEN 'Pending'
                        WHEN p.estado = 2 THEN 'Approved'
                        WHEN p.estado = 3 THEN 'Rejected'
                    END AS estado
                FROM tb_peticiones p
                JOIN tb_usuarios u ON p.id_usuario = u.id_usuario
                JOIN tb_tipos_peticiones tp ON p.id_tipo_peticion = tp.id_tipo_peticion
                JOIN tb_centros_entregas c ON p.id_centro_entrega = c.id_centro_entrega
                WHERE p.fecha_envio > (
                    SELECT DATE_ADD(DATE_SUB(CURDATE(), INTERVAL (WEEKDAY(CURDATE()) + 4) DAY), INTERVAL 14 HOUR)
                )
                ORDER BY p.fecha_envio";
        return Database::getRows($sql);
    }

    // Método para los reportes de los días martes y miércoles.
    public function readAllTueWed()
    {
        $sql = "SELECT 
                    p.id_usuario,
                    CONCAT(u.nombre, ' ', u.apellido) AS employee,
                    tp.tipo_peticion ,
                    c.centro_entrega,
                    p.direccion,
                    p.nombre_entrega,
                    p.email_entrega,
                    p.telefono_contacto,
                    p.fecha_envio,
                    CASE 
                        WHEN p.estado = 1 THEN 'Pending'
                        WHEN p.estado = 2 THEN 'Approved'
                        WHEN p.estado = 3 THEN 'Rejected'
                    END AS estado
                FROM tb_peticiones p
                JOIN tb_usuarios u ON p.id_usuario = u.id_usuario
                JOIN tb_tipos_peticiones tp ON p.id_tipo_peticion = tp.id_tipo_peticion
                JOIN tb_centros_entregas c ON p.id_centro_entrega = c.id_centro_entrega
                WHERE p.fecha_envio BETWEEN (
                    DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) - 4 DAY) + INTERVAL 14 HOUR
                ) AND (
                    DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) + 2 DAY) + INTERVAL 14 HOUR
                )
                ORDER BY p.fecha_envio";
        return Database::getRows($sql);
    }

    // Método para los reportes de los días jueves y viernes.
    public function readAllThursFri()
    {
        $sql = "SELECT 
                    p.id_usuario,
                    CONCAT(u.nombre, ' ', u.apellido) AS employee,
                    tp.tipo_peticion ,
                    c.centro_entrega,
                    p.direccion,
                    p.nombre_entrega,
                    p.email_entrega,
                    p.telefono_contacto,
                    p.fecha_envio,
                    CASE 
                        WHEN p.estado = 1 THEN 'Pending'
                        WHEN p.estado = 2 THEN 'Approved'
                        WHEN p.estado = 3 THEN 'Rejected'
                    END AS estado
                FROM tb_peticiones p
                JOIN tb_usuarios u ON p.id_usuario = u.id_usuario
                JOIN tb_tipos_peticiones tp ON p.id_tipo_peticion = tp.id_tipo_peticion
                JOIN tb_centros_entregas c ON p.id_centro_entrega = c.id_centro_entrega
                WHERE p.fecha_envio BETWEEN (
                    DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) + 1 DAY) + INTERVAL 14 HOUR
                ) AND (
                    DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) + 3 DAY) + INTERVAL 14 HOUR
                )
                ORDER BY p.fecha_envio";
        return Database::getRows($sql);
    }

    // Método para los reportes de los días sábado y domingo.
    public function readAllSatSun()
    {
        $sql = "SELECT 
                    p.id_usuario,
                    CONCAT(u.nombre, ' ', u.apellido) AS employee,
                    tp.tipo_peticion ,
                    c.centro_entrega,
                    p.direccion,
                    p.nombre_entrega,
                    p.email_entrega,
                    p.telefono_contacto,
                    p.fecha_envio,
                    CASE 
                        WHEN p.estado = 1 THEN 'Pending'
                        WHEN p.estado = 2 THEN 'Approved'
                        WHEN p.estado = 3 THEN 'Rejected'
                    END AS estado
                FROM tb_peticiones p
                JOIN tb_usuarios u ON p.id_usuario = u.id_usuario
                JOIN tb_tipos_peticiones tp ON p.id_tipo_peticion = tp.id_tipo_peticion
                JOIN tb_centros_entregas c ON p.id_centro_entrega = c.id_centro_entrega
                WHERE p.fecha_envio > (
                    SELECT DATE_ADD(DATE_SUB(CURDATE(), INTERVAL (WEEKDAY(CURDATE()) - 3) DAY), INTERVAL 14 HOUR)
                )
                ORDER BY p.fecha_envio";
        return Database::getRows($sql);
    }

    // Método para actualizar una petición.
    public function updateRow()
    {
        $sql = 'UPDATE tb_peticiones
                SET id_usuario = ?, id_tipo_peticion = ?, id_idioma = ?, id_centro_entrega = ?, 
                direccion = ?, modo_entrega = ?, nombre_entrega = ?, email_entrega = ?, telefono_contacto = ?,
                estado = ?, fecha_envio = ?
                WHERE id_peticion = ?';
        $params = array($this->idUsuario, $this->idTipoPeticion, $this->idIdioma, $this->idCentroEntrega, 
                        $this->direccion, $this->modoEntrega, $this->nombre, $this->email, $this->telefono,
                        $this->estado, $this->fechaEnvio, $this->id);
        return Database::executeRow($sql, $params);
    }

        // Método para actualizar solo el estado de una peticion.
        public function updateState()
        {
            $sql = 'UPDATE tb_peticiones
                    SET estado = ?
                    WHERE id_peticion = ?';
            $params = array($this->estado, $this->id);
            return Database::executeRow($sql, $params);
        }

    // Método para eliminar una petición por su ID.
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_peticiones
                WHERE id_peticion = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

}
