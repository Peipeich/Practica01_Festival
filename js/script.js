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

// SONIDO ARTIST LINE-UP 
// SONIDO ARTIST LINE-UP 
const muteBtn = document.querySelector(".volume > i");
const volumeActive = document.querySelector(".background-video video");

if (muteBtn && volumeActive) {
  muteBtn.addEventListener("click", function(){
    muteBtn.classList.toggle("fa-volume-xmark");
    muteBtn.classList.toggle("fa-volume-low");
    
    // Si estaba silenciado → subir volumen con fade-in hasta 0.6
    if (volumeActive.muted) {
      volumeActive.muted = false;
      let volume = 0;
      volumeActive.volume = volume;
      const fadeIn = setInterval(() => {
        if (volume < 0.3) {
          volume += 0.05;
          volumeActive.volume = volume;
        } else {
          clearInterval(fadeIn);
        }
      }, 50);
    } 
    // Si tiene sonido → aplicar fade-out y luego mutear
    else {
      let volume = volumeActive.volume;
      const fadeOut = setInterval(() => {
        if (volume > 0) {
          volume -= 0.05;
          volumeActive.volume = Math.max(volume, 0);
        } else {
          clearInterval(fadeOut);
          volumeActive.muted = true;
        }
      }, 50);
    }
  });
} else {
  console.debug("muteBtn o video no encontrados (bloque de sonido no inicializado).");
}

  

// Lógica abrir de la ventana modal
// Selecciona todos los elementos con clase .openModal
const btnsOpenModal = document.querySelectorAll(".openModal");

// Añade el evento a cada uno
btnsOpenModal.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault(); // Evita que salte el enlace #
    openModalWindow();
  });
});


// Lógica cerrar de la ventana modal

let btncloseModal = document.querySelector(".close")

btncloseModal.addEventListener("click", closeModalWindow);

//Función propia para abrir ventana modal
function openModalWindow(){
    let modalWindow = document.querySelector("#modalWindow");

    modalWindow.classList.add("show-modal");
    
};

//Función propia para cerrar ventana modal
function closeModalWindow(){

    let modalWindow = document.querySelector("#modalWindow");

    modalWindow.classList.remove("show-modal");
    
};

// Cerrar ventana modal cuando se detecta click fuera
window.addEventListener("click", function(event){

    // llama solo a la función de cerrar modal siempre que el click no sea en la propia ventana modal 
    let modal = document.querySelector("#modalWindow")

    if (event.target == modal){
        closeModalWindow();
    }

})

/*  CÁLCULO TOTAL   */
const ticketMenuForm = document.querySelector("#buyTicket form");
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
if (ticketMenuForm) {
  ticketMenuForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(`ありがとうございます！ Thank you! total: ${totalPriceElement?.textContent ?? "0.00 €"}`);
  });
}

// FORMULARIO DE CONTACTO

(function(){
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = document.getElementById('submitBtn');

  function validateEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // 💬 Mostrar mensaje tipo Google toast
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.left = '50%';
    toast.style.bottom = '20px';
    toast.style.transform = 'translateX(-50%)';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '6px';
    toast.style.color = '#fff';
    toast.style.fontFamily = 'Roboto, sans-serif';
    toast.style.fontSize = '0.95rem';
    toast.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    toast.style.zIndex = '9999';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease, bottom 0.3s ease';
    toast.style.backgroundColor = type === 'error' ? '#d32f2f' : '#388e3c';

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.bottom = '40px';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.bottom = '20px';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

form.addEventListener('submit', function(e){
  e.preventDefault();

  const firstName = form.querySelector('#name').value.trim();
  const email = form.querySelector('#e-mail').value.trim();
  const message = form.querySelector('#comment').value.trim();

  // 🚫 validación de campos vacíos
  if (!firstName || !email || !message) {
    showToast('⚠️ Please fill in all required fields.', 'error');
    return;
  }

  // 📧 validación de email
  if (!validateEmail(email)) {
    showToast('Please enter a valid email address.', 'error');
    form.querySelector('#e-mail').focus();
    return;
  }

  // ✉️ simular envío
  submitBtn.disabled = true;
  showToast('Sending...', 'success');

  setTimeout(() => {
    submitBtn.disabled = false;
    showToast('✅ Message sent — thank you!', 'success');
    form.reset();
  }, 1000);
});

})();


