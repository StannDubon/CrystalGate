const REQUEST_API = 'services/admin/peticion.php'; // Endpoint de la API para solicitudes

const SEARCH_FORM = document.getElementById("searchForm"); // Elemento del formulario de búsqueda
const SEARCH_INPUT = document.getElementById("searchInput"); // Elemento de entrada de búsqueda

const REQUEST_MAIN_CONTAINER = document.getElementById("request-main-content"); // Contenedor para el contenido principal de solicitudes
const REQUEST_HEADER_TITLE = document.getElementById("main-header-request-main-title"); // Elemento del título del encabezado

// Elementos de datos del modal
const PETICION_INFO_MODAL = document.getElementById("modal-info");

const PETICION_INFO_MODAL_ID = document.getElementById('peticion-info-modal-id');
const PETICION_INFO_MODAL_DIRECCION = document.getElementById('peticion-info-modal-direccion');
const PETICION_INFO_MODAL_TELEFONO = document.getElementById('peticion-info-modal-telefono');
const PETICION_INFO_MODAL_NOMBRE = document.getElementById('peticion-info-modal-nombre');
const PETICION_INFO_MODAL_ID_USUARIO = document.getElementById('peticion-info-modal-id-usuario');
const PETICION_INFO_MODAL_TIPO_PETICION = document.getElementById('peticion-info-modal-tipo_peticion');
const PETICION_INFO_MODAL_IDIOMA = document.getElementById('peticion-info-modal-idioma');
const PETICION_INFO_MODAL_CENTRO_ENTREGA = document.getElementById('peticion-info-modal-centro-entrega');
const PETICION_INFO_MODAL_CORREO = document.getElementById('peticion-info-modal-correo');
const PETICION_INFO_MODAL_MODO_ENTREGA = document.getElementById('peticion-info-modal-modo-entrega');

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
                REQUEST_MAIN_CONTAINER.innerHTML += `
                <!-- INICIO TARJETA -->
                <p class="content-card-history-administrator-name">${row.tipo_peticion}</p>
                <div class="content-card-general approved-permission card-fixer-history temp-info" onclick="openInfo(${row.id_usuario})">
                    <div class="content-card-general-col1">
                        <p class="content-card-general-name">Nombre: <b class="content-card-general-reason">${row.nombre} ${row.apellido}</b></p>
                        <p class="content-card-general-name">Correo: <b class="content-card-general-reason">${row.correo}</b></p>
                        <p class="content-card-general-name">Número de Contacto: <b class="content-card-general-reason">${row.telefono_contacto}</b></p>
                    </div>

                    <div class="content-card-general-col2">
                        <p class="content-card-general-name">Idioma del Documento: <b class="content-card-general-reason">${row.idioma}</b></p>
                        <p class="content-card-general-name">Dirección a: <b class="content-card-general-reason">${row.centro_entrega}</b></p>
                        <p class="content-card-general-name">Tipo de Envío: <b class="content-card-general-reason">${row.tipo_peticion}</b></p>
                    </div>
                </div>
                <!-- FINAL TARJETA -->
                `;
            });
        }
    } else {
        REQUEST_MAIN_CONTAINER.innerHTML += DATA.error; // Mostrar error si la solicitud falla
    }
};

openSettings = () => {
    location.href = "documentation-settings.html"
}

