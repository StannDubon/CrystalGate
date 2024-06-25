const ADMINISTRATOR_API = 'services/admin/administrador.php',
    ADMINISTRATOR_TYPE_API = 'services/admin/tipo-administrador.php';
// Constante para establecer el form e input de buscar.
const SEARCH_INPUT = document.getElementById('search-input');
const ADMINISTRATOR = document.getElementById('admin-main-cards-container');

// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL_ADMINISTRATOR = document.getElementById('administrator-modal'),
    MODAL_TITLE_ADMINISTRATOR = document.getElementById('modal-title-administrator');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM_ADMINISTRATOR = document.getElementById('administrator-form'),

    ID_ADMINISTRATOR = document.getElementById('idAdministrador'),
    NOMBRE_ADMINISTRATOR = document.getElementById('nombreAdministrador'),
    APELLIDO_ADMINISTRATOR = document.getElementById('apellidoAdministrador'),
    CORREO_ADMINISTRATOR = document.getElementById('correoAdministrador'),
    CLAVE_ADMINISTRATOR = document.getElementById('claveAdministrador'),
    CONFIRMAR_CLAVE_ADMINISTRATOR = document.getElementById('confirmarClave');

document.addEventListener('DOMContentLoaded', () => {
    loadTemplate();
    setupModalDiscardButtons();
    fillTable();
});

let SEARCH_VALUE = '';

SEARCH_INPUT.addEventListener('input', (event) => {
    event.preventDefault();
    SEARCH_VALUE = event.target.value;
    search(SEARCH_VALUE);
});

