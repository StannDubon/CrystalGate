const REQUEST_API = 'services/admin/peticion.php';

const SEARCH_FORM = document.getElementById("searchForm");
const SEARCH_INPUT = document.getElementById("searchInput");

const REQUEST_MAIN_CONTAINER = document.getElementById("request-main-content")
const REQUEST_HEADER_TITLE = document.getElementById("main-header-request-main-title")

// datos del modal a llenar xd

PETICION_INFO_MODAL = document.getElementById("modal-info")

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


document.addEventListener('DOMContentLoaded', () => {
    loadTemplate();
    fillTable();
    setupModalDiscardButtons();
});

SEARCH_INPUT.addEventListener("input", (event) => {
    event.preventDefault();
    const FORM = new FormData();
    FORM.append("search", SEARCH_INPUT.value);
    fillTable(FORM);
});

const fillTable = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    REQUEST_MAIN_CONTAINER.innerHTML = '';

    if(form == null){
        form = new FormData();
    }

    // Se verifica la acción a realizar.
    const searchValue = form.get("search");
    const action = searchValue ? 'searchRows' : 'readAll';

    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(REQUEST_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
      if (action === 'searchRows' && DATA.dataset.length === 0) {
        VoidResult(DATA.error);
      } else {
          DATA.dataset.forEach((row) => {
            REQUEST_MAIN_CONTAINER.innerHTML += `
            <!-- INICIO TARJETA -->
            <p class="content-card-history-administrator-name">${row.tipo_peticion}</p>
            <div class="content-card-general approved-permission card-fixer-history temp-info" onclick="openInfo(${row.id_usuario})">
                <div class="content-card-general-col1">
                    <p class="content-card-general-name">Name: <b class="content-card-general-reason">${row.nombre +" "+ row.apellido}</b></p>
                    <p class="content-card-general-name">Email: <b class="content-card-general-reason">${row.correo}</b></p>
                    <p class="content-card-general-name">Contact Number: <b class="content-card-general-reason">${row.telefono_contacto}</b></p>
                </div>

                <div class="content-card-general-col2">
                    <p class="content-card-general-name">Document Language: <b class="content-card-general-reason">${row.idioma}</b></p>
                    <p class="content-card-general-name">Addres To: <b class="content-card-general-reason">${row.centro_entrega}</b></p>
                    <p class="content-card-general-name">Send Type: <b class="content-card-general-reason">${row.tipo_peticion}</b>
                    </p>
                </div>
            </div>
            <!-- FINAL TARJETA -->
            `;
            
        });
      }
    } else {
        REQUEST_MAIN_CONTAINER.innerHTML += DATA.error;
    }
};

const openInfo = async (id) => {
    const FORM = new FormData();
    FORM.append('idPeticion', id);
    const DATA = await fetchData(REQUEST_API, 'readOne', FORM);
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
        PETICION_INFO_MODAL.classList.add('show');
        document.body.classList.add('body-no-scroll');
        // Ajustar la posición del modal para que esté visible en la pantalla
        PETICION_INFO_MODAL.style.marginTop = window.scrollY + 'px';
    } else {
        sweetAlert(2, DATA.error, false);
    }
}
  

const fillPermissionData = async (id) => {
    const FORM = new FormData();
    FORM.append('idClasificacionPermiso', id);
    const DATA = await fetchData(AUTHORIZATION_API, 'readOne', FORM);
    if (DATA.status) {
        const ROW = DATA.dataset;
        REQUEST_HEADER_TITLE.textContent = ROW.clasificacion_permiso;
        fillSelectSubPermissions(id, SUB_AUTHORIZATION_API, 'readNoEmtyReferences', 'selectFilterIdClasificacionSubPermiso');
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const fillSelectSubPermissions = async (id, filename, action, select) => {
    const FORM = new FormData();
    FORM.append('idClasificacionPermiso', id);
    const DATA = await fetchData(filename, action, FORM);
    let content = '';
    if (DATA.status) {
        content += '<option value="" selected>No filter</option>';
        DATA.dataset.forEach(row => {
            const value = Object.values(row)[0];
            const text = Object.values(row)[1];
            content += `<option value="${value}">${text}</option>`;
        });
    } else {
        content += '<option>No Subpermissions</option>';
    }
    document.getElementById(select).innerHTML = content;
}

function DecomposeFormat(dateTime, type) {
    // Convert the string to a Date object
    let date = new Date(dateTime);
    
    // Check if the date is valid
    if (isNaN(date)) {
        return "Invalid date";
    }
    
    // Get the components of the date and time
    let day = date.getDate();
    let month = date.getMonth() + 1; // Months are from 0 to 11
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // Format the date as strings
    let formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    let formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    // Format the time in AM/PM if type is 3
    let ampm = hours >= 12 ? 'PM' : 'AM';
    let hour12 = hours % 12;
    hour12 = hour12 ? hour12 : 12; // the hour '0' should be '12'
    let formattedTime12 = `${hour12 < 10 ? '0' + hour12 : hour12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

    // Return the date or time according to the requested type
    if (type === 1) {
        return formattedDate;
    } else if (type === 2) {
        return formattedTime;
    } else if (type === 3) {
        return formattedTime12;
    } else {
        return "Invalid type";
    }
}