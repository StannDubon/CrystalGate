const HISTORY_API = 'services/admin/notificacion.php'; // Endpoint de la API para historial

const SEARCH_FORM = document.getElementById("search-form"); // Elemento del formulario de búsqueda
const SEARCH_INPUT = document.getElementById("search-input"); // Elemento de entrada de búsqueda

const HISTORY_MAIN_CONTAINER = document.getElementById("history-main-container"); // Contenedor para el contenido principal de historial



let SEARCH_VALUE = '';

// Método del evento para cuando se envía el formulario de buscar.
SEARCH_INPUT.addEventListener('input', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();

    SEARCH_VALUE = event.target.value;

    search(SEARCH_VALUE);
   
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
       await fillTable(FORM);
    }else{
       await fillTable();
    }
}


// Función asincrónica para llenar la tabla
const fillTable = async (form = null) => {
    // Inicializar el contenido de la tabla
    HISTORY_MAIN_CONTAINER.innerHTML = '';

    if (form == null) {
        form = new FormData(); // Crear un nuevo FormData si no se proporciona uno
    }

    // Verificar la acción a realizar
    const searchValue = form.get("search");
    const action = searchValue ? 'searchRows' : 'readAll';

    // Petición para obtener los registros disponibles
    const DATA = await fetchData(HISTORY_API, action, form);
    console.log(DATA);
    // Comprobar si la respuesta es satisfactoria, de lo contrario mostrar un mensaje con la excepción
    if (DATA.status) {
        if (action === 'searchRows' && DATA.dataset.length === 0) {
            VoidResult(DATA.error); // Mostrar resultado vacío si no hay datos
        } else {
            DATA.dataset.forEach((row) => {
                const estado = row.estado;
                const administrador = row.nombre_administrador + " " + row.apellido_administrador;
                const empleado = row.nombre_empleado + " " + row.apellido_empleado;
                if(estado == 2){
                    HISTORY_MAIN_CONTAINER.innerHTML += `
                        <!-- INICIO TARJETA -->
                        <p class="content-card-history-administrator-name">${administrador}</p>
                        <div class="content-card-general approved-permission card-fixer-history temp-info">
                            <div class="content-card-general-col1">
                                <p class="content-card-general-name">${empleado}</p>
                                <p class="content-card-general-reason">${row.descripcion}</p>
                            </div>
                            <div class="content-card-general-col2">

                                <!-- Fecha de inicio -->
                                <div class="marked-zone">
                                    <p class="content-card-general-date">${row.fecha_inicio.split(' ')[0]}</p>
                                    <p class="content-card-general-time">${row.fecha_inicio.split(' ')[1]}</p>
                                </div>

                                <!-- Icono -->
                                <svg width="18" height="27" viewBox="0 0 18 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="var(--color-extra-1)"
                                        d="M2.76337 25.638C3.54021 26.3956 4.7795 26.3956 5.55629 25.6379L16.5322 14.9317C17.3369 14.1468 17.3369 12.8532 16.5322 12.0683L5.55629 1.3621C4.7795 0.604398 3.54021 0.604352 2.76337 1.362L1.46822 2.62513C0.663382 3.41009 0.663448 4.70399 1.46837 5.48886L8.21565 12.0681C9.02062 12.853 9.02062 14.147 8.21565 14.9319L1.46837 21.5111C0.663447 22.296 0.663382 23.5899 1.46822 24.3749L2.76337 25.638Z"
                                        fill="#737373" />
                                </svg>

                                <!-- Fecha final -->
                                <div class="marked-zone">
                                    <p class="content-card-general-date">${row.fecha_final.split(' ')[0]}</p>
                                    <p class="content-card-general-time">${row.fecha_final.split(' ')[1]}</p>
                                </div>
                            </div>
                            <div class="content-card-general-col3">
                                <p>APPROVED</p>
                            </div>
                        </div>
                        <!-- FINAL TARJETA -->
                    `;
                } else if (estado == 3){
                    HISTORY_MAIN_CONTAINER.innerHTML += `
                        <!-- INICIO TARJETA -->
                        <p class="content-card-history-administrator-name">${administrador}</p>
                        <div class="content-card-general rejected-permission card-fixer-history temp-info">
                            <div class="content-card-general-col1">
                                <p class="content-card-general-name">${empleado}</p>
                                <p class="content-card-general-reason">${row.descripcion}</p>
                            </div>
                            <div class="content-card-general-col2">

                                <!-- Fecha de inicio -->
                                <div class="marked-zone">
                                    <p class="content-card-general-date">${row.fecha_inicio.split(' ')[0]}</p>
                                    <p class="content-card-general-time">${row.fecha_inicio.split(' ')[1]}</p>
                                </div>

                                <!-- Icono -->
                                <svg width="18" height="27" viewBox="0 0 18 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="var(--color-extra-1)"
                                        d="M2.76337 25.638C3.54021 26.3956 4.7795 26.3956 5.55629 25.6379L16.5322 14.9317C17.3369 14.1468 17.3369 12.8532 16.5322 12.0683L5.55629 1.3621C4.7795 0.604398 3.54021 0.604352 2.76337 1.362L1.46822 2.62513C0.663382 3.41009 0.663448 4.70399 1.46837 5.48886L8.21565 12.0681C9.02062 12.853 9.02062 14.147 8.21565 14.9319L1.46837 21.5111C0.663447 22.296 0.663382 23.5899 1.46822 24.3749L2.76337 25.638Z"
                                        fill="#737373" />
                                </svg>

                                <!-- Fecha final -->
                                <div class="marked-zone">
                                    <p class="content-card-general-date">${row.fecha_final.split(' ')[0]}</p>
                                    <p class="content-card-general-time">${row.fecha_final.split(' ')[1]}</p>
                                </div>
                            </div>
                            <div class="content-card-general-col3">
                                <p>REJECTED</p>
                            </div>
                        </div>
                        <!-- FINAL TARJETA -->
                    `;
                }
            });
        }
    } else {
        HISTORY_MAIN_CONTAINER.innerHTML += DATA.error; // Mostrar error si la solicitud falla
    }
};
// Evento que se ejecuta cuando el contenido del documento ha sido cargado
document.addEventListener('DOMContentLoaded', () => {
    fillTable(); // Llenar la tabla
});

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
