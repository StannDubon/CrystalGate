/*
 *   Controlador de uso general en las páginas web del sitio privado.
 *   Sirve para manejar la plantilla del encabezado y pie del documento.
 */

// Constante para completar la ruta de la API.
const USER_API = "services/admin/administrador.php";
// Constante para establecer el elemento del contenido principal.
const SIDEBAR = document.getElementById("TEMPLATE");
// Se establece el título de la página web.
document.querySelector("title").textContent = "CrystalGate";

//Añadir el icono
var link = document.createElement('link');
link.rel = 'icon';
link.href = '../resources/img/head-logo.png';
link.type = 'image/png';
document.head.appendChild(link);

/*  Función asíncrona para cargar el encabezado y pie del documento.
 *   Parámetros: ninguno.
 *   Retorno: ninguno.
 */


const loadTemplate = async () => {
  // Petición para obtener en nombre del usuario que ha iniciado sesión.
  const DATA = await fetchData(USER_API, "getUser");
  // Se verifica si el usuario está autenticado, de lo contrario se envía a iniciar sesión.
  if (DATA.session) {
    // Se comprueba si existe un alias definido para el usuario, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
      // Se agrega el encabezado de la página web antes del contenido principal.
      SIDEBAR.innerHTML = `
      <div id="nav-side-bar-button">
      <svg width="152" height="114" viewBox="0 0 152 114" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="var(--color-texto-1)"
              d="M0 9.5C0 4.2533 4.2533 0 9.5 0H142.5C147.747 0 152 4.2533 152 9.5V9.5C152 14.7467 147.747 19 142.5 19H9.5C4.2533 19 0 14.7467 0 9.5V9.5ZM0 57C0 51.7533 4.2533 47.5 9.5 47.5H142.5C147.747 47.5 152 51.7533 152 57V57C152 62.2467 147.747 66.5 142.5 66.5H9.5C4.2533 66.5 0 62.2467 0 57V57ZM0 104.5C0 99.2533 4.2533 95 9.5 95H142.5C147.747 95 152 99.2533 152 104.5V104.5C152 109.747 147.747 114 142.5 114H9.5C4.2533 114 0 109.747 0 104.5V104.5Z" />
      </svg>
  </div>

  <div class="nav-container" id="nav-bar">
      <div class="nav-logo">
          <img src="../resources/img/logo-high-quality.png" alt="">
      </div>
      <div class="nav-content">
          <div id="bridge-dashboard" class="nav-content-element">

              <!-- LOGO -->
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="var(--color-extra-1)"
                      d="M12.8918 0.40909C12.7793 0.28024 12.6423 0.177289 12.4894 0.10684C12.3365 0.0363915 12.1712 0 12.0041 0C11.8369 0 11.6716 0.0363915 11.5187 0.10684C11.3659 0.177289 11.2288 0.28024 11.1164 0.40909L0.320063 12.9045C0.160862 13.0833 0.0553657 13.3067 0.0165789 13.5472C-0.0222079 13.7877 0.00740967 14.0347 0.101781 14.2579C0.196152 14.481 0.351152 14.6706 0.547674 14.8031C0.744197 14.9356 0.973653 15.0054 1.20776 15.0037H3.60694V23.7505C3.60694 24.0819 3.73332 24.3997 3.95829 24.634C4.18326 24.8684 4.48838 25 4.80653 25H19.2016C19.5198 25 19.8249 24.8684 20.0498 24.634C20.2748 24.3997 20.4012 24.0819 20.4012 23.7505V15.0037H22.8004C23.1185 15.0037 23.4236 14.872 23.6486 14.6377C23.8736 14.4034 24 14.0856 24 13.7542C24.0022 13.4402 23.8908 13.1368 23.6881 12.9045L12.8918 0.40909Z"
                      fill="#888888" />
              </svg>


              <b>Dashboard</b>
          </div>

          <div id="bridge-inbox-container" class="drop-down-content">

              <div id="bridge-inbox" class="nav-content-element">
                  <!-- LOGO -->
                  <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill="var(--color-extra-1)"
                          d="M21.6 0H2.4C1.0764 0 0 1.09633 0 2.44444V19.5556C0 20.2039 0.252856 20.8256 0.702944 21.284C1.15303 21.7425 1.76348 22 2.4 22H21.6C22.2365 22 22.847 21.7425 23.2971 21.284C23.7471 20.8256 24 20.2039 24 19.5556V2.44444C24 1.09633 22.9236 0 21.6 0ZM20.4 11H16.6296C16.0944 13.1047 14.2332 14.6667 12 14.6667C9.7668 14.6667 7.9056 13.1047 7.3704 11H2.4V2.44444H21.6V11H20.4Z"
                          fill="#888888" />
                  </svg>

                  <b>Permissions</b>

                  <span class="left-icon"></span>
                  <span class="right-icon"></span>
              </div>

              <div class="contenttt">
                  <div class="another-contenttt-container">
                      <span class="contenttt-line"></span>

                      <div>
                          <a href="inbox.html">Inbox</a>
                          <a href="medical.html">Medical Leave</a>
                          <a href="vacation.html">Vacation Request</a>
                          <a href="permissions.html">Permissions</a>
                      </div>
                  </div>
              </div>
          </div>

          <div id="bridge-employees" class="nav-content-element">

              <!-- LOGO -->
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="var(--color-extra-1)"
                      d="M20 2H8C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4V16C6 16.5304 6.21071 17.0391 6.58579 17.4142C6.96086 17.7893 7.46957 18 8 18H20C20.5304 18 21.0391 17.7893 21.4142 17.4142C21.7893 17.0391 22 16.5304 22 16V4C22 3.46957 21.7893 2.96086 21.4142 2.58579C21.0391 2.21071 20.5304 2 20 2ZM14 4.5C14.663 4.5 15.2989 4.76339 15.7678 5.23223C16.2366 5.70107 16.5 6.33696 16.5 7C16.5 7.66304 16.2366 8.29893 15.7678 8.76777C15.2989 9.23661 14.663 9.5 14 9.5C13.337 9.5 12.7011 9.23661 12.2322 8.76777C11.7634 8.29893 11.5 7.66304 11.5 7C11.5 6.33696 11.7634 5.70107 12.2322 5.23223C12.7011 4.76339 13.337 4.5 14 4.5ZM19 14.75C19 14.8881 18.8881 15 18.75 15H9.25C9.11193 15 9 14.8881 9 14.75V14.75C9 12.901 11.254 11 14 11C16.746 11 19 12.901 19 14.75V14.75Z"
                      fill="black" />
                  <path fill="var(--color-extra-1)"
                      d="M4 9C4 8.44772 3.55228 8 3 8V8C2.44772 8 2 8.44772 2 9V20C2 21.103 2.897 22 4 22H15C15.5523 22 16 21.5523 16 21V21C16 20.4477 15.5523 20 15 20H6C4.89543 20 4 19.1046 4 18V9Z"
                      fill="black" />
              </svg>

              <b>Employees</b>
          </div>

          <div id="bridge-reports" class="nav-content-element">

              <!-- LOGO -->
              <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="var(--color-extra-1)"
                      d="M5.05263 22H1.26316C0.928148 22 0.606858 21.878 0.36997 21.6609C0.133082 21.4437 0 21.1492 0 20.8421V11.5789C0 11.2719 0.133082 10.9773 0.36997 10.7602C0.606858 10.543 0.928148 10.4211 1.26316 10.4211H5.05263C5.38764 10.4211 5.70893 10.543 5.94582 10.7602C6.18271 10.9773 6.31579 11.2719 6.31579 11.5789V20.8421C6.31579 21.1492 6.18271 21.4437 5.94582 21.6609C5.70893 21.878 5.38764 22 5.05263 22ZM13.8947 22H10.1053C9.77025 22 9.44896 21.878 9.21208 21.6609C8.97519 21.4437 8.8421 21.1492 8.8421 20.8421V1.15789C8.8421 0.850802 8.97519 0.556287 9.21208 0.339139C9.44896 0.121992 9.77025 0 10.1053 0H13.8947C14.2297 0 14.551 0.121992 14.7879 0.339139C15.0248 0.556287 15.1579 0.850802 15.1579 1.15789V20.8421C15.1579 21.1492 15.0248 21.4437 14.7879 21.6609C14.551 21.878 14.2297 22 13.8947 22ZM22.7368 22H18.9474C18.6124 22 18.2911 21.878 18.0542 21.6609C17.8173 21.4437 17.6842 21.1492 17.6842 20.8421V8.10526C17.6842 7.79817 17.8173 7.50366 18.0542 7.28651C18.2911 7.06936 18.6124 6.94737 18.9474 6.94737H22.7368C23.0719 6.94737 23.3931 7.06936 23.63 7.28651C23.8669 7.50366 24 7.79817 24 8.10526V20.8421C24 21.1492 23.8669 21.4437 23.63 21.6609C23.3931 21.878 23.0719 22 22.7368 22Z"
                      fill="#737373" />
              </svg>

              <b>Reports</b>
          </div>

          <div id="bridge-history" class="nav-content-element">

              <!-- LOGO -->
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="var(--color-extra-1)"
                      d="M12.0002 0.333344C5.56716 0.333344 0.333496 5.56701 0.333496 12C0.333496 18.433 5.56716 23.6667 12.0002 23.6667C18.4332 23.6667 23.6668 18.433 23.6668 12C23.6668 5.56701 18.4332 0.333344 12.0002 0.333344ZM16.6668 16.6667C16.2113 17.1222 15.4727 17.1222 15.0172 16.6667L11.4193 13.0688C11.0442 12.6937 10.8335 12.185 10.8335 11.6546V6.16668C10.8335 5.52234 11.3558 5.00001 12.0002 5.00001V5.00001C12.6445 5.00001 13.1668 5.52234 13.1668 6.16668V10.6886C13.1668 11.219 13.3775 11.7277 13.7526 12.1028L16.6668 15.017C17.1224 15.4726 17.1224 16.2111 16.6668 16.6667V16.6667Z"
                      fill="black" />
              </svg>


              <b>History</b>
          </div>

          <div id="bridge-admin" class="nav-content-element">

          <!-- LOGO -->
          <svg width="27" height="22" viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27 4.45167C27 2.58951 24.6787 1.73792 23.4745 3.1583L21.2027 5.83781C20.3471 6.84706 18.7648 6.76214 18.022 5.66709L15.1552 1.44034C14.3618 0.270545 12.6382 0.270546 11.8448 1.44034L8.97797 5.66709C8.23525 6.76214 6.65295 6.84706 5.79727 5.83781L3.52552 3.1583C2.32128 1.73793 0 2.58951 0 4.45167V20C0 21.1046 0.895431 22 2 22H25C26.1046 22 27 21.1046 27 20V4.45167Z" fill="#888888"/>
          </svg>          
          
          <b>Admin</b>
      </div>

          <br>
      </div>
      <div class="nav-profile">

          <div id="bridge-log-out" class="nav-profile-element" onclick="logOut()">

              <!-- LOGO -->
              <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="var(--color-texto-1)"
                      d="M0.976086 9.21967C0.475679 9.62 0.475679 10.3811 0.976086 10.7814L3.93052 13.145C4.58529 13.6688 5.55522 13.2026 5.55522 12.3641V12.1116C5.55522 11.5593 6.00293 11.1116 6.55522 11.1116H14.5546C15.1069 11.1116 15.5546 10.6639 15.5546 10.1116V9.8895C15.5546 9.33721 15.1069 8.8895 14.5546 8.8895H6.55522C6.00293 8.8895 5.55522 8.44178 5.55522 7.8895V7.63699C5.55522 6.79848 4.58528 6.33231 3.93052 6.85612L0.976086 9.21967Z"
                      fill="#EBEBEB" />
                  <path fill="var(--color-texto-1)"
                      d="M12.2225 3.81767e-05C10.9088 -0.0036046 9.60731 0.253479 8.3936 0.756396C7.48754 1.13183 6.64381 1.6387 5.88898 2.25919C5.46325 2.60915 5.46714 3.24514 5.85683 3.63483L6.01576 3.79377C6.40629 4.18429 7.03597 4.17823 7.47263 3.84008C8.82722 2.7911 10.4812 2.22212 12.2225 2.22212C14.3002 2.22212 16.2534 3.03208 17.7222 4.50087C19.191 5.96967 20.0009 7.92289 20.0009 10.0005C20.0009 12.0782 19.191 14.0314 17.7222 15.5002C16.2534 16.969 14.3002 17.779 12.2225 17.779C10.4812 17.779 8.82722 17.21 7.47263 16.161C7.03597 15.8228 6.40629 15.8168 6.01576 16.2073L5.85875 16.3643C5.46831 16.7548 5.46528 17.3922 5.89202 17.7427C7.67307 19.2052 9.88622 20.001 12.2225 20.001C14.8946 20.001 17.4056 18.96 19.2932 17.0712C21.182 15.1836 22.223 12.6726 22.223 10.0005C22.223 7.32848 21.182 4.81752 19.2932 2.92986C18.367 1.99807 17.2652 1.25931 16.0515 0.756396C14.8378 0.253479 13.5363 -0.0036046 12.2225 3.81767e-05Z"
                      fill="#EBEBEB" />
              </svg>

              <b>Log Out</b>
          </div>

          <div class="nav-profile-info">
              <img src="../resources/svg/def-user.svg" alt="">
              <div>
                  <p class="nav-nombre">Joselito Perez</p>
                  <p class="nav-rol">ADMINISTRATOR</p>
              </div>
          </div>
      </div>
  </div>`;
        loadNavBarJs();
    } else {
      sweetAlert(3, DATA.error, false, "index.html");
    }
  } else {
    // Se comprueba si la página web es la principal, de lo contrario se direcciona a iniciar sesión.
    if (!location.pathname.endsWith("index.html")) {
        location.href = "index.html";
    }
  }
};

const loadNavBarJs = () => {

    const container = document.querySelector('#bridge-inbox-container');
    const content = document.querySelector('.contenttt');
    const contentContainer = document.querySelector('.another-contenttt-container');

    container.addEventListener('click', function () {
        if (container.classList.contains('active')) {
            container.classList.remove('active');
            content.style.maxHeight = '0';
        } else {
            container.classList.add('active');
            content.style.maxHeight = (content.scrollHeight + 20) + 'px';
        }
    });

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
    const rutas = ['/dashboard', '/medical', '/vacation', '/permissions', '/employees', '/reports', '/history', '/admin'];
    const ids = ['dashboard', 'medical-leave', 'vacation-request', 'permissions', 'employees', 'reports', 'history', 'admin'];
    
    // Agregar event listener a cada div
    ids.forEach((id, index) => {
        const div = document.getElementById("bridge-"+id);
        if (div) {
            div.addEventListener('click', () => {
                window.location.href = "/CrystalGate/views"+rutas[index]+".html";
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
}