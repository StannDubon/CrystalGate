<?php
// Se incluye la clase para validar los datos de entrada.
require_once __DIR__ . ('/../../helpers/validator.php');
// Se incluye la clase padre.
require_once __DIR__ . ('/../../models/handler/administrador-handler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla USUARIO.
 */
class AdministradorData extends AdministradorHandler
{
    // Atributo genérico para manejo de errores.
    private $data_error = null;
    private $filename = null;

    /*
     *  Métodos para validar y asignar valores de los atributos.
     */

    // Método para establecer el ID, validando que sea un número natural.
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del tipo es incorrecto';
            return false;
        }
    }

    // Método para establecer el ID del tipo de administrador, validando que sea un número natural.
    public function setIdTipoAdmin($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_tipo_administrador = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del administrador es incorrecto';
            return false;
        }
    }

    // Método para establecer el nombre, validando que sea alfabético y tenga la longitud adecuada.
    public function setNombre($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'El nombre debe ser un valor alfabético';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombre = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    // Método para establecer el apellido, validando que sea alfabético y tenga la longitud adecuada.
    public function setApellido($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'El apellido debe ser un valor alfabético';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->apellido = $value;
            return true;
        } else {
            $this->data_error = 'El apellido debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    // Método para establecer el correo, validando su formato y longitud.
    public function setCorreo($value, $min = 8, $max = 100)
    {
        if (!Validator::validateEmail($value)) {
            $this->data_error = 'El correo no es válido';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->correo = $value;
            return true;
        } else {
            $this->data_error = 'El correo debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    // Método para establecer la clave, validando que cumpla con los requisitos y almacenándola hasheada.
    public function setClave($value)
    {
        if (Validator::validatePassword($value)) {
            $this->clave = password_hash($value, PASSWORD_DEFAULT);
            return true;
        } else {
            $this->data_error = Validator::getPasswordError();
            return false;
        }
    }

    // Método para obtener el nombre de archivo de imagen del administrador.
    public function setFilename()
    {
        if ($data = $this->readFilename()) {
            $this->filename = $data['imagen'];
            return true;
        } else {
            $this->data_error = 'Administrador inexistente';
            return false;
        }
    }

    // Método para obtener el nombre de archivo de imagen del administrador desde la sesión.
    public function setSessionFilename()
    {
        if ($data = $this->readSessionFilename()) {
            $this->filename = $data['imagen'];
            return true;
        } else {
            $this->data_error = 'Administrador inexistente';
            return false;
        }
    }

    // Método para establecer la imagen del administrador, validando el archivo de imagen.
    public function setImagen($file, $filename = null)
    {
        if (Validator::validateImageFile($file, 100)) {
            $this->imagen = Validator::getFilename();
            return true;
        } elseif (Validator::getFileError()) {
            $this->data_error = Validator::getFileError();
            return false;
        } elseif ($filename) {
            $this->imagen = $filename;
            return true;
        } else {
            $this->imagen = 'default.png';
            return true;
        }
    }

    /*
     *  Métodos para obtener información y manejar errores.
     */

    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }

    // Método para obtener el nombre de archivo de imagen del administrador.
    public function getFilename()
    {
        return $this->filename;
    }
}
