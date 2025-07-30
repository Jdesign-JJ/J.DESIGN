//---mobile sorry message breakpoint---//
document.addEventListener("DOMContentLoaded", function () {
  function checkWidth() {
    const messageElement = document.querySelector(".mobile-message");
    const contentElements = document.querySelectorAll(".all-content > *");
    if (window.innerWidth <= 640) {
      // Zobraz zprávu
      messageElement.style.display = "block";
      // Skrýt celý obsah kromě zprávy
      contentElements.forEach(function (el) {
        el.style.display = "none";
      });
    } else {
      // Skrýt zprávu
      messageElement.style.display = "none";
      // Zobrazit obsah
      contentElements.forEach(function (el) {
        el.style.display = "";
      });
    }
  }
  window.addEventListener("resize", checkWidth);
  checkWidth();
});

// --- Funkce na slideshow --- //
const images = ["images/Jay.png", "images/Jay 1.png", "images/Jay 2.jpg"];
let currentIndex = 0;

function startSlideshow() {
  const imgElement = document.getElementById("slideshow-portrait");
  if (!imgElement) return;
  setInterval(() => {
    // Přechodové efekty
    imgElement.classList.remove("fade-in");
    imgElement.classList.add("fade-out");
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % images.length;
      imgElement.src = images[currentIndex];
      imgElement.classList.remove("fade-out");
      imgElement.classList.add("fade-in");
    }, 300);
  }, 5000);
}
// Funkce na aktualizaci aktivního tlačítka
function setActiveButton(buttonId) {
  document.querySelectorAll(".menu-button").forEach((btn) => {
    if (btn.id === buttonId) {
      btn.classList.add("active");
      btn.classList.remove("inactive");
    } else {
      btn.classList.remove("active");
      btn.classList.add("inactive");
    }
  });
}

// Setup tlačítka s posunem na sekci a správným aktivním tlačítkem
function setupScrollButton(buttonId, targetId, activeButtonId) {
  const btn = document.getElementById(buttonId);
  const target = document.getElementById(targetId);
  if (btn && target) {
    btn.addEventListener("click", () => {
      target.scrollIntoView({ behavior: "smooth" });
      setActiveButton(activeButtonId); // Aktivuj správné tlačítko hned po kliknutí
    });
  }
}

// Aktuializace menu-button na ACTIVE podle pozice při scrollování //
function updateActiveOnScroll() {
  const viewportHeight = window.innerHeight;
  const middleStart = viewportHeight * 0.2; // 20 % od spodního okraje
  const middleEnd = viewportHeight * 0.8; // 80 % od spodního okraje

  // Zjistit pozice sekcí
  const rectHeader = document.getElementById("header").getBoundingClientRect();
  const rectProjects = document
    .getElementById("accordion-projects")
    .getBoundingClientRect();
  const rectContact = document
    .getElementById("contact-section")
    .getBoundingClientRect();

  // Funkce, jestli je prvek v pásmu
  const isInMiddleRange = (rect) => {
    const elementMid = (rect.top + rect.bottom) / 2;
    return elementMid >= middleStart && elementMid <= middleEnd;
  };

  // Aktivace tlačítek podle toho, který je v pásmu
  if (isInMiddleRange(rectHeader)) {
    setActiveButton("header-button");
  } else if (isInMiddleRange(rectProjects)) {
    setActiveButton("projects-button");
  } else if (isInMiddleRange(rectContact)) {
    setActiveButton("contact-button");
  }
}

// nastavení tlačítek a akce při načtení stránky
window.addEventListener("DOMContentLoaded", () => {
  startSlideshow();
  // nastavte tlačítka s jejich cílovými sekcemi a s aktivním tlačítkem
  setupScrollButton("header-button", "header", "header-button");
  setupScrollButton("projects-button", "accordion-projects", "projects-button");
  setupScrollButton("contact-button", "contact-section", "contact-button");

  window.addEventListener("scroll", () => {
    updateActiveOnScroll();

    // Zobrazit menu při scrollu
    const menu = document.querySelector(".menu");
    if (window.scrollY > 10) {
      menu.classList.add("show");
    } else {
      menu.classList.remove("show");
    }
  });
});

//---header PARALLAX---/
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  const logoHolder = document.getElementById("logoholder");
  const portraitHolder = document.getElementById("portraitholder");
  const bioHolder = document.getElementById("bio-container");

  // Nejrychleji se pohybuje logo
  logoHolder.style.transform = `translateY(${scrollY * -1}px)`;
  // Středně rychle portraitholder
  portraitHolder.style.transform = `translateY(${scrollY * -0.4}px)`;
  // Nejpomaleji bioholder
  bioHolder.style.transform = `translateY(${scrollY * -0.1}px)`;
});

//---přepínání BIO DROPDOWN ---//
const toggleButton = document.getElementById("bio-dropdown-button");
const contentDiv = document.getElementById("accordion-content");

function toggleAccordion() {
  // Přepnout třídu aktivního tlačítka
  toggleButton.classList.toggle("active");

  // Přepnout zobrazení obsahu
  contentDiv.classList.toggle("show");
}

toggleButton.addEventListener("click", toggleAccordion);

//---ACORDION---//
//header//
document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const toggleBtn = document.getElementById("accordion-toggle-button");
    toggleBtn.classList.toggle("active");
  });
});

document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const content = document.getElementById(header.nextElementSibling.id);
    const button = document.getElementById(
      header.querySelector(".accordion-btn").id
    );
    const expanded = button.getAttribute("aria-expanded") === "true";

    if (expanded) {
      content.classList.remove("show");
      button.setAttribute("aria-expanded", "false");
    } else {
      content.classList.add("show");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

//---CAROUSEL---//
const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");

    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});
