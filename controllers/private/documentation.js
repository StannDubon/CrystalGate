const REQUEST_API = 'services/admin/peticion.php';
const NOTIFICACION_API = 'services/admin/notificacion.php'; // Endpoint de la API para solicitudes

const SEARCH_FORM = document.getElementById("searchForm"); // Elemento del formulario de búsqueda
const SEARCH_INPUT = document.getElementById("searchInput"); // Elemento de entrada de búsqueda

const REQUEST_MAIN_CONTAINER = document.getElementById("request-main-content"); // Contenedor para el contenido principal de solicitudes
const REQUEST_HEADER_TITLE = document.getElementById("main-header-request-main-title"); // Elemento del título del encabezado

// Elementos de datos del modal
const PETICION_INFO_MODAL = document.getElementById("modal-info");

const PETICION_INFO_MODAL_ID = document.getElementById('peticion-info-modal-id');
const PETICION_INFO_MODAL_BTN_MODIFY = document.getElementById('peticion-info-modal-btn-modify');
const PETICION_INFO_MODAL_DIRECCION = document.getElementById('peticion-info-modal-direccion');
const PETICION_INFO_MODAL_TELEFONO = document.getElementById('peticion-info-modal-telefono');
const PETICION_INFO_MODAL_NOMBRE = document.getElementById('peticion-info-modal-nombre');
const PETICION_INFO_MODAL_NOMBRE_ENTREGA = document.getElementById('peticion-info-modal-nombre-entrega');
const PETICION_INFO_MODAL_ID_USUARIO = document.getElementById('peticion-info-modal-id-usuario');
const PETICION_INFO_MODAL_TIPO_PETICION = document.getElementById('peticion-info-modal-tipo_peticion');
const PETICION_INFO_MODAL_IDIOMA = document.getElementById('peticion-info-modal-idioma');
const PETICION_INFO_MODAL_CENTRO_ENTREGA = document.getElementById('peticion-info-modal-centro-entrega');
const PETICION_INFO_MODAL_CORREO = document.getElementById('peticion-info-modal-correo');
const PETICION_INFO_MODAL_MODO_ENTREGA = document.getElementById('peticion-info-modal-modo-entrega');

function getCurrentDateTime() {
    const now = new Date();
  
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Meses de 0-11
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }  

// Evento que se ejecuta cuando el contenido del documento ha sido cargado
document.addEventListener('DOMContentLoaded', () => {
    loadTemplate(); // Cargar la plantilla
    fillTable(); // Llenar la tabla
    setupModalDiscardButtons(); // Configurar los botones de descarte del modal
});

// Evento que se ejecuta cuando se escribe en el campo de búsqueda
SEARCH_INPUT.addEventListener("input", (event) => {
    event.preventDefault();
    const FORM = new FormData(); // Crear un nuevo objeto FormData
    FORM.append("search", SEARCH_INPUT.value); // Añadir el valor de búsqueda al FormData
    fillTable(FORM); // Llenar la tabla con el formulario de búsqueda
});

