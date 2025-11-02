console.log("Online!")

// LÓGICA DEL MENU 

// SELECCIÓN DE ELEMENTOS DEL HTML 
let burger = document.querySelector(".menu-bars> i");
let menu_open = document.querySelector("nav .nav-bot900");

// Definimos evento click sobre el boton del menú
burger.addEventListener("click", function(){
    burger.classList.toggle("fa-bars");
    burger.classList.toggle("fa-times");
    menu_open.classList.toggle("active");
});




// ABRIR SUBMENUS

// === SUBMENÚS MÓVILES (versión acordeón) ===
const chevrons = document.querySelectorAll(".nav-bot900 .fa-chevron-down");

chevrons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const li = icon.closest(".desple-top");
    const submenu = li.querySelector(".desple-bot");

    //  Cierra todos los submenús antes de abrir uno nuevo
    document.querySelectorAll(".nav-bot900 .desple-bot.open").forEach((openMenu) => {
      if (openMenu !== submenu) {
        openMenu.classList.remove("open");
        const openIcon = openMenu.closest(".desple-top").querySelector(".fa-chevron-up");
        if (openIcon) {
          openIcon.classList.remove("fa-chevron-up");
          openIcon.classList.add("fa-chevron-down");
        }
      }
    });

    //  Alterna el menú actual
    submenu.classList.toggle("open");

    // Cambia el ícono del desplegable
    icon.classList.toggle("fa-chevron-down");
    icon.classList.toggle("fa-chevron-up");
  });
});








// Carrusel (no mio)

let currentSlide = 0;
const slides = document.querySelectorAll(".carrusel > div:not(.carousel-dots)");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
  currentSlide = index;
}

function nextSlide() {
  let nextIndex = (currentSlide + 1) % slides.length;
  showSlide(nextIndex);
}

function goToSlide(index) {
  showSlide(index);
}

showSlide(currentSlide);
setInterval(nextSlide, 3000); // cambia cada 5 segundos

// Carrusel movil


function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
  currentSlide = index;
}

function nextSlide() {
  let nextIndex = (currentSlide + 1) % slides.length;
  showSlide(nextIndex);
}

function prevSlide() {
  let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(prevIndex);
}

function goToSlide(index) {
  showSlide(index);
}

// Inicializa el carrusel
showSlide(currentSlide);
let autoSlide = setInterval(nextSlide, 5000);

// --- NUEVO: Soporte táctil ---
let startX = 0;
let endX = 0;
const carrusel = document.querySelector(".carrusel");

carrusel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  clearInterval(autoSlide); // pausa el auto-slide mientras se desliza
});

carrusel.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
});

carrusel.addEventListener("touchend", () => {
  let diff = startX - endX;
  if (Math.abs(diff) > 50) { // para evitar toques accidentales
    if (diff > 0) {
      nextSlide(); // swipe hacia la izquierda → siguiente
    } else {
      prevSlide(); // swipe hacia la derecha → anterior
    }
  }
  autoSlide = setInterval(nextSlide, 5000); // reanuda el auto-slide
});

// Menu (mio)
