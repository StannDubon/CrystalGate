const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validate that variables exist
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-nav-bar')
            document.querySelector('main').classList.toggle("blured")
        })
    }
}

showMenu('nav-side-bar-button','nav-bar')

window.addEventListener('resize', function() {
    if (window.innerWidth > 600) {
        document.querySelector('main').classList.remove("blured");
        document.getElementById('nav-bar').classList.remove("show-nav-bar");
    }
    if (window.innerWidth < 1500) {
        document.getElementById('sort-graph-month').innerText="M"
        document.getElementById('sort-graph-week').innerText="W"
    } else{
        document.getElementById('sort-graph-month').innerText="Month"
        document.getElementById('sort-graph-week').innerText="Week"
    }
});