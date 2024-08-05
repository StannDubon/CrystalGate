// Definir la URL de la API para clasificación de permisos
const CLASIFICACION_PERMISO_API = 'services/admin/clasificacion-permiso.php';
// Definir la URL de la API para Tipo permiso
const TIPO_PERMISO_API = 'services/admin/tipo-permiso.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('search-form'),
    SEARCH_INPUT = document.getElementById('search-input');
// Constantes para obtener el id de las cajas donde se mostrarán los datos de las tablas  
const PERMISSIONS = document.getElementById('box-permissions');
const VACATION = document.getElementById('box-Vacation')
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL_AUTHORIZATION = document.getElementById('modal-authorization');
const SAVE_MODAL_SUB_AUTHORIZATION = document.getElementById('modal-subAuthorization');
const MODAL_TITLE_AUTHORIZATION = document.getElementById('modal-title-authorization');
const MODAL_TITLE_SUB_AUTHORIZATION = document.getElementById('modal-title-sub-authorization');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM_AUTHORIZATION = document.getElementById('saveForm-authorization');
const SAVE_FORM_SUB_AUTHORIZATION = document.getElementById('saveForm-sub-authorization');
//Constantes ID'S
const ID_CLASIFICATION_PERMISO = document.getElementById('idClasificacionPermiso');
const ID_TIPO_PERMISO = document.getElementById('idTipoPermiso');
// Campos de entrada
const CLASIFICATION_PERMISO = document.getElementById('clasificacionPermiso'),
    TIPO_PERMISO = document.getElementById('tipoPermiso'),
    LAPSO_PERMISO = document.getElementById('lapsoPermiso');


// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {

    // Petición para solicitar los tipos de peticiones (request types).
    fillPermissions();
    fillTipoPermiso();
});

let SEARCH_VALUE = '';

// Método del evento para cuando se envía el formulario de buscar.
SEARCH_INPUT.addEventListener('input', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();

    SEARCH_VALUE = event.target.value;

    if (SEARCH_VALUE !== '') {
        // Constante tipo objeto con los datos del formulario.
        const FORM = new FormData(SEARCH_FORM);

        // Añadir el valor del input al FormData
        FORM.append('search', SEARCH_VALUE);

        // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
        fillPermissions(FORM);
        fillTipoPermiso(FROM);
    } else {
        fillPermissions();
        fillTipoPermiso();
    }
});

// Función para abrir el modal de ADD AUTHORIZATION
const openModalAuthorization = () => {
    // Agrega la clase 'show' para mostrar el modal
    SAVE_MODAL_AUTHORIZATION.classList.add('show');
    // Actualiza el título del modal
    MODAL_TITLE_AUTHORIZATION.textContent = 'Add Authorization';
    // Reinicia el formulario
    SAVE_FORM_AUTHORIZATION.reset();
};

// Función para cerrar el modal de ADD AUTHORIZATION
const closeModalAuthorization = () => {
    // Elimina la clase 'show' para ocultar el modal
    SAVE_MODAL_AUTHORIZATION.classList.remove('show');
    document.body.classList.remove('body-no-scroll');
};

// Función para abrir el modal de ADD SUB-AUTHORIZATION
const openModalSubAuthorization = () => {
    // Agrega la clase 'show' para mostrar el modal
    SAVE_MODAL_SUB_AUTHORIZATION.classList.add('show');
    // Actualiza el título del modal
    MODAL_TITLE_SUB_AUTHORIZATION.textContent = 'Add Sub-Authorization';
    // Reinicia el formulario
    SAVE_FORM_SUB_AUTHORIZATION.reset();
}
// Función para cerrar el modal de ADD SUB-AUTHORIZATION
const closeModalSubAuthorization = () => {
    // Elimina la clase 'show' para ocultar el modal
    SAVE_MODAL_SUB_AUTHORIZATION.classList.remove('show');
    document.body.classList.remove('body-no-scroll');
};

//CÓDIGO DEL MODAL ADD AUTHORIZATION 
// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM_AUTHORIZATION.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Define la acción a realizar
    const action = (ID_CLASIFICATION_PERMISO.value) ? 'updateRow' : 'createRow';
    // Crea un objeto FormData con los datos del formulario
    const FORM = new FormData(SAVE_FORM_AUTHORIZATION);
    // Envía los datos a la API (Services)
    const DATA = await fetchData(CLASIFICACION_PERMISO_API, action, FORM);
    if (DATA.status) {
        // Cierra el modal si la respuesta es satisfactoria
        SAVE_MODAL_AUTHORIZATION.classList.remove('show');
        document.body.classList.remove('body-no-scroll');
        // Muestra un mensaje de éxito
        showAlert(1, DATA.message);
        // Recarga la lista de permisos
        fillPermissions();
    } else {
        // Muestra un mensaje de error
        showAlert(2, DATA.error);
    }
});