// Función asincrónica para abrir la información de una solicitud
const openInfo = async (id) => {
    const FORM = new FormData();
    FORM.append('idPeticion', id); // Añadir el ID de la petición al FormData
    const DATA = await fetchData(REQUEST_API, 'readOne', FORM); // Obtener los datos de la solicitud
    if (DATA.status) {
        const ROW = DATA.dataset;
        PETICION_INFO_MODAL_ID.textContent = ROW.id_peticion;
        PETICION_INFO_MODAL_DIRECCION.textContent = ROW.direccion;
        PETICION_INFO_MODAL_TELEFONO.textContent = ROW.telefono_contacto;
        PETICION_INFO_MODAL_NOMBRE.textContent = ROW.nombre + " " + ROW.apellido;
        PETICION_INFO_MODAL_ID_USUARIO.textContent = ROW.id_usuario;
        PETICION_INFO_MODAL_TIPO_PETICION.textContent = ROW.tipo_peticion;
        PETICION_INFO_MODAL_IDIOMA.textContent = ROW.idioma;
        PETICION_INFO_MODAL_CENTRO_ENTREGA.textContent = ROW.centro_entrega;
        PETICION_INFO_MODAL_CORREO.textContent = ROW.correo;
        PETICION_INFO_MODAL_MODO_ENTREGA.textContent = ROW.modo_entrega;
        PETICION_INFO_MODAL.classList.add('show'); // Mostrar el modal
        document.body.classList.add('body-no-scroll'); // Evitar el scroll en el cuerpo de la página
        // Ajustar la posición del modal para que esté visible en la pantalla
        PETICION_INFO_MODAL.style.marginTop = window.scrollY + 'px';
    } else {
        sweetAlert(2, DATA.error, false); // Mostrar alerta si la solicitud falla
    }
};

// Función asincrónica para llenar los datos de permiso
const fillPermissionData = async (id) => {
    const FORM = new FormData();
    FORM.append('idClasificacionPermiso', id); // Añadir el ID de clasificación del permiso al FormData
    const DATA = await fetchData(AUTHORIZATION_API, 'readOne', FORM); // Obtener los datos del permiso
    if (DATA.status) {
        const ROW = DATA.dataset;
        REQUEST_HEADER_TITLE.textContent = ROW.clasificacion_permiso;
        fillSelectSubPermissions(id, SUB_AUTHORIZATION_API, 'readNoEmtyReferences', 'selectFilterIdClasificacionSubPermiso'); // Llenar el select de subpermisos
    } else {
        sweetAlert(2, DATA.error, false); // Mostrar alerta si la solicitud falla
    }
};

// Función asincrónica para llenar el select de subpermisos
const fillSelectSubPermissions = async (id, filename, action, select) => {
    const FORM = new FormData();
    FORM.append('idClasificacionPermiso', id); // Añadir el ID de clasificación del permiso al FormData
    const DATA = await fetchData(filename, action, FORM); // Obtener los datos de subpermisos
    let content = '';
    if (DATA.status) {
        content += '<option value="" selected>Sin filtro</option>';
        DATA.dataset.forEach(row => {
            const value = Object.values(row)[0];
            const text = Object.values(row)[1];
            content += `<option value="${value}">${text}</option>`;
        });
    } else {
        content += '<option>Sin subpermisos</option>';
    }
    document.getElementById(select).innerHTML = content; // Llenar el select con los subpermisos
};

// Función para descomponer el formato de fecha y hora
function DecomposeFormat(dateTime, type) {
    // Convertir la cadena a un objeto Date
    let date = new Date(dateTime);
    
    // Verificar si la fecha es válida
    if (isNaN(date)) {
        return "Fecha inválida";
    }
    
    // Obtener los componentes de la fecha y hora
    let day = date.getDate();
    let month = date.getMonth() + 1; // Los meses van de 0 a 11
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // Formatear la fecha como cadenas
    let formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    let formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    // Formatear la hora en AM/PM si el tipo es 3
    let ampm = hours >= 12 ? 'PM' : 'AM';
    let hour12 = hours % 12;
    hour12 = hour12 ? hour12 : 12; // La hora '0' debe ser '12'
    let formattedTime12 = `${hour12 < 10 ? '0' + hour12 : hour12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

    // Devolver la fecha o la hora según el tipo solicitado
    if (type === 1) {
        return formattedDate;
    } else if (type === 2) {
        return formattedTime;
    } else if (type === 3) {
        return formattedTime12;
    } else {
        return "Tipo inválido";
    }
}