// Función asincrónica para llenar la tabla
const fillTable = async (form = null) => {
    // Inicializar el contenido de la tabla
    REQUEST_MAIN_CONTAINER.innerHTML = '';

    if (form == null) {
        form = new FormData(); // Crear un nuevo FormData si no se proporciona uno
    }

    // Verificar la acción a realizar
    const searchValue = form.get("search");
    const action = searchValue ? 'searchRows' : 'readAll';

    // Petición para obtener los registros disponibles
    const DATA = await fetchData(REQUEST_API, action, form);

    // Comprobar si la respuesta es satisfactoria, de lo contrario mostrar un mensaje con la excepción
    if (DATA.status) {
        if (action === 'searchRows' && DATA.dataset.length === 0) {
            VoidResult(DATA.error); // Mostrar resultado vacío si no hay datos
        } else {

            DATA.dataset.forEach((row) => {

                let SEND_TYPE = row.modo_entrega;

                if(SEND_TYPE == 0){
                    SEND_TYPE = 'Scanned';
                } else if(SEND_TYPE == 1){
                    SEND_TYPE = 'Printed';
                }

                let ESTADO = row.estado;

                if(ESTADO == 1){
                    REQUEST_MAIN_CONTAINER.innerHTML += `
                    <!-- INICIO TARJETA -->
                    <p class="content-card-history-administrator-name">${row.tipo_peticion}</p>
                    <div class="content-card-general card-fixer-history temp-info">
                        <div class="content-card-general-col1"  onclick="openInfo(${row.id_peticion})">
                            <p class="content-card-general-name">Name: <b class="content-card-general-reason">${row.nombre} ${row.apellido}</b></p>
                            <p class="content-card-general-name">Email: <b class="content-card-general-reason">${row.correo}</b></p>

                        </div>
    
                        <div class="content-card-general-col2"  onclick="openInfo(${row.id_peticion})">
                            <p class="content-card-general-name">Contact Number: <b class="content-card-general-reason">${row.telefono_contacto}</b></p>
                            <p class="content-card-general-name">Document Language: <b class="content-card-general-reason">${row.idioma}</b></p>
                            <p class="content-card-general-name">Location: <b class="content-card-general-reason">${row.centro_entrega}</b></p>
                            <p class="content-card-general-name" hidden>Send Type: <b class="content-card-general-reason">${SEND_TYPE}</b></p>
                        </div>
                        <div class="documentation-action-button">
                            <div class="documentation-accept-button" onclick="openAccept(${row.id_peticion})">
                                <svg width="32" height="32" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.707 8.293L1.414 5L0 6.414L4.707 11.121L14.414 1.414L13 0L4.707 8.293Z" fill="white"/>
                                </svg>

                            </div>
                            <div class="documentation-reject-button" onclick="openReject(${row.id_peticion})">
                                <svg width="32" height="32" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.899 0L5.656 4.242L1.414 0L0 1.414L4.242 5.656L0 9.898L1.414 11.312L5.656 7.07L9.899 11.312L11.313 9.898L7.071 5.656L11.313 1.414L9.899 0Z" fill="white"/>
                                </svg>
                            </div>

                        </div>
                    </div>
                    <!-- FINAL TARJETA -->
                    `;
                } else if (ESTADO == 2){
                    REQUEST_MAIN_CONTAINER.innerHTML += `
                <!-- INICIO TARJETA -->
                <p class="content-card-history-administrator-name">${row.tipo_peticion}</p>
                <div class="content-card-general approved-permission card-fixer-history temp-info" onclick="openInfo(${row.id_peticion})">
                    <div class="content-card-general-col1">
                        <p class="content-card-general-name">Name: <b class="content-card-general-reason">${row.nombre} ${row.apellido}</b></p>
                        <p class="content-card-general-name">Email: <b class="content-card-general-reason">${row.correo}</b></p>

                    </div>

                    <div class="content-card-general-col2">
                        <p class="content-card-general-name">Contact Number: <b class="content-card-general-reason">${row.telefono_contacto}</b></p>
                        <p class="content-card-general-name">Document Language: <b class="content-card-general-reason">${row.idioma}</b></p>
                        <p class="content-card-general-name">Location: <b class="content-card-general-reason">${row.centro_entrega}</b></p>
                        <p class="content-card-general-name" hidden>Send Type: <b class="content-card-general-reason">${SEND_TYPE}</b></p>
                    </div>
                    <div class="content-card-general-col3">
                        <p>APPROVED</p>
                    </div>
                </div>
                <!-- FINAL TARJETA -->
                `;
                } else if (ESTADO == 3){
                    REQUEST_MAIN_CONTAINER.innerHTML += `
                <!-- INICIO TARJETA -->
                <p class="content-card-history-administrator-name">${row.tipo_peticion}</p>
                <div class="content-card-general rejected-permission card-fixer-history temp-info" onclick="openInfo(${row.id_peticion})">
                    <div class="content-card-general-col1">
                        <p class="content-card-general-name">Name: <b class="content-card-general-reason">${row.nombre} ${row.apellido}</b></p>
                        <p class="content-card-general-name">Email: <b class="content-card-general-reason">${row.correo}</b></p>
                    </div>

                    <div class="content-card-general-col2">
                        <p class="content-card-general-name">Contact Number: <b class="content-card-general-reason">${row.telefono_contacto}</b></p>
                        <p class="content-card-general-name">Document Language: <b class="content-card-general-reason">${row.idioma}</b></p>
                        <p class="content-card-general-name">Location: <b class="content-card-general-reason">${row.centro_entrega}</b></p>
                        <p class="content-card-general-name" hidden>Send Type: <b class="content-card-general-reason">${SEND_TYPE}</b></p>
                    </div>
                    <div class="content-card-general-col3">
                        <p>REJECTED</p>
                    </div>
                </div>
                <!-- FINAL TARJETA -->
                `;
                }  else if (ESTADO == 4){
                    REQUEST_MAIN_CONTAINER.innerHTML += `
                <!-- INICIO TARJETA -->
                <p class="content-card-history-administrator-name">${row.tipo_peticion}</p>
                <div class="content-card-general readytopickup-permission card-fixer-history temp-info" onclick="openInfo(${row.id_peticion})">
                    <div class="content-card-general-col1">
                        <p class="content-card-general-name">Name: <b class="content-card-general-reason">${row.nombre} ${row.apellido}</b></p>
                        <p class="content-card-general-name">Email: <b class="content-card-general-reason">${row.email_entrega}</b></p>
                    </div>

                    <div class="content-card-general-col2">
                        <p class="content-card-general-name">Contact Number: <b class="content-card-general-reason">${row.telefono_contacto}</b></p>
                        <p class="content-card-general-name">Document Language: <b class="content-card-general-reason">${row.idioma}</b></p>
                        <p class="content-card-general-name">Location: <b class="content-card-general-reason">${row.centro_entrega}</b></p>
                        <p class="content-card-general-name" hidden>Send Type: <b class="content-card-general-reason">${SEND_TYPE}</b></p>
                    </div>
                    <div class="content-card-general-col3">
                        <p>READY TO PICK UP</p>
                    </div>
                </div>
                <!-- FINAL TARJETA -->
                `;
                }

                
            });
        }
    } else {
        REQUEST_MAIN_CONTAINER.innerHTML += DATA.error; // Mostrar error si la solicitud falla
    }
};

