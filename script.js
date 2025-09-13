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

// Posluchač na DARK-LIGHT mode
document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("check");

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      document.querySelectorAll(".dark-mode").forEach((el) => {
        el.classList.remove("dark-mode");
        el.classList.add("light-mode");
      });
    } else {
      document.querySelectorAll(".light-mode").forEach((el) => {
        el.classList.remove("light-mode");
        el.classList.add("dark-mode");
      });
    }
  });
});

// Posluchač na DARK-LIGHT mode, s přepínáním obrázku
document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("check");
  const logoContainer = document.querySelector(".logoholder img");

  // Při načtení stránky uložíme původní src obrázků, které potřebujeme měnit
  document.querySelectorAll('img[src^="images/wedge-"]').forEach((img) => {
    // Uložíme původní src do datasetu, pokud ještě není
    if (!img.dataset.originalSrc) {
      img.dataset.originalSrc = img.src;
    }
  });

  // Funkce, která podle režimu mění obrázky
  function updateImages(isLightMode) {
    // definice obrázků a jejich alternativ
    const imagesMap = [
      {
        selector: 'img[src="images/wedge-dropdown.svg"]',
        newSrc: "images/wedge-dropdown-b.svg",
      },
      {
        selector: 'img[src="images/wedge-previous.svg"]',
        newSrc: "images/wedge-previous-b.svg",
      },
      {
        selector: 'img[src="images/wedge-next.svg"]',
        newSrc: "images/wedge-next-b.svg",
      },
    ];

    imagesMap.forEach(({ selector, newSrc }) => {
      document.querySelectorAll(selector).forEach((img) => {
        if (isLightMode) {
          // Pokud je světelný režim, nastavíme "b" verzi
          img.src = newSrc;
        } else {
          // Pokud je tmavý režim, vrátíme původní src
          if (img.dataset.originalSrc) {
            img.src = img.dataset.originalSrc;
          }
        }
      });
    });
  }

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      // Přepnout na light mode
      document.querySelectorAll(".dark-mode").forEach((el) => {
        el.classList.remove("dark-mode");
        el.classList.add("light-mode");
      });
      if (logoContainer) {
        logoContainer.src = "images/Jdesign logo black.svg";
      }
      // aktualizuj obrázky
      updateImages(true);
    } else {
      // Přepnout na dark mode
      document.querySelectorAll(".light-mode").forEach((el) => {
        el.classList.remove("light-mode");
        el.classList.add("dark-mode");
      });
      if (logoContainer) {
        logoContainer.src = "images/Jdesign logo white.svg";
      }
      // obnov původní obrázky
      document.querySelectorAll("img[data-original-src]").forEach((img) => {
        if (img.dataset.originalSrc) {
          img.src = img.dataset.originalSrc;
        }
      });
    }
  });
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

  const logoHolder = document.querySelector(".logoholder");
  const portraitHolder = document.querySelector(".portraitholder");
  const bioHolder = document.querySelector(".bio-container");

  if (logoHolder) {
    logoHolder.style.transform = `translateY(${scrollY * -1}px)`;
  }
  if (portraitHolder) {
    portraitHolder.style.transform = `translateY(${scrollY * -0.35}px)`;
  }
  if (bioHolder) {
    bioHolder.style.transform = `translateY(${scrollY * -0.1}px)`;
  }
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
    const btn = header.querySelector(".accordion-btn");
    if (btn) {
      btn.classList.toggle("active");
    }
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
/* --- CAROUSEL PREVIEW --- */
document.addEventListener("DOMContentLoaded", () => {
  const ul = document.querySelector(".project-preview-list");
  const prevBtn = document.getElementById("carousel-preview-button-prev");
  const nextBtn = document.getElementById("carousel-preview-button-next");

  let currentTranslateX = 0;

  function slide(direction) {
    const parentWidth = ul.parentElement.offsetWidth;
    const shift = parentWidth;
    const style = window.getComputedStyle(ul);
    const matrix = new WebKitCSSMatrix(style.transform);
    currentTranslateX = matrix.m41;

    if (isNaN(currentTranslateX)) currentTranslateX = 0;

    if (direction === "next") {
      currentTranslateX -= shift;
    } else if (direction === "prev") {
      currentTranslateX += shift;
    }

    const totalWidth = ul.scrollWidth;

    if (currentTranslateX > 0) {
      currentTranslateX = -totalWidth + parentWidth;
    } else if (currentTranslateX < -totalWidth + parentWidth) {
      currentTranslateX = 0;
    }

    ul.style.transform = `translateX(${currentTranslateX}px)`;
    ul.style.transition = "transform 0.5s ease";
  }

  prevBtn.addEventListener("click", () => slide("prev"));
  nextBtn.addEventListener("click", () => slide("next"));
});

// PŘEPÍNÁNÍ visible místo active
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".project-preview-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      const isVisible = btn.classList.contains("visible");
      const clickedId = btn.id; // například "PBS-butt"
      const detailId = clickedId.replace("-butt", "");
      const detailDiv = document.getElementById(detailId);

      if (isVisible) {
        // Pokud je již viditelné, skryj
        btn.classList.remove("visible");
        if (detailDiv) {
          detailDiv.style.display = "none";
        }
        document.querySelector(".details-holder").style.display = "none";
      } else {
        // Jinak aktivuj a zobraz
        document
          .querySelectorAll(".project-preview-card")
          .forEach((otherBtn) => {
            otherBtn.classList.remove("visible");
          });
        btn.classList.add("visible");
        document.querySelectorAll(".details-holder > div").forEach((div) => {
          div.style.display = "none";
        });
        if (detailDiv) {
          detailDiv.style.display = "flex";
        }
        document.querySelector(".details-holder").style.display = "flex";
      }
    });
  });
});

// DETAIL CAROUSEL
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
