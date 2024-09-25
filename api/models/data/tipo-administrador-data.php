<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/tipo-administrador-handler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla TIPO_ADMINISTRADOR.
 */
class TipoAdministradorData extends TipoAdministradorHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;

    /*
     *  Métodos para validar y establecer los datos.
     */

    // Método para establecer el ID del tipo de administrador, validando que sea un número natural.
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'The identificator of the type of administrator is incorrect';
            return false;
        }
    }

    // Método para establecer el tipo de administrador, validando que sea alfanumérico y tenga una longitud válida.
    public function setTipo($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'The administrator type has to be an alphanumeric value';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->tipo = $value;
            return true;
        } else {
            $this->data_error = 'The lenght of the type of administrator has to be from ' . $min . ' y ' . $max;
            return false;
        }
    }

    // Método para establecer el estado del tipo de administrador, validando que sea un valor booleano.
    public function setEstado($value)
    {
        if (Validator::validateBoolean($value)) {
            // Convertir cadenas 'true' y 'false' a booleanos
            if (is_string($value)) {
                $value = ($value === 'true' || $value === '1');
            } elseif (is_numeric($value)) {
                $value = (int) $value === 1;
            }

            // Asignar el valor validado a $this->estado
            $this->estado = (bool) $value;
            return true;
        } else {
            $this->data_error = 'The value of the state has to be a boolean (true/false o 1/0)';
            return false;
        }
    }

    // Método genérico para establecer valores booleanos.
    private function setBooleanValue(&$property, $value, $propertyName)
    {
        if (Validator::validateBoolean($value)) {
            $property = $this->convertToBoolean($value);
            return true;
        } else {
            $this->data_error = "The value for $propertyName has to be a boolean (true/false or 1/0)";
            return false;
        }
    }

    // Métodos para establecer los permisos de empleados.
    public function setPermisos($value)
    {
        return $this->setBooleanValue($this->permisos, $value, 'permisos');
    }

    public function setDocumentacion($value)
    {
        return $this->setBooleanValue($this->documentacion, $value, 'empleados_view');
    }

    public function setEmpleadosView($value)
    {
        return $this->setBooleanValue($this->empleados_view, $value, 'empleados_view');
    }

    public function setEmpleadosUpdate($value)
    {
        return $this->setBooleanValue($this->empleados_update, $value, 'empleados_update');
    }

    public function setEmpleadosDelete($value)
    {
        return $this->setBooleanValue($this->empleados_delete, $value, 'empleados_delete');
    }

    public function setEmpleadosAdd($value)
    {
        return $this->setBooleanValue($this->empleados_add, $value, 'empleados_add');
    }

    // Métodos para establecer los permisos de administradores.
    public function setAdministradoresView($value)
    {
        return $this->setBooleanValue($this->administradores_view, $value, 'administradores_view');
    }

    public function setAdministradoresUpdate($value)
    {
        return $this->setBooleanValue($this->administradores_update, $value, 'administradores_update');
    }

    public function setAdministradoresDelete($value)
    {
        return $this->setBooleanValue($this->administradores_delete, $value, 'administradores_delete');
    }

    public function setAdministradoresAdd($value)
    {
        return $this->setBooleanValue($this->administradores_add, $value, 'administradores_add');
    }

    // Métodos para establecer los permisos de autorizaciones.
    public function setAutorizacionesView($value)
    {
        return $this->setBooleanValue($this->autorizaciones_view, $value, 'autorizaciones_view');
    }

    public function setAutorizacionesUpdate($value)
    {
        return $this->setBooleanValue($this->autorizaciones_update, $value, 'autorizaciones_update');
    }

    public function setAutorizacionesDelete($value)
    {
        return $this->setBooleanValue($this->autorizaciones_delete, $value, 'autorizaciones_delete');
    }

    public function setAutorizacionesAdd($value)
    {
        return $this->setBooleanValue($this->autorizaciones_add, $value, 'autorizaciones_add');
    }

    // Métodos para establecer los permisos de tipo administrador.
    public function setTipoAdministradorView($value)
    {
        return $this->setBooleanValue($this->tipo_administrador_view, $value, 'tipo_administrador_view');
    }

    public function setTipoAdministradorUpdate($value)
    {
        return $this->setBooleanValue($this->tipo_administrador_update, $value, 'tipo_administrador_update');
    }

    public function setTipoAdministradorDelete($value)
    {
        return $this->setBooleanValue($this->tipo_administrador_delete, $value, 'tipo_administrador_delete');
    }

    public function setTipoAdministradorAdd($value)
    {
        return $this->setBooleanValue($this->tipo_administrador_add, $value, 'tipo_administrador_add');
    }

    // Método auxiliar para convertir valores a booleanos.
    private function convertToBoolean($value)
    {
        if (is_string($value)) {
            return ($value === 'true' || $value === '1');
        } elseif (is_numeric($value)) {
            return (int) $value === 1;
        }
        return (bool) $value;
    }

    /*
     *  Métodos para obtener el valor de los atributos adicionales.
     */

    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }
}
