<?php
// Se incluye la clase para validar los datos de entrada.
require_once __DIR__ . ('/../../helpers/validator.php');
// Se incluye la clase padre.
require_once __DIR__ . ('/../../models/handler/tipo-permiso-handler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla TIPOS_PERMISOS.
 */
class TipoPermisoData extends TipoPermisoHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;

    /*
     *  Métodos para validar y establecer los datos.
     */

    // Método para establecer el ID del tipo de permiso, validando que sea un número natural.
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'The identificator of the type of permission is incorrect';
            return false;
        }
    }

    // Método para establecer la clasificación del permiso, validando que sea un número natural.
    public function setIdClasificacion($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->clasificacion = $value;
            return true;
        } else {
            $this->data_error = 'The classification of the permission is incorrect';
            return false;
        }
    }

    // Método para establecer el tipo de permiso, validando que sea alfanumérico y tenga una longitud válida.
    public function setTipo($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'The permission type has to be alphanumeric ';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->tipo = $value;
            return true;
        } else {
            $this->data_error = 'The lenght of the type of permission has to be from ' . $min . ' and ' . $max;
            return false;
        }
    }

    // Método para establecer el lapso del permiso, validando que sea uno de los valores permitidos.
    public function setLapso($value)
    {
        if (in_array($value, ['1', '2', '3'])) {
            $this->lapso = $value;
            return true;
        } else {
            $this->data_error = 'The lapse is incorrect';
            return false;
        }
    }

    // Método para establecer el estado del tipo de permiso, validando que sea un valor booleano.
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
            $this->data_error = 'The value has to be a boolean (true/false o 1/0)';
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
