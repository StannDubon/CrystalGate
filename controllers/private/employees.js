const EMPLEADO_API = 'services/admin/usuario.php', // Endpoint de la API para empleados
    CARGO_API = 'services/admin/cargo.php'; // Endpoint de la API para cargos

// Constantes para establecer el formulario y el campo de entrada de búsqueda
const SEARCH_FORM = document.getElementById('search-form'),
    SEARCH_INPUT = document.getElementById('search-input');
const BOX_EMPLOYEES = document.getElementById('box-employees'); // Contenedor para los empleados

// Constantes para establecer los elementos del componente Modal
const SAVE_MODAL_EMPLEADO = document.getElementById('employee-modal'),
    MODAL_TITLE_EMPLEADO = document.getElementById('modal-title-employee');
// Constantes para establecer los elementos del componente Modal de actualizar
const SAVE_MODAL_EMPLEADO_U = document.getElementById('employee-modal-update'),
    MODAL_TITLE_EMPLEADO_U = document.getElementById('modal-title-employee-update');
// Constantes para establecer los elementos del componente Modal de actualizar contraseña
const SAVE_MODAL_PASSWORD = document.getElementById('employee-modal-change-password'),
    MODAL_TITLE_PASSWORD = document.getElementById('modal-title-employee-change-password');

const BTN_EXPORT = document.getElementById('btnReport');
let ID_EMPLOYEE = "";    
// Constantes para establecer los elementos del formulario de guardar
const SAVE_FORM_EMPLEADO = document.getElementById('employee-form'),
    ID_EMPLEADO = document.getElementById('idUsuario'),
    NOMBRE_EMPLEADO = document.getElementById('nombreUsuario'),
    APELLIDO_EMPLEADO = document.getElementById('apellidoUsuario'),
    CORREO_EMPLEADO = document.getElementById('correoUsuario'),
    CLAVE_EMPLEADO = document.getElementById('claveUsuario'),
    CONFIRMAR_CLAVE_EMPLEADO = document.getElementById('confirmarClave');
// Constantes para establecer los elementos del formulario de actualizar
const UPDATE_FORM_EMPLEADO = document.getElementById('employee-form-update'),
    ID_EMPLEADO_U = document.getElementById('idUsuarioUpdate'),
    NOMBRE_EMPLEADO_U = document.getElementById('nombreUsuarioUpdate'),
    APELLIDO_EMPLEADO_U = document.getElementById('apellidoUsuarioUpdate'),
    CORREO_EMPLEADO_U = document.getElementById('correoUsuarioUpdate'),
    CLAVE_EMPLEADO_U = document.getElementById('claveUsuarioUpdate'),
    CONFIRMAR_CLAVE_EMPLEADO_U = document.getElementById('confirmarClaveUpdate');
// Constantes para establecer los elementos del formulario de cambio de contraseña
const SAVE_FORM_PASSWORD = document.getElementById('employee-form-change-password'),
    ID_EMPLEADO_PASSWORD = document.getElementById('idUsuarioCambio'),
    CLAVE_EMPLEADO_PASSWORD = document.getElementById('claveUsuarioCambio'),
    CONFIRMAR_CLAVE_EMPLEADO_PASSWORD = document.getElementById('confirmarClaveCambio');

let empleado = "";

