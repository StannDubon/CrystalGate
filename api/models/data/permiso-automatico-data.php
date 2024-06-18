<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../helpers/validator.php');
// Se incluye la clase padre.
require_once('../models/handler/permiso-automatico-handler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla PERMISOS_AUTOMATICOS.
 */
class PermisoAutomaticoData extends PermisoAutomaticoHandler
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
            $this->data_error = 'El identificador del permiso automático es incorrecto';
            return false;
        }
    }

    public function setIdPermiso($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idPermiso = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del permiso es incorrecto';
            return false;
        }
    }

    public function setHoraEnvio($value)
    {
        if (Validator::validateTime($value)) {
            $this->horaEnvio = $value;
            return true;
        } else {
            $this->data_error = 'La hora de envío es incorrecta';
            return false;
        }
    }

    public function setEstado($value)
    {
        if (Validator::validateBoolean($value)) {
            if (is_string($value)) {
                $value = ($value === 'true' || $value === '1');
            } elseif (is_numeric($value)) {
                $value = (int) $value === 1;
            }
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
}
?>
