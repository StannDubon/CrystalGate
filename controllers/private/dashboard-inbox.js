// Constantes para completar la ruta de la API.
const PERMISOS_API   = 'services/admin/permiso.php';
// Constante para establecer la caja donde se mostrarán los permisos
const BOX_PERMISOS = document.getElementById('inbox-content'),
    NUMERO_PERMISOS = document.getElementById('inbox-number');

document.addEventListener('DOMContentLoaded', async () => {
    
    // Peticiones para solicitar los datos de la base.

    FORM = new FormData();
    FORM.append('estado',1);
    await fillPermissions(FORM);

});

//Metodo para obtener los permisos desde la base
const fillPermissions = async (form = null) => {


    BOX_PERMISOS.innerHTML = '';
    // Petición para solicitar los tipos de peticiones (request types).
    const DATA = await fetchData(PERMISOS_API ,'readAllPendings',form); 
    console.log(DATA);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializa el contenedor de productos.
        NUMERO_PERMISOS.textContent = DATA.dataset.length;
        BOX_PERMISOS.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas con los datos de cada tipo de request.
            let url = `entry-request.html?id=${row.id_permiso}`;
            BOX_PERMISOS.innerHTML += `
               
            <!-- INICIO TARJETA -->
                    <div class="dash-inbox-content-card">
                        <div class="dash-inbox-content-card-col1">
                            <p class="dash-inbox-content-card-name">${row.nombre + ' ' + row.apellido}</p>
                            <p class="dash-inbox-content-card-reason">${row.tipo_permiso}</p>
                        </div>
                        <div class="dash-inbox-content-card-col2">
                        
                            <!-- Fecha de inicio -->
                            <div class="marked-zone">
                                <p class="dash-inbox-content-card-date">${row.fecha_inicio.split(' ')[0]}</p>
                                <p class="dash-inbox-content-card-time">${row.fecha_inicio.split(' ')[1]}</p>
                            </div>

                            <!-- Icono -->
                            <svg width="18" height="27" viewBox="0 0 18 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="var(--color-extra-1)" d="M2.76337 25.638C3.54021 26.3956 4.7795 26.3956 5.55629 25.6379L16.5322 14.9317C17.3369 14.1468 17.3369 12.8532 16.5322 12.0683L5.55629 1.3621C4.7795 0.604398 3.54021 0.604352 2.76337 1.362L1.46822 2.62513C0.663382 3.41009 0.663448 4.70399 1.46837 5.48886L8.21565 12.0681C9.02062 12.853 9.02062 14.147 8.21565 14.9319L1.46837 21.5111C0.663447 22.296 0.663382 23.5899 1.46822 24.3749L2.76337 25.638Z" fill="#737373"/>
                            </svg>
                                
                            <!-- Fecha final -->
                            <div class="marked-zone">
                                <p class="dash-inbox-content-card-date">${row.fecha_final.split(' ')[0]}</p>
                                <p class="dash-inbox-content-card-time">${row.fecha_final.split(' ')[1]}</p>
                            </div>
                        </div>
                        <div class="dash-inbox-content-card-col3">
                            <a href="${url}">
                            <!-- Icono -->
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path var(--color-extra-1) d="M20 0C8.972 0 0 8.972 0 20C0 31.028 8.972 40 20 40C31.028 40 40 31.028 40 20C40 8.972 31.028 0 20 0ZM22 30H18V18H22V30ZM22 14H18V10H22V14Z" fill="#9B9B9B"/>
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
