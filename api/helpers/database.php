<?php
// Se incluyen las credenciales para conectar con la base de datos.
require_once('config.php');

/*
 *   Clase para realizar las operaciones en la base de datos.
 */
class Database
{
    // Propiedades de la clase para manejar las acciones respectivas.
    private static $connection = null;
    private static $statement = null;
    private static $error = null;

    /*
     *   Método para ejecutar las sentencias SQL.
     *   Parámetros: $query (sentencia SQL) y $values (arreglo con los valores para la sentencia SQL).
     *   Retorno: booleano (true si la sentencia se ejecuta satisfactoriamente o false en caso contrario).
     */
    public static function executeRow($query, $values)
    {
        try {
            // Se crea la conexión mediante la clase PDO con el controlador para MariaDB.
            self::$connection = new PDO('mysql:host=' . SERVER . ';dbname=' . DATABASE, USERNAME, PASSWORD);
            // Se prepara la sentencia SQL.
            self::$statement = self::$connection->prepare($query);
            // Se ejecuta la sentencia preparada y se retorna el resultado.
            return self::$statement->execute($values);
        } catch (PDOException $error) {
            // Se obtiene el código y el mensaje de la excepción para establecer un error personalizado.
            self::setException($error->getCode(), $error->getMessage());
            return false;
        }
    }

    public static function executeSingleRow($query)
    {
        try {
            // Se crea la conexión mediante la clase PDO con el controlador para MariaDB.
            self::$connection = new PDO('mysql:host=' . SERVER . ';dbname=' . DATABASE, USERNAME, PASSWORD);
            // Se prepara la sentencia SQL.
            self::$statement = self::$connection->prepare($query);
            // Se ejecuta la sentencia preparada y se retorna el resultado.
            return self::$statement->execute();
        } catch (PDOException $error) {
            // Se obtiene el código y el mensaje de la excepción para establecer un error personalizado.
            self::setException($error->getCode(), $error->getMessage());
            return false;
        }
    }

    /*
     *   Método para obtener el valor de la llave primaria del último registro insertado.
     *   Parámetros: $query (sentencia SQL) y $values (arreglo con los valores para la sentencia SQL).
     *   Retorno: numérico entero (último valor de la llave primaria si la sentencia se ejecuta satisfactoriamente o 0 en caso contrario).
     */
    public static function getLastRow($query, $values)
    {
        if (self::executeRow($query, $values)) {
            $id = self::$connection->lastInsertId();
        } else {
            $id = 0;
        }
        return $id;
    }

    /*
     *   Método para obtener un registro de una sentencia SQL tipo SELECT.
     *   Parámetros: $query (sentencia SQL) y $values (arreglo opcional con los valores para la sentencia SQL).
     *   Retorno: arreglo asociativo del registro si la sentencia SQL se ejecuta satisfactoriamente o false en caso contrario.
     */
    public static function getRow($query, $values = null, $decryptColumns = null) {
        if($decryptColumns != null){
            if (self::executeRow($query, $values)) {
                // Obtener el resultado
                $row = self::$statement->fetch(PDO::FETCH_ASSOC);
                
                if ($row) {
                    // Obtener el número de columnas
                    $columnCount = self::$statement->columnCount();
                    $columnNames = [];
        
                    // Iterar sobre las columnas para obtener sus nombres
                    for ($i = 0; $i < $columnCount; $i++) {
                        $columnMeta = self::$statement->getColumnMeta($i);
                        $columnNames[] = $columnMeta['name']; // Guardar el nombre de la columna
                    }
        
                    // Decrypt values if column names are in the decrypt array
                    foreach ($decryptColumns as $index) {
                        if (isset($row[$columnNames[$index]])) {
                            // Decrypt the value in the specific column
                            $row[$columnNames[$index]] = Encryption::decrypt($row[$columnNames[$index]]);
                        }
                    }
                    return $row; // Retornar la fila desencriptada
                } else {
                    return false; // No se encontró ninguna fila
                }
            } else {
                return false; // Error al ejecutar la consulta
            }
        } else {
            if (self::executeRow($query, $values)) {
                return self::$statement->fetch(PDO::FETCH_ASSOC);
            } else {
                return false;
            }
        }
    }

    /*
     *   Método para obtener todos los registros de una sentencia SQL tipo SELECT.
     *   Parámetros: $query (sentencia SQL) y $values (arreglo opcional con los valores para la sentencia SQL).
     *   Retorno: arreglo asociativo de los registros si la sentencia SQL se ejecuta satisfactoriamente o false en caso contrario.
     */
    public static function getRows($query, $values = null, $decryptColumns = null) {
        if($decryptColumns != null){
            if (self::executeRow($query, $values)) {
                // Obtener los resultados
                $rows = self::$statement->fetchAll(PDO::FETCH_ASSOC);
                
                // Obtener el número de columnas
                $columnCount = self::$statement->columnCount();
                $columnNames = [];
                
                // Iterar sobre las columnas para obtener sus nombres
                for ($i = 0; $i < $columnCount; $i++) {
                    $columnMeta = self::$statement->getColumnMeta($i);
                    $columnNames[] = $columnMeta['name']; // Guardar el nombre de la columna
                }
        
                // Decrypt values if column names are in the decrypt array
                foreach ($rows as &$row) { // Use reference to modify the original row
                    foreach ($decryptColumns as $index) {
                        if (isset($row[$columnNames[$index]])) {
                            // Decrypt the value in the specific column
                            $row[$columnNames[$index]] = Encryption::decrypt($row[$columnNames[$index]]);
                        }
                    }
                }
        
                return $rows; // Retornar las filas como estaba originalmente
            } else {
                return false;
            }
        } else{
            if (self::executeRow($query, $values)) {
                return self::$statement->fetchAll(PDO::FETCH_ASSOC);
            } else {
                return false;
            }
        }
    }

    /*
     *   Método para establecer un mensaje de error personalizado al ocurrir una excepción.
     *   Parámetros: $code (código del error) y $message (mensaje original del error).
     *   Retorno: ninguno.
     */
    private static function setException($code, $message)
    {
        // Se asigna el mensaje del error original por si se necesita.
        self::$error = $message . PHP_EOL;
        // Se compara el código del error para establecer un error personalizado.
        switch ($code) {
            case '2002':
                self::$error = 'Servidor desconocido';
                break;
            case '1049':
                self::$error = 'Base de datos desconocida';
                break;
            case '1045':
                self::$error = 'Acceso denegado';
                break;
            case '42S02':
                self::$error = 'Tabla no encontrada';
                break;
            case '42S22':
                self::$error = 'Columna no encontrada';
                break;
            case '23000':
                self::$error = 'Violación de restricción de integridad';
                break;
            default:
                self::$error = 'Ocurrió un problema en la base de datos';
        }
    }

    /*
     *   Método para obtener un error personalizado cuando ocurre una excepción.
     *   Parámetros: ninguno.
     *   Retorno: error personalizado.
     */
    public static function getException()
    {
        return self::$error;
    }
}