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
    loadTemplate(); // Carga la plantilla.
    setupModalDiscardButtons(); // Configura los botones de descarte del modal.
    loadFormatSelectorJs(); // Carga el selector de formato JS.
    loadStatusSelectorJs('swal-custom-status-chooser-auth', "estadoClasificacionPermiso"); // Carga el selector de estado JS para autorizaciones.
    loadStatusSelectorJs('swal-custom-status-chooser-sub-auth', "estadoTipoPermiso"); // Carga el selector de estado JS para sub-autorizaciones.
    await fillAuthorizations(); // Llena las autorizaciones.
});

let SEARCH_VALUE = '';

// Método del evento para cuando se envía el formulario de buscar.
SEARCH_INPUT.addEventListener('input', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();

    SEARCH_VALUE = event.target.value; // Actualiza el valor de búsqueda.

    search(SEARCH_VALUE); // Realiza la búsqueda.
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
    FORM.append('search', SEARCH_VALUE);

    if (SEARCH_VALUE !== '') {
        // Constante tipo objeto con los datos del formulario.
        const FORM = new FormData(SEARCH_FORM);

        // Añadir el valor del input al FormData
        FORM.append('search', SEARCH_VALUE);

        // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
        await fillAuthorizations(FORM);
        await fillSubAuthorization(FORM);
    } else {
        await fillAuthorizations();
        await fillSubAuthorization();
    }
}

// Funcion para cerrar el modal
closeModal = () => {
    if (SAVE_MODAL_AUTHORIZATION.classList.contains('show')) {
        SAVE_MODAL_AUTHORIZATION.classList.remove('show');
    } else if (SAVE_MODAL_SUB_AUTHORIZATION.classList.contains('show')) {
        SAVE_MODAL_SUB_AUTHORIZATION.classList.remove('show');
    }
}

