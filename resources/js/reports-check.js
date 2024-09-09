const types = document.querySelectorAll('.type');

types.forEach(type => {
    type.addEventListener("click", function () {
        this.classList.toggle("selected");
    });
});

const btnPending = document.querySelectorAll('.pending-btn');

btnPending.forEach(btnPending => {
    btnPending.addEventListener("click", function () {
        btnPending.classList.toggle("selected");
        if(btnPending.classList.contains("selected")) {
            selectedTypes.push(1);

            console.log("se selecciono el pendiente, array: " + selectedTypes);
        }else{
            selectedTypes = selectedTypes.filter(item => item!= 1);
            console.log("se deselecciono el pendiente, array: " + selectedTypes);
        }
    })
})

const btnAccepted = document.querySelectorAll('.accepted-btn');

btnAccepted.forEach(btnAccepted => {
    btnAccepted.addEventListener("click", function () {
        btnAccepted.classList.toggle("selected");
        if(btnAccepted.classList.contains("selected")) {
            selectedTypes.push(2);
        }else{
            selectedTypes = selectedTypes.filter(item => item!= 2);
        }
    })
})

const btnRejected = document.querySelectorAll('.rejected-btn');

btnRejected.forEach(btnRejected => {
    btnRejected.addEventListener("click", function () {
        btnRejected.classList.toggle("selected");
        if(btnRejected.classList.contains("selected")) {
            selectedTypes.push(3);
        }else{
            selectedTypes = selectedTypes.filter(item => item!= 3);
        }
    })
})