// Constantes para completar la ruta de la API.
const SUB_AUTHORIZATION_API = 'services/admin/tipo-permiso.php';
// Constante para establecer el form e input de buscar.
const SEARCH_FORM = document.getElementById('search-form'),
    SEARCH_INPUT = document.getElementById('search-input');
// Constantes para obtener el id de las cajas donde se mostrarán los datos de las tablas  
const AUTHORIZATION = document.getElementById('box-main-content');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL_AUTHORIZATION = document.getElementById('authorization-custom-modal'),
    SAVE_MODAL_SUB_AUTHORIZATION = document.getElementById('sub-authorization-custom-modal'),
    MODAL_TITLE_AUTHORIZATION = document.getElementById('modal-title-authorization'),
    MODAL_TITLE_SUB_AUTHORIZATION = document.getElementById('modal-title-sub-authorization');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM_AUTHORIZATION = document.getElementById('authorization-custom-form'),
    SAVE_FORM_SUB_AUTHORIZATION = document.getElementById('sub-authorization-custom-form'),
    // ID's
    ID_AUTHORIZATION = document.getElementById('idClasificacionPermiso'),
    ID_SUB_AUTHORIZATION = document.getElementById('idTipoPermiso'),
    // Campos de entrada
    //AUTHORIZATION (tb clasificacion permiso)
    CLASIFICACION_PERMISO = document.getElementById('clasificacionPermiso'),
    ESTADO_CLASIFICACION_PERMISO = document.getElementById('estadoClasificacionPermiso'),
    //SUB AUTHORIZATION (tb tipo permiso)
    SELECT_ID_AUTHORIZATION = document.getElementById('selectIdClasificacionPermiso'),
    TIPO_PERMISO = document.getElementById('tipoPermiso'),
    LAPSO_PERMISO = document.getElementById('lapsoPermiso'),
    ESTADO_TIPO_PERMISO = document.getElementById('estadoTipoPermiso');


// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    
    loadTemplate();
    setupModalDiscardButtons();
    loadFormatSelectorJs();
    loadStatusSelectorJs('swal-custom-status-chooser-auth', "estadoClasificacionPermiso");
    loadStatusSelectorJs('swal-custom-status-chooser-sub-auth', "estadoTipoPermiso");
    await fillAuthorizations();
    
});

let SEARCH_VALUE = '';

// Método del evento para cuando se envía el formulario de buscar.
SEARCH_INPUT.addEventListener('input', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();

    SEARCH_VALUE = event.target.value;

    search(SEARCH_VALUE);
   
});

// Método del evento para cuando se envía el formulario de guardar en Request Type.
SAVE_FORM_AUTHORIZATION.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_AUTHORIZATION.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM_AUTHORIZATION);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(AUTHORIZATION_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL_AUTHORIZATION.classList.remove('show');
        document.body.classList.remove('body-no-scroll');
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la lista para visualizar los cambios.
        await fillAuthorizations();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});


search = async (SEARCH_VALUE) => {
    const FORM = new FormData(SEARCH_FORM);

    // Añadir el valor del input al FormData
    FORM.append('search',SEARCH_VALUE);

    if (SEARCH_VALUE !== ''){
        // Constante tipo objeto con los datos del formulario.
        const FORM = new FormData(SEARCH_FORM);

        // Añadir el valor del input al FormData
        FORM.append('search',SEARCH_VALUE);

        // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
       await fillAuthorizations(FORM);
       await fillSubAuthorization(FORM);
    }else{
       await fillAuthorizations();
       await fillSubAuthorization();
    }
}

// Funcion para cerrar el modal

closeModal = () =>{
    if(SAVE_MODAL_AUTHORIZATION.classList.contains('show') ){
        SAVE_MODAL_AUTHORIZATION.classList.remove('show');
        document.body.classList.remove('body-no-scroll');
    }else if(SAVE_MODAL_SUB_AUTHORIZATION.classList.contains('show')){
        SAVE_MODAL_SUB_AUTHORIZATION.classList.remove('show');
        document.body.classList.remove('body-no-scroll');
    }
}

