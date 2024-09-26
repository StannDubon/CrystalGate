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
            $this->data_error = 'The identificator of the type is incorrect';
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
            $this->data_error = 'The identificator of the administrator is incorrect';
            return false;
        }
    }

    // Método para establecer el nombre, validando que sea alfabético y tenga la longitud adecuada.
    public function setNombre($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'The name has to be an alphanumeric value';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombre = $value;
            return true;
        } else {
            $this->data_error = 'The lenght of the name has to be from' . $min . ' and' . $max;
            return false;
        }
    }

    // Método para establecer el apellido, validando que sea alfabético y tenga la longitud adecuada.
    public function setApellido($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'The last name has to be an alphanumeric value';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->apellido = $value;
            return true;
        } else {
            $this->data_error = 'The lenght of the last name has to be from ' . $min . ' and ' . $max;
            return false;
        }
    }

    // Método para establecer el correo, validando su formato y longitud.
    public function setCorreo($value, $min = 8, $max = 100)
    {
        if (!Validator::validateEmail($value)) {
            $this->data_error = 'The email is invalid';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->correo = $value;
            return true;
        } else {
            $this->data_error = 'The lenght of the email has to be from ' . $min . ' and ' . $max;
            return false;
        }
    }

    // Método para establecer la clave, validando que cumpla con los requisitos y almacenándola hasheada.
    public function setClave($value)
    {

        // Validación de la contraseña
        $hasLetter = preg_match('/[A-Za-z]/', $value);
        $hasDigit = preg_match('/\d/', $value);  
        $hasSpecialChar = preg_match('/[\W_]/', $value); // Caracteres especiales
        $noSpaces = !preg_match('/\s/', $value); // Sin espacios
    
        // Validación de secuencias numéricas
        $noSequentialNumbers = !preg_match('/(0123456789|123456789|23456789|3456789|456789)/', $value);
    
        if ($hasLetter && $hasDigit && $hasSpecialChar && $noSpaces && $noSequentialNumbers) {
            $this->clave = password_hash($value, PASSWORD_DEFAULT);
            return true;
        } else {
            $this->data_error = "Dag la contraseña debe contener al menos un carácter alfanumérico, un carácter especial, no debe tener espacios y no debe contener secuencias numéricas consecutivas.";
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
            $this->data_error = 'Unexistent Administrator';
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
            $this->data_error = 'Unexistent Administrator';
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
