<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/tipo-peticion-handler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla TIPOS_PETICIONES.
 */
class TipoPeticionData extends TipoPeticionHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;

    /*
     *  Métodos para validar y establecer los datos.
     */

    // Método para establecer el ID del tipo de petición, validando que sea un número natural.
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'The identificator of the type of petition is incorrect';
            return false;
        }
    }

    // Método para establecer el tipo de petición, validando que sea alfanumérico y tenga una longitud válida.
    public function setTipo($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'The petition type has to be an alphanumeric value';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->tipo = $value;
            return true;
        } else {
            $this->data_error = 'The lenght of the type of petition has to be from ' . $min . ' and ' . $max;
            return false;
        }
    }

    // Método para establecer el estado del tipo de petición, validando que sea un valor booleano.
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
