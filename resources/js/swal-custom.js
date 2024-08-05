// Función para cargar el selector de formatos
const loadFormatSelectorJs = () => {
    // Objeto con selectores de formato
    const formatSelectors = {
        1: { element: document.getElementById("swal-custom-days"), value: 1 },
        2: { element: document.getElementById("swal-custom-hours"), value: 2 },
        3: { element: document.getElementById("swal-custom-days-hours"), value: 3 }
    };

    // Función para seleccionar un formato específico
    function selectFormat(format) {
        CHOOSED_FORMAT = formatSelectors[format].value; // Asignar el valor del formato elegido
        // Iterar sobre los selectores de formato
        for (let key in formatSelectors) {
            const selector = formatSelectors[key];
            if (selector.value === format) {
                selector.element.classList.add("swal-custom-format-selected-option"); // Marcar como seleccionado
                document.getElementById("lapsoPermiso").value = CHOOSED_FORMAT; // Asignar valor a un campo específico
            } else {
                selector.element.classList.remove("swal-custom-format-selected-option"); // Desmarcar otros formatos
            }
        }
    }

    // Event listener para cada selector de formato
    for (let key in formatSelectors) {
        formatSelectors[key].element.addEventListener("click", function () {
            selectFormat(formatSelectors[key].value); // Llamar a la función selectFormat con el valor del formato
        });
    }
}

// Función para establecer el selector de formato desde la API
const setFormatSelectorFromApi = (value) => {
    // Función para restablecer todos los formatos a su estado inicial
    function reset() {
        document.getElementById("swal-custom-days").classList.remove("swal-custom-format-selected-option");
        document.getElementById("swal-custom-hours").classList.remove("swal-custom-format-selected-option");
        document.getElementById("swal-custom-days-hours").classList.remove("swal-custom-format-selected-option");
    }

    // Según el valor recibido, seleccionar el formato correspondiente y restablecer los demás
    if (value == 1) {
        reset();
        document.getElementById("swal-custom-days").classList.add("swal-custom-format-selected-option");
    } else if (value == 2) {
        reset();
        document.getElementById("swal-custom-hours").classList.add("swal-custom-format-selected-option");
    } else if (value == 3) {
        reset();
        document.getElementById("swal-custom-days-hours").classList.add("swal-custom-format-selected-option");
    }
};

// Función para cargar el selector de estado
const loadStatusSelectorJs = (id_status_chooser, id_input) => {
    const statusChooser = document.getElementById(id_status_chooser); // Selector de estado
    const loadStatusSelectorValueComponent = document.getElementById(id_input); // Componente para cargar el valor del estado

    // Establecer el estado inicial desde la API
    setStatusSelectorFromApi(id_status_chooser, id_input);

    // Alternar estado al hacer clic
    statusChooser.addEventListener('click', () => {
        const isActive = statusChooser.classList.contains('active');
        loadStatusSelectorValueComponent.value = isActive ? '0' : '1'; // Alternar valor del estado
        statusChooser.classList.toggle('active', !isActive); // Alternar clases de activo e inactivo
        statusChooser.classList.toggle('inactive', isActive);
    });
};

// Función para establecer el selector de estado desde la API
const setStatusSelectorFromApi = (id_status_chooser, id_input) => {
    const statusChooser = document.getElementById(id_status_chooser); // Selector de estado
    const loadStatusSelectorValueComponent = document.getElementById(id_input); // Componente para cargar el valor del estado

    const isActive = loadStatusSelectorValueComponent.value === '1'; // Verificar si el estado está activo
    statusChooser.classList.toggle('active', isActive); // Alternar clase activo
    statusChooser.classList.toggle('inactive', !isActive); // Alternar clase inactivo
};

// Función para configurar los botones de descarte en un modal
function setupModalDiscardButtons() {
    // Obtener todos los botones de descarte en el modal
    const discardButtons = document.querySelectorAll(".custom-modal-button-discard");

    // Iterar sobre cada botón de descarte
    discardButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Encontrar el contenedor del modal y el formulario asociado
            const modal = button.closest(".custom-modal-container");
            const form = modal.querySelector(".modal-form");

            if (form) {
                form.reset(); // Vaciar el formulario
            }

            if (modal) {
                // Eliminar la clase "show" del contenedor principal y restaurar el desplazamiento del cuerpo
                document.body.classList.remove('body-no-scroll');
                modal.classList.remove("show");
            }
        });
    });
}

// Función para actualizar el color de los selectores
function updateSelectColor() {
    // Iterar sobre todos los elementos select con la clase .swal-custom-select
    document.querySelectorAll('.swal-custom-select').forEach(selectElement => {
        if (selectElement.value === "") {
            selectElement.classList.add('unselectable'); // Agregar clase si no hay selección
        } else {
            selectElement.classList.remove('unselectable'); // Quitar clase si hay selección
        }
        selectElement.addEventListener('change', updateSelectColor); // Escuchar cambios en la selección
    });
}
