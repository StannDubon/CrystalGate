// Constantes para establecer las rutas de la api
const CLASIFICATION_API = 'services/admin/clasificacion-permiso.php',
    SUB_AUTHORIZATION_API = 'services/admin/tipo-permiso.php',
    PERMISSION_API = 'services/admin/permiso.php';
// Constantes para el filtro
const CLASIFICATION_FILTER = document.getElementById('selectClasificacion');
const BOX_SUBFILTER_OPTION = document.getElementById('box-customize-type');

const FILTER_OPTION = document.querySelectorAll('.option-text');
const START_DATE = document.getElementById('start-date');
const FINISH_DATE = document.getElementById('finish-date');
const BTN_REPORT = document.querySelector('.btn-report');
// Array para almacenar los IDs
let selectedIdsSub = [];
let selectedTypes = [];
let selectedClasi = "";
// Evento que se ejecuta cuando el contenido del documento ha sido cargado
document.addEventListener('DOMContentLoaded', () => {
    fillSelectSubPermissions(CLASIFICATION_API, 'readAll', 'selectClasificacion');
});

// Funcion para establecer los select del buscador
const fillSelectSubPermissions = async ( filename, action, select) => {
    const FORM = new FormData();
    const DATA = await fetchData(filename, action);
    let content = '';
    if (DATA.status) {
        content += '<option value="" selected>Select one option</option>';
        DATA.dataset.forEach(row => {
            const value = Object.values(row)[0];
            const text = Object.values(row)[1];
            content += `<option value="${value}">${text}</option>`;
        });
    } else {
        content += '<option>No Matches</option>';
    }
    document.getElementById(select).innerHTML = content;
};

// Agregamos el evento 'change' al elemento <select>
CLASIFICATION_FILTER.addEventListener("change", function(event) {
    const selectedValue = event.target.value;

    
    if(selectedValue>=1){
        console.log("Opción seleccionada:", selectedValue);
        fillSubAuthorization(selectedValue);
        selectedClasi = selectedValue;
        selectedIdsSub = [];
    }else{
        console.log("no selecciono nada");
        BOX_SUBFILTER_OPTION.innerHTML = '';
        selectedClasi = "";
        selectedIdsSub = [];

    }
});

const fillSubAuthorization = async (id) => {
    const FORM = new FormData();
    FORM.append('idClasificacionPermiso', id);
    const DATA = await fetchData(SUB_AUTHORIZATION_API, 'readAllByCategorie', FORM);
    BOX_SUBFILTER_OPTION.innerHTML = '';
    if (DATA.status) {
        DATA.dataset.forEach((row) => {
            console.log("id: " + row.id_tipo_permiso + " Sub autorizacion: " + row.tipo_permiso);
            BOX_SUBFILTER_OPTION.innerHTML += `
                <div class="type" id="${row.id_tipo_permiso}">
                    <span class="type-text">${row.tipo_permiso}</span>
                    <img class="type-img" src="../resources/svg/check.svg" alt="">
                </div>
            `;

            const id_type = row.id_tipo_permiso;

        });
    }
};

// Añadir el evento de clic para alternar la clase 'selected' en los divs con clase 'type'
BOX_SUBFILTER_OPTION.addEventListener('click', function(event) {
    const target = event.target.closest('.type'); // Verifica si el elemento clicado es un div con clase 'type' o está dentro de uno
    if (target) {
        target.classList.toggle('selected');
    }

    const divId = target.id; 
    if (selectedIdsSub.includes(divId)) {
        // Si el ID ya está en el array, eliminarlo
        selectedIdsSub = selectedIdsSub.filter(id => id !== divId);
        console.log(`Removed: ${divId}`);
      } else {
        // Si el ID no está en el array, agregarlo
        selectedIdsSub.push(divId);
        console.log(`Added: ${divId}`);
      }
      
      console.log('Current IDs:', selectedIdsSub);
});



// Función para manejar el clic en el div
function handleDivClick(event) {
  const divId = event.target.id; // Obtener el ID del div clickeado

  if (selectedIdsSub.includes(divId)) {
    // Si el ID ya está en el array, eliminarlo
    selectedIdsSub = selectedIdsSub.filter(id => id !== divId);
    console.log(`Removed: ${divId}`);
  } else {
    // Si el ID no está en el array, agregarlo
    selectedIdsSub.push(divId);
    console.log(`Added: ${divId}`);
  }

  console.log('Current IDs:' + selectedIdsSub);
}


document.querySelectorAll('.type').forEach(div => {
  div.addEventListener('click', handleDivClick);
});

// Función para formatear las fechas en formato datetime (YYYY-MM-DD HH:MM:SS)
function formatDateTime(dateInput) {
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes comienza desde 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

BTN_REPORT.addEventListener('click', function(event) {
    if(selectedIdsSub.length != 0 || selectedTypes.length != 0 || START_DATE.value == null || FINISH_DATE.value == null) {

        // Formatear fechas de inicio y fin
        const formattedStartDate = formatDateTime(START_DATE.value);
        const formattedFinishDate = formatDateTime(FINISH_DATE.value);


        openReport(selectedClasi, selectedIdsSub, formattedStartDate, formattedFinishDate, selectedTypes);
        console.log("clasi: " + selectedClasi + " id tipos: "+selectedIdsSub + " fecha de inicio : "+ formattedStartDate + " fecha final: "+formattedFinishDate + " estados: " + selectedTypes);
    } else{
        sweetAlert(3, "All fields must be selected", false);
        console.log("nohay datos seleccionados jaja ta malo");
    }
});

const openReport = (idClasificacionPermiso,idTipoPermiso,fechaInicio,fechaFinal,estado) => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/permisos-parametrizados.php`);
    // Se agrega un parámetro a la ruta con el valor del registro seleccionado.
    PATH.searchParams.append('idClasificacionPermiso', idClasificacionPermiso);
    PATH.searchParams.append('idTipoPermiso', idTipoPermiso);
    PATH.searchParams.append('fechaInicio', fechaInicio);
    PATH.searchParams.append('fechaFinal', fechaFinal);
    PATH.searchParams.append('estado', estado);
    // Se abre el reporte en una nueva pestaña.
    console.log("path: " + PATH);
    window.open(PATH.href);
}