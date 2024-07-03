// Seleccionar elementos del DOM
const daysTag = document.querySelector(".days"), // Contenedor de días
    currentDate = document.querySelector(".current-date"), // Elemento para mostrar la fecha actual
    prevNextIcon = document.querySelectorAll(".icons span"); // Iconos de navegación previa y siguiente

let date = new Date(); // Fecha actual por defecto

// Array de nombres de meses
const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
                "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// Variables para almacenar fechas de inicio y fin
let startDate = null;
let endDate = null;

// Función para establecer las variables de año y mes
const setVariables = (start) => {
    currYear = start.getFullYear(),
    currMonth = start.getMonth();
} 

// Función para renderizar el calendario
const renderCalendar = (start, end) => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // Día de la semana del primer día del mes
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // Último día del mes
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // Día de la semana del último día del mes
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // Último día del mes anterior

    let liTag = ""; // Variable para almacenar las etiquetas <li> del calendario

    // Normalizar las fechas de inicio y fin para eliminar la parte de tiempo
    if (start) start.setHours(0, 0, 0, 0);
    if (end) end.setHours(0, 0, 0, 0);

    // Generar días del mes anterior
    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    // Generar días del mes actual de la fecha de inicio
    for (let i = 1; i <= lastDateofMonth; i++) {
        let isInRange = "";
        if (start && end) {
            const currentDate = new Date(currYear, currMonth, i);
            currentDate.setHours(0, 0, 0, 0);
            isInRange = currentDate >= start && currentDate <= end ? "range" : "";
        }
        liTag += `<li class="${isInRange}">${i}</li>`;
    }

    // Generar días del siguiente mes
    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    // Actualizar el texto de la fecha actual mostrada
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    // Insertar los elementos <li> generados en el contenedor de días
    daysTag.innerHTML = liTag;
};

// Event listeners para los iconos de navegación previa y siguiente
prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        // Actualizar el mes actual según el icono clickeado
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        // Validar el rango de meses (0-11)
        if(currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }

        // Volver a renderizar el calendario con las fechas de inicio y fin
        renderCalendar(startDate, endDate);
    });
});

// Llamar a renderCalendar inicialmente sin fechas para renderizar el mes actual
renderCalendar(startDate, endDate);