const fillAuthorizations = async (form = null) => {

    (form) ? action = 'searchRows' : action = 'readAll';

    AUTHORIZATION.innerHTML = '';
    // Petición para solicitar los tipos de peticiones (request types).
    const DATA_AUTHORIZATION = await fetchData(AUTHORIZATION_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA_AUTHORIZATION.status) {
        // Se inicializa el contenedor de productos.
        AUTHORIZATION.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA_AUTHORIZATION.dataset.forEach(row => {

            let reqLocStatusColor = null
            if (row.estado == 1) {
                reqLocStatusColor = "#8DDA8C"
            } else {
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
        fillSubAuthorization(); // Llena las sub autorizaciones.
        loadTemplate(); // Carga la plantilla.
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        AUTHORIZATION.textContent = DATA_AUTHORIZATION.error;
    }
}

/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
function openCreateAuthorization() {
    // Se asigna el título para la caja de diálogo (modal).
    MODAL_TITLE_AUTHORIZATION.textContent = 'Agregar Tipo de Permiso';
    // Se abre la caja de diálogo (modal) que contiene el formulario.
    SAVE_MODAL_AUTHORIZATION.classList.add('show');
    // Se establece el campo de estado como visible
    document.getElementById('state-form-group').style.display = "none";
    // Se restablecen los elementos del formulario.
    SAVE_FORM_AUTHORIZATION.reset();
    // Se establece el campo oculto con el valor inicial.
    ID_AUTHORIZATION.value = '';
}

/*
*   Función para abrir la caja de diálogo con el formulario al momento de actualizar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
async function openUpdateAuthorization(id_clasificacion_permiso) {
    // Se restablecen los elementos del formulario.
    SAVE_FORM_AUTHORIZATION.reset();
    // Se establece el campo oculto con el valor inicial.
    ID_AUTHORIZATION.value = '';

    // Se establece el título para la caja de diálogo (modal).
    MODAL_TITLE_AUTHORIZATION.textContent = 'Actualizar Tipo de Permiso';
    // Se abre la caja de diálogo (modal) que contiene el formulario.
    SAVE_MODAL_AUTHORIZATION.classList.add('show');
    // Se establece el campo de estado como visible
    document.getElementById('state-form-group').style.display = "block";

    // Constante tipo objeto con los datos del registro solicitado.
    const FORM = new FormData();
    FORM.append('id_clasificacion_permiso', id_clasificacion_permiso);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(AUTHORIZATION_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializan los campos del formulario.
        ID_AUTHORIZATION.value = DATA.dataset.id_clasificacion_permiso;
        CLASIFICACION_PERMISO.value = DATA.dataset.clasificacion_permiso;
        ESTADO_CLASIFICACION_PERMISO.value = DATA.dataset.estado;
    } else {
        sweetAlert(2, DATA.exception, false);
    }
}

/*
*   Función para establecer el registro a eliminar en el formulario.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
function openDeleteAuthorization(id_clasificacion_permiso) {
    // Se define un objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('id_clasificacion_permiso', id_clasificacion_permiso);

    confirmDelete(FORM);
}

/*
*   Función asíncrona para llenar la tabla con los datos de los registros.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const fillSubAuthorization = async (form = null) => {

    (form) ? action = 'searchRows' : action = 'readAll';

    // Petición para obtener los datos del registro solicitado.
    const DATA_SUB_AUTHORIZATION = await fetchData(SUB_AUTHORIZATION_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA_SUB_AUTHORIZATION.status) {
        DATA_SUB_AUTHORIZATION.dataset.forEach(row => {
            // Se obtiene el ul correspondiente al id_clasificacion_permiso
            let authorization_ul = document.getElementById(`box-${row.id_clasificacion_permiso}`);
            if (authorization_ul) {
                authorization_ul.innerHTML += `
                <li class="row main">
                    <div class="column main">
                        <span class="title">${row.tipo_permiso}</span>
                    </div>
                    <div class="column">
                        <button onclick="openUpdateSubAuthorization(${row.id_tipo_permiso})">Edit</button>
                        <button onclick="openDeleteSubAuthorization(${row.id_tipo_permiso})">Delete</button>
                    </div>
                </li>
                `;
            }
        });
        loadTemplate(); // Carga la plantilla.
    } else {
        sweetAlert(2, DATA_SUB_AUTHORIZATION.exception, false);
    }
}

/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
function openCreateSubAuthorization() {
    // Se asigna el título para la caja de diálogo (modal).
    MODAL_TITLE_SUB_AUTHORIZATION.textContent = 'Agregar Sub Autorización';
    // Se abre la caja de diálogo (modal) que contiene el formulario.
    SAVE_MODAL_SUB_AUTHORIZATION.classList.add('show');
    // Se establece el campo de estado como visible
    document.getElementById('sub-state-form-group').style.display = "none";
    // Se restablecen los elementos del formulario.
    SAVE_FORM_SUB_AUTHORIZATION.reset();
    // Se establece el campo oculto con el valor inicial.
    ID_SUB_AUTHORIZATION.value = '';
}

/*
*   Función para abrir la caja de diálogo con el formulario al momento de actualizar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
async function openUpdateSubAuthorization(id_tipo_permiso) {
    // Se restablecen los elementos del formulario.
    SAVE_FORM_SUB_AUTHORIZATION.reset();
    // Se establece el campo oculto con el valor inicial.
    ID_SUB_AUTHORIZATION.value = '';

    // Se establece el título para la caja de diálogo (modal).
    MODAL_TITLE_SUB_AUTHORIZATION.textContent = 'Actualizar Sub Autorización';
    // Se abre la caja de diálogo (modal) que contiene el formulario.
    SAVE_MODAL_SUB_AUTHORIZATION.classList.add('show');
    // Se establece el campo de estado como visible
    document.getElementById('sub-state-form-group').style.display = "block";

    // Constante tipo objeto con los datos del registro solicitado.
    const FORM = new FormData();
    FORM.append('id_tipo_permiso', id_tipo_permiso);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(SUB_AUTHORIZATION_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializan los campos del formulario.
        ID_SUB_AUTHORIZATION.value = DATA.dataset.id_tipo_permiso;
        TIPO_PERMISO.value = DATA.dataset.tipo_permiso;
        LAPSO_PERMISO.value = DATA.dataset.lapso_permiso;
        ESTADO_TIPO_PERMISO.value = DATA.dataset.estado;
        SELECT_ID_AUTHORIZATION.value = DATA.dataset.id_clasificacion_permiso;
    } else {
        sweetAlert(2, DATA.exception, false);
    }
}

/*
*   Función para establecer el registro a eliminar en el formulario.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
function openDeleteSubAuthorization(id_tipo_permiso) {
    // Se define un objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('id_tipo_permiso', id_tipo_permiso);

    confirmDelete(FORM);
}

/*
*   Función asíncrona para enviar los datos del formulario.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
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
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la lista para visualizar los cambios.
        await fillSubAuthorization();
    } else {
        sweetAlert(2, DATA.exception, false);
    }
});

/*
*   Función asíncrona para cambiar el estado de una autorización.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const changeAuthorizationStatus = async (id_clasificacion_permiso) => {
    // Se define un objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('id_clasificacion_permiso', id_clasificacion_permiso);

    // Petición para cambiar el estado del registro.
    const DATA = await fetchData(AUTHORIZATION_API, 'changeStatus', FORM);

    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la lista para visualizar los cambios.
        await fillAuthorizations();
    } else {
        sweetAlert(2, DATA.exception, false);
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