// Función para llenar la lista de permisos 
const fillPermissions = async (form = null) => {
    const action = (form) ? 'searchRows' : 'readAll';
    PERMISSIONS.innerHTML = '';
    const DATA_AUTHORIZATION = await fetchData(CLASIFICACION_PERMISO_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA_AUTHORIZATION.status) {
        // Se inicializa el contenedor de productos.
        PERMISSIONS.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA_AUTHORIZATION.dataset.forEach(row => {
            // Se crean y concatenan las filas con los datos de cada tipo de permissions.
            PERMISSIONS.innerHTML += `
                <li>
                    <div class="authorization-action-button">
                        <div class="authorization-delete-button" onclick="openDeleteAuthorization(${row.id_clasificacion_permiso})">
                            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.33333 4H1.55556V14.4C1.55556 14.8243 1.71944 15.2313 2.01117 15.5314C2.30289 15.8314 2.69855 16 3.11111 16H10.8889C11.3014 16 11.6971 15.8314 11.9888 15.5314C12.2806 15.2313 12.4444 14.8243 12.4444 14.4V4H2.33333ZM5.44444 13.6H3.88889V6.4H5.44444V13.6ZM10.1111 13.6H8.55556V6.4H10.1111V13.6ZM10.5918 1.6L9.33333 0H4.66667L3.40822 1.6H0V3.2H14V1.6H10.5918Z" fill="white"/>
                            </svg>
                        </div>
                        <div class="authorization-edit-button" onclick="openUpdateAuthorization(${row.id_clasificacion_permiso})">
                            <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.39909 0.34587C9.59372 0.154035 9.90631 0.154001 10.101 0.345793L11.8261 2.04534C12.0248 2.24116 12.0248 2.56176 11.8261 2.75762L10.6802 3.88707C10.4856 4.0789 10.173 4.07894 9.97833 3.88715L8.25326 2.1876C8.0545 1.99178 8.05447 1.67118 8.25318 1.47532L9.39909 0.34587ZM0.149348 9.44923C0.0538065 9.54322 0 9.67164 0 9.80566V11.4976C0 11.7737 0.223858 11.9976 0.5 11.9976H2.23278C2.36398 11.9976 2.48991 11.946 2.58343 11.854L8.81839 5.72019C9.01742 5.52439 9.01754 5.20353 8.81865 5.00758L7.09359 3.30805C6.89905 3.11638 6.58671 3.11627 6.39203 3.30779L0.149348 9.44923ZM0 14.899C0 14.6229 0.223858 14.399 0.5 14.399H12.5C12.7761 14.399 13 14.6229 13 14.899V15.5C13 15.7761 12.7761 16 12.5 16H0.5C0.223858 16 0 15.7761 0 15.5V14.899Z" fill="white"/>
                            </svg>
                        </div>
                    </div>
                    <span>${row.clasificacion_permiso}</span>
                </li>
            `;
        });
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        PERMISSIONS.textContent = DATA_AUTHORIZATION.error;
    }
};

