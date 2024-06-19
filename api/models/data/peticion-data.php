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
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del permiso es incorrecto';
            return false;
        }
    }

    public function setIdUsuario($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idUsuario = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del usuario es incorrecto';
            return false;
        }
    }

    public function setIdTipoPeticion($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idTipoPeticion = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del tipo peticion es incorrecto';
            return false;
        }
    }

    public function setIdIdioma($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idIdioma = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del idioma es incorrecto';
            return false;
        }
    }

    public function setIdCentroEntrega($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idCentroEntrega = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del centro de entrega es incorrecto';
            return false;
        }
    }

    public function setFechaEnvio($value)
    {
        if (Validator::validateDateTime($value)) {
            $this->fechaEnvio = $value;
            return true;
        } else {
            $this->data_error = 'La fecha de envio es incorrecta';
            return false;
        }
    }

    public function setDireccion($value, $min = 2, $max = 255)
    {
        if(!Validator::validateLength($value, $min, $max)){
            $this->data_error = 'El tamaño de la direccion debe estar entre ' + $min + ' y ' +$max + ' caracteres.';
        }
        else if (Validator::validateString($value)) {
            $this->direccion = $value;
            return true;
        } else {
            $this->data_error = 'La direccion es incorrecta';
            return false;
        }
    }

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
            $this->data_error = 'El valor de estado debe ser booleano (true/false o 1/0)';
            return false;
        }
    }

    public function setModoEntrega($value)
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
            $this->modoEntrega = (bool) $value;
            return true;
        } else {
            $this->data_error = 'El valor del modo de entrega debe ser booleano (true/false o 1/0)';
            return false;
        }
    }

    public function setTelefono($value)
    {
        if (Validator::validatePhone($value)) {
            $this->telefono = $value;
            return true;
        } else {
            $this->data_error = 'El número de contacto es invalido';
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
