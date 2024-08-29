/*
*   CONTROLADOR DE USO GENERAL EN TODAS LAS PÁGINAS WEB.
*/
// Constante para establecer la ruta base del servidor.
const SERVER_URL = 'http://localhost/CrystalGate/api/';

/*
*   Función para mostrar un mensaje de confirmación.
*   Requiere la librería sweetalert para funcionar.
*   Parámetros: message (mensaje de confirmación).
*   Retorno: resultado de la promesa.
*/
const confirmAction = (message) => {
    return Swal.fire({
        title: 'Warning',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor: '#3085d6',
        didOpen: () => {
            const confirmButton = Swal.getConfirmButton();
            const cancelButton = Swal.getCancelButton();
            confirmButton.parentNode.insertBefore(cancelButton, confirmButton);
        }
    }).then((result) => {
        return result.isConfirmed;
    });
}
/*
*   Función para mostrar un mensaje de error con confirmación.
*   Requiere la librería sweetalert para funcionar.
*   Parámetros: message (mensaje de confirmación).
*   Retorno: resultado de la promesa.
*/
const confirmActionError = (message) => {
    return Swal.fire({
        title: 'Error',
        text: message,
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor: '#3085d6',
    }).then((result) => {
        return result.isConfirmed;
    });
}
/*
*   Función para mostrar un mensaje de succes con confirmación.
*   Requiere la librería sweetalert para funcionar.
*   Parámetros: message (mensaje de confirmación).
*   Retorno: resultado de la promesa.
*/
const confirmActionSuccess = (message) => {
    return Swal.fire({
        title: 'Success',
        text: message,
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor: '#3085d6',
    }).then((result) => {
        return result.isConfirmed;
    });
}

/*
*   Función asíncrona para manejar los mensajes de notificación al usuario.
*   Requiere la librería sweetalert2 para funcionar.
*   Parámetros: type (tipo de mensaje), text (texto a mostrar), timer (uso de temporizador) y url (valor opcional con la ubicación de destino).
*   Retorno: ninguno.
*/
const sweetAlert = async (type, text, timer, url = null) => {
    let title, icon;
    // Se compara el tipo de mensaje a mostrar.
    switch (type) {
        case 1:
            title = 'Success!';
            icon = 'success';
            break;
        case 2:
            title = 'Error!';
            icon = 'error';
            break;
        case 3:
            title = 'Warning';
            icon = 'warning';
            break;
        case 4:
            title = 'Information';
            icon = 'info';
            break;
        default:
            title = 'Information';
            icon = 'info';
    }

    // Se define un objeto con las opciones principales para el mensaje.
    let options = {
        title: title,
        text: text,
        icon: icon,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3085d6',
        didOpen: () => {
            const confirmButton = Swal.getConfirmButton();
            const cancelButton = Swal.getCancelButton();
            confirmButton.parentNode.insertBefore(cancelButton, confirmButton);
        }
    };

    // Se verifica el uso del temporizador.
    if (timer) {
        options.timer = 3000;
        options.timerProgressBar = true;
    }

    // Se muestra el mensaje.
    await Swal.fire(options);

    // Se direcciona a una página web si se indica.
    if (url) {
        location.href = url;
    }
}

/*
*   Función asíncrona para cargar las opciones en un select de formulario.
*   Parámetros: filename (nombre del archivo), action (acción a realizar), select (identificador del select en el formulario) y filter (dato opcional para seleccionar una opción o filtrar los datos).
*   Retorno: ninguno.
*/
const fillSelect = async (filename, action, select, filter = undefined) => {
    // Se verifica si el filtro contiene un objeto para enviar a la API.
    const FORM = (typeof (filter) === 'object') ? filter : null;
    // Petición para obtener los datos.
    const DATA = await fetchData(filename, action, FORM);
    let content = '';
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje.
    if (DATA.status) {
        content += '<option value="" selected>Seleccione una opción</option>';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se obtiene el dato del primer campo de la sentencia SQL.
            const value = Object.values(row)[0];
            // Se obtiene el dato del segundo campo de la sentencia SQL.
            const text = Object.values(row)[1];
            // Se verifica el valor del filtro para enlistar las opciones.
            const SELECTED = (filter != null && (value == filter));
            if (!SELECTED) {
                content += `<option value="${value}">${text}</option>`;
            } else {
                content += `<option value="${value}" selected>${text}</option>`;
            }
        });
    } else {
        content += '<option>No hay opciones disponibles</option>';
    }
    // Se agregan las opciones a la etiqueta select mediante el id.
    document.getElementById(select).innerHTML = content;
}


