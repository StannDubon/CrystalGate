const graphoModal = async (title) => {

    document.body.style.overflow = 'hidden';
    document.getElementById("grapho-modal-container").style.display = "flex"
    document.getElementById("grapho-modal-container").style.marginTop = window.scrollY+"px"
    document.getElementById("grapho-modal-title").textContent = title;

    document.getElementById("grapho-modal-close-button").addEventListener('click', function() {
        document.getElementById("grapho-modal-container").style.display = 'none';
        if(instance_chart){
            instance_chart.destroy();
        }
        document.body.style.overflow = 'auto';
    });
}

