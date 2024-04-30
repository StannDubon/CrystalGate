<?php
require_once('../../helpers/database.php');
class tbCargosHandler{

    protected $id_cargo = null;
    protected $cargo = null;

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    /* FUNCION PARA BUSCAR LOS CARGOS POR EL NOMBRE DEL CARGO */
    public function searchRows()
    {
        $sql = 'SELECT id_cargo, cargo
                FROM tb_cargos
                WHERE cargo LIKE ?';
        $params = array($value);
        return Database::getRows($sql, $params);
    }
    /* FUNCION PARA CREAR TIPOS DE CARGOS, USANDO PROCEDIMIENTO ALMACENADO */
    public function createRow()
    {
        $sql = 'CALL InsertarCargo(?)';
        $params = array($this->cargo, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params);
    }
    /* FUCNION PARA MOSTRAR LOS CARGOS */
    public function readAll()
    {
        $sql = 'SELECT id_cargo, cargo
                FROM tb_cargos';
        return Database::getRows($sql);
    }
    /* FUNCION PARA MOSTRAR LOS DATOS DE UN CARGO */
    public function readOne()
    {
        $sql = 'SELECT id_cargo, cargo
                FROM tb_cargos
                WHERE id_cargo = ?';
        $params = array($this->id_cargo);
        return Database::getRow($sql, $params);
    }
    /* FUNCION PARA ACTUALIZAR LOS DATOS DEL CARGO  */
    public function updateRow()
    {
        $sql = 'UPDATE tb_cargos
                SET cargo = ?
                WHERE id_cargo = ?';
        $params = array($this->cargo, $this->id_cargo);
        return Database::executeRow($sql, $params);
    }
    /* FUNCION PARA ELIMINAR UN CARGO */
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_cargos
                WHERE id_cargo = ?';
        $params = array($this->id_cargo);
        return Database::executeRow($sql, $params);
    }
}