// Constantes para completar la ruta de la API.
const PERMISOS_API   = 'services/admin/permiso.php';
// Constante para establecer el form e input de buscar.
const SEARCH_FORM = document.getElementById('search-form'),
    SEARCH_INPUT = document.getElementById('search-input');

// Constante para establecer la caja donde se mostrarán los permisos
const BOX_PERMISOS = document.getElementById('main-content');

document.addEventListener('DOMContentLoaded', async () => {
    
    // Peticiones para solicitar los datos de la base.
    await fillPermissions();

});

let SEARCH_VALUE = '';

// Método del evento para cuando se envía el formulario de buscar.
SEARCH_INPUT.addEventListener('input', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();

    SEARCH_VALUE = event.target.value;

    search(SEARCH_VALUE);
   
});
//Metodo que busca los valores insertados con el search
search = async (SEARCH_VALUE) => {
    const FORM = new FormData(SEARCH_FORM);

    // Añadir el valor del input al FormData
    FORM.append('search',SEARCH_VALUE);

    if (SEARCH_VALUE !== ''){
        // Constante tipo objeto con los datos del formulario.
        const FORM = new FormData(SEARCH_FORM);

        // Añadir el valor del input al FormData
        FORM.append('search',SEARCH_VALUE);

        // Llamada a la función para llenar la caja con los resultados de la búsqueda.
       await fillPermissions(FORM);
    }else{
       await fillPermissions();
    }
}
const fillPermissions = async (form = null) => {

    (form) ? action = 'searchRows' : action = 'readAll';

    BOX_PERMISOS.innerHTML = '';
    // Petición para solicitar los tipos de peticiones (request types).
    const DATA = await fetchData(PERMISOS_API ,action,form); 
    console.log(DATA);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializa el contenedor de productos.
        BOX_PERMISOS.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas con los datos de cada tipo de request.
            let url = `entry-request.html?id=${row.id_permiso}&lapso=${row.lapso}`;
            BOX_PERMISOS.innerHTML += `
                <!-- INICIO TARJETA -->
            <div class="content-card-general temp-info">
                <div class="content-card-general-col1">
                    <p class="content-card-general-name">${row.nombre + ' ' + row.apellido}</p>
                    <p class="content-card-general-reason">${row.tipo_permiso}</p>
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
                
                    <a href="${url}">
                    <!-- Icono -->
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path var(--color-extra-1)
                            d="M20 0C8.972 0 0 8.972 0 20C0 31.028 8.972 40 20 40C31.028 40 40 31.028 40 20C40 8.972 31.028 0 20 0ZM22 30H18V18H22V30ZM22 14H18V10H22V14Z"
                            fill="#9B9B9B" />
                    </svg>
                    </a>
                </div>
            </div>
            <!-- FINAL TARJETA -->
            `;
        });
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        BOX_PERMISOS.textContent = DATA.error;
    }
}
