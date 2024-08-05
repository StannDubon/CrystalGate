<?php
// Se incluye la clase para validar los datos de entrada.
require_once __DIR__ . ('/../../helpers/validator.php');
// Se incluye la clase padre.
require_once __DIR__ . ('/../../models/handler/permiso-handler.php');

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

    // Método para establecer el ID del permiso, validando que sea un número natural.
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

    // Método para establecer el ID del usuario, validando que sea un número natural.
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

    // Método para establecer el ID del tipo de permiso, validando que sea un número natural.
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

    // Método para establecer el ID de la clasificación de permiso, validando que sea un número natural.
    public function setIdClasificacionPermiso($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idClasificacionPermiso = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de la clasificación de permiso es incorrecto';
            return false;
        }
    }

    // Método para establecer el estado del permiso, validando que sea un número natural.
    public function setEstado($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->estado = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del estado permiso es incorrecto';
            return false;
        }
    }

    // Método para establecer la fecha de inicio del permiso, validando que sea un formato de fecha y hora válido.
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

    // Método para establecer la fecha de finalización del permiso, validando que sea un formato de fecha y hora válido.
    public function setFechaFinal($value)
    {
        if (Validator::validateDateTime($value)) {
            $this->fechaFinal = $value;
            return true;
        } else {
            $this->data_error = 'La fecha de finalización es incorrecta';
            return false;
        }
    }

    // Método para establecer la fecha de envío del permiso, validando que sea un formato de fecha y hora válido.
    public function setFechaEnvio($value)
    {
        if (Validator::validateDateTime($value)) {
            $this->fechaEnvio = $value;
            return true;
        } else {
            $this->data_error = 'La fecha de envío es incorrecta';
            return false;
        }
    }

    // Método para establecer el nombre de archivo asociado al permiso.
    public function setFilename()
    {
        if ($data = $this->readFilename()) {
            $this->filename = $data['documento_permiso'];
            return true;
        } else {
            $this->data_error = 'Permiso inexistente';
            return false;
        }
    }

    // Método para establecer el documento asociado al permiso.
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

    // Método para establecer la descripción del permiso.
    public function setDescripcion($value)
    {
        if (Validator::validateString($value)) {
            $this->descripcion = $value;
            return true;
        } else {
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

    // Método para obtener el nombre de archivo asociado al permiso.
    public function getFilename()
    {
        return $this->filename;
    }
}
?>
