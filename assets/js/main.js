/* -------- NAVIGATION BAR FUNCTION --------- */
    function myMenuFunction(){
        var menuBtn = document.getElementById("myNavMenu");

        if(menuBtn.className === "nav-menu") {
            menuBtn.className += " responsive";
        }   else {
            menuBtn.className = "nav-menu";
        }
    }
    
/* -------- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING --------- */

    window.onscroll = function() {headerShadow()};

    function headerShadow() {
        const navHeader = document.getElementById("header");

        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1";
            navHeader.style.height = "70px";
            navHeader.style.lineHeight = "70px";
        } else {
            navHeader.style.boxShadow = "none";
            navHeader.style.height = "90px";
            navHeader.style.lineHeight = "90px";
        }
    }

/* -------- TYPING EFFECT --------- */

    var typingEffect = new Typed(".typedText", {
        strings: ["Designer","Developer"],
        
        loop : true,
        typeSpeed : 100,
        backSpeed : 80,
        backDelay : 2000
    });

/* -------- SCROLL REVEAL ANIMATION --------- */

    const sr = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 2000,
        reset: true
    })
    /* -------- HOME --------- */
    sr.reveal('.featured-text-card',{})
    sr.reveal('.featured-name',{delay: 100})
    sr.reveal('.featured-text-info',{delay: 200})
    sr.reveal('.featured-text-btn',{delay: 200})
    sr.reveal('.social_icons',{delay: 200})
    sr.reveal('.featured-image',{delay: 300})
    /* -------- PROJECT BOX --------- */

    sr.reveal('.project-box',{interval: 200})
    /* -------- HEADINGS --------- */

    sr.reveal('.top-header',{})

/* -------- SCROLL REVEAL LEFT_RIGHT ANIMATION --------- */

     /* -------- ABOUT INFO & CONTACT INFO--------- */

    const srLeft = ScrollReveal({
        origin: 'left',
        distance: '80px',
        duration: 2000,
        reset: true
    })

    srLeft.reveal('.about-info', {delay: 100})
    srLeft.reveal('.contact-info', {delay: 100})

    /* -------- ABOUT SKILLS & FORM BOX --------- */

    const srRight = ScrollReveal({
        origin: 'right',
        distance: '80px',
        duration: 2000,
        reset: true
    })

    srRight.reveal('.skills-box',{delay:100})
    srRight.reveal('.form-control',{delay:100})

/* -------- CHANGE ACTIVE LINK --------- */


const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);


/* -------------CHIGUIRE MODAL  ------------- */
// Obtener elementos
var modal = document.getElementById("modal");
var chiguireLinkMain = document.getElementById("chiguireLinkMain");
var chiguireLinkFooter = document.getElementById("chiguireLinkFooter");
var span = document.getElementsByClassName("close")[0];

// Función para abrir el modal
function openModal() {
    modal.style.display = "flex";
    setTimeout(() => {
        modal.style.opacity = "1";
        document.querySelector(".modal-content").style.transform = "scale(1)";
    }, 10); // Un pequeño retraso para asegurar la transición
}

// Función para cerrar el modal
function closeModal() {
    modal.style.opacity = "0";
    document.querySelector(".modal-content").style.transform = "scale(0.7)";
    setTimeout(() => {
        modal.style.display = "none";
    }, 300); // Tiempo igual a la duración de la transición
}

// Asignar evento a los enlaces
function setupLinks() {
    [chiguireLinkMain, chiguireLinkFooter].forEach(link => {
        link.onclick = function(event) {
            event.preventDefault(); // Prevenir el comportamiento predeterminado
            openModal();
        }
    });
}

// Inicializar los eventos
setupLinks();

// Cuando el usuario hace clic en <span> (x), cierra el modal
span.onclick = function() {
    closeModal();
}

// Cuando el usuario hace clic en cualquier lugar fuera del modal, cierra el modal
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}


 /* ------------- FORM BOX ------------ */

 document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

    const formData = new FormData(this);

    fetch(this.action, {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert("Mensaje enviado exitosamente");
            this.reset(); // Reiniciar el formulario
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert("Error al enviar el mensaje");
                }
            })
        }
    })
});

/* ----------- TRANSLADABLE BUTTON FUNCTION && TYPING EFFECT --------- */

document.addEventListener("DOMContentLoaded", () => {
    const langToggleBtn = document.getElementById("lang-toggle");
    const langIcon = document.getElementById('lang-icon');
    let currentLang = 'en';

    const loadTranslations = (lang) => {
        fetch(`documents/${lang}.json`)
            .then(response => response.json())
            .then(translations => {
                document.querySelectorAll('.translatable').forEach(element => {
                    const key = element.dataset.key;
                    if (translations[key]) {
                        const icon = element.querySelector('i') ? element.querySelector('i').outerHTML : '';
                        if (element.tagName === 'BUTTON') {
                            element.innerHTML = translations[key] + ' ' + icon;
                        } else {
                            element.innerHTML = icon + ' ' + translations[key];
                        }
                    }
                });

                langToggleBtn.classList.toggle('english', lang === 'en');
                langToggleBtn.classList.toggle('spanish', lang === 'es');

                langIcon.style.opacity = 0; // Inicia transición de opacidad
                setTimeout(() => {
                    langIcon.src = lang === 'en' ? 'assets/images/united-states.png' : 'assets/images/flag.png';
                    langIcon.style.opacity = 1; // Finaliza transición de opacidad
                }, 300); // Tiempo de transición para sincronizar con la carga de traducciones

                // Re-inicializar el efecto de Typed.js después de la traducción
                const typedTextElement = document.querySelector('.typedText');
                if (typedTextElement) {
                    typedTextElement.innerHTML = '';  // Limpiar el contenido previo
                    new Typed(".typedText", {
                        strings: currentLang === 'en' ? ["Designer", "Developer"] : ["Diseñador", "Desarrollador"],
                        loop: true,
                        typeSpeed: 100,
                        backSpeed: 80,
                        backDelay: 2000
                    });
                }
            });
    };

    const updateTextContent = (lang) => {
        document.querySelectorAll('.translatable').forEach(element => {
            element.style.opacity = 0;
        });
        langIcon.style.opacity = 0;

        setTimeout(() => {
            loadTranslations(lang);
            document.querySelectorAll('.translatable').forEach(element => {
                element.style.opacity = 1;
            });
            langIcon.style.opacity = 1;
        }, 300);
    };

    langToggleBtn.addEventListener("click", () => {
        currentLang = currentLang === 'en' ? 'es' : 'en';
        updateTextContent(currentLang);
    });

    updateTextContent(currentLang);
});
