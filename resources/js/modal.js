const MODAL = document.getElementById('modal');
const btnOpenModal = document.querySelector('#btnOpenModal');

openModal = () => {
    MODAL.classList.add('show');
    
}

closeModal = () => {
    MODAL.classList.remove('show');
}