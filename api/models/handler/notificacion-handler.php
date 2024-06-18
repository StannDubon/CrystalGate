<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla TIPOS_PERMISOS.
 */
class NotificacionHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $idAdministrador = null;
    protected $idPermiso = null;
    protected $fechaEnvio = null;
    protected $descripcion = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */


public function searchRows()
{
    $value = '%' . Validator::getSearchValue() . '%';
    // Se prepara la consulta SQL para buscar notificaciones por fecha de envío.
    $sql = "SELECT a.*, b.nombre, b.apellido  FROM tb_notificaciones a, tb_administradores b 
    WHERE DATE(fecha_envio) = ? AND a.id_administrador = b.id_administrador";
    // Se ejecuta la consulta preparada con la fecha proporcionada.
    $params = array( $value);
    return Database::getRows($sql, $params);
}


     public function createRow()
     {
         $sql = 'INSERT INTO tb_notificaciones(id_administrador, id_permiso, fecha_envio, descripcion)
                 VALUES(?, ?, ?, ?)';
         $params = array($this->idAdministrador, $this->idPermiso, $this->fechaEnvio, $this->descripcion);
         return Database::executeRow($sql, $params);
     }
 
     public function readAll()
     {
         $sql = 'SELECT a.id_notificacion, b.id_administrador, b.nombre, b.apellido, a.id_permiso, 
                 a.fecha_envio, a.descripcion
                 FROM tb_notificaciones a, tb_administradores b WHERE a.id_administrador = b.id_administrador';
         return Database::getRows($sql);
     }
 
     public function readOne()
     {
         $sql = 'SELECT a.id_notificacion, b.id_administrador, b.nombre, b.apelido, a.id_permiso, a.fecha_envio, a.descripcion
                 FROM tb_notificaciones a, tb_administradores b
                 WHERE id_notificacion = ? AND a.id_administrador = b.id_administrador';
         $params = array($this->id);
         return Database::getRow($sql, $params);
     }
 
     public function updateRow()
     {
         $sql = 'UPDATE tb_notificaciones
                 SET id_administrador = ?, id_permiso = ?, fecha_envio = ?, descripcion = ?
                 WHERE id_notificacion = ?';
         $params = array($this->idAdministrador, $this->idPermiso, $this->fechaEnvio, $this->descripcion, $this->id);
         return Database::executeRow($sql, $params);
     }
 
     public function deleteRow()
     {
         $sql = 'DELETE FROM tb_notificaciones
                 WHERE id_notificacion = ?';
         $params = array($this->id);
         return Database::executeRow($sql, $params);
     }
 }
?>