openSettings = () => {
    location.href = "documentation-settings.html"
}

const DocRequestPerUserGrapho = async () => {
    DATA = await fetchData('services/admin/peticion.php', 'readDocRequestPerUserGrapho');
    let data = [];
    let quantity = [];
    DATA.dataset.forEach(row => {
        data.push(row.nombre);
        quantity.push(row.cantidad);
    });
    if(DATA){

        if(!quantity.every(item => item === 0)){
            document.getElementById("grapho-modal").classList.remove("inactive")
            graphoModal("Documentation Requests per User");
            pieGraph('chart', data, quantity);
        } else{
            document.getElementById("grapho-modal").classList.add("inactive")
            graphoModal("There are no registered documentation request"); 
        }

    }
};




// Función asincrónica para abrir la información de una solicitud
const openInfo = async (id) => {
    const FORM = new FormData();
    FORM.append('idPeticion', id); // Añadir el ID de la petición al FormData
    const DATA = await fetchData(REQUEST_API, 'readOne', FORM); // Obtener los datos de la solicitud
    if (DATA.status) {
        const ROW = DATA.dataset;

        let SEND_TYPE = ROW.modo_entrega;

        if(SEND_TYPE == 0){
            SEND_TYPE = 'Scanned';
        } else if(SEND_TYPE == 1){
            SEND_TYPE = 'Printed';
        }

        if(ROW.estado == 2){
            PETICION_INFO_MODAL_BTN_MODIFY.classList.add('show');
            ID = ROW.id_peticion;
        }else{
            PETICION_INFO_MODAL_BTN_MODIFY.classList.remove('show');
            ID = '';
        }


        PETICION_INFO_MODAL_ID.value = ROW.id_peticion;
        PETICION_INFO_MODAL_DIRECCION.textContent =  ROW.direccion;
        PETICION_INFO_MODAL_TELEFONO.textContent =  ROW.telefono_contacto;
        PETICION_INFO_MODAL_NOMBRE.textContent =  ROW.nombre + " " + ROW.apellido;
        PETICION_INFO_MODAL_ID_USUARIO.value = ROW.id_usuario;
        PETICION_INFO_MODAL_TIPO_PETICION.textContent =  ROW.tipo_peticion;
        PETICION_INFO_MODAL_IDIOMA.textContent =  ROW.idioma;
        PETICION_INFO_MODAL_CENTRO_ENTREGA.textContent = ROW.centro_entrega;
        PETICION_INFO_MODAL_NOMBRE_ENTREGA.textContent = ROW.nombre_entrega;
        PETICION_INFO_MODAL_CORREO.textContent = ROW.email_entrega;
        PETICION_INFO_MODAL.classList.add('show'); // Mostrar el modal
        document.body.classList.add('body-no-scroll'); // Evitar el scroll en el cuerpo de la página
        // Ajustar la posición del modal para que esté visible en la pantalla
        PETICION_INFO_MODAL.style.marginTop = window.scrollY + 'px';
    } else {
        sweetAlert(2, DATA.error, false); // Mostrar alerta si la solicitud falla
    }
};

