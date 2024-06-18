<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../helpers/validator.php');
// Se incluye la clase padre.
require_once('../models/handler/permiso-handler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla PERMISOS_AUTOMATICOS.
 */
class PermisoData extends PermisoHandler
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

    public function setIdTipoPermiso($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idTipoPermiso = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del tipo permiso es incorrecto';
            return false;
        }
    }

    public function setIdEstadoPermiso($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idEstadoPermiso = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del estado permiso es incorrecto';
            return false;
        }
    }

    public function setFechaInicio($value)
    {
        if (Validator::validateDateTime($value)) {
            $this->fechaInicio = $value;
            return true;
        } else {
            $this->data_error = 'La fecha de inicio es incorrecta';
            return false;
        }
    }

    public function setFechaFinal($value)
    {
        if (Validator::validateDateTime($value)) {
            $this->fechaFinal = $value;
            return true;
        } else {
            $this->data_error = 'La fecha de final es incorrecta';
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

    public function setFilename()
    {
        if ($data = $this->readFilename()) {
            $this->filename = $data['documento_permiso'];
            return true;
        } else {
            $this->data_error = 'Administrador inexistente';
            return false;
        }
    }

    public function setDocumento($file, $filename = null)
    {
        if (Validator::validateImageFile($file, 1000)) {
            $this->documento = Validator::getFilename();
            return true;
        } elseif (Validator::getFileError()) {
            $this->data_error = Validator::getFileError();
            return false;
        } elseif ($filename) {
            $this->documento = $filename;
            return true;
        } else {
            $this->documento = 'default.pdf';
            return true;
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
