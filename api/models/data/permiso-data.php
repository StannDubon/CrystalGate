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
            $this->data_error = 'The identificator of the permission is incorrect';
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
            $this->data_error = 'The identificator of the user is incorrect';
            return false;
        }
    }

    // Método para establecer el ID del tipo de permiso, validando que sea un número natural.
    public function setIdTipoPermiso($value)
    {
        /*if (Validator::validateNaturalNumber($value)) {*/
            $this->idTipoPermiso = $value;
            return true;
        /*} else {
            $this->data_error = 'The identificator of the type of permission is incorrect';
            return false;
        }*/
    }

    // Método para establecer el ID de la clasificación de permiso, validando que sea un número natural.
    public function setIdClasificacionPermiso($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idClasificacionPermiso = $value;
            return true;
        } else {
            $this->data_error = 'The identificator of the clasification of permission is incorrect';
            return false;
        }
    }

    // Método para establecer el estado del permiso, validando que sea un número natural.
    public function setEstado($value)
    {
        /*if (Validator::validateNaturalNumber($value)) {*/
            $this->estado = $value;
            return true;
        /*} else {
            $this->data_error = 'The identificator of the state of permission is incorrect';
            return false;
        }*/
    }

    public function setEstadoPendiente($value)
    {
        $this->estadoPendiente = $value;
        return true;
    }
    public function setEstadoAcceptado($value)
    {
        $this->estadoAcceptado = $value;
        return true;
    }
    public function setEstadoRechazado($value)
    {
        $this->estadoRechazado = $value;
        return true;
    }

    
    public function setSelectedSubPermissions($value)
    {
        /*if (Validator::validateNaturalNumber($value)) {*/
            $this->estado = $value;
            return true;
        /*} else {
            $this->data_error = 'The identificator of the state of permission is incorrect';
            return false;
        }*/
    }

    // Método para establecer la fecha de inicio del permiso, validando que sea un formato de fecha y hora válido.
    public function setFechaInicio($value)
    {
        if (Validator::validateDateTime2($value)) {
            $this->fechaInicio = $value;
            return true;
        } else {
            $this->data_error = 'The start date is incorrect';
            return false;
        }
    }

    // Método para establecer la fecha de finalización del permiso, validando que sea un formato de fecha y hora válido.
    public function setFechaFinal($value)
    {
        if (Validator::validateDateTime2($value)) {
            $this->fechaFinal = $value;
            return true;
        } else {
            $this->data_error = 'The finish date is incorrect';
            return false;
        }
    }

    // Método para establecer la fecha de envío del permiso, validando que sea un formato de fecha y hora válido.
    public function setFechaEnvio($value)
    {
        if (Validator::validateDateTime2($value)) {
            $this->fechaEnvio = $value;
            return true;
        } else {
            $this->data_error = 'The shipping date is incorrect';
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
            $this->data_error = 'Unexistent permission';
            return false;
        }
    }

    // Método para establecer el documento asociado al permiso.
    /*public function setDocumento($file, $filename = null)
    {
        if (Validator::validateFile($file, 1000)) {
            $this->filename = Validator::getFilename();
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
    }*/

    public function setDocumento($file)
{
    // Verificar que se haya subido un archivo y que no haya errores
    if (is_uploaded_file($file['tmp_name'])) {
        // Verificar que el archivo sea de tipo PDF o DOCX y que tenga un tamaño aceptable
        if (Validator::validateFile($file,5000)) {
            $this->documento = Validator::getFilename();
            return true;
        } else {
            $this->data_error = Validator::getFileError();
            return false;
        }
    } else {
        $this->data_error = 'No se ha subido ningún archivo o el archivo es inválido';
        return false;
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

    // public function setSelectedSubAuthorization($value)
    // {
    //     $this->arrayIdTipoPermiso = $value;
    //     return true;
    // }

    public function setSelectedSubAuthorization($value)
    {
        // Divide el valor en un array usando la coma como delimitador
        $array = explode(",", $value);
    
        // Itera sobre cada elemento del array para validarlo
        foreach ($array as $element) {
            // Limpia los espacios en blanco antes y después del valor
            $element = trim($element);
    
            // Valida si el elemento es un número natural
            if (!Validator::validateNaturalNumber($element)) {
                $this->data_error = 'The identificator of the type of permission is incorrect';
                return false;
            }
        }
    
        // Si todos los elementos son válidos, construye el resultado
        $result = implode('","', $array);
        $this->arrayIdTipoPermiso = $result;
    
        return true;
    }    

    public function setSelectedState($value)
    {
        // Divide el valor en un array usando la coma como delimitador
        $array = explode(",", $value);
    
        // Itera sobre cada elemento del array para validarlo
        foreach ($array as $element) {
            // Limpia los espacios en blanco antes y después del valor
            $element = trim($element);
    
            // Valida si el elemento es un número natural
            if (!Validator::validateNaturalNumber($element)) {
                $this->data_error = 'The identificator of the type of permission is incorrect';
                return false;
            }
        }
    
        // Si todos los elementos son válidos, construye el resultado
        $result = implode('","', $array);
        $this->arrayEstados = $result;
    
        return true;
    }    
    // public function setSelectedState($value)
    // {
    //     $this->arrayEstados = $value;
    //     return true;
    // }
    
    public function setParameters(array $params)
    {
        // Filtrar los valores válidos
        $validValues = array_filter($params, function ($value) {
            return Validator::validateNaturalNumber($value);
        });
    
        // Verificar si todos los valores son válidos
        if (count($validValues) !== count($params)) {
            // Encontrar el primer valor inválido y establecer el error
            $invalidKey = array_search(false, array_map(function ($value) {
                return Validator::validateNaturalNumber($value);
            }, $params), true);
    
            $this->data_error = 'The identificator of the ' . $invalidKey . ' is incorrect: ' . $params[$invalidKey];
            return false;
        }
    
        // Construir la cadena en el formato deseado
        $this->selected_subpermissions = implode(', ', $validValues);
    
        return true;
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