SAVE_FORM_ADMINISTRATOR.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_ADMINISTRATOR.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM_ADMINISTRATOR);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(ADMINISTRATOR_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL_ADMINISTRATOR.classList.remove('show');
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la lista para visualizar los cambios.
        await fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

const fillTable = async (form = null) => {
    ADMINISTRATOR.innerHTML = '';
    // Se verifica la acción a realizar.
    (form) ? action = 'searchRows' : action = 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(ADMINISTRATOR_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {

            let rol = null;
            
            if(row.id_tipo_administrador==1){
                rol = "high"
            } else if(row.id_tipo_administrador==2){
                rol = "mid"
            } else if(row.id_tipo_administrador==3){
                rol = "low"
            } else{
                rol = "unknown"
            }

            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            ADMINISTRATOR.innerHTML += `
            <!-- INICIO TARJETA -->

            <div class="content-card-admin-info">
                
                    <div class="image-container">
                        <img src="../api/images/admin/${row.imagen}" alt="">
                        <div class="info-icon">
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 0C5.8318 0 0 5.8318 0 13C0 20.1682 5.8318 26 13 26C20.1682 26 26 20.1682 26 13C26 5.8318 20.1682 0 13 0ZM14.3 18.5C14.3 19.0523 13.8523 19.5 13.3 19.5H12.7C12.1477 19.5 11.7 19.0523 11.7 18.5V12.7C11.7 12.1477 12.1477 11.7 12.7 11.7H13.3C13.8523 11.7 14.3 12.1477 14.3 12.7V18.5ZM14.3 8.1C14.3 8.65228 13.8523 9.1 13.3 9.1H12.7C12.1477 9.1 11.7 8.65228 11.7 8.1V7.5C11.7 6.94772 12.1477 6.5 12.7 6.5H13.3C13.8523 6.5 14.3 6.94772 14.3 7.5V8.1Z" fill="white"/>
                            </svg>
                        </div>
                    </div>

                <div class="info-admin-container">
                    <span class="id">ID: ${row.id_administrador}</span>
                    <span class="name">${row.nombre} ${row.apellido}</span>
                    <span class="admin-type ${rol}">
                        <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 2.70207C19 1.77381 17.8452 1.34644 17.2409 2.05106L14.5695 5.1659C14.1418 5.66461 13.3576 5.62239 12.9859 5.08064L10.3246 1.20181C9.92732 0.622812 9.07268 0.622813 8.67542 1.20181L6.01412 5.08064C5.64242 5.62239 4.85819 5.66461 4.43047 5.16589L1.75907 2.05106C1.15476 1.34644 0 1.77381 0 2.70207V15C0 15.5523 0.447715 16 1 16H18C18.5523 16 19 15.5523 19 15V2.70207Z"/>
                            </svg>
                            
                        <span>${row.tipo_administrador}</span>                               
                    </span>
                </div>

                <div class="admin-action-button">
                    <div class="admin-delete-button" onclick="openDelete(${row.id_administrador})"><svg width="14" height="16"
                            viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.33333 4H1.55556V14.4C1.55556 14.8243 1.71944 15.2313 2.01117 15.5314C2.30289 15.8314 2.69855 16 3.11111 16H10.8889C11.3014 16 11.6971 15.8314 11.9888 15.5314C12.2806 15.2313 12.4444 14.8243 12.4444 14.4V4H2.33333ZM5.44444 13.6H3.88889V6.4H5.44444V13.6ZM10.1111 13.6H8.55556V6.4H10.1111V13.6ZM10.5918 1.6L9.33333 0H4.66667L3.40822 1.6H0V3.2H14V1.6H10.5918Z"
                                fill="white" />
                        </svg></div>
                    <div class="admin-edit-button" onclick="openUpdate(${row.id_administrador})"><svg width="13" height="16"
                            viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.39909 0.34587C9.59372 0.154035 9.90631 0.154001 10.101 0.345793L11.8261 2.04534C12.0248 2.24116 12.0248 2.56176 11.8261 2.75762L10.6802 3.88707C10.4856 4.0789 10.173 4.07894 9.97833 3.88715L8.25326 2.1876C8.0545 1.99178 8.05447 1.67118 8.25318 1.47532L9.39909 0.34587ZM0.149348 9.44923C0.0538065 9.54322 0 9.67164 0 9.80566V11.4976C0 11.7737 0.223858 11.9976 0.5 11.9976H2.23278C2.36398 11.9976 2.48991 11.946 2.58343 11.854L8.81839 5.72019C9.01742 5.52439 9.01754 5.20353 8.81865 5.00758L7.09359 3.30805C6.89905 3.11638 6.58671 3.11627 6.39203 3.30779L0.149348 9.44923ZM0 14.899C0 14.6229 0.223858 14.399 0.5 14.399H12.5C12.7761 14.399 13 14.6229 13 14.899V15.5C13 15.7761 12.7761 16 12.5 16H0.5C0.223858 16 0 15.7761 0 15.5V14.899Z"
                                fill="white" />
                        </svg></div>
                </div>

            </div>

            <!-- FINAL TARJETA -->
            `;
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

const openCreate = () => {
    SAVE_MODAL_ADMINISTRATOR.classList.add('show');
    MODAL_TITLE_ADMINISTRATOR.textContent = 'Add An Administrator';
    SAVE_FORM_ADMINISTRATOR.reset();
    fillSelect(ADMINISTRATOR_TYPE_API, 'readAll', 'selectIdTipoAdministrador');
}

const openUpdate = async (id) => {
    const FORM = new FormData();
    FORM.append('idAdministrador', id);
    const DATA = await fetchData(ADMINISTRATOR_API, 'readOne', FORM);
    if (DATA.status) {
        SAVE_MODAL_ADMINISTRATOR.classList.add('show');
        MODAL_TITLE_ADMINISTRATOR.textContent = 'Update authorization';
        SAVE_FORM_ADMINISTRATOR.reset();

        const ROW = DATA.dataset;
        ID_ADMINISTRATOR.value = ROW.id_administrador;
        NOMBRE_ADMINISTRATOR.value = ROW.nombre;
        APELLIDO_ADMINISTRATOR.value = ROW.apellido;
        CORREO_ADMINISTRATOR.value = ROW.correo;
        fillSelect(ADMINISTRATOR_TYPE_API, 'readAll', 'selectIdTipoAdministrador', ROW.id_tipo_administrador);
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const openDelete = async (id) => {
    const RESPONSE = await confirmAction('Do you want to delete the administrator permanently?');
    if (RESPONSE) {
        const FORM = new FormData();
        FORM.append('idAdministrador', id);
        const DATA = await fetchData(ADMINISTRATOR_API, 'deleteRow', FORM);
        if (DATA.status) {
            await sweetAlert(1, DATA.message, true);
            await fillTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}