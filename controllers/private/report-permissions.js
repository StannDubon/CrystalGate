// Constantes para establecer las rutas de la api
const CLASIFICATION_API = 'services/admin/clasificacion-permiso.php',
    SUB_AUTHORIZATION_API = 'services/admin/tipo-permiso.php',
    PERMISSION_API = 'services/admin/permiso.php';
// Constantes para el filtro
const BOX_FILTER_OPTION = document.getElementById('box-filter-option');
const BOX_SUBFILTER_OPTION = document.getElementById('box-customize-type');

const FILTER_OPTION = document.querySelectorAll('.option-text');

// Evento que se ejecuta cuando el contenido del documento ha sido cargado
document.addEventListener('DOMContentLoaded', () => {
    // fillAuthorization()
});

const fillAuthorization = async () => {
    const DATA = await fetchData(CLASIFICATION_API, 'readAll');
    if(DATA.status){
        DATA.dataset.forEach((row) => {
            console.log('cuatro veces');
            
            BOX_FILTER_OPTION.innerHTML += `
                <div class="option">
                        <span class="option-text" >${row.clasificacion_permiso}</span>
                </div>
            `;
            
        });
    }
};

FILTER_OPTION.addEventListener('click', () => {
    FILTER_OPTION.textContent = `Selected: ${row.clasificacion_permiso}`;
});