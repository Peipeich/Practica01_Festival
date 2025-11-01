console.log("Online!")

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
