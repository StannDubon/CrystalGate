<?php

// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/notificacion-handler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla NOTIFICACION.
 */
class NotificacionData extends NotificacionHandler
{

    // Atributo para manejar errores de datos.
    private $data_error = null;

    // Métodos para asignar valores a los atributos.

    // Método para establecer el ID, validando que sea un número natural.
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            return false;
        }
    }

    // Método para establecer el ID, validando que sea un número natural.
    public function setTipoNotificacion($value)
    {   
        $this->tipoNotificacion = $value;
        return true;
    }

    // Método para establecer el ID del administrador, validando que sea un número natural.
    public function setIdAdministrador($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idAdministrador = $value;
            return true;
        } else {
            return false;
        }
    }

    // Método para establecer el ID del permiso, validando que sea un número natural.
    public function setIdPermiso($value)
    {
        $this->idPermiso = $value;
        return true;
    }

    // Método para establecer el ID del permiso, validando que sea un número natural.
    public function setIdUsuario($value)
    {
        $this->idUsuario = $value;
        return true;
    }

    // Método para establecer el ID de la peticion.
    public function setIdPeticion($value)
    {
        $this->idPeticion = $value;
        return true;
    }

    // Método para establecer la fecha de envío, validando que sea un formato de fecha y hora válido.
    public function setFechaEnvio($value)
    {
        if (Validator::validateDateTime2($value)) {
            $this->fechaEnvio = $value;
            return true;
        } else {
            return false;
        }
    }

    // Método para establecer la descripción, validando que sea una cadena de texto válida.
    public function setDescripcion($value)
    {
        if (Validator::validateString($value)) {
            $this->descripcion = $value;
            return true;
        } else {
            return false;
        }
    }

    // Método para establecer la descripción, validando que sea una cadena de texto válida.
    public function setTitle($value)
    {
        if (Validator::validateString($value)) {
            $this->title = $value;
            return true;
        } else {
            return false;
        }
    }

    // Método para establecer la descripción, validando que sea una cadena de texto válida.
    public function setToken($value)
    {
        if (Validator::validateString($value)) {
            $this->token = $value;
            return true;
        } else {
            return false;
        }
    }

    /*
     *  Métodos para obtener el valor de los atributos adicionales.
     */

    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }
}
?>
