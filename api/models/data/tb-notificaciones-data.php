<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/tb-notificaciones-handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla USUARIO.
 */
class NotificacionesData extends NotificacionesHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;

    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El id es incorrecto';
            return false;
        }
    }

    public function setIdAdministrador($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_administrador = $value;
            return true;
        } else {
            $this->data_error = 'El id del administrador es incorrecto';
            return false;
        }
    }

    public function setIdPermiso($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_permiso = $value;
            return true;
        } else {
            $this->data_error = 'El id del permiso es incorrecto';
            return false;
        }
    }

    public function setFecha($date){
        if(Validator::validateDate($date)){
            $this->fecha = $date;
            return true;
        }
        else{
            $this -> data_error = "La fecha es invalida";
        }
    }

    public function setDescripcion($value, $min=2, $max=250){
        if(Validator::validateLength($value,min,max)){
            $this -> descripcion = $value;
            return true;
        }
        else{
            $this -> data_error = "La descripcion es invalida";
        }
    }

    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }

}