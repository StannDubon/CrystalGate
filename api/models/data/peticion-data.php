<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/peticion-handler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla PERMISOS_AUTOMATICOS.
 */
class PeticionData extends PeticionHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;

    /*
     *  Métodos para validar y establecer los datos.
     */

    // Método para establecer el ID de la petición, validando que sea un número natural.
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'The identificator of the petition is incorrect';
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
            $this->data_error = 'The identificator of the user is incorrect';
            return false;
        }
    }

    // Método para establecer el ID del tipo de petición, validando que sea un número natural.
    public function setIdTipoPeticion($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idTipoPeticion = $value;
            return true;
        } else {
            $this->data_error = 'The identificator of the type of petition is incorrect';
            return false;
        }
    }

    // Método para establecer el ID del idioma, validando que sea un número natural.
    public function setIdIdioma($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idIdioma = $value;
            return true;
        } else {
            $this->data_error = 'The identificator of the language is incorrect';
            return false;
        }
    }

    // Método para establecer el ID del centro de entrega, validando que sea un número natural.
    public function setIdCentroEntrega($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idCentroEntrega = $value;
            return true;
        } else {
            $this->data_error = 'The identificator of the delivery center is incorrect';
            return false;
        }
    }

    // Método para establecer la fecha de envío de la petición, validando que sea un formato de fecha y hora válido.
    public function setFechaEnvio($value)
    {
        if (Validator::validateDateTime($value)) {
            $this->fechaEnvio = $value;
            return true;
        } else {
            $this->data_error = 'The shipping date is incorrect';
            return false;
        }
    }

    // Método para establecer la dirección de la petición, validando la longitud y que sea una cadena válida.
    public function setDireccion($value, $min = 2, $max = 255)
    {
        if (!Validator::validateLength($value, $min, $max)) {
            $this->data_error = 'El tamaño de la dirección debe estar entre ' . $min . ' y ' . $max . ' caracteres.';
        } elseif (Validator::validateString($value)) {
            $this->direccion = $value;
            return true;
        } else {
            $this->data_error = 'The direction is incorrect';
            return false;
        }
    }

    // Método para establecer el estado de la petición, validando que sea una cadena válida.
    public function setEstado($value)
    {
        if (Validator::validateString($value)) {
            $this->estado = $value;
            return true;
        } else {
            $this->data_error = 'State value must be a string';
            return false;
        }
    }

    // Método para establecer el modo de entrega de la petición, validando que sea un valor booleano.
    public function setModoEntrega($value)
    {
        if (Validator::validateBoolean($value)) {
            // Convertir cadenas 'true' y 'false' a booleanos
            if (is_string($value)) {
                $value = ($value === 'true' || $value === '1');
            } elseif (is_numeric($value)) {
                $value = (int) $value === 1;
            }

            // Asignar el valor validado a $this->modoEntrega
            $this->modoEntrega = (bool) $value;
            return true;
        } else {
            $this->data_error = 'The value of the delivery option has to be a boolean (true/false o 1/0)';
            return false;
        }
    }

    // Método para establecer el número de teléfono de la petición, validando que sea un número de teléfono válido.
    public function setTelefono($value)
    {
        if (Validator::validatePhone($value)) {
            $this->telefono = $value;
            return true;
        } else {
            $this->data_error = 'The phone number is invalid';
            return false;
        }
    }

    // Método para establecer el nombre de la petición, validando que sea una cadena alfabética.
    public function setNombre($value)
    {
        if (Validator::validateAlphabetic($value)) {
            $this->nombre = $value;
            return true;
        } else {
            $this->data_error = 'The name is invalid';
            return false;
        }
    }

    // Método para establecer el email de la petición, validando que sea un formato de email válido.
    public function setEmail($value)
    {
        if (Validator::validateEmail($value)) {
            $this->email = $value;
            return true;
        } else {
            $this->data_error = 'The email is invalid';
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
