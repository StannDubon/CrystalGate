<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class PermisoHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    // IDS
    protected $id = null;
    protected $idUsuario = null;
    protected $idTipoPermiso = null;
    protected $idEstadoPermiso = null;
    // NOT IDS
    protected $fechaInicio = null;
    protected $fechaFinal = null;
    protected $fechaEnvio = null;
    protected $documento = null;
    protected $descripcion = null;

    const RUTA_DOCUMENTO = '../documents/permiso/';

    /*
    *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */

    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT a.*, b.nombre, b.apellido, b.id_usuario FROM tb_permisos a, tb_usuarios b 
                WHERE (fecha_envio LIKE ? OR estado LIKE ?) AND a.id_usuario = b.id_usuario';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_permisos(id_usuario, id_tipo_permiso, id_estado_permiso, fecha_inicio, fecha_final, 
                fecha_envio, documento_permiso, descripcion_permiso) 
                VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->idUsuario, $this->idTipoPermiso, $this->idEstadoPermiso, $this->fechaInicio, 
                        $this->fechaFinal, $this->fechaEnvio, $this->documento, $this->descripcion);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT a.id_permiso ,b.nombre, b.apellido, b.id_usuario, tp.tipo_permiso, tp.lapso, a.fecha_inicio, a.fecha_final, a.fecha_envio, a.documento_permiso, a.descripcion_permiso
                FROM tb_permisos a, tb_usuarios b, tb_tipos_permisos tp, tb_estados_permisos ep
                WHERE a.id_usuario = b.id_usuario AND a.id_tipo_permiso = tp.id_tipo_permiso AND a.id_estado_permiso = ep.id_estado_permiso';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT a.*, b.nombre, b.apellido, b.id_usuario
                FROM tb_permisos a, tb_usuarios b
                WHERE a.id_permiso = ? AND a.id_usuario = b.id_usuario';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_permisos
                SET id_usuario = ?, id_tipo_permiso = ?, id_estado_permiso = ?, fecha_inicio = ?, fecha_final = ?, 
                fecha_envio = ?, documento_permiso = ?, descripcion_permiso = ?
                WHERE id_permiso = ?';
        $params = array($this->idUsuario, $this->idTipoPermiso, $this->idEstadoPermiso, $this->fechaInicio, 
                        $this->fechaFinal, $this->fechaEnvio, $this->documento, $this->descripcion, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_permisos
                WHERE id_permiso = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT documento_permiso
                FROM tb_permisos
                WHERE id_permiso = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }
}