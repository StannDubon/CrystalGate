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
});


// Definir las rutas y los IDs
const rutas = ['/dashboard', '/inbox', '/permissions', '/employees', '/reports', '/history', '/index'];
const ids = ['dashboard', 'inbox', 'permissions', 'employees', 'reports', 'history', 'log-out'];

// Agregar event listener a cada div
ids.forEach((id, index) => {
    const div = document.getElementById("bridge-"+id);
    if (div) {
        div.addEventListener('click', () => {
            window.location.href = "/views"+rutas[index]+".html";
        });
    }
});

// Colorear el lugar en el que esta actualmente

const CurrentLocation = document.body.id;

if (CurrentLocation.startsWith("local-")) {
    const currentPageId = CurrentLocation.replace("local-", "");
    const currentPageIndex = ids.indexOf(currentPageId);
    if (currentPageIndex !== -1) {
        const currentPageDiv = document.getElementById("bridge-" + currentPageId);
        if (currentPageDiv) {
            currentPageDiv.classList.add("nav-item-selected");
        }
    }
}