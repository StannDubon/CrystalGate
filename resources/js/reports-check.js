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
    })
})

const btnAccepted = document.querySelectorAll('.accepted-btn');

btnAccepted.forEach(btnAccepted => {
    btnAccepted.addEventListener("click", function () {
        btnAccepted.classList.toggle("selected");
    })
})

const btnRejected = document.querySelectorAll('.rejected-btn');

btnRejected.forEach(btnRejected => {
    btnRejected.addEventListener("click", function () {
        btnRejected.classList.toggle("selected");
    })
})