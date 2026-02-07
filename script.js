// Año footer
document.getElementById("year").textContent = new Date().getFullYear();

// Menú móvil
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

// FAQ accordion (accesible)
const faq = document.querySelector("[data-accordion]");
if (faq) {
  const questions = faq.querySelectorAll(".faq__q");
  questions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      // Cierra todos (opcional: modo single-open)
      questions.forEach((b) => {
        b.setAttribute("aria-expanded", "false");
        const ans = b.nextElementSibling;
        if (ans) ans.hidden = true;
      });
      // Abre el seleccionado
      btn.setAttribute("aria-expanded", String(!expanded));
      const answer = btn.nextElementSibling;
      if (answer) answer.hidden = expanded;
    });
  });
}

// Form demo (validación básica frontend)
const leadForm = document.getElementById("leadForm");
const formMsg = document.getElementById("formMsg");

function setMsg(text, type) {
  formMsg.textContent = text;
  formMsg.className = `form__msg ${type}`;
}

leadForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(leadForm);
  const name = String(data.get("name") || "").trim();
  const org = String(data.get("org") || "").trim();
  const email = String(data.get("email") || "").trim();
  const type = String(data.get("type") || "").trim();

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (name.length < 2) return setMsg("Por favor, ingresa tu nombre.", "err");
  if (org.length < 2) return setMsg("Por favor, ingresa tu institución.", "err");
  if (!emailOk) return setMsg("Por favor, ingresa un correo válido.", "err");
  if (!type) return setMsg("Selecciona el tipo de atención.", "err");

  // Aquí podrías enviar a Google Forms / API:
  // fetch("/api/leads", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({name, org, email, type}) })

  setMsg("¡Listo! Te contactaremos para coordinar la demo.", "ok");
  leadForm.reset();
});