const fillAuthorizations = async (form = null) => {

    (form) ? action = 'searchRows' : action = 'readAll';

    AUTHORIZATION.innerHTML = '';
    // Petición para solicitar los tipos de peticiones (request types).
    const DATA_AUTHORIZATION = await fetchData(AUTHORIZATION_API,action,form); 
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA_AUTHORIZATION.status) {
        // Se inicializa el contenedor de productos.
        AUTHORIZATION.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA_AUTHORIZATION.dataset.forEach(row => {

            let reqLocStatusColor = null
            if(row.estado == 1){
                reqLocStatusColor = "#8DDA8C"
            } else{
                reqLocStatusColor = "#F54C60"
            }
            // Se crean y concatenan las filas con los datos de cada tipo de request.
            AUTHORIZATION.innerHTML += `
            <div class="wrapper">
            <div class="authorization">
                <div class="actions">
                    <svg width="13" height="5" viewBox="0 0 13 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.50008 0.916656C5.62925 0.916656 4.91675 1.62916 4.91675 2.49999C4.91675 3.37082 5.62925 4.08332 6.50008 4.08332C7.37091 4.08332 8.08342 3.37082 8.08342 2.49999C8.08342 1.62916 7.37091 0.916656 6.50008 0.916656ZM11.2501 0.916656C10.3792 0.916656 9.66675 1.62916 9.66675 2.49999C9.66675 3.37082 10.3792 4.08332 11.2501 4.08332C12.1209 4.08332 12.8334 3.37082 12.8334 2.49999C12.8334 1.62916 12.1209 0.916656 11.2501 0.916656ZM1.75008 0.916656C0.879248 0.916656 0.166748 1.62916 0.166748 2.49999C0.166748 3.37082 0.879248 4.08332 1.75008 4.08332C2.62091 4.08332 3.33341 3.37082 3.33341 2.49999C3.33341 1.62916 2.62091 0.916656 1.75008 0.916656Z" fill="var(--color-texto-2)"/>
                    </svg>
                    <div class="options">
                        <span class="option edit" onclick="PermissionPerType(${row.id_clasificacion_permiso}, '${row.clasificacion_permiso}')">Stats</span>
                        <span class="option edit" onclick="openReport(${row.id_clasificacion_permiso})">Export</span>
                        <span class="option delete" onclick="openDeleteAuthorization(${row.id_clasificacion_permiso})">Delete</span>
                        <span class="option edit" onclick="openUpdateAuthorization(${row.id_clasificacion_permiso})">Edit</span>
                    </div>
                </div>
                <span class="title">${row.clasificacion_permiso}</span>
                <div class="authorization-status-button" style="background-color: ${reqLocStatusColor};" onclick="changeAuthorizationStatus(${row.id_clasificacion_permiso})"></div>
            </div>

            <ul class="box-main-content" style="margin-left: 30px;" id="box-${row.id_clasificacion_permiso}"></ul>
            </div>
            `;
        });
        fillSubAuthorization();
        loadTemplate();
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        AUTHORIZATION.textContent = DATA_AUTHORIZATION.error;
    }
}


const PermissionPerType = async (id, type) => {
    const form = new FormData();
    form.append("idClasificacionPermiso", id);
    let DATA;

    // Reintenta la petición hasta que se obtengan datos válidos.
    while (!DATA || !DATA.status) {
        try {
            DATA = await fetchData(SUB_AUTHORIZATION_API, 'permissionsPerType', form);
        } catch (error) {
            console.log("Error en la petición, reintentando...", error);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 1 segundo antes de reintentar
        }
    }

    // Se declaran los arreglos para guardar los datos a graficar.
    let name = [];
    let quantity = [];
    
    // Se recorre el conjunto de registros fila por fila a través del objeto row.
    DATA.dataset.forEach(row => {
        // Se agregan los datos a los arreglos.
        name.push(row.tipo);
        quantity.push(row.cantidad);
    });

    // Llamada a la función para generar y mostrar un gráfico de barras. Se encuentra en el archivo components.js
    if(DATA){

        if(!quantity.every(item => item === 0)){
            document.getElementById("grapho-modal").classList.remove("inactive")
            graphoModal("Permissions per "+type);
            pieGraph('chart', name, quantity);
        } else{
            document.getElementById("grapho-modal").classList.add("inactive")
            graphoModal("There are no existing permissions for "+type); 
        }

    }
};

