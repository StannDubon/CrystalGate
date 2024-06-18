
<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../helpers/validator.php');
// Se incluye la clase padre.
require_once('../models/handler/estado-permiso-handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla CATEGORIA.
 */
class EstadoPermisoData extends EstadoPermisoHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;
    private $filename = null;

    /*
     *  Métodos para validar y establecer los datos.
     */
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del tipo de peticion es incorrecto';
            return false;
        }
    }

    public function setEstPermiso($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El tipo de peticion debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->estpermiso = $value;
            return true;
        } else {
            $this->data_error = 'El tipo de peticion debe tener una longitud entre ' . $min . ' y ' . $max;
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


    /*
     *  Métodos para obtener el valor de los atributos adicionales.
     */
    public function getDataError()
    {
        return $this->data_error;
    }

    public function getFilename()
    {
        return $this->filename;
    }
}
