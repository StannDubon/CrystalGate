<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/gestor-notificacion-handler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla IDIOMA.
 */
class GestorNotificacionData extends GestorNotificacionHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;
    private $filename = null;

    /*
     *  Métodos para validar y establecer los datos.
     */

    // Método para establecer el ID, validando que sea un número natural.
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'The identificator of the notification manager is incorrect';
            return false;
        }
    }

    // Método para establecer el ID del usuario, validando que sea un número natural.
    public function setIdUsuario($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idUsuario = $value;
            return true;
        } else {
            $this->data_error = 'The identificator of the notification manager is incorrect';
            return false;
        }
    }

    // Método para establecer el idioma, validando que sea alfanumérico y tenga la longitud adecuada.
    public function setToken($value)
    {   
        if (Validator::validateString($value)) {
            $this->idioma = $value;
            return true;
        } else {
            $this->data_error = 'The token is invalid';
            return false;
        }
    }

    // Método para establecer el estado, validando que sea un valor booleano.
    public function setEstado($value)
    {
        // Validar el valor booleano usando validateBoolean
        if (Validator::validateBoolean($value)) {
            // Convertir cadenas 'true' y 'false' a booleanos
            if (is_string($value)) {
                $value = ($value === 'true' || $value === '1');
            } elseif (is_numeric($value)) {
                $value = (int) $value === 1;
            }

            // Asignar el valor validado a $this->status
            $this->estado = (bool) $value;
            return true;
        } else {
            $this->data_error = 'The value of the state has to be boolean (true/false o 1/0)';
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

    // Método para obtener el nombre de archivo.
    public function getFilename()
    {
        return $this->filename;
    }
}
?>