const PermissionsPerTypeGrapho = async () => {
    DATA = await fetchData('services/admin/permiso.php', 'readPermissionsPerTypeGraph');
    let data = [];
    let quantity = [];
    DATA.dataset.forEach(row => {
        data.push(row.tipo);
        quantity.push(row.cantidad);
    });
    if(DATA){

        if(!quantity.every(item => item === 0)){
            document.getElementById("grapho-modal").classList.remove("inactive")
            graphoModal("Permissions per Type");
            pieGraph('chart', data, quantity);
        } else{
            document.getElementById("grapho-modal").classList.add("inactive")
            graphoModal("There are no registered permissions"); 
        }

    }
};

/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openCreateAuthorization = () => {
    // Se muestra la caja de diálogo con su título.
    setStatusSelectorFromApi('swal-custom-status-chooser-auth', "estadoClasificacionPermiso");
    SAVE_MODAL_AUTHORIZATION.classList.add('show');
    document.body.classList.add('body-no-scroll'); // Evitar el scroll en el cuerpo de la página
        // Ajustar la posición del modal para que esté visible en la pantalla
        SAVE_MODAL_AUTHORIZATION.style.marginTop = window.scrollY + 'px';
    MODAL_TITLE_AUTHORIZATION.textContent = 'Add An Authorization';
    // Se prepara el formulario.
    SAVE_FORM_AUTHORIZATION.reset();
}

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
    const DATA = await fetchData(AUTHORIZATION_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL_AUTHORIZATION.classList.add('show');
        document.body.classList.add('body-no-scroll'); // Evitar el scroll en el cuerpo de la página
        // Ajustar la posición del modal para que esté visible en la pantalla
        SAVE_MODAL_AUTHORIZATION.style.marginTop = window.scrollY + 'px';
        MODAL_TITLE_AUTHORIZATION.textContent = 'Update authorization';
        // Se prepara el formulario.
        SAVE_FORM_AUTHORIZATION.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_AUTHORIZATION.value = ROW.id_clasificacion_permiso;
        CLASIFICACION_PERMISO.value = ROW.clasificacion_permiso;
        ESTADO_CLASIFICACION_PERMISO.value = ROW.estado;
        setStatusSelectorFromApi('swal-custom-status-chooser-auth', "estadoClasificacionPermiso");
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
    const RESPONSE = await confirmAction('Do you want to delete the authorization permanently?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idClasificacionPermiso', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(AUTHORIZATION_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la fila para visualizar los cambios.
            await fillAuthorizations();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

const changeAuthorizationStatus = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('Do you want to change the status of this authorization?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idClasificacionPermiso', id);
        // Petición para obtener los datos del registro solicitado.
        const DATA = await fetchData(AUTHORIZATION_API, 'changeStatus', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            sweetAlert(1, DATA.message, true);
            fillAuthorizations();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}


// Métodos para la tabla de DOCUMENT_LANGUAGES
const fillSubAuthorization = async (form = null) => {
    const action = form ? 'searchRows' : 'readAll';


    const DATA_SUB_AUTHORIZATION = await fetchData(SUB_AUTHORIZATION_API, action, form);

    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA_SUB_AUTHORIZATION.status) {
        let BOX_SUB_AUTHORIZATION = {};

        // Construir una lista de IDs de las box de sub autorizaciones
        DATA_SUB_AUTHORIZATION.dataset.forEach(row => {
            const boxId = 'box-' + row.id_clasificacion_permiso;
            if (!BOX_SUB_AUTHORIZATION[boxId]) {
                BOX_SUB_AUTHORIZATION[boxId] = [];
            }
            BOX_SUB_AUTHORIZATION[boxId].push(row);
        });

        // Limpiar el contenido de cada box antes de llenarla con nuevos datos
        Object.keys(BOX_SUB_AUTHORIZATION).forEach(boxId => {
            const boxElement = document.getElementById(boxId);
            if (boxElement) {
                boxElement.innerHTML = '';
                BOX_SUB_AUTHORIZATION[boxId].forEach(row => {
                    let reqLocStatusColor = null
            
                    if(row.estado == 1){
                        reqLocStatusColor = "#8DDA8C"
                    } else{
                        reqLocStatusColor = "#F54C60"
                    }
                    boxElement.innerHTML += `
                        <li>
                            <div class="authorization-action-button">
                                <div class="authorization-delete-button" onclick="openDeleteSubAuthorization(${row.id_tipo_permiso})"><svg width="14" height="16"
                                        viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M2.33333 4H1.55556V14.4C1.55556 14.8243 1.71944 15.2313 2.01117 15.5314C2.30289 15.8314 2.69855 16 3.11111 16H10.8889C11.3014 16 11.6971 15.8314 11.9888 15.5314C12.2806 15.2313 12.4444 14.8243 12.4444 14.4V4H2.33333ZM5.44444 13.6H3.88889V6.4H5.44444V13.6ZM10.1111 13.6H8.55556V6.4H10.1111V13.6ZM10.5918 1.6L9.33333 0H4.66667L3.40822 1.6H0V3.2H14V1.6H10.5918Z"
                                            fill="white" />
                                    </svg></div>
                                <div class="authorization-edit-button" onclick="openUpdateSubAuthorization(${row.id_tipo_permiso})"><svg width="13" height="16"
                                        viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.39909 0.34587C9.59372 0.154035 9.90631 0.154001 10.101 0.345793L11.8261 2.04534C12.0248 2.24116 12.0248 2.56176 11.8261 2.75762L10.6802 3.88707C10.4856 4.0789 10.173 4.07894 9.97833 3.88715L8.25326 2.1876C8.0545 1.99178 8.05447 1.67118 8.25318 1.47532L9.39909 0.34587ZM0.149348 9.44923C0.0538065 9.54322 0 9.67164 0 9.80566V11.4976C0 11.7737 0.223858 11.9976 0.5 11.9976H2.23278C2.36398 11.9976 2.48991 11.946 2.58343 11.854L8.81839 5.72019C9.01742 5.52439 9.01754 5.20353 8.81865 5.00758L7.09359 3.30805C6.89905 3.11638 6.58671 3.11627 6.39203 3.30779L0.149348 9.44923ZM0 14.899C0 14.6229 0.223858 14.399 0.5 14.399H12.5C12.7761 14.399 13 14.6229 13 14.899V15.5C13 15.7761 12.7761 16 12.5 16H0.5C0.223858 16 0 15.7761 0 15.5V14.899Z"
                                            fill="white" />
                                    </svg></div>
                            </div>
                            <span>${row.tipo_permiso}</span>
                            <div class="authorization-status-button" style="background-color: ${reqLocStatusColor};" onclick="changeSubAuthorizationStatus(${row.id_tipo_permiso})"></div>
                        </li>
                    `;
                });
            }
        });
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        console.error(DATA_SUB_AUTHORIZATION.error);
    }
}


/*
*   Función asíncrona para cargar las opciones en un select de formulario.
*   Parámetros: filename (nombre del archivo), action (acción a realizar), select (identificador del select en el formulario) y filter (dato opcional para seleccionar una opción o filtrar los datos).
*   Retorno: ninguno.
*/
const fillSelectAuthorization = async (filename, action, select, filter = undefined) => {
    // Se verifica si el filtro contiene un objeto para enviar a la API.
    const FORM = (typeof (filter) == 'object') ? filter : null;
    // Petición para obtener los datos.
    const DATA = await fetchData(filename, action, FORM);
    let content = '';
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje.
    if (DATA.status) {
        content += '<option value="" selected>Select an option</option>';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se obtiene el dato del primer campo de la sentencia SQL.
            value = Object.values(row)[0];
            // Se obtiene el dato del segundo campo de la sentencia SQL.
            text = Object.values(row)[1];
            // Se verifica el valor del filtro para enlistar las opciones.
            const SELECTED = (typeof (filter) == 'number') ? filter : null;
            if (value != SELECTED) {
                content += `<option value="${value}">${text}</option>`;
            } else {
                content += `<option value="${value}" selected>${text}</option>`;
            }
        });
    } else {
        content += '<option>No available options</option>';
    }
    // Se agregan las opciones a la etiqueta select mediante el id.
    document.getElementById(select).innerHTML = content;
}

