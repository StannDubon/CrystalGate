//Constantes para establecer los elementos del dashboard
let FECHA = document.getElementById('dashboard-date'),
    TIEMPO = document.getElementById('dashboard-clock'),
    NOMBRE_EMPLEADO = document.getElementById('employee-name');

document.addEventListener('DOMContentLoaded', async () => {
    
    FECHA.textContent = getTodayDate();
    TIEMPO.textContent = getCurrentTime();
    const DATA = await fetchData(USER_API, 'readProfile');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    DATA.status
    // Se inicializan los campos del formulario con los datos del usuario que ha iniciado sesión.
    const ROW = DATA.dataset;
    NOMBRE_EMPLEADO.textContent= 'Hello '+ ROW.nombre + ' '+ ROW.apellido + '!';
}
);

// Metodo para obtener el dia actual
const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
};
// Método para obtener la hora actual
const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};
