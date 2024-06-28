//Constante para establecer la ruta de la API
const PERMISO_API = 'services/admin/permiso.php';
//Constantes para establecer los elementos donde se mostrará la información del empleado
const NOMBRE_EMPLEADO = document.getElementById('employee-name'),
    CORREO_EMPLEADO = document.getElementById('employee-email'),
    FECHA_INICIO = document.getElementById('start-date'),
    HORA_INICIO = document.getElementById('start-time'),
    FECHA_FINAL = document.getElementById('final-date'),
    HORA_FINAL = document.getElementById('final-time');
// Constantes para establecer los elementos del modal de la descripción del permiso
const MODAL_TITLE_DESC = document.getElementById('modal-title-description'),
MODAL_DESC = document.getElementById('description-text');
// Constante para establecer la modal del permiso.
const DESCRIPTION_MODAL = document.getElementById('modal-description');
// Constante para establecer la caja donde se mostrará la información del documento adjunto
const BOX_DOCUMENTO = document.getElementById('box-document'),
    BOX_ESTADO = document.getElementById('estado-utilities');
// Constante tipo objeto para obtener los parámetros disponibles en la URL.
const PARAMS = new URLSearchParams(location.search);
// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
// Petición para obtener los datos del usuario que ha iniciado sesión.

    const FORM = new FormData();
    FORM.append('idPermiso', PARAMS.get('id'));
    fillRequest(FORM);
}); 
fillRequest = async(FORM) => {
// Petición para obtener los datos del usuario que ha iniciado sesión.

 
    const DATA = await fetchData(PERMISO_API, 'readOne',FORM);
   
    console.log(DATA);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {

        // Se inicializan los campos del formulario con los datos del usuario que ha iniciado sesión.
        const ROW = DATA.dataset;

        startDate = new Date(ROW.fecha_inicio.split(' ')[0] + 'T00:00:00');
        endDate = new Date(ROW.fecha_final.split(' ')[0] + 'T00:00:00');
        MODAL_DESC.textContent = ROW.descripcion_permiso;
        NOMBRE_EMPLEADO.textContent = ROW.nombre + ' ' + ROW.apellido;
        CORREO_EMPLEADO.textContent = ROW.correo;

        const ONLY_DAY = PARAMS.get('lapso');
        if (ONLY_DAY === '1'){
            FECHA_INICIO.textContent = ROW.fecha_inicio.split(' ')[0];
        HORA_INICIO.textContent = '';
        FECHA_FINAL.textContent = ROW.fecha_final.split(' ')[0];
        HORA_FINAL.textContent = '';
        }else{
            FECHA_INICIO.textContent = ROW.fecha_inicio.split(' ')[0];
        HORA_INICIO.textContent = ROW.fecha_inicio.split(' ')[1];
        FECHA_FINAL.textContent = ROW.fecha_final.split(' ')[0];
        HORA_FINAL.textContent = ROW.fecha_final.split(' ')[1];
        }

        const ESTADO  = ROW.estado; 
       console.log('Estado = '+ ESTADO)
        const DOCUMENTO_NOMBRE = ROW.documento_permiso.split('.')[0];
        const DOCUMENTO_EXTENSION = ROW.documento_permiso.split('.')[1];
        console.log(DOCUMENTO_NOMBRE +' '+ DOCUMENTO_EXTENSION);
        if(DOCUMENTO_EXTENSION === 'pdf'){
            BOX_DOCUMENTO.classList.add('view-pdf');
            console.log(BOX_DOCUMENTO.classList);
            BOX_DOCUMENTO.innerHTML = `
                <div class="icon">
                                    <svg width="44" height="55" viewBox="0 0 44 55" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.7344 34.87C11.2284 34.87 10.8874 34.9195 10.7114 34.969V38.2085C10.9204 38.258 11.1817 38.2717 11.5419 38.2717C12.8592 38.2717 13.6704 37.6062 13.6704 36.4815C13.6704 35.475 12.9719 34.87 11.7344 34.87ZM21.3237 34.903C20.7737 34.903 20.4162 34.9525 20.2044 35.002V42.1795C20.4162 42.229 20.7572 42.229 21.0652 42.229C23.3119 42.2455 24.7749 41.008 24.7749 38.39C24.7914 36.1075 23.4577 34.903 21.3237 34.903Z"
                                            fill="white" />
                                        <path
                                            d="M27.5 0H5.5C4.04131 0 2.64236 0.579462 1.61091 1.61091C0.579462 2.64236 0 4.04131 0 5.5V49.5C0 50.9587 0.579462 52.3576 1.61091 53.3891C2.64236 54.4205 4.04131 55 5.5 55H38.5C39.9587 55 41.3576 54.4205 42.3891 53.3891C43.4205 52.3576 44 50.9587 44 49.5V16.5L27.5 0ZM15.1195 39.0225C14.2698 39.82 13.0157 40.1775 11.5555 40.1775C11.2724 40.1806 10.9894 40.164 10.7085 40.128V44.0495H8.25V33.2255C9.3595 33.06 10.4806 32.9846 11.6022 33C13.134 33 14.223 33.2915 14.9573 33.8773C15.6558 34.4328 16.1287 35.343 16.1287 36.4155C16.126 37.4935 15.7685 38.4038 15.1195 39.0225ZM25.5888 42.7487C24.4338 43.7085 22.6765 44.165 20.5288 44.165C19.2418 44.165 18.3315 44.0825 17.7127 44V33.2282C18.8227 33.0663 19.9434 32.9899 21.065 33C23.1467 33 24.4998 33.374 25.5557 34.1715C26.697 35.0185 27.412 36.3688 27.412 38.3075C27.412 40.4058 26.6448 41.855 25.5888 42.7487ZM35.75 35.1175H31.537V37.6227H35.475V39.6413H31.537V44.0522H29.0455V33.0825H35.75V35.1175ZM27.5 19.25H24.75V5.5L38.5 19.25H27.5Z"
                                            fill="white" />
                                    </svg>
                                </div>
                                <p class="file-name">${DOCUMENTO_NOMBRE}</p>
            `
        }else if(DOCUMENTO_EXTENSION === 'docx'){
            BOX_DOCUMENTO.classList.add('view-doc');
            BOX_DOCUMENTO.innerHTML = `
                <div class="icon">
                                    <svg width="44" height="55" viewBox="0 0 44 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.5115 34.518C20.8147 34.518 19.8247 36.1323 19.8247 38.2938C19.8247 40.469 20.845 42.0063 22.528 42.0063C24.2247 42.0063 25.1982 40.3893 25.1982 38.2278C25.1982 36.2313 24.2412 34.518 22.5115 34.518Z" fill="white"/>
                                        <path d="M27.5 0H5.5C4.04131 0 2.64236 0.579462 1.61091 1.61091C0.579462 2.64236 0 4.04131 0 5.5V49.5C0 50.9587 0.579462 52.3576 1.61091 53.3891C2.64236 54.4205 4.04131 55 5.5 55H38.5C39.9587 55 41.3576 54.4205 42.3891 53.3891C43.4205 52.3576 44 50.9587 44 49.5V16.5L27.5 0ZM14.1762 42.4985C13.0047 43.472 11.2255 43.9313 9.05025 43.9313C7.744 43.9313 6.82275 43.8488 6.19575 43.7663V32.846C7.32042 32.684 8.45577 32.6077 9.592 32.6178C11.704 32.6177 13.0735 32.9972 14.1432 33.8058C15.2982 34.6637 16.0243 36.0332 16.0243 37.9912C16.0243 40.1225 15.2487 41.591 14.1762 42.4985ZM22.3988 44C19.0988 44 17.171 41.5085 17.171 38.3405C17.171 35.0103 19.2968 32.5215 22.5803 32.5215C25.993 32.5215 27.8575 35.0763 27.8575 38.1453C27.8547 41.789 25.6438 44 22.3988 44ZM35.2 41.9045C35.9562 41.9045 36.7978 41.7368 37.2955 41.5415L37.675 43.5023C37.213 43.7332 36.1735 43.9808 34.8232 43.9808C30.9815 43.9808 29.0015 41.591 29.0015 38.423C29.0015 34.6307 31.7048 32.5215 35.0708 32.5215C36.3743 32.5215 37.3615 32.7855 37.807 33.0165L37.2955 35.013C36.626 34.7363 35.9079 34.5961 35.1835 34.6005C33.187 34.6005 31.636 35.805 31.636 38.28C31.636 40.5047 32.956 41.9045 35.2 41.9045ZM27.5 19.25H24.75V5.5L38.5 19.25H27.5Z" fill="white"/>
                                        <path d="M9.85548 34.5482C9.29723 34.5482 8.93423 34.5977 8.71973 34.6472V41.921C8.93423 41.9705 9.28073 41.9705 9.59148 41.9705C11.8685 41.987 13.3507 40.7357 13.3507 38.0792C13.3672 35.7692 12.017 34.5482 9.85548 34.5482Z" fill="white"/>
                                    </svg>                                    
                                </div>
                                <p class="file-name">${DOCUMENTO_NOMBRE}</p>
            `
        }

        if(ESTADO == 1){
            BOX_ESTADO.classList.add('main-content-row-2');
            BOX_ESTADO.innerHTML += `
                <button class="pending-approve" type="submit" id="btn-approve">Approve</button>
                <button class="pending-reject" type="submit" id="btn-reject">Reject</button>
            `
        } else if(ESTADO == 2){
            BOX_ESTADO.classList.add('main-row-1');
            BOX_ESTADO.innerHTML += `
                <div class="col1 approved">
                <svg width="57" height="42" viewBox="0 0 67 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M23.2853 36.5234C22.6999 37.107 21.7526 37.107 21.1672 36.5234L9.14155 24.5338C8.16585 23.561 6.58702 23.561 5.61132 24.5338L2.06756 28.0669C1.08772 29.0438 1.08772 30.6308 2.06756 31.6078L20.4611 49.9462C21.4368 50.919 23.0156 50.919 23.9914 49.9462L64.9324 9.12776C65.9123 8.15084 65.9123 6.56384 64.9324 5.58692L61.3887 2.05378C60.413 1.081 58.8341 1.081 57.8584 2.05378L23.2853 36.5234Z"
                        fill="white" stroke="white" />
                </svg>

                </div>
                <div class="col2 approved">
                    <p>APPROVED</p>
                </div>
            `
        } else if(ESTADO == 3){
            BOX_ESTADO.classList.add('main-row-1');
            BOX_ESTADO.innerHTML += `
                <div class="col1 info">
                <svg id="info" width="57" height="57" viewBox="0 0 57 57" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M28.5 0C12.7851 0 0 12.7851 0 28.5C0 44.2149 12.7851 57 28.5 57C44.2149 57 57 44.2149 57 28.5C57 12.7851 44.2149 0 28.5 0ZM31.35 42.75H25.65V25.65H31.35V42.75ZM31.35 19.95H25.65V14.25H31.35V19.95Z"
                        fill="#9B9B9B" />
                </svg>


                </div>
                <div class="col2 rejected">
                    <p>REJECTED</p>
                </div>
            `
        }
        setVariables(startDate);
        renderCalendar(startDate, endDate);
    } else {
        sweetAlert(2, DATA.error, null);
    }
}

closeModal = () =>{
    if(DESCRIPTION_MODAL.classList.contains('show') ){
        DESCRIPTION_MODAL.classList.remove('show');
    }
}

/*
*   Función para preparar el formulario al momento de editar el perfil.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openDesc = async() => {
    DESCRIPTION_MODAL.classList.add('show');
    MODAL_TITLE_DESC.textContent = ('Permission description')
}
