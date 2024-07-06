// Constantes para completar la ruta de la API.
const CHARGES_API = 'services/admin/cargo.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('search-form'),
    SEARCH_INPUT = document.getElementById('search-input');
// Constantes para obtener el id de las cajas donde se mostrarán los datos de las tablas  
const BOX_CHARGES = document.getElementById('box-charges');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = document.getElementById('modal-charges'),
    MODAL_TITLE = document.getElementById('modal-title');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('save-form-charges'),
    // ID's
    ID_CARGO = document.getElementById('idCargo'),
    // Campos de entrada
    CARGO = document.getElementById('cargo'),
    ESTADO_CARGO = document.getElementById('estadoCargo');


// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {

    loadTemplate();
    setupModalDiscardButtons();
    loadStatusSelectorJs('swal-custom-status-chooser-req-type', "estadoCargo");
    // Petición para solicitar los tipos de peticiones (request types).
    fillCharges();
    
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
        fillCharges(FORM);
    }else{
        fillCharges();
    }
});


// Funcion para cerrar el modal
closeModal = () => {
    SAVE_MODAL.classList.remove('show');
    document.body.classList.remove('body-no-scroll');
}

const fillCharges = async (form = null) => {

    (form) ? action = 'searchRows' : action = 'readAll';

    BOX_CHARGES.innerHTML = '';
    // Petición para solicitar los tipos de peticiones (request types).
    const DATA = await fetchData(CHARGES_API,action,form); 
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializa el contenedor de productos.
        BOX_CHARGES.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            let reqTypeStatusColor = null
            
            if(row.estado == 1){
                reqTypeStatusColor = "#8DDA8C"
            } else{
                reqTypeStatusColor = "#F54C60"
            }

            // Se crean y concatenan las filas con los datos de cada tipo de request.
            BOX_CHARGES.innerHTML += `
                <li>
                    <div class="authorization-action-button">
                        <div class="authorization-delete-button" onclick="openDelete(${row.id_cargo})"><svg width="14" height="16"
                                viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.33333 4H1.55556V14.4C1.55556 14.8243 1.71944 15.2313 2.01117 15.5314C2.30289 15.8314 2.69855 16 3.11111 16H10.8889C11.3014 16 11.6971 15.8314 11.9888 15.5314C12.2806 15.2313 12.4444 14.8243 12.4444 14.4V4H2.33333ZM5.44444 13.6H3.88889V6.4H5.44444V13.6ZM10.1111 13.6H8.55556V6.4H10.1111V13.6ZM10.5918 1.6L9.33333 0H4.66667L3.40822 1.6H0V3.2H14V1.6H10.5918Z"
                                    fill="white" />
                            </svg></div>
                        <div class="authorization-edit-button" onclick="openUpdate(${row.id_cargo})"><svg width="13" height="16"
                                viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.39909 0.34587C9.59372 0.154035 9.90631 0.154001 10.101 0.345793L11.8261 2.04534C12.0248 2.24116 12.0248 2.56176 11.8261 2.75762L10.6802 3.88707C10.4856 4.0789 10.173 4.07894 9.97833 3.88715L8.25326 2.1876C8.0545 1.99178 8.05447 1.67118 8.25318 1.47532L9.39909 0.34587ZM0.149348 9.44923C0.0538065 9.54322 0 9.67164 0 9.80566V11.4976C0 11.7737 0.223858 11.9976 0.5 11.9976H2.23278C2.36398 11.9976 2.48991 11.946 2.58343 11.854L8.81839 5.72019C9.01742 5.52439 9.01754 5.20353 8.81865 5.00758L7.09359 3.30805C6.89905 3.11638 6.58671 3.11627 6.39203 3.30779L0.149348 9.44923ZM0 14.899C0 14.6229 0.223858 14.399 0.5 14.399H12.5C12.7761 14.399 13 14.6229 13 14.899V15.5C13 15.7761 12.7761 16 12.5 16H0.5C0.223858 16 0 15.7761 0 15.5V14.899Z"
                                    fill="white" />
                            </svg></div>
                    </div>
                    <span>${row.cargo}</span>
                    <div class="authorization-status-button" style="background-color: ${reqTypeStatusColor};" onclick="changeChargeStatus(${row.id_cargo})"></div>

                </li>
            `;
        });
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        BOX_CHARGES.textContent = DATA.error;
    }
}

const changeChargeStatus = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('Do you want to change the status of this charge?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idCargo', id);
        // Petición para obtener los datos del registro solicitado.
        const DATA = await fetchData(CHARGES_API, 'changeStatus', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            sweetAlert(1, DATA.message, true);
            fillCharges();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

// Método del evento para cuando se envía el formulario de guardar .
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_CARGO.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(CHARGES_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.classList.remove('show');
        document.body.classList.remove('body-no-scroll');
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la lista para visualizar los cambios.
        fillCharges();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.classList.add('show');
    document.body.classList.add('body-no-scroll'); // Evitar el scroll en el cuerpo de la página
        // Ajustar la posición del modal para que esté visible en la pantalla
        SAVE_MODAL.style.marginTop = window.scrollY + 'px';
    MODAL_TITLE.textContent = 'Add a charge';
    // Se prepara el formulario.
    SAVE_FORM.reset();
}

/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idCargo', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(CHARGES_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.classList.add('show');
        document.body.classList.add('body-no-scroll'); // Evitar el scroll en el cuerpo de la página
        // Ajustar la posición del modal para que esté visible en la pantalla
        SAVE_MODAL.style.marginTop = window.scrollY + 'px';
        MODAL_TITLE.textContent = 'Update charge';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_CARGO.value = ROW.id_cargo;
        CARGO.value = ROW.cargo;
        ESTADO_CARGO.value = ROW.estado;
        setFormatSelectorFromApi('swal-custom-status-chooser-req-type', "estadoCargo", ROW.estado);
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('Do you want to delete the charge permanently?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idCargo', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(CHARGES_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la fila para visualizar los cambios.
            fillCharges();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}
