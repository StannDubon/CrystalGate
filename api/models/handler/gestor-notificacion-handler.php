<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');

/*
 *  Clase para manejar el comportamiento de los datos de la tabla tb_notificaciones.
 */
class GestorNotificacionHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $idUsuario = null;
    protected $token = null;
    protected $estado = null;

    // Método para crear un nuevo gestor de notificaciones.
    public function createRow()
    {
        $sql = 'INSERT INTO tb_gestores_notificaciones(id_usuario, token, estado)
                VALUES(?, ?, ?)';
        $params = array($this->idUsuario, $this->token, $this->estado);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para crear un nuevo gestor de notificaciones.
    }

    // Método para leer todos los gestores por usuario.
    public function readAllByUser()
    {
        $sql = 'SELECT * FROM tb_gestores_notificaciones WHERE id_usuario = ?';
        $params = array($this->idUsuario);
        return Database::getRows($sql,$params);
    }

    // Método para leer un gestor específico por su token.
    public function readOne()
    {
        $sql = 'SELECT *
                FROM tb_gestores_notificaciones
                WHERE token = ?';
        $params = array($this->token);
        return Database::getRow($sql, $params); 
    }

    // Método para cambiar el estado del gestor por su token.
    public function changeState()
    {
        $sql = 'UPDATE tb_gestores_notificaciones
                SET estado = NOT estado
                WHERE token = ?';
        $params = array($this->token);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para eliminar una notificación.
    }

    // Método para eliminar un gestor por su token.
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_gestores_notificaciones
                WHERE token = ?';
        $params = array($this->token);
        return Database::executeRow($sql, $params); // Ejecuta la consulta para eliminar una notificación.
    }

    //Método para enviar una notificacion.
    
}
?>
