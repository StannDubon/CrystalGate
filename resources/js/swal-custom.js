const loadFormatSelectorJs = () => {
    const formatSelectors = {
        1: { element: document.getElementById("swal-custom-days"), value: 1 },
        2: { element: document.getElementById("swal-custom-hours"), value: 2 },
        3: { element: document.getElementById("swal-custom-days-hours"), value: 3 }
    };

    function selectFormat(format) {
        CHOOSED_FORMAT = formatSelectors[format].value;
        for (let key in formatSelectors) {
            const selector = formatSelectors[key];
            if (selector.value === format) {
                selector.element.classList.add("swal-custom-format-selected-option");
                document.getElementById("lapsoPermiso").value=CHOOSED_FORMAT;
            } else {
                selector.element.classList.remove("swal-custom-format-selected-option");
            }
        }
    }

    for (let key in formatSelectors) {
        formatSelectors[key].element.addEventListener("click", function () {
            selectFormat(formatSelectors[key].value);
        });
    }
}

const setFormatSelectorFromApi = (value) => {
    function reset(){
        document.getElementById("swal-custom-days").classList.remove("swal-custom-format-selected-option")
        document.getElementById("swal-custom-hours").classList.remove("swal-custom-format-selected-option")
        document.getElementById("swal-custom-days-hours").classList.remove("swal-custom-format-selected-option")
    }

    if(value==1){
        reset();
        document.getElementById("swal-custom-days").classList.add("swal-custom-format-selected-option")
    } else if(value==2){
        reset();
        document.getElementById("swal-custom-hours").classList.add("swal-custom-format-selected-option")
    } else if(value==3){
        reset();
        document.getElementById("swal-custom-days-hours").classList.add("swal-custom-format-selected-option")
    }
};

// STATUS SELECTOR
const loadStatusSelectorJs = (id_status_chooser, id_input) => {
    const statusChooser = document.getElementById(id_status_chooser);
    const loadStatusSelectorValueComponent = document.getElementById(id_input);

    // Set initial status from API
    setStatusSelectorFromApi(id_status_chooser, id_input);

    // Toggle status on click
    statusChooser.addEventListener('click', () => {
        const isActive = statusChooser.classList.contains('active');
        loadStatusSelectorValueComponent.value = isActive ? '0' : '1';
        statusChooser.classList.toggle('active', !isActive);
        statusChooser.classList.toggle('inactive', isActive);
    });
};

const setStatusSelectorFromApi = (id_status_chooser, id_input) => {
    const statusChooser = document.getElementById(id_status_chooser);
    const loadStatusSelectorValueComponent = document.getElementById(id_input);

    const isActive = loadStatusSelectorValueComponent.value === '1';
    statusChooser.classList.toggle('active', isActive);
    statusChooser.classList.toggle('inactive', !isActive);
};



function setupModalDiscardButtons() {
    // Obtener todos los botones de descarte
    const discardButtons = document.querySelectorAll(".custom-modal-button-discard");

    discardButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Encontrar el contenedor del modal y el formulario asociados al botón de descarte
            const modal = button.closest(".custom-modal-container");
            const form = modal.querySelector(".modal-form");

            if (form) {
                // Vaciar el formulario
                form.reset();
            }

            if (modal) {
                // Eliminar la clase "show" del contenedor principal
                modal.classList.remove("show");
            }
        });
    });
}

function updateSelectColor() {
    document.querySelectorAll('.swal-custom-select').forEach(selectElement => {
        if (selectElement.value === "") {
            selectElement.classList.add('unselectable');
        } else {
            selectElement.classList.remove('unselectable');
        }
        selectElement.addEventListener('change', updateSelectColor);
    });
    
}