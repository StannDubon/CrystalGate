const reportFilter = document.querySelector(".report-filter"),
    // btnFilter = reportFilter.querySelector(".filter-btn"),
    optionFilter = reportFilter.querySelectorAll(".option"),
    textFilter = reportFilter.querySelector(".filter-text");

// btnFilter.addEventListener("click", () => reportFilter.classList.toggle("active"));

// optionFilter.forEach(option => {
//     option.addEventListener("click", () => {
//         let selectedOption = option.querySelector(".option-text").innerText;
//         textFilter.innerText = selectedOption;
//         console.log(selectedOption)

//         document.querySelectorAll('.customize-type').forEach(customizeType => {
//             customizeType.classList.remove('selected');
//         });

//         document.querySelector('.customize-filter-bottom').classList.remove('selected');
            	
//         // Añadir la clase "selected" solo al elemento seleccionado
//         if (selectedOption === "Permissions") {
//             document.querySelector('.customize-type').classList.add('selected');
//         } else if (selectedOption === "Employees") {
//             document.querySelector('.customize-type-em').classList.add('selected');
//             document.querySelector('.customize-filter-bottom').classList.add('selected');
//         }

//         reportFilter.classList.remove("active");
//     })
// })

const cust = document.querySelector(".customize"),
    custFilter = cust.querySelector(".customize-filter"),
    custtype = cust.querySelector(".customize-type");

custFilter.addEventListener("click", () => cust.classList.toggle("active"));

// custtype.forEach(option => {
//     option.addEventListener("click", () => {
//         cust.classList.remove("active")
//     })
// })


/* <---------------------------------- PARAM ----------------------------------> */
const readPermissionsPerDateGraph = async () => {

    const FORM = new FormData();
    FORM.append("idCargo", id);
    DATA = await fetchData(CHARGES_API, 'readUsersPerChargesGraphos', FORM);
    let data = [];
    let quantity = [];
    DATA.dataset.forEach(row => {
        data.push(row.nombre);
        quantity.push(row.cantidad);
    });
    if(DATA){

        if(!quantity.every(item => item === 0)){
            document.getElementById("grapho-modal").classList.remove("inactive")
            graphoModal("Permissions per User: "+name);
            pieGraph('chart', data, quantity);
        } else{
            document.getElementById("grapho-modal").classList.add("inactive")
            graphoModal("There are no registered permissions"); 
        }
    }
};