// Método del evento para cuando se envía el formulario de guardar en Request Type.
SAVE_FORM_AUTHORIZATION.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_CLASIFICATION_PERMISO.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM_AUTHORIZATION);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(CLASIFICACION_PERMISO_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL_AUTHORIZATION.classList.remove('show');
        document.body.classList.remove('body-no-scroll');
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la lista para visualizar los cambios.
        fillPermissions();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdateAuthorization = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idClasificacionPermiso', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(CLASIFICACION_PERMISO_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL_AUTHORIZATION.classList.add('show');
        MODAL_TITLE_AUTHORIZATION.textContent = 'Update document';
        // Se prepara el formulario.
        SAVE_FORM_AUTHORIZATION.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_CLASIFICATION_PERMISO.value = ROW. id_clasificacion_permiso;
        CLASIFICATION_PERMISO.value = ROW.clasificacion_permiso;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDeleteAuthorization = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('Do you want to delete permanently?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idClasificacionPermiso', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(CLASIFICACION_PERMISO_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la fila para visualizar los cambios.
            fillPermissions();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}


//CÓDIGO DEL MODAL ADD SUB-AUTHORIZATION 
const fillTipoPermiso = async (form = null) => {

    (form) ? action = 'searchRows' : action = 'readAll';

    VACATION.innerHTML = '';
    // Petición para solicitar los lenguajes de la peticion del documento (document languages).
    const DATA_TIPO_PERMISO = await fetchData(TIPO_PERMISO_API,action, form );
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA_TIPO_PERMISO.status) {
        // Se inicializa el contenedor de productos.
        VACATION.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA_TIPO_PERMISO.dataset.forEach(row => {
            // Se crean y concatenan las filas con los datos de la base.
            VACATION.innerHTML += `
                <li>
                    <div class="authorization-action-button">
                        <div class="authorization-delete-button" onclick="openDeleteTipoPermiso(${row.id_tipo_permiso})"><svg width="14" height="16"
                                viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.33333 4H1.55556V14.4C1.55556 14.8243 1.71944 15.2313 2.01117 15.5314C2.30289 15.8314 2.69855 16 3.11111 16H10.8889C11.3014 16 11.6971 15.8314 11.9888 15.5314C12.2806 15.2313 12.4444 14.8243 12.4444 14.4V4H2.33333ZM5.44444 13.6H3.88889V6.4H5.44444V13.6ZM10.1111 13.6H8.55556V6.4H10.1111V13.6ZM10.5918 1.6L9.33333 0H4.66667L3.40822 1.6H0V3.2H14V1.6H10.5918Z"
                                    fill="white" />
                            </svg></div>
                        <div class="authorization-edit-button" onclick="openUpdateTipoPermiso(${row.id_tipo_permiso})"><svg width="13" height="16"
                                viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.39909 0.34587C9.59372 0.154035 9.90631 0.154001 10.101 0.345793L11.8261 2.04534C12.0248 2.24116 12.0248 2.56176 11.8261 2.75762L10.6802 3.88707C10.4856 4.0789 10.173 4.07894 9.97833 3.88715L8.25326 2.1876C8.0545 1.99178 8.05447 1.67118 8.25318 1.47532L9.39909 0.34587ZM0.149348 9.44923C0.0538065 9.54322 0 9.67164 0 9.80566V11.4976C0 11.7737 0.223858 11.9976 0.5 11.9976H2.23278C2.36398 11.9976 2.48991 11.946 2.58343 11.854L8.81839 5.72019C9.01742 5.52439 9.01754 5.20353 8.81865 5.00758L7.09359 3.30805C6.89905 3.11638 6.58671 3.11627 6.39203 3.30779L0.149348 9.44923ZM0 14.899C0 14.6229 0.223858 14.399 0.5 14.399H12.5C12.7761 14.399 13 14.6229 13 14.899V15.5C13 15.7761 12.7761 16 12.5 16H0.5C0.223858 16 0 15.7761 0 15.5V14.899Z"
                                    fill="white" />
                            </svg></div>
                    </div>
                    <span>${row.tipo_permiso}</span>
                </li>
            `;
        });
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        VACATION.textContent = DATA_TIPO_PERMISO.error;
    }
}

// Método del evento para cuando se envía el formulario de guardar en Request Type.
SAVE_FORM_SUB_AUTHORIZATION.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_TIPO_PERMISO.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData( SAVE_FORM_SUB_AUTHORIZATION);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(TIPO_PERMISO_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL_SUB_AUTHORIZATION.classList.remove('show');
        document.body.classList.remove('body-no-scroll');
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la lista para visualizar los cambios.
        fillTipoPermiso();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdateTipoPermiso = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idTipoPermiso', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(TIPO_PERMISO_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL_SUB_AUTHORIZATION.classList.add('show');
        MODAL_TITLE_SUB_AUTHORIZATION.textContent = 'Update document';
        // Se prepara el formulario.
        SAVE_FORM_SUB_AUTHORIZATION.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_TIPO_PERMISO.value = ROW.id_tipo_permiso;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}


/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDeleteTipoPermiso = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('Do you want to delete permanently?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idTipoPermiso', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(TIPO_PERMISO_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la fila para visualizar los cambios.
            fillTipoPermiso();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

// Código de prueba para verificar si la API se esta mandando a llamar correctamente
// // Función asíncrona para manejar el llamada a la API (Services)
// const fetchData = async (url, action, form) => {
//     try {
//         const response = await fetch(url + '?action=' + action, {
//             method: 'POST',
//             body: form
//         });
//         if (!response.ok) {
//             throw new Error(HTTP error! status: ${response.status});
//         }
//         const text = await response.text();
//         // Añade esta línea para depurar
//         console.log('Raw response:', text);
//         const data = JSON.parse(text);
//         return data;
//     } catch (error) {
//         console.error('Error:', error);
//         return { status: false, error: 'Error en la petición' };
//     }
// };

// //Se esta llamando a sweetAlert 
// const showAlert = (type, message) => {
//     switch (type) {
//         case 1:
//             sweetAlert('Success', message, 'success');
//             break;
//         case 2:
//             sweetAlert('Error', message, 'error');
//             break;
//         default:
//             sweetAlert('Info', message, 'info');
//     }
// };