<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class PeticionHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    // IDS
    protected $id = null;
    protected $idIdioma = null;
    protected $idUsuario = null;
    protected $idTipoPeticion = null;
    protected $idCentroEntrega = null;
    // NOT IDS
    protected $estado = null;
    protected $fechaEnvio = null;
    protected $direccion = null;
    protected $modoEntrega = null;
    protected $telefono = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */

    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT a.*, b.nombre, b.apellido, b.id_usuario, c.tipo_peticion, d.idioma, e.centro_entrega 
                FROM tb_peticiones a, tb_usuarios b, tb_tipos_peticiones c, tb_idiomas d, tb_centros_entregas e
                WHERE (a.modo_entrega LIKE ? OR d.idioma LIKE ? OR e.centro_entrega LIKE ? OR c.tipo_peticion LIKE ? OR a.estado LIKE ?)
                AND a.id_usuario = b.id_usuario AND a.id_tipo_peticion = c.id_tipo_peticion 
                AND a.id_idioma = d.id_idioma AND a.id_centro_entrega = e.id_centro_entrega';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_peticiones(id_usuario, id_tipo_peticion, id_idioma, id_centro_entrega, 
                fecha_envio, direccion, estado, modo_entrega, telefono_contacto) 
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->idUsuario, $this->idTipoPeticion, $this->idIdioma, $this->idCentroEntrega, 
                        $this->fechaEnvio, $this->direccion, $this->estado, $this->modoEntrega, 
                        $this->telefono);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT a.*, b.nombre, b.apellido, b.id_usuario, c.tipo_peticion, d.idioma, e.centro_entrega
                FROM tb_peticiones a, tb_usuarios b, tb_tipos_peticiones c, tb_idiomas d, tb_centros_entregas e
                WHERE a.id_usuario = b.id_usuario AND a.id_tipo_peticion = c.id_tipo_peticion 
                AND a.id_idioma = d.id_idioma AND a.id_centro_entrega = e.id_centro_entrega
                ORDER BY a.fecha_envio';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT a.*, b.nombre, b.apellido, b.id_usuario, c.tipo_peticion, d.idioma, e.centro_entrega
                FROM tb_peticiones a, tb_usuarios b, tb_tipos_peticiones c, tb_idiomas d, tb_centros_entregas e
                WHERE a.id_peticion = ? AND a.id_usuario = b.id_usuario AND a.id_tipo_peticion = c.id_tipo_peticion 
                AND a.id_idioma = d.id_idioma AND a.id_centro_entrega = e.id_centro_entrega';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_peticiones
                SET id_usuario = ?, id_tipo_peticion = ?, id_idioma = ?, id_centro_entrega = ?, 
                fecha_envio = ?, direccion = ?, estado = ?, modo_entrega = ?, telefono_contacto = ?
                WHERE id_peticion = ?';
        $params = array($this->idUsuario, $this->idTipoPeticion, $this->idIdioma, $this->idCentroEntrega, 
                        $this->fechaEnvio, $this->direccion, $this->estado, $this->modoEntrega, 
                        $this->telefono, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_peticiones
                WHERE id_peticion = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

}