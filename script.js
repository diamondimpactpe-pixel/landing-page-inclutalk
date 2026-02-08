// Año footer
document.getElementById("year").textContent = new Date().getFullYear();

// Menú móvil con animación mejorada
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Cerrar menú al hacer click en un link (mobile)
navMenu?.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a) return;
  navMenu.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
});

// Cerrar menú al hacer click fuera
document.addEventListener("click", (e) => {
  if (!navToggle || !navMenu) return;
  if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// FAQ accordion (accesible y mejorado)
const faq = document.querySelector("[data-accordion]");
if (faq) {
  const questions = faq.querySelectorAll(".faq__q");
  questions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      
      // Cierra todos (modo single-open - opcional: comentar para multi-open)
      questions.forEach((b) => {
        if (b !== btn) {
          b.setAttribute("aria-expanded", "false");
          const ans = b.nextElementSibling;
          if (ans) ans.hidden = true;
        }
      });
      
      // Toggle el seleccionado
      btn.setAttribute("aria-expanded", String(!expanded));
      const answer = btn.nextElementSibling;
      if (answer) answer.hidden = expanded;
    });
  });
}

// Smooth scroll mejorado para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#top' || href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Animación de aparición al hacer scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Aplicar animación a secciones
document.querySelectorAll('.card, .step, .quote').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.boxShadow = '0 4px 20px rgba(11,28,44,.08)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(11,28,44,.04)';
  }
  
  lastScroll = currentScroll;
});

// Form validation mejorada
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', function(e) {
    const button = this.querySelector('button[type="submit"]');
    if (button) {
      button.disabled = true;
      button.textContent = 'Enviando...';
      
      // Si hay error, rehabilitar después de 3 segundos
      setTimeout(() => {
        button.disabled = false;
        button.textContent = 'Enviar solicitud';
      }, 3000);
    }
  });
});

// Console message
console.log('%c🚀 IncluTalk by Diamond Impact', 'font-size: 20px; font-weight: bold; color: #2F8FCC;');
console.log('%cSoftware de atención inclusiva para personas no oyentes', 'font-size: 12px; color: #8BC53F;');
console.log('%cContacto: diamondimpact.pe@gmail.com', 'font-size: 12px; color: #5a6b7a;');