<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/tipo-administrador-handler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla TIPO_ADMINISTRADOR.
 */
class TipoAdministradorData extends TipoAdministradorHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;

    /*
     *  Métodos para validar y establecer los datos.
     */

    // Método para establecer el ID del tipo de administrador, validando que sea un número natural.
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'The identificator of the type of administrator is incorrect';
            return false;
        }
    }

    // Método para establecer el tipo de administrador, validando que sea alfanumérico y tenga una longitud válida.
    public function setTipo($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'The administrator type has to be an alphanumeric value';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->tipo = $value;
            return true;
        } else {
            $this->data_error = 'The lenght of the type of administrator has to be from ' . $min . ' y ' . $max;
            return false;
        }
    }

    // Método para establecer el estado del tipo de administrador, validando que sea un valor booleano.
    public function setEstado($value)
    {
        if (Validator::validateBoolean($value)) {
            // Convertir cadenas 'true' y 'false' a booleanos
            if (is_string($value)) {
                $value = ($value === 'true' || $value === '1');
            } elseif (is_numeric($value)) {
                $value = (int) $value === 1;
            }

            // Asignar el valor validado a $this->estado
            $this->estado = (bool) $value;
            return true;
        } else {
            $this->data_error = 'The value of the state has to be a boolean (true/false o 1/0)';
            return false;
        }
    }

    public function setPermissions($value)
    {
        // Validar si el valor es binario (0 o 1)
        if (Validator::isBinary($value)) {
            // Convertir cadenas 'true' y 'false' a booleanos
            if (is_string($value)) {
                $value = ($value === '1'); // Convertir '1' a true, '0' a false
            } elseif (is_numeric($value)) {
                $value = (int) $value === 1;
            }
    
            // Asignar el valor validado a $this->estado
            $this->permisos = $value;
            return true;
        } else {
            $this->data_error = 'The value must be binary (0 or 1).';
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
