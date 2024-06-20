// Constantes para completar la ruta de la API.
const REQUEST_TYPE_API = 'services/admin/tipo-peticion.php',
    LANGUAGES_API = 'services/admin/idioma.php',
    LOCATIONS_API = 'services/admin/centro-entrega.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('search-form'),
    SEARCH_INPUT = document.getElementById('search-input');
// Constantes para obtener el id de las cajas donde se mostrarán los datos de las tablas  
const REQUEST_TYPE = document.getElementById('box-request-type'),
    LANGUAGES = document.getElementById('box-languages'),
    LOCATIONS = document.getElementById('box-locations');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL_REQUEST_TYPE = document.getElementById('modal-request-type'),
    SAVE_MODAL_LANGUAGES = document.getElementById('modal-languages'),
    SAVE_MODAL_LOCATIONS = document.getElementById('modal-locations'),
    MODAL_TITLE = document.getElementById('modal-title'),
    MODAL_TITLE_LOCATIONS = document.getElementById('modal-title-locations'),
    MODAL_TITLE_LANGUAGES = document.getElementById('modal-title-languages');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM_REQUEST_TYPE = document.getElementById('save-form-request-type'),
    SAVE_FORM_LANGUAGES = document.getElementById('save-form-languages'),
    SAVE_FORM_LOCATIONS = document.getElementById('save-form-locations'),
    // ID's
    ID_REQUEST_TYPE = document.getElementById('idTipoPeticion'),
    ID_LANGUAGES = document.getElementById('idIdioma'),
    ID_LOCATIONS = document.getElementById('idCentroEntrega'),
    // Campos de entrada
    TIPO_PETICION = document.getElementById('tipoPeticion'),
    ESTADO_REQUEST_TYPE = document.getElementById('estadoTipoPeticion'),
    IDIOMA = document.getElementById('idioma'),
    ESTADO_IDIOMA = document.getElementById('estadoIdioma'),
    CENTRO_ENTREGA = document.getElementById('centroEntrega'),
    ESTADO_CENTRO_ENTREGA = document.getElementById('estadoCentroEntrega');


// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    
    // Petición para solicitar los tipos de peticiones (request types).
    fillRequestType();
    
    fillLanguages();

    fillLocations();
});

let SEARCH_VALUE = '';

// Método del evento para cuando se envía el formulario de buscar.
SEARCH_INPUT.addEventListener('input', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();

    SEARCH_VALUE = event.target.value;

    if (SEARCH_VALUE !== ''){
        // Constante tipo objeto con los datos del formulario.
        const FORM = new FormData(SEARCH_FORM);

        // Añadir el valor del input al FormData
        FORM.append('search',SEARCH_VALUE);

        // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
        fillRequestType(FORM);
        fillLanguages(FORM);
        fillLocations(FORM);
    }else{
        fillRequestType();
        fillLanguages();
        fillLocations();
    }
   
});


// Funcion para cerrar el modal
closeModalRequestType = () => {
    SAVE_MODAL_REQUEST_TYPE.classList.remove('show');
}
closeModalLanguages = () => {
    SAVE_MODAL_LANGUAGES.classList.remove('show');
}
closeModalLocations = () => {
    SAVE_MODAL_LOCATIONS.classList.remove('show');
}

