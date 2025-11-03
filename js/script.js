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


/* CARRUSEL */
const slides = document.querySelectorAll(".carrusel > div");
const dots = document.querySelectorAll(".dot"); // puedes no tener dots, se controla
let currentSlide = 0;

function showSlide(index) {
  if (!slides.length) return;
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle("active", i === currentSlide));
  if (dots.length) dots.forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
}

if (slides.length) {
  showSlide(0);
  setInterval(() => showSlide(currentSlide + 1), 5000);
} else {
  console.debug("No hay slides en la página actual.");
}

/*  COUNTDOWN  */
const countdownEl = document.getElementById("demo");
if (countdownEl) {
  const countDownDate = new Date("Apr 25, 2026 00:00:00").getTime();
  const x = setInterval(function () {
    const now = Date.now();
    const distance = countDownDate - now;

    if (distance < 0) {
      clearInterval(x);
      countdownEl.textContent = "EXPIRED";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
} else {
  console.debug("#demo no existe en esta página (countdown no inicializado).");
}

/*  MODAL VENTANA (tickets)  */
const openModalBtn = document.querySelector("#openModal");
const modalWindow = document.querySelector("#modalWindow");
const closeModalBtn = document.querySelector(".close");
const acceptModalBtn = document.querySelector("#closeModal");

// abrir (si el botón existe)
if (openModalBtn && typeof openModalBtn.addEventListener === "function") {
  openModalBtn.addEventListener("click", () => {
    modalWindow?.classList?.add("show-modal");
  });
} else {
  // no hay botón con id openModal en algunas páginas — no es fatal
  console.debug("#openModal no encontrado en esta página.");
}

// cerrar
if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => modalWindow?.classList?.remove("show-modal"));
}
if (acceptModalBtn) {
  acceptModalBtn.addEventListener("click", () => modalWindow?.classList?.remove("show-modal"));
}

// cerrar al click fuera
window.addEventListener("click", (event) => {
  if (!modalWindow) return;
  if (event.target === modalWindow) modalWindow.classList.remove("show-modal");
});

/*  CÁLCULO TOTAL (modal food menu)  */
const foodMenuForm = document.querySelector("#buyTicket form");
const inputs = document.querySelectorAll('#buyTicket input[type="number"]');
const totalPriceElement = document.getElementById("totalPrice");
const buyButton = document.getElementById("buyFood");

function updateTotalSafe() {
  if (!totalPriceElement) return;
  let total = 0;
  inputs.forEach((input) => {
    const price = parseFloat(input.dataset.price) || 0;
    const qty = parseInt(input.value, 10) || 0;
    total += price * qty;
  });

  // Mostrar formato con 2 decimales y símbolo
  totalPriceElement.textContent = total > 0 ? `¥${total.toFixed(0)}` : "¥0";

  if (buyButton) {
    if (total > 0) buyButton.classList.remove("disabled");
    else buyButton.classList.add("disabled");
  }
}

if (inputs.length && totalPriceElement) {
  inputs.forEach((input) => input.addEventListener("input", updateTotalSafe));
  // inicial
  updateTotalSafe();
} else {
  console.debug("Inputs o totalPriceElement no encontrados para el cálculo del total.");
}

// prevenir submit (si existe el form)
if (foodMenuForm) {
  foodMenuForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(`ありがとうございます！ Thank you! total: ${totalPriceElement?.textContent ?? "0.00 €"}`);
  });
}

