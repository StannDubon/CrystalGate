<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class PeticionesHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    // IDS
    protected $id = null;
    protected $id_idioma = null;
    protected $id_usuario = null;
    protected $id_tipo_peticion = null;
    protected $id_centro_entrega = null;
    // NOT IDS
    protected $direccion = null;
    protected $modo_entrega = null;
    protected $telefono_contacto = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */

}