const fillRequestType = async (form = null) => {

    (form) ? action = 'searchRows' : action = 'readAll';

    REQUEST_TYPE.innerHTML = '';
    // Petición para solicitar los tipos de peticiones (request types).
    const DATA_REQUEST_TYPE = await fetchData(REQUEST_TYPE_API,action,form); 
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA_REQUEST_TYPE.status) {
        // Se inicializa el contenedor de productos.
        REQUEST_TYPE.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA_REQUEST_TYPE.dataset.forEach(row => {
            // Se crean y concatenan las filas con los datos de cada tipo de request.
            REQUEST_TYPE.innerHTML += `
                <li>
                    <div class="authorization-action-button">
                        <div class="authorization-delete-button" onclick="openDeleteRequestType(${row.id_tipo_peticion})"><svg width="14" height="16"
                                viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.33333 4H1.55556V14.4C1.55556 14.8243 1.71944 15.2313 2.01117 15.5314C2.30289 15.8314 2.69855 16 3.11111 16H10.8889C11.3014 16 11.6971 15.8314 11.9888 15.5314C12.2806 15.2313 12.4444 14.8243 12.4444 14.4V4H2.33333ZM5.44444 13.6H3.88889V6.4H5.44444V13.6ZM10.1111 13.6H8.55556V6.4H10.1111V13.6ZM10.5918 1.6L9.33333 0H4.66667L3.40822 1.6H0V3.2H14V1.6H10.5918Z"
                                    fill="white" />
                            </svg></div>
                        <div class="authorization-edit-button" onclick="openUpdateRequestType(${row.id_tipo_peticion})"><svg width="13" height="16"
                                viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.39909 0.34587C9.59372 0.154035 9.90631 0.154001 10.101 0.345793L11.8261 2.04534C12.0248 2.24116 12.0248 2.56176 11.8261 2.75762L10.6802 3.88707C10.4856 4.0789 10.173 4.07894 9.97833 3.88715L8.25326 2.1876C8.0545 1.99178 8.05447 1.67118 8.25318 1.47532L9.39909 0.34587ZM0.149348 9.44923C0.0538065 9.54322 0 9.67164 0 9.80566V11.4976C0 11.7737 0.223858 11.9976 0.5 11.9976H2.23278C2.36398 11.9976 2.48991 11.946 2.58343 11.854L8.81839 5.72019C9.01742 5.52439 9.01754 5.20353 8.81865 5.00758L7.09359 3.30805C6.89905 3.11638 6.58671 3.11627 6.39203 3.30779L0.149348 9.44923ZM0 14.899C0 14.6229 0.223858 14.399 0.5 14.399H12.5C12.7761 14.399 13 14.6229 13 14.899V15.5C13 15.7761 12.7761 16 12.5 16H0.5C0.223858 16 0 15.7761 0 15.5V14.899Z"
                                    fill="white" />
                            </svg></div>
                    </div>
                    <span>${row.tipo_peticion}</span>
                </li>
            `;
        });
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        REQUEST_TYPE.textContent = DATA_REQUEST_TYPE.error;
    }
}

// Método del evento para cuando se envía el formulario de guardar en Request Type.
SAVE_FORM_REQUEST_TYPE.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_REQUEST_TYPE.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM_REQUEST_TYPE);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(REQUEST_TYPE_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL_REQUEST_TYPE.classList.remove('show');
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la lista para visualizar los cambios.
        fillRequestType();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openCreateRequestType = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL_REQUEST_TYPE.classList.add('show');
    MODAL_TITLE.textContent = 'Add a request type';
    // Se prepara el formulario.
    SAVE_FORM_REQUEST_TYPE.reset();
}

