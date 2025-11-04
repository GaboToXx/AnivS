// ===============================
// CONFIGURACIÓN PERSONALIZABLE
// ===============================
const CONFIG = {
  names: "Sheryll y Gabriel",
  since: "2022-11-05",
  spotifyEmbed:
    "https://open.spotify.com/embed/playlist/6HiwQPBEQR5XsrZRRgQW1o?utm_source=generator",
  yourName: "Gabriel",

  // Video de fondo del HERO (pon tu archivo en /video/hero.mp4 o cambia la ruta)
  heroVideoMp4: "video/aniversario2.mp4",
  // heroVideoWebm: "video/hero.webm", // (opcional)
};

// Ejecutar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // ELEMENTOS DEL DOM
  // ===============================
  const intro = document.getElementById("intro");
  const enterBtn = document.getElementById("enterBtn");
  const main = document.getElementById("main");

  const namesEl = document.getElementById("names");
  const sinceEl = document.getElementById("since");
  const togetherDaysEl = document.getElementById("togetherDays");
  const iframe = document.querySelector("#playlist iframe");
  const footerNameEl = document.getElementById("yourNameFooter");
  const yearEl = document.getElementById("year");

  const heroVideo = document.getElementById("heroVideo"); // <video>
  const heroVideoMp4Source = heroVideo
    ? heroVideo.querySelector("source[type='video/mp4']")
    : null;
  // const heroVideoWebmSource = heroVideo ? heroVideo.querySelector("source[type='video/webm']") : null;

  const btnSorpresa = document.getElementById("btnSorpresa");
  const btnSi = document.getElementById("btnSi");

  // ===============================
  // FUNCIONALIDAD PRINCIPAL
  // ===============================

  // Al presionar "Entrar" → oculta intro (fade) y muestra contenido + carga video
  if (enterBtn) {
    enterBtn.addEventListener("click", () => {
      if (intro) intro.classList.add("hidden");

      setTimeout(() => {
        if (intro) {
          intro.style.display = "none";
        }
        if (main) {
          main.classList.remove("is-hidden");
        }

        // Cargar/activar video del HERO al entrar (para no cargar antes de tiempo)
        if (heroVideo) {
          // Respeta usuarios con "reduced motion"
          const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches;

          // Asignar fuentes desde CONFIG o data-src
          if (heroVideoMp4Source) {
            heroVideoMp4Source.src =
              CONFIG.heroVideoMp4 ||
              heroVideoMp4Source.getAttribute("data-src");
          }
          // Si usas webm:
          // if (heroVideoWebmSource && CONFIG.heroVideoWebm) {
          //   heroVideoWebmSource.src = CONFIG.heroVideoWebm;
          // }

          heroVideo.load();
          if (!prefersReduced) {
            // Autoplay requiere muted + playsinline (ya en el HTML)
            heroVideo.play().catch(() => {
              // Algunos navegadores pueden bloquear reproducción automática
              // No pasa nada; queda el poster de fondo.
            });
          } else {
            heroVideo.pause();
            heroVideo.removeAttribute("autoplay");
          }
        }
      }, 1000); // coincide con la transición CSS .intro.hidden (1s)
    });
  }

  // Carga de nombres y fechas
  if (namesEl) namesEl.textContent = CONFIG.names;
  if (footerNameEl) footerNameEl.textContent = CONFIG.yourName;
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Calcula los días juntos
  const sinceDate = new Date(CONFIG.since + "T00:00:00");
  const diffDays = Math.floor((new Date() - sinceDate) / (1000 * 60 * 60 * 24));
  if (togetherDaysEl) togetherDaysEl.textContent = diffDays.toString();
  if (sinceEl)
    sinceEl.textContent = sinceDate.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  // Spotify embed
  if (iframe && CONFIG.spotifyEmbed) {
    iframe.src = CONFIG.spotifyEmbed;
  }

  // Botón sorpresa
  if (btnSorpresa) {
    btnSorpresa.addEventListener("click", () => {
      alert("✨ Te espero con una sorpresa especial, amor 💖");
    });
  }

  // Botón final
  if (btnSi) {
    btnSi.addEventListener("click", () => {
      alert("Sabía que dirías que sí 💍 ¡Te amo!");
    });
  }

  // (Opcional) Auto-cerrar la intro después de X segundos:
  // setTimeout(() => enterBtn?.click(), 5000);
});

// Efecto flip solo con clic o toque
document.querySelectorAll(".flip-card").forEach((card) => {
  card.addEventListener("click", () => {
    // Si ya está volteada, la regresa
    card.classList.toggle("flipped");
  });
});

// 💌 Abrir carta tocando el sobre
const envelope = document.getElementById("envelope");
const letterContent = document.getElementById("letterContent");

if (envelope && letterContent) {
  envelope.addEventListener("click", () => {
    envelope.classList.add("open");
    setTimeout(() => {
      letterContent.style.display = "block";
      envelope.style.display = "none";
    }, 800);
  });
}

// 💬 Enviar mensaje a WhatsApp
const form = document.getElementById("whatsappForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const mensaje = document.getElementById("mensajeTexto").value.trim();
    if (mensaje) {
      const telefono = "62743349"; // ← tu número aquí (ejemplo: 593987654321)
      const texto = encodeURIComponent(mensaje);
      const url = `https://wa.me/${telefono}?text=${texto}`;
      window.open(url, "_blank");
    } else {
      alert("Por favor escribe un mensaje antes de enviarlo 💌");
    }
  });
}

// ===============================
// EFECTO: Lluvia de corazones 💕
// ===============================
const heartsContainer = document.querySelector(".hearts-container");
let heartInterval;

// Función para crear corazones
function crearCorazon() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "💖";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 1.5 + 1 + "rem";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s";
  heart.style.opacity = Math.random() * 0.7 + 0.3;

  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 7000);
}

// Inicia la lluvia de corazones al cargar la intro
function iniciarLluvia() {
  heartInterval = setInterval(crearCorazon, 300);
}

// Detiene la lluvia
function detenerLluvia() {
  clearInterval(heartInterval);
  heartsContainer.innerHTML = ""; // elimina corazones activos
}

// Comienza la lluvia cuando se muestra la intro
iniciarLluvia();

// Cuando se presiona “Entrar”, oculta la intro y detiene los corazones
enterBtn.addEventListener("click", () => {
  intro.classList.add("hidden");
  detenerLluvia(); // detener corazones aquí
  setTimeout(() => {
    intro.style.display = "none";
    main.classList.remove("is-hidden");
  }, 1000);
});