// Método del evento para cuando se envía el formulario de guardar en Request Type.
SAVE_FORM_SUB_AUTHORIZATION.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_SUB_AUTHORIZATION.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM_SUB_AUTHORIZATION);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(SUB_AUTHORIZATION_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL_SUB_AUTHORIZATION.classList.remove('show');
        document.body.classList.remove('body-no-scroll');
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la lista para visualizar los cambios.
        fillSubAuthorization();
        loadTemplate();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openCreateSubAuthorization = () => {
    // Se muestra la caja de diálogo con su título.
    updateSelectColor();
    loadFormatSelectorJs();
    setStatusSelectorFromApi('swal-custom-status-chooser-sub-auth', "estadoTipoPermiso");
    SAVE_MODAL_SUB_AUTHORIZATION.classList.add('show');
    document.body.classList.add('body-no-scroll'); // Evitar el scroll en el cuerpo de la página
        // Ajustar la posición del modal para que esté visible en la pantalla
        SAVE_MODAL_SUB_AUTHORIZATION.style.marginTop = window.scrollY + 'px';
    MODAL_TITLE_SUB_AUTHORIZATION.textContent = 'Add a sub authorization';
    // Se prepara el formulario.
    
    SAVE_FORM_SUB_AUTHORIZATION.reset();
    fillSelect(AUTHORIZATION_API, 'readAll', 'selectIdClasificacionPermiso');
}

/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdateSubAuthorization = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idTipoPermiso', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(SUB_AUTHORIZATION_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL_SUB_AUTHORIZATION.classList.add('show');
        document.body.classList.add('body-no-scroll'); // Evitar el scroll en el cuerpo de la página
        // Ajustar la posición del modal para que esté visible en la pantalla
        SAVE_MODAL_SUB_AUTHORIZATION.style.marginTop = window.scrollY + 'px';
        MODAL_TITLE_SUB_AUTHORIZATION.textContent = 'Update sub authorization';
        // Se prepara el formulario.
        SAVE_FORM_SUB_AUTHORIZATION.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_SUB_AUTHORIZATION.value = ROW.id_tipo_permiso;
        TIPO_PERMISO.value = ROW.tipo_permiso;
        fillSelect(AUTHORIZATION_API, 'readAll', 'selectIdClasificacionPermiso', ROW.id_clasificacion_permiso);
        LAPSO_PERMISO.value = ROW.lapso;
        ESTADO_TIPO_PERMISO.value = ROW.estado;
        setStatusSelectorFromApi('swal-custom-status-chooser-sub-auth', "estadoTipoPermiso");
        setFormatSelectorFromApi(ROW.lapso);
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDeleteSubAuthorization = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('Do you want to permanently delete the authorization?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idTipoPermiso', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(SUB_AUTHORIZATION_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la fila para visualizar los cambios.
            fillSubAuthorization();
            loadTemplate();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

const changeSubAuthorizationStatus = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('Do you want to change the status of this sub-authorization?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idTipoPermiso', id);
        // Petición para obtener los datos del registro solicitado.
        const DATA = await fetchData(SUB_AUTHORIZATION_API, 'changeStatus', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            sweetAlert(1, DATA.message, true);
            fillAuthorizations();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}


const openReport = (idClasificacionPermiso) => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/cantidad-permiso-clasificacion.php`);
    // Se agrega un parámetro a la ruta con el valor del registro seleccionado.
    PATH.searchParams.append('idClasificacionPermiso', idClasificacionPermiso);
    // Se abre el reporte en una nueva pestaña.
    console.log("path: " + PATH);
    window.open(PATH.href);
}