/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdateRequestType = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idTipoPeticion', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(REQUEST_TYPE_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL_REQUEST_TYPE.classList.add('show');
        MODAL_TITLE.textContent = 'Update request type';
        // Se prepara el formulario.
        SAVE_FORM_REQUEST_TYPE.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_REQUEST_TYPE.value = ROW.id_tipo_peticion;
        TIPO_PETICION.value = ROW.tipo_peticion;
        ESTADO_REQUEST_TYPE.checked = ROW.estado;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDeleteRequestType = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('Do you want to delete the type of document request permanently?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idTipoPeticion', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(REQUEST_TYPE_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la fila para visualizar los cambios.
            fillRequestType();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}


// Métodos para la tabla de DOCUMENT_LANGUAGES
const fillLanguages = async (form = null) => {

    (form) ? action = 'searchRows' : action = 'readAll';

    LANGUAGES.innerHTML = '';
    // Petición para solicitar los lenguajes de la peticion del documento (document languages).
    const DATA_LANGUAGES = await fetchData(LANGUAGES_API,action, form );
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA_LANGUAGES.status) {
        // Se inicializa el contenedor de productos.
        LANGUAGES.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA_LANGUAGES.dataset.forEach(row => {
            // Se crean y concatenan las filas con los datos de la base.
            LANGUAGES.innerHTML += `
                <li>
                    <div class="authorization-action-button">
                        <div class="authorization-delete-button" onclick="openDeleteLanguage(${row.id_idioma})"><svg width="14" height="16"
                                viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.33333 4H1.55556V14.4C1.55556 14.8243 1.71944 15.2313 2.01117 15.5314C2.30289 15.8314 2.69855 16 3.11111 16H10.8889C11.3014 16 11.6971 15.8314 11.9888 15.5314C12.2806 15.2313 12.4444 14.8243 12.4444 14.4V4H2.33333ZM5.44444 13.6H3.88889V6.4H5.44444V13.6ZM10.1111 13.6H8.55556V6.4H10.1111V13.6ZM10.5918 1.6L9.33333 0H4.66667L3.40822 1.6H0V3.2H14V1.6H10.5918Z"
                                    fill="white" />
                            </svg></div>
                        <div class="authorization-edit-button" onclick="openUpdateLanguage(${row.id_idioma})"><svg width="13" height="16"
                                viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.39909 0.34587C9.59372 0.154035 9.90631 0.154001 10.101 0.345793L11.8261 2.04534C12.0248 2.24116 12.0248 2.56176 11.8261 2.75762L10.6802 3.88707C10.4856 4.0789 10.173 4.07894 9.97833 3.88715L8.25326 2.1876C8.0545 1.99178 8.05447 1.67118 8.25318 1.47532L9.39909 0.34587ZM0.149348 9.44923C0.0538065 9.54322 0 9.67164 0 9.80566V11.4976C0 11.7737 0.223858 11.9976 0.5 11.9976H2.23278C2.36398 11.9976 2.48991 11.946 2.58343 11.854L8.81839 5.72019C9.01742 5.52439 9.01754 5.20353 8.81865 5.00758L7.09359 3.30805C6.89905 3.11638 6.58671 3.11627 6.39203 3.30779L0.149348 9.44923ZM0 14.899C0 14.6229 0.223858 14.399 0.5 14.399H12.5C12.7761 14.399 13 14.6229 13 14.899V15.5C13 15.7761 12.7761 16 12.5 16H0.5C0.223858 16 0 15.7761 0 15.5V14.899Z"
                                    fill="white" />
                            </svg></div>
                    </div>
                    <span>${row.idioma}</span>
                </li>
            `;
        });
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        LANGUAGES.textContent = DATA_LANGUAGES.error;
    }
}

// Método del evento para cuando se envía el formulario de guardar en Request Type.
SAVE_FORM_LANGUAGES.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_LANGUAGES.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM_LANGUAGES);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(LANGUAGES_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL_LANGUAGES.classList.remove('show');
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la lista para visualizar los cambios.
        fillLanguages();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openCreateLanguage = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL_LANGUAGES.classList.add('show');
    MODAL_TITLE_LANGUAGES.textContent = 'Add a document language';
    // Se prepara el formulario.
    SAVE_FORM_LANGUAGES.reset();
}

