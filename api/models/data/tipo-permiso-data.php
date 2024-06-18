<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../helpers/validator.php');
// Se incluye la clase padre.
require_once('../models/handler/tipo-permiso-handler.php');
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
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del tipo de permiso es incorrecto';
            return false;
        }
    }

    public function setIdClasificacion($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->clasificacion = $value;
            return true;
        } else {
            $this->data_error = 'La clasificación del permiso es incorrecta';
            return false;
        }
    }

    public function setTipo($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El tipo de permiso debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->tipo = $value;
            return true;
        } else {
            $this->data_error = 'El tipo de permiso debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setLapso($value)
    {
        if (in_array($value, ['1', '2', '3'])) {
            $this->lapso = $value;
            return true;
        } else {
            $this->data_error = 'El lapso es incorrecto';
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
?>
