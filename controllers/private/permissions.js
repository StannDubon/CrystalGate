const SUB_AUTHORIZATION_API = 'services/admin/tipo-permiso.php',
        PERMISSION_API = 'services/admin/permiso.php';

const SEARCH_FORM = document.getElementById("searchForm");
const SEARCH_INPUT = document.getElementById("searchInput");

const PERMISSION_MAIN_CONTAINER = document.getElementById("permissions-main-content")

const PERMISSION_HEADER_TITLE = document.getElementById("main-header-permission-main-title")

var actualPermissionId = null;

document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    const urlParams = new URLSearchParams(window.location.search);
    actualPermissionId=urlParams.get('id');
    loadTemplate();
    fillPermissionData(actualPermissionId);
    fillTable();
});

SEARCH_INPUT.addEventListener("input", (event) => {
    event.preventDefault();
    const FORM = new FormData();
    FORM.append("search", SEARCH_INPUT.value);
    fillTable();
});

const fillTable = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    PERMISSION_MAIN_CONTAINER.innerHTML = '';
    form = form ?? new FormData();
    // Se verifica la acción a realizar.
    const searchValue = form.get('search');
    const action = searchValue ? 'searchRows' : 'readAll';
    const DATA = await fetchData(PERMISSION_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
      if (action === 'searchRows' && DATA.dataset.length === 0) {
        VoidResult(DATA.error);
      } else {
          DATA.dataset.forEach((row) => {
            console.log(row.lapso)
            let fecha_inicio = "";
            let fecha_final = "";

            if(row.lapso==="1"){
                fecha_inicio = `<p class="content-card-general-date">${DecomposeFormat(row.fecha_inicio, 1)}</p>`
                fecha_final = `<p class="content-card-general-date">${DecomposeFormat(row.fecha_final, 1)}</p>`
            } else if(row.lapso==="2"){
                fecha_inicio = `<p class="content-card-general-time">${DecomposeFormat(row.fecha_inicio, 3)}</p>`
                fecha_final = `<p class="content-card-general-time">${DecomposeFormat(row.fecha_final, 3)}</p>`
            } else if(row.lapso==="3"){
                fecha_inicio = `<p class="content-card-general-date">${DecomposeFormat(row.fecha_inicio, 1)}</p>
                                <p class="content-card-general-time">${DecomposeFormat(row.fecha_inicio, 3)}</p>`
                fecha_final = `<p class="content-card-general-date">${DecomposeFormat(row.fecha_final, 1)}</p>
                                <p class="content-card-general-time">${DecomposeFormat(row.fecha_final, 3)}</p>`            }

            PERMISSION_MAIN_CONTAINER.innerHTML += `
            <!-- INICIO TARJETA -->
            <div class="content-card-general temp-info">
                <div class="content-card-general-col1">
                    <p class="content-card-general-name">${row.nombre +" "+ row.apellido}</p>
                    <p class="content-card-general-reason">${row.tipo_permiso}</p>
                </div>
                <div class="content-card-general-col2">

                    <!-- Fecha de inicio -->
                    <div class="marked-zone">
                        ${fecha_inicio}
                    </div>

                    <!-- Icono -->
                    <svg width="18" height="27" viewBox="0 0 18 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="var(--color-extra-1)"
                            d="M2.76337 25.638C3.54021 26.3956 4.7795 26.3956 5.55629 25.6379L16.5322 14.9317C17.3369 14.1468 17.3369 12.8532 16.5322 12.0683L5.55629 1.3621C4.7795 0.604398 3.54021 0.604352 2.76337 1.362L1.46822 2.62513C0.663382 3.41009 0.663448 4.70399 1.46837 5.48886L8.21565 12.0681C9.02062 12.853 9.02062 14.147 8.21565 14.9319L1.46837 21.5111C0.663447 22.296 0.663382 23.5899 1.46822 24.3749L2.76337 25.638Z"
                            fill="#737373" />
                    </svg>

                    <!-- Fecha final -->
                    <div class="marked-zone">
                        ${fecha_final}
                    </div>
                </div>
                <div class="content-card-general-col3">
                    <!-- Icono -->
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path var(--color-extra-1)
                            d="M20 0C8.972 0 0 8.972 0 20C0 31.028 8.972 40 20 40C31.028 40 40 31.028 40 20C40 8.972 31.028 0 20 0ZM22 30H18V18H22V30ZM22 14H18V10H22V14Z"
                            fill="#9B9B9B" />
                    </svg>
                </div>
            </div>
            <!-- FINAL TARJETA -->
            `;
        });
      }
    } else {
        PERMISSION_MAIN_CONTAINER.innerHTML += `<span>ERROR!</span>`
    }
};
  

const fillPermissionData = async (id) => {
    const FORM = new FormData();
    FORM.append('idClasificacionPermiso', id);
    const DATA = await fetchData(AUTHORIZATION_API, 'readOne', FORM);
    if (DATA.status) {
        const ROW = DATA.dataset;
        PERMISSION_HEADER_TITLE.textContent = ROW.clasificacion_permiso;
        fillSelectSubPermissions(SUB_AUTHORIZATION_API, 'readAll', 'selectFilterIdClasificacionSubPermiso');
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const fillSelectSubPermissions = async (filename, action, select, filter = undefined) => {
    const FORM = (typeof (filter) === 'object') ? filter : null;
    const DATA = await fetchData(filename, action, FORM);
    let content = '';
    if (DATA.status) {
        content += '<option value="" selected>No filter</option>';
        DATA.dataset.forEach(row => {
            const value = Object.values(row)[0];
            const text = Object.values(row)[2];
            const SELECTED = (filter != null && (value == filter));
            if (!SELECTED) {
                content += `<option value="${value}">${text}</option>`;
            } else {
                content += `<option value="${value}" selected>${text}</option>`;
            }
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