const pastelAndContrastColors = () => {
    // Genera un color pastel
    const hue = Math.random() * 360; // El matiz es el mismo para ambos colores
    const pastelColor = `hsl(${hue}, 100%, 87.5%)`;

    // Calcula un color con el mismo matiz pero más oscuro
    const contrastColor = `hsl(${hue}, 100%, 50%)`; // Puedes ajustar el valor de luminosidad para más contraste

    return [pastelColor, contrastColor];
};
    
    

    const fillEmployees = async (form = null) => {
        BOX_EMPLOYEES.innerHTML = '';
        // Se verifica la acción a realizar.
        (form) ? action = 'searchRows' : action = 'readAll';
        // Petición para obtener los registros disponibles.
        const DATA = await fetchData(EMPLEADO_API, action, form);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se recorre el conjunto de registros fila por fila.
            DATA.dataset.forEach(row => {
                ID_EMPLOYEE = row.id_usuario;
                default_image_fixer = ""
                if(row.imagen == "default.png"){
                    xd = pastelAndContrastColors();
                    image_value = ""
                    default_image_fixer = `<div class="default-image-fixer" style="background-color: ${xd[0]};"> <b style="color: ${xd[1]};">${row.nombre[0] + row.apellido[0]}</b></div>`
                } else{
                    image_value = "../api/images/user/"+row.imagen
                }
                // Se crean y concatenan las filas de la tabla con los datos de cada registro.
                BOX_EMPLOYEES.innerHTML += `
                <!-- INICIO TARJETA -->
    
                <div class="content-card-admin-info">
                    
                            <div class="content-card-admin-info-grapho-admin-maker" onclick="readPermissionTypePerUserGrapho(${row.id_usuario}, '${row.nombre} ${row.apellido}')">
                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.0281 0.0507812V9.02266H20C19.5288 4.2936 15.7571 0.521983 11.0281 0.0507812ZM16.0098 18.0497C18.2044 16.4085 19.7132 13.8991 20 11.0278H11.796L16.0098 18.0497Z" fill="white"/>
                                <path d="M9.02301 10.0252V0.0507812C3.96411 0.55607 0 4.83598 0 10.0252C0 15.5533 4.49747 20.0508 10.0256 20.0508C11.5016 20.0488 12.9587 19.7187 14.2914 19.0843C14.2914 19.0843 9.02501 10.1465 9.02401 10.0302C9.02389 10.0285 9.02356 10.0268 9.02301 10.0252Z" fill="white"/>
                                </svg>

                                Graphic
                            </div>

                        <div class="image-container" onclick="readPermissionTypePerUserGrapho(${row.id_usuario}, '${row.nombre} ${row.apellido}')">

                            ${default_image_fixer}
                            <img src="${image_value}" alt="">
                            <div class="info-icon">
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 0C5.8318 0 0 5.8318 0 13C0 20.1682 5.8318 26 13 26C20.1682 26 26 20.1682 26 13C26 5.8318 20.1682 0 13 0ZM14.3 18.5C14.3 19.0523 13.8523 19.5 13.3 19.5H12.7C12.1477 19.5 11.7 19.0523 11.7 18.5V12.7C11.7 12.1477 12.1477 11.7 12.7 11.7H13.3C13.8523 11.7 14.3 12.1477 14.3 12.7V18.5ZM14.3 8.1C14.3 8.65228 13.8523 9.1 13.3 9.1H12.7C12.1477 9.1 11.7 8.65228 11.7 8.1V7.5C11.7 6.94772 12.1477 6.5 12.7 6.5H13.3C13.8523 6.5 14.3 6.94772 14.3 7.5V8.1Z" fill="white"/>
                                </svg>
                            </div>
                        </div>
    
                    <div class="info-admin-container">
                        <span class="id">ID: ${row.id_usuario}</span>
                        <span class="name">${row.nombre} ${row.apellido}</span>
                        <span class="id">Charge: ${row.cargo}</span>
                    </div>

                    <div class="admin-action-button">
                        <div class="admin-delete-button" onclick="openDelete(${row.id_usuario})">
                            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.33333 4H1.55556V14.4C1.55556 14.8243 1.71944 15.2313 2.01117 15.5314C2.30289 15.8314 2.69855 16 3.11111 16H10.8889C11.3014 16 11.6971 15.8314 11.9888 15.5314C12.2806 15.2313 12.4444 14.8243 12.4444 14.4V4H2.33333ZM5.44444 13.6H3.88889V6.4H5.44444V13.6ZM10.1111 13.6H8.55556V6.4H10.1111V13.6ZM10.5918 1.6L9.33333 0H4.66667L3.40822 1.6H0V3.2H14V1.6H10.5918Z" fill="white" />
                            </svg>
                        </div>
                    <div class="admin-edit-button" onclick="openUpdate(${row.id_usuario})">
                        <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.39909 0.34587C9.59372 0.154035 9.90631 0.154001 10.101 0.345793L11.8261 2.04534C12.0248 2.24116 12.0248 2.56176 11.8261 2.75762L10.6802 3.88707C10.4856 4.0789 10.173 4.07894 9.97833 3.88715L8.25326 2.1876C8.0545 1.99178 8.05447 1.67118 8.25318 1.47532L9.39909 0.34587ZM0.149348 9.44923C0.0538065 9.54322 0 9.67164 0 9.80566V11.4976C0 11.7737 0.223858 11.9976 0.5 11.9976H2.23278C2.36398 11.9976 2.48991 11.946 2.58343 11.854L8.81839 5.72019C9.01742 5.52439 9.01754 5.20353 8.81865 5.00758L7.09359 3.30805C6.89905 3.11638 6.58671 3.11627 6.39203 3.30779L0.149348 9.44923ZM0 14.899C0 14.6229 0.223858 14.399 0.5 14.399H12.5C12.7761 14.399 13 14.6229 13 14.899V15.5C13 15.7761 12.7761 16 12.5 16H0.5C0.223858 16 0 15.7761 0 15.5V14.899Z" fill="white" />
                        </svg>
                    </div>
                </div>
                </div>

            </div>
            <!-- FINAL TARJETA -->
            `;
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
};

/* <------------------------------- NON PARAM -------------------------------> */
const PermissionsPerUserGrapho = async () => {
    DATA = await fetchData('services/admin/permiso.php', 'readPermissionsPerUserGraph');
    let data = [];
    let quantity = [];
    DATA.dataset.forEach(row => {
        data.push(row.nombre);
        quantity.push(row.cantidad);
    });
    if(DATA){

        if(!quantity.every(item => item === 0)){
            document.getElementById("grapho-modal").classList.remove("inactive")
            graphoModal("Permissions per User");
            pieGraph('chart', data, quantity);
        } else{
            document.getElementById("grapho-modal").classList.add("inactive")
            graphoModal("There are no registered permissions"); 
        }
    }
};

/* <---------------------------------- PARAM ----------------------------------> */
const readPermissionTypePerUserGrapho = async (id, name) => {
    const FORM = new FormData();
    FORM.append("idUsuario", id);
    DATA = await fetchData(EMPLEADO_API, 'readPermissionTypePerUserGrapho', FORM);
    let data = [];
    let quantity = [];
    DATA.dataset.forEach(row => {
        data.push(row.tipo);
        quantity.push(row.cantidad);
    });
    if(DATA){

        if(!quantity.every(item => item === 0)){
            document.getElementById("grapho-modal").classList.remove("inactive")
            graphoModal("Permissions per User: "+name);
            pieGraph('chart', data, quantity);
        } else{
            document.getElementById("grapho-modal").classList.add("inactive")
            graphoModal("There are no registered permissions"); 
        }
    }
};

// Evento para cuando el documento está completamente cargado
document.addEventListener('DOMContentLoaded', async () => {
    setupModalDiscardButtons();
    await fillEmployees();
});

let SEARCH_VALUE = '';

// Método del evento para cuando se envía el formulario de buscar
SEARCH_INPUT.addEventListener('input', (event) => {
    // Se evita recargar la página web después de enviar el formulario
    event.preventDefault();
    SEARCH_VALUE = event.target.value;
    search(SEARCH_VALUE);
});

// Función para realizar la búsqueda
const search = async (SEARCH_VALUE) => {
    const FORM = new FormData(SEARCH_FORM);
    // Añadir el valor del input al FormData
    FORM.append('search', SEARCH_VALUE);
    if (SEARCH_VALUE !== ''){
        // Constante tipo objeto con los datos del formulario
        const FORM = new FormData(SEARCH_FORM);
        // Añadir el valor del input al FormData
        FORM.append('search', SEARCH_VALUE);
        // Llamada a la función para llenar la tabla con los resultados de la búsqueda
        await fillEmployees(FORM);
    } else {
        await fillEmployees();
    }
};

// Evento para cuando se envía el formulario de guardar
SAVE_FORM_EMPLEADO.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario
    event.preventDefault();
    // Se verifica la acción a realizar
    (ID_EMPLEADO.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario
    const FORM = new FormData(SAVE_FORM_EMPLEADO);
    // Petición para guardar los datos del formulario
    const DATA = await fetchData(EMPLEADO_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción
    if (DATA.status) {
        // Se cierra la caja de diálogo
        SAVE_MODAL_EMPLEADO.classList.remove('show');
        document.body.classList.remove('body-no-scroll');
        // Se muestra un mensaje de éxito
        empleado =  NOMBRE_EMPLEADO.value + " " + APELLIDO_EMPLEADO.value;
        sweetAlert(1, "Employee " + empleado +" was successfully created.", true);
        // Se carga nuevamente la lista para visualizar los cambios
        await fillEmployees();
        empleado = "";
    } else {
        sweetAlert(2, DATA.error, false);
    }
});
// Evento para cuando se envía el formulario de actualizar
UPDATE_FORM_EMPLEADO.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario
    event.preventDefault();
    // Se verifica la acción a realizar
    (ID_EMPLEADO_U.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario
    const FORM = new FormData(UPDATE_FORM_EMPLEADO);
    // Petición para guardar los datos del formulario
    const DATA = await fetchData(EMPLEADO_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción
    if (DATA.status) {
        // Se cierra la caja de diálogo
        SAVE_MODAL_EMPLEADO_U.classList.remove('show');
        document.body.classList.remove('body-no-scroll');
        // Se muestra un mensaje de éxito
        empleado =  NOMBRE_EMPLEADO_U.value + " " + APELLIDO_EMPLEADO_U.value;
        sweetAlert(1, "Employee " + empleado +" was successfully modified.", true);
        // Se carga nuevamente la lista para visualizar los cambios
        await fillEmployees();
        empleado = "";
    } else {
        sweetAlert(2, DATA.error, false);
    }
});
// Evento para cuando se envía el formulario de cambio de contraseña
SAVE_FORM_PASSWORD.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario
    const FORM = new FormData(SAVE_FORM_PASSWORD);
    // Petición para guardar los datos del formulario
    const DATA = await fetchData(EMPLEADO_API, 'changePasswordAdmin', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción
    if (DATA.status) {
        // Se cierra la caja de diálogo
        SAVE_MODAL_PASSWORD.classList.remove('show');
        document.body.classList.remove('body-no-scroll');
        // Se muestra un mensaje de éxito
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la lista para visualizar los cambios
        await fillEmployees();
        ID_EMPLOYEE = "";
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

// Función para abrir la página de cargos
const openCharges = () => {
    location.href = 'charges.html';
}

// Función para abrir el formulario de creación de empleado
const openCreate = () => {
    SAVE_MODAL_EMPLEADO.classList.add('show');
    document.body.classList.add('body-no-scroll'); // Evitar el scroll en el cuerpo de la página
        // Ajustar la posición del modal para que esté visible en la pantalla
        SAVE_MODAL_EMPLEADO.style.marginTop = window.scrollY + 'px';
    MODAL_TITLE_EMPLEADO.textContent = 'Add An Employee';
    SAVE_FORM_EMPLEADO.reset();
    fillSelect(CARGO_API, 'readAll', 'idCargo');
}

// Función para abrir el formulario de actualización de empleado
const openUpdate = async (id) => {
    const FORM = new FormData();
    FORM.append('idUsuario', id);
    const DATA = await fetchData(EMPLEADO_API, 'readOne', FORM);
    if (DATA.status) {
        SAVE_MODAL_EMPLEADO_U.classList.add('show');
        document.body.classList.add('body-no-scroll'); // Evitar el scroll en el cuerpo de la página
        // Ajustar la posición del modal para que esté visible en la pantalla
        SAVE_MODAL_EMPLEADO_U.style.marginTop = window.scrollY + 'px';
        MODAL_TITLE_EMPLEADO_U.textContent = 'Update Employee';
        UPDATE_FORM_EMPLEADO.reset();
        const ROW = DATA.dataset;
        console.log(ROW);
        ID_EMPLEADO_U.value = ROW.id_usuario;
        NOMBRE_EMPLEADO_U.value = ROW.nombre;
        APELLIDO_EMPLEADO_U.value = ROW.apellido;
        CORREO_EMPLEADO_U.value = ROW.correo;
        fillSelect(CARGO_API, 'readAll', 'idCargoUpdate', ROW.cargo);
        ID_EMPLOYEE = ROW.id_usuario;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

// Función para abrir el formulario de cambio de contraseña del empleado
const openPassword = async () => {
    const FORM = new FormData(); 
    FORM.append('idUsuario', ID_EMPLOYEE);
    const DATA = await fetchData(EMPLEADO_API, 'readOne', FORM);
    if (DATA.status) {
        SAVE_MODAL_PASSWORD.classList.add('show');
        document.body.classList.add('body-no-scroll'); // Evitar el scroll en el cuerpo de la página
        // Ajustar la posición del modal para que esté visible en la pantalla
        SAVE_MODAL_PASSWORD.style.marginTop = window.scrollY + 'px';
        MODAL_TITLE_PASSWORD.textContent = 'Change Password';
        SAVE_FORM_PASSWORD.reset();
        const ROW = DATA.dataset;
        ID_EMPLEADO_PASSWORD.value = ROW.id_usuario;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

// Función para abrir el modal de eliminación de empleado
const openDelete = async (id) => {
    const RESPONSE = await confirmAction('Do you want to delete the administrator permanently?');
    if (RESPONSE) {
        const FORM = new FormData();
        FORM.append('idUsuario', id);
        const DATA = await fetchData(EMPLEADO_API, 'deleteRow', FORM);
        if (DATA.status) {
            await sweetAlert(1, DATA.message, true);
            await fillEmployees();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

// Funcion para abrir los reportes
const openReport = () => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/usuarios.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}

// Funcion para abrir los reportes
const openUserReport = (id) => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/usuarios.php`);
    PATH.searchParams.append('idEmpleado', id);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}