/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdateLanguage = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idIdioma', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(LANGUAGES_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL_LANGUAGES.classList.add('show');
        MODAL_TITLE_LANGUAGES.textContent = 'Update document language';
        // Se prepara el formulario.
        SAVE_FORM_LANGUAGES.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_LANGUAGES.value = ROW.id_idioma;
        IDIOMA.value = ROW.idioma;
        ESTADO_IDIOMA.checked = ROW.estado;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDeleteLanguage = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('Do you want to permanently delete the document language?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idIdioma', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(LANGUAGES_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la fila para visualizar los cambios.
            fillLanguages();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}


//Metodos para la tabla de Locations
const fillLocations = async (form = null) => {

    (form) ? action = 'searchRows' : action = 'readAll';

    LOCATIONS.innerHTML = '';

    // Petición para solicitar los centros de entrega de la peticion del documento (LOCATIONS).
    const DATA_LOCATIONS = await fetchData(LOCATIONS_API,action,form );
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA_LOCATIONS.status) {
        // Se inicializa el contenedor de productos.
        LOCATIONS.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA_LOCATIONS.dataset.forEach(row => {
            // Se crean y concatenan las tarjetas con los datos de cada producto.
            LOCATIONS.innerHTML += `
                <li>
                    <div class="authorization-action-button">
                        <div class="authorization-delete-button" onclick="openDeleteLocation(${row.id_centro_entrega})"><svg width="14" height="16"
                                viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.33333 4H1.55556V14.4C1.55556 14.8243 1.71944 15.2313 2.01117 15.5314C2.30289 15.8314 2.69855 16 3.11111 16H10.8889C11.3014 16 11.6971 15.8314 11.9888 15.5314C12.2806 15.2313 12.4444 14.8243 12.4444 14.4V4H2.33333ZM5.44444 13.6H3.88889V6.4H5.44444V13.6ZM10.1111 13.6H8.55556V6.4H10.1111V13.6ZM10.5918 1.6L9.33333 0H4.66667L3.40822 1.6H0V3.2H14V1.6H10.5918Z"
                                    fill="white" />
                            </svg></div>
                        <div class="authorization-edit-button" onclick="openUpdateLocation(${row.id_centro_entrega})"><svg width="13" height="16"
                                viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.39909 0.34587C9.59372 0.154035 9.90631 0.154001 10.101 0.345793L11.8261 2.04534C12.0248 2.24116 12.0248 2.56176 11.8261 2.75762L10.6802 3.88707C10.4856 4.0789 10.173 4.07894 9.97833 3.88715L8.25326 2.1876C8.0545 1.99178 8.05447 1.67118 8.25318 1.47532L9.39909 0.34587ZM0.149348 9.44923C0.0538065 9.54322 0 9.67164 0 9.80566V11.4976C0 11.7737 0.223858 11.9976 0.5 11.9976H2.23278C2.36398 11.9976 2.48991 11.946 2.58343 11.854L8.81839 5.72019C9.01742 5.52439 9.01754 5.20353 8.81865 5.00758L7.09359 3.30805C6.89905 3.11638 6.58671 3.11627 6.39203 3.30779L0.149348 9.44923ZM0 14.899C0 14.6229 0.223858 14.399 0.5 14.399H12.5C12.7761 14.399 13 14.6229 13 14.899V15.5C13 15.7761 12.7761 16 12.5 16H0.5C0.223858 16 0 15.7761 0 15.5V14.899Z"
                                    fill="white" />
                            </svg></div>
                    </div>
                    <span>${row.centro_entrega}</span>
                </li>
            `;
        });
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        LOCATIONS.textContent = DATA_LOCATIONS.error;
    }
}

// Método del evento para cuando se envía el formulario de guardar en Request Type.
SAVE_FORM_LOCATIONS.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_LOCATIONS.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM_LOCATIONS);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(LOCATIONS_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL_LOCATIONS.classList.remove('show');
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la lista para visualizar los cambios.
        fillLocations();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openCreateLocation = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL_LOCATIONS.classList.add('show');
    MODAL_TITLE_LOCATIONS.textContent = 'Add a location';
    // Se prepara el formulario.
    SAVE_FORM_LOCATIONS.reset();
}

/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdateLocation = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idCentroEntrega', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(LOCATIONS_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL_LOCATIONS.classList.add('show');
        MODAL_TITLE_LOCATIONS.textContent = 'Update location';
        // Se prepara el formulario.
        SAVE_FORM_LOCATIONS.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_LOCATIONS.value = ROW.id_centro_entrega;
        CENTRO_ENTREGA.value = ROW.centro_entrega;
        ESTADO_CENTRO_ENTREGA.checked = ROW.estado;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDeleteLocation = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('Do you want to delete the location permanently?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idCentroEntrega', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(LOCATIONS_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la fila para visualizar los cambios.
            fillLocations();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}