/*
*   Función para generar un gráfico de barras verticales.
*   Requiere la librería chart.js para funcionar.
*   Parámetros: canvas (identificador de la etiqueta canvas), xAxis (datos para el eje X), yAxis (datos para el eje Y), legend (etiqueta para los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/

//Requerimientos 
// Espaciado 4 y Uso ;
// VARIABLES snake_case
let instance_chart = null; 
const barGraph = (canvas, xAxis, yAxis, legend, title) => {
    if(instance_chart){
        instance_chart.destroy();
    }
    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.

    // VARIABLE lowcase
    let colors = []; 
    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    xAxis.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });

    const ctx = document.getElementById(canvas).getContext('2d');
    // Se crea una instancia para generar el gráfico con los datos recibidos.
    instance_chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    display: false
                }
            }
        }
    });
}

/*
*   Función para generar un gráfico de pastel.
*   Requiere la librería chart.js para funcionar.
*   Parámetros: canvas (identificador de la etiqueta canvas), legends (valores para las etiquetas), values (valores de los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/
const pieGraph = (canvas, legends, values, title) => {
    if(instance_chart){
        instance_chart.destroy();
    }
    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];
    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    values.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });
    // Se crea una instancia para generar el gráfico con los datos recibidos.
    const ctx = document.getElementById(canvas).getContext('2d');
    instance_chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: legends,
            datasets: [{
                data: values,
                backgroundColor: colors
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        }
    });
}

//CONSTANTES camelCase
const barGraphPredict = async (canvas, xAxis, yAxis, xFinal, legend, title) => {
    if(instance_chart){
        instance_chart.destroy();
    }
    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];
    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    xAxis.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });
    
    const predictions = await PredictData(xAxis, yAxis, xFinal.length);
    const predictionsPrinter = new Array(xAxis.length).fill(0);

    // Verificar si todos los valores en predictionsPrinter son 0
    const allZero = predictionsPrinter.every(value => value === 0);
    
    if (allZero) {
        // Añadir predictions a predictionsPrinter
        predictionsPrinter.push(...predictions);
    }

    const ctx = document.getElementById(canvas).getContext('2d');
    // Se crea una instancia para generar el gráfico con los datos recibidos.
    instance_chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xFinal,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: '#3782F6',
                // Ajusta el ancho de las barras y el espacio entre categorías
                barPercentage: 2,
                categoryPercentage: 0.5
            },
            {
                label: legend,
                data: predictionsPrinter,
                backgroundColor: '#8FBBFF',
                // Ajusta el ancho de las barras y el espacio entre categorías
                barPercentage: 2,
                categoryPercentage: 0.5
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    display: false
                }
            },
            // Configuración para el eje x para que las barras no se superpongan
            scales: {
                x: {
                    stacked: false // Asegúrate de que las barras no se apilen
                },
                y: {
                    stacked: false // Asegúrate de que las barras no se apilen
                }
            }
        }
    });
    
}

/*
*   Función asíncrona para cerrar la sesión del usuario.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const logOut = async () => {
    // Se muestra un mensaje de confirmación y se captura la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Está seguro de cerrar la sesión?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Petición para eliminar la sesión.
        const DATA = await fetchData(USER_API, 'logOut');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            sweetAlert(1, DATA.message, true, 'index.html');
        } else {
            sweetAlert(2, DATA.exception, false);
        }
    }
}

/*
*   Función asíncrona para intercambiar datos con el servidor.
*   Parámetros: filename (nombre del archivo), action (accion a realizar) y form (objeto opcional con los datos que serán enviados al servidor).
*   Retorno: constante tipo objeto con los datos en formato JSON.
*/
const fetchData = async (filename, action, form = null) => {
    // Se define una constante tipo objeto para establecer las opciones de la petición.
    const OPTIONS = {};
    // Se determina el tipo de petición a realizar.
    if (form) {
        OPTIONS.method = 'post';
        OPTIONS.body = form;
    } else {
        OPTIONS.method = 'get';
    }
    try {
        // Se declara una constante tipo objeto con la ruta específica del servidor.
        const PATH = new URL(SERVER_URL + filename);
        // Se agrega un parámetro a la ruta con el valor de la acción solicitada.
        PATH.searchParams.append('action', action);
        // Se define una constante tipo objeto con la respuesta de la petición.
        const RESPONSE = await fetch(PATH.href, OPTIONS);
        // Se retorna el resultado en formato JSON.
        return await RESPONSE.json();
    } catch (error) {
        // Se muestra un mensaje en la consola del navegador web cuando ocurre un problema.
        console.log(error);
    }
}