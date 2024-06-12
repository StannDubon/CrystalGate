<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/tb-tipos-permisos-handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla USUARIO.
 */
class TIposPermisosData extends TiposPermisosHandler
{

    private $data_error = null;
    public function setid_tipo_permiso($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del tipo permiso es incorrecto';
            return false;
        }
    }

    public function setid_clasificacion_permiso($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_clasificacion_proceso = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de la clasificacion del permiso es incorrecto';
            return false;
        }
    }

    public function settipo_permiso($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'El nombre debe ser un valor alfabético';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->tipo_proceso = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }
    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }
}