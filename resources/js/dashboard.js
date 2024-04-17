window.addEventListener('resize', function() {
    if (window.innerWidth < 1500) {
        document.getElementById('sort-graph-month').innerText="M"
        document.getElementById('sort-graph-week').innerText="W"
    } else{
        document.getElementById('sort-graph-month').innerText="Month"
        document.getElementById('sort-graph-week').innerText="Week"
    }
});