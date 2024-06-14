<?php
require_once('../../helpers/database.php');
class NotificacionesHandler{

    //campos de la tabla

    protected $id = null;
    protected $id_admin = null;
    protected $id_permiso = null;
    protected $fecha = null;
    protected $descripcion = null;

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    /* FUCNION PARA MOSTRAR LOS CARGOS */
    public function readAll()
    {
        $sql = 'SELECT *
                FROM tb_notificaciones';
        return Database::getRows($sql);
    }
    /* FUNCION PARA MOSTRAR LOS DATOS DE UN CARGO */
    public function readOne()
    {
        $sql = 'SELECT *
                FROM tb_notificaciones
                WHERE id_notificacion = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }
}