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
            $this->data_error = 'El identificador del tipo de administrador es incorrecto';
            return false;
        }
    }

    // Método para establecer el tipo de administrador, validando que sea alfanumérico y tenga una longitud válida.
    public function setTipo($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El tipo de administrador debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->tipo = $value;
            return true;
        } else {
            $this->data_error = 'El tipo de administrador debe tener una longitud entre ' . $min . ' y ' . $max;
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
            $this->data_error = 'El valor de estado debe ser booleano (true/false o 1/0)';
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
