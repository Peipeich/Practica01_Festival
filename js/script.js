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



// COUNTDOWN
// Set the date we're counting down to
var countDownDate = new Date("Apr 25, 2026 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);



// TICKETS VENTANA MODAL
let btnopenModal = document.querySelector("#openModal")
btnopenModal.addEventListener("click", openModalWindow);


// Lógica cerrar de la ventana modal

let btncloseModal = document.querySelector(".close")
let btnacceptModal = document.querySelector("#closeModal")

btncloseModal.addEventListener("click", closeModalWindow);
btnacceptModal.addEventListener("click", closeModalWindow);

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


// TICKETS COMPRA
document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll('input[type="number"]');
    const totalPriceElement = document.getElementById("totalPrice");

    // Añade a cada input un evento change para calcular el precio total
    inputs.forEach((input) => {
        input.addEventListener("change", calculateTotalPrice);
    });

    // Función para calcular el precio total
    function calculateTotalPrice() {
        let totalPrice = 0;
        inputs.forEach((input) => {
            const price = parseFloat(input.dataset.price) || 0;
            const quantity = parseInt(input.value) || 0;
            totalPrice += price * quantity;

            // Si el precio es mayor que 0, se habilita el botón de comprar
            if (totalPrice > 0) {
                document.getElementById("buyTickets").classList.remove("disabled");
            } else {
                document.getElementById("buyTickets").classList.add("disabled");
            }
        });
        totalPriceElement.textContent = "¥" + totalPrice.toLocaleString("ja-JP");

    }

    // La primera llamada a la función hará el calculo inicial para poner 0.00 €
    calculateTotalPrice();

    // Evitar el envio del formulario si el usuario pulsa enter o el precio es 0
    document.getElementById("form").addEventListener("submit", function (event) {
        event.preventDefault();
    });
});
