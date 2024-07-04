<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');

/*
 *  Clase para manejar el comportamiento de los datos de la tabla tb_permisos.
 */
class PermisoHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $idUsuario = null;
    protected $idTipoPermiso = null;
    protected $estado = null;
    protected $idClasificacionPermiso = null;
    protected $fechaInicio = null;
    protected $fechaFinal = null;
    protected $fechaEnvio = null;
    protected $documento = null;
    protected $descripcion = null;
    const RUTA_DOCUMENTO = '../documents/permiso/';

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */

    // Método para buscar permisos según un valor de búsqueda general.
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT a.*, b.nombre, b.apellido, b.id_usuario, c.tipo_permiso, a.estado
                FROM tb_permisos a, tb_usuarios b, tb_tipos_permisos c 
                WHERE (b.nombre LIKE ? OR b.apellido LIKE ?) AND a.id_usuario = b.id_usuario AND a.id_tipo_permiso = c.id_tipo_permiso';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    // Método para buscar permisos según una categoría específica.
    public function searchCategoryRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT a.id_permiso, b.nombre, b.apellido, b.id_usuario, tp.tipo_permiso, tp.id_clasificacion_permiso, tp.lapso, 
                a.fecha_inicio, a.fecha_final, a.fecha_envio, a.documento_permiso, a.descripcion_permiso, a.estado
                FROM tb_permisos a
                JOIN tb_usuarios b ON a.id_usuario = b.id_usuario
                JOIN tb_tipos_permisos tp ON a.id_tipo_permiso = tp.id_tipo_permiso
                WHERE tp.id_clasificacion_permiso = ? AND 
                    (b.nombre LIKE ? OR b.apellido LIKE ? OR tp.tipo_permiso LIKE ? OR tp.lapso LIKE ? OR a.descripcion_permiso LIKE ?)
                ORDER BY a.estado;';
        $params = array($this->idClasificacionPermiso, $value, $value, $value, $value, $value);
        return Database::getRows($sql, $params);
    }

    // Método para buscar permisos según una subcategoría específica.
    public function searchSubCategoryRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT a.id_permiso, b.nombre, b.apellido, b.id_usuario, tp.tipo_permiso, tp.id_clasificacion_permiso, tp.lapso, 
                a.fecha_inicio, a.fecha_final, a.fecha_envio, a.documento_permiso, a.descripcion_permiso, a.estado
                FROM tb_permisos a
                JOIN tb_usuarios b ON a.id_usuario = b.id_usuario
                JOIN tb_tipos_permisos tp ON a.id_tipo_permiso = tp.id_tipo_permiso
                WHERE a.id_tipo_permiso = ? AND 
                    (b.nombre LIKE ? OR b.apellido LIKE ? OR tp.lapso LIKE ? OR a.descripcion_permiso LIKE ?)
                ORDER BY a.estado;';
        $params = array($this->idTipoPermiso, $value, $value, $value, $value);
        return Database::getRows($sql, $params);
    }

    // Método para crear un nuevo permiso.
    public function createRow()
    {
        $sql = 'INSERT INTO tb_permisos(id_usuario, id_tipo_permiso, estado, fecha_inicio, fecha_final, 
                fecha_envio, documento_permiso, descripcion_permiso) 
                VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->idUsuario, $this->idTipoPermiso, $this->estado, $this->fechaInicio, 
                        $this->fechaFinal, $this->fechaEnvio, $this->documento, $this->descripcion);
        return Database::executeRow($sql, $params);
    }

    // Método para leer todos los permisos.
    public function readAll()
    {
        $sql = 'SELECT a.id_permiso, b.nombre, b.apellido, b.id_usuario, tp.tipo_permiso, tp.lapso, a.fecha_inicio, a.fecha_final, a.fecha_envio, a.documento_permiso, a.descripcion_permiso, a.estado
                FROM tb_permisos a, tb_usuarios b, tb_tipos_permisos tp
                WHERE a.id_usuario = b.id_usuario AND a.id_tipo_permiso = tp.id_tipo_permiso
                ORDER BY a.estado';
        return Database::getRows($sql);
    }

    // Método para leer todos los permisos según un estado específico.
    public function readAllByStatus()
    {
        $sql = 'SELECT a.id_permiso, b.nombre, b.apellido, b.id_usuario, tp.tipo_permiso, tp.lapso, a.fecha_inicio, a.fecha_final, a.fecha_envio, a.documento_permiso, a.descripcion_permiso, a.estado
                FROM tb_permisos a, tb_usuarios b, tb_tipos_permisos tp
                WHERE a.id_usuario = b.id_usuario AND a.id_tipo_permiso = tp.id_tipo_permiso AND a.estado = ?
                ORDER BY a.estado';
        $params = array($this->estado);
        return Database::getRows($sql, $params);
    }

    // Método para leer un permiso específico por su ID.
    public function readOne()
    {
        $sql = 'SELECT a.*, b.nombre, b.apellido, b.id_usuario, b.correo, c.lapso, a.estado
                FROM tb_permisos a, tb_usuarios b, tb_tipos_permisos c
                WHERE a.id_permiso = ? AND a.id_usuario = b.id_usuario AND a.id_tipo_permiso = c.id_tipo_permiso';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    // Método para leer todos los permisos pendientes.
    public function readAllPendings()
    {
        $sql = 'SELECT a.id_permiso, b.nombre, b.apellido, b.id_usuario, tp.tipo_permiso, tp.lapso, a.fecha_inicio, a.fecha_final, a.fecha_envio, a.documento_permiso, a.descripcion_permiso, a.estado
                FROM tb_permisos a, tb_usuarios b, tb_tipos_permisos tp
                WHERE a.estado = ? AND a.id_usuario = b.id_usuario AND a.id_tipo_permiso = tp.id_tipo_permiso';
        $params = array($this->estado);
        return Database::getRows($sql, $params);
    }

    // Método para leer permisos según una categoría específica.
    public function readCategory()
    {
        $sql = 'SELECT a.id_permiso, b.nombre, b.apellido, b.id_usuario, tp.tipo_permiso, tp.id_clasificacion_permiso, tp.lapso, a.fecha_inicio, a.fecha_final, a.fecha_envio, a.documento_permiso, a.descripcion_permiso, a.estado
                FROM tb_permisos a, tb_usuarios b, tb_tipos_permisos tp
                WHERE a.id_usuario = b.id_usuario AND a.id_tipo_permiso = tp.id_tipo_permiso AND tp.id_clasificacion_permiso = ?
                ORDER BY a.estado';
        $params = array($this->idClasificacionPermiso);
        return Database::getRows($sql, $params);
    }

    // Método para actualizar un permiso.
    public function updateRow()
    {
        $sql = 'UPDATE tb_permisos
                SET id_usuario = ?, id_tipo_permiso = ?, estado = ?, fecha_inicio = ?, fecha_final = ?, 
                fecha_envio = ?, documento_permiso = ?, descripcion_permiso = ?
                WHERE id_permiso = ?';
        $params = array($this->idUsuario, $this->idTipoPermiso, $this->estado, $this->fechaInicio, 
                        $this->fechaFinal, $this->fechaEnvio, $this->documento, $this->descripcion, $this->id);
        return Database::executeRow($sql, $params);
    }

    // Método para actualizar solo el estado de un permiso.
    public function updateState()
    {
        $sql = 'UPDATE tb_permisos
                SET estado = ?
                WHERE id_permiso = ?';
        $params = array($this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    // Método para eliminar un permiso por su ID.
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_permisos
                WHERE id_permiso = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    // Método para obtener el nombre de archivo de un permiso específico.
    public function readFilename()
    {
        $sql = 'SELECT documento_permiso
                FROM tb_permisos
                WHERE id_permiso = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    // Método para filtrar permisos según un tipo específico.
    public function selectedFilter()
    {
        $sql = 'SELECT a.id_permiso, b.nombre, b.apellido, b.id_usuario, tp.tipo_permiso, tp.lapso, a.fecha_inicio, a.fecha_final, a.fecha_envio, a.documento_permiso, a.descripcion_permiso, a.estado
                FROM tb_permisos a, tb_usuarios b, tb_tipos_permisos tp
                WHERE a.id_usuario = b.id_usuario AND a.id_tipo_permiso = tp.id_tipo_permiso AND tp.id_tipo_permiso = ?';
        $params = array($this->idTipoPermiso);
        return Database::getRows($sql, $params);
    }
}