<?php
// Se incluye la clase para validar los datos de entrada.
require_once __DIR__ . ('/../../helpers/validator.php');
// Se incluye la clase padre.
require_once __DIR__ . ('/../../models/handler/usuario-handler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla USUARIO.
 */
class UsuarioData extends UsuarioHandler
{
    // Atributo para manejo de errores.
    private $data_error = null;
    // Atributo para almacenar el nombre del archivo.
    private $filename = null;

    /*
     *  Métodos para validar y asignar valores de los atributos.
     */

    // Método para establecer el ID del usuario, validando que sea un número natural.
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del usuario es incorrecto';
            return false;
        }
    }

    // Método para establecer el ID del cargo del usuario, validando que sea un número natural.
    public function setIdCargo($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_cargo = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del cargo es incorrecto';
            return false;
        }
    }

    // Método para establecer el nombre del usuario, validando que sea alfabético y tenga una longitud válida.
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

    // Método para establecer el apellido del usuario, validando que sea alfabético y tenga una longitud válida.
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

    // Método para establecer el correo del usuario, validando que sea un correo electrónico válido y tenga una longitud válida.
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

    // Método para establecer la contraseña del usuario, validando que cumpla con las reglas de validación de contraseña.
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

    // Método para establecer el nombre del archivo, obteniéndolo desde la lectura de datos.
    public function setFilename()
    {
        if ($data = $this->readFilename()) {
            $this->filename = $data['imagen'];
            return true;
        } else {
            $this->data_error = 'Usuario inexistente';
            return false;
        }
    }

    // Método para establecer la imagen del usuario, validando el archivo y su tamaño.
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

    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }

    // Método para obtener el nombre del archivo.
    public function getFilename()
    {
        return $this->filename;
    }
}
