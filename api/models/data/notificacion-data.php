<?php

require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/notificacion-handler.php');

class NotificacionData extends NotificacionHandler
{

    private $data_error = null;

    // Métodos para asignar valores a los atributos.
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setIdAdministrador($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idAdministrador = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setIdPermiso($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idPermiso = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setFechaEnvio($value)
    {
        if (Validator::validateDateTime($value)) {
            $this->fechaEnvio = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setDescripcion($value)
    {
        if (Validator::validateString($value)) {
            $this->descripcion = $value;
            return true;
        } else {
            return false;
        }
    }


    /*
     *  Métodos para obtener el valor de los atributos adicionales.
     */
    public function getDataError()
    {
        return $this->data_error;
    }
}