const openReady = async() => {

    let id = ID;

    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('Do you want to leave the request ready to pick up?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        const FORM = new FormData();
        FORM.append('idPeticion',id);
        FORM.append('EstadoPeticion',4);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(REQUEST_API, 'updateState', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if ( DATA.status) {

            const formData = new FormData();
            formData.append('fechaEnvio',getCurrentDateTime());
            formData.append('idPeticion',id);
            formData.append('descripcion','Your document request is ready to pick up');
            formData.append('tipoNotificacion', '4');

            await fetchData(NOTIFICACION_API,'createRow',formData);


            const RESPONSE = await confirmActionSuccess('Request has been set up ready to pick up successfully');
            if(RESPONSE){
                //Se recarga la página
                location.reload();
            }
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

const openAccept = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('Do you want to accept the petition?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        const FORM = new FormData();
        FORM.append('idPeticion',id);
        FORM.append('EstadoPeticion',2);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(REQUEST_API, 'updateState', FORM);

        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if ( DATA.status) {

            const formData = new FormData();
            formData.append('fechaEnvio',getCurrentDateTime());
            formData.append('idPeticion',id);
            formData.append('descripcion','Your document request was accepted, we will let you know when it is ready to pick up');
            formData.append('tipoNotificacion', '2');

            await fetchData(NOTIFICACION_API,'createRow',formData);


            const RESPONSE = await confirmActionSuccess('Petition accepted successfully');
            if(RESPONSE){
                //Se recarga la página
                location.reload();
            }
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

const openReject = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('Do you want to reject the petition?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        const FORM = new FormData();
        FORM.append('idPeticion',id);
        FORM.append('EstadoPeticion',3);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(REQUEST_API, 'updateState', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if ( DATA.status) {
            const formData = new FormData();
            formData.append('fechaEnvio',getCurrentDateTime());
            formData.append('idPeticion',id);
            formData.append('descripcion','Your document request was rejected');
            formData.append('tipoNotificacion', '3');

            await fetchData(NOTIFICACION_API,'createRow',formData);
            const RESPONSE = await confirmActionSuccess('Petition rejected successfully');
            if(RESPONSE){
                //Se recarga la página
                location.reload();
            }
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

// FUNCION PARA ABRIR LOS REPORTES
const openReport = () => {

    // Obtener el día actual (0 = domingo, 1 = lunes, ..., 6 = sábado)
    const today = new Date().getDay();

    if (today === 1) {
        // Lunes
        // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
        const PATH = new URL(`${SERVER_URL}reports/documentacion1.php`);
        // Se abre el reporte en una nueva pestaña.
        window.open(PATH.href);
    } else if (today === 2 || today === 3) {
        // Martes o miércoles
        // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
        const PATH = new URL(`${SERVER_URL}reports/documentacion2.php`);
        // Se abre el reporte en una nueva pestaña.
        window.open(PATH.href);
    } else if (today === 4 || today === 5) {
        // Jueves o viernes
        // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
        const PATH = new URL(`${SERVER_URL}reports/documentacion3.php`);
        // Se abre el reporte en una nueva pestaña.
        window.open(PATH.href);
    } else {
        // Sábado o domingo
        // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
        const PATH = new URL(`${SERVER_URL}reports/documentacion4.php`);
        // Se abre el reporte en una nueva pestaña.
        window.open(PATH.href);
    }

}