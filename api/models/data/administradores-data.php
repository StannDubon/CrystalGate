<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/administradores-handler.php');

/*
 * Clase para manejar el encapsulamiento de los datos de la tabla USUARIO.
 */
class AdministradoresData extends AdministradoresHandler
{
    // Atributo genérico para manejo de errores.
    private $data_error = null; 
    
    /*
     * Métodos para validar y asignar valores de los atributos.
     */
    public function setid_administrador($value)
    {
        // Validar si el valor es un número natural.
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            // Si no es válido, establecer mensaje de error.
            $this->data_error = 'El id del administrador es incorrecto';
            return false;
        }
    }

    // Método para establecer el nombre.
    public function setNombre($value, $min = 2, $max = 50)
    {
        // Validar si el valor es alfabético.
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'El nombre debe ser un valor alfabético';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            // Validar longitud y asignar valor.
            $this->nombre = $value;
            return true;
        } else {
            // Establecer mensaje de error por longitud inválida.
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    // Método para establecer el apellido.
    public function setApellido($value, $min = 2, $max = 50)
    {
        // Validar si el valor es alfabético.
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'El apellido debe ser un valor alfabético';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            // Validar longitud y asignar valor.
            $this->apellido = $value;
            return true;
        } else {
            // Establecer mensaje de error por longitud inválida.
            $this->data_error = 'El apellido debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    // Método para establecer el correo electrónico.
    public function setEmail($value, $min = 8, $max = 100)
    {
        // Validar si el valor es un correo electrónico válido.
        if (!Validator::validateEmail($value)) {
            $this->data_error = 'El correo no es válido';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            // Validar longitud y asignar valor.
            $this->email = $value;
            return true;
        } else {
            // Establecer mensaje de error por longitud inválida.
            $this->data_error = 'El correo debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    // Método para establecer la contraseña.
    public function setClave($value)
    {
        // Validar si la contraseña cumple con los requisitos.
        if (Validator::validatePassword($value)) {
            // Hashear la contraseña y asignarla.
            $this->clave = password_hash($value, PASSWORD_DEFAULT);
            return true;
        } else {
            // Establecer mensaje de error.
            $this->data_error = Validator::getPasswordError();
            return false;
        }
    }

    // Método para establecer el tipo de administrador.
    public function settipo_administrador($value, $min = 2, $max = 50)
    {
        // Validar si el valor es alfabético.
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'El nombre debe ser un valor alfabético';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            // Validar longitud y asignar valor.
            $this->nombre = $value;
            return true;
        } else {
            // Establecer mensaje de error por longitud inválida.
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
