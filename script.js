
// // === Fade-in animation on scroll ===
const faders = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", () => {
   faders.forEach(fade => {
    const rect = fade.getBoundingClientRect();
     if (rect.top < window.innerHeight - 100) {
      fade.classList.add("visible");
     }
   });
 });

// === Transparent navbar over the hero video (homepage only) ===
const navbarEl = document.querySelector(".navbar");
const heroSection = document.querySelector(".main");

if (navbarEl && heroSection) {
  const toggleNavbar = () => {
    const threshold = heroSection.offsetHeight - 80;
    if (window.scrollY < threshold) {
      navbarEl.classList.add("navbar-transparent");
    } else {
      navbarEl.classList.remove("navbar-transparent");
    }
  };

  window.addEventListener("scroll", toggleNavbar);
  window.addEventListener("load", toggleNavbar);
  toggleNavbar();
}


// === Animated progress bars ===

const progressBars = document.querySelectorAll(".progress-bar");

function animateProgressBars() {
  progressBars.forEach(bar => {

    if (bar.classList.contains("animated")) return;

    const rect = bar.getBoundingClientRect();

    if (rect.top < window.innerHeight - 50) {

      bar.classList.add("animated");

      const percent = bar.getAttribute("data-percent");

      bar.style.width = percent + "%";
    }

  });
}

window.addEventListener("scroll", animateProgressBars);
window.addEventListener("load", animateProgressBars);
animateProgressBars();

// Run when section scrolls into view
window.addEventListener("scroll", () => {
  progressBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50 && !bar.classList.contains("animated")) {
      bar.classList.add("animated");
      animateProgress(bar);
    }
  });
});


// === Hover glowing effect for buttons ===
const buttons = document.querySelectorAll(".btn, button");
buttons.forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    btn.style.boxShadow = "0 0 20px #64ffda";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.boxShadow = "none";
  });
});


const typingEl = document.querySelector(".typing");

if (typingEl) {
  const words = [
    "A Passionate Software Developer",
    "A Creative Problem Solver",
    "A Lifelong Learner"
  ];

  let wordIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function typeTick() {
    const current = words[wordIdx];
    typingEl.textContent = current.slice(0, charIdx);

    if (!deleting && charIdx < current.length) {
      charIdx++;
      return setTimeout(typeTick, 100);
    }

    if (!deleting && charIdx === current.length) {
      deleting = true;
      return setTimeout(typeTick, 1500);
    }

    if (deleting && charIdx > 0) {
      charIdx--;
      return setTimeout(typeTick, 50);
    }

    deleting = false;
    wordIdx = (wordIdx + 1) % words.length;
    setTimeout(typeTick, 300);
  }

  typeTick();
}

// === Certificates fade-in on scroll ===
document.addEventListener("DOMContentLoaded", () => {
  const certCards = document.querySelectorAll(".cert-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  certCards.forEach(card => {
    observer.observe(card);
  });
});


const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// === Projects page: filter tabs ===
const filterBtns = document.querySelectorAll(".filter-btn");
const projCards = document.querySelectorAll(".proj-card");

if (filterBtns.length && projCards.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projCards.forEach(card => {
        const category = card.getAttribute("data-category");
        const show = filter === "all" || filter === category;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });
}

// === Project cards: click anywhere on the card opens its link ===
projCards.forEach(card => {
  const link = card.querySelector(".proj-title-row a");
  if (!link) return;

  card.addEventListener("click", (e) => {
    if (e.target.closest("a, button")) return; // let real links/buttons handle their own click
    link.click();
  });

  card.style.cursor = "pointer";
});

// === Request Code Access modal ===
const codeModalOverlay = document.getElementById("codeModalOverlay");
const codeModalClose = document.getElementById("codeModalClose");
const codeAccessForm = document.getElementById("codeAccessForm");
let currentProjectName = "";

document.querySelectorAll(".request-code-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    currentProjectName = btn.getAttribute("data-project") || "this project";
    if (codeModalOverlay) codeModalOverlay.classList.add("active");
  });
});

function closeCodeModal() {
  if (!codeModalOverlay) return;
  codeModalOverlay.classList.remove("active");
  if (codeAccessForm) codeAccessForm.reset();
}

if (codeModalClose) {
  codeModalClose.addEventListener("click", closeCodeModal);
}

if (codeModalOverlay) {
  codeModalOverlay.addEventListener("click", (e) => {
    if (e.target === codeModalOverlay) closeCodeModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCodeModal();
});

if (codeAccessForm) {
  codeAccessForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const type = document.getElementById("visitorType").value;
    const email = document.getElementById("visitorEmail").value;
    const message = document.getElementById("visitorMessage").value;

    const subject = encodeURIComponent(`Code Access Request: ${currentProjectName}`);
    const body = encodeURIComponent(
      `Project: ${currentProjectName}\nI am a: ${type}\nMy email: ${email}\n\nMessage:\n${message || "(none)"}`
    );

    window.location.href = `mailto:thandaniafeziwe@gmail.com?subject=${subject}&body=${body}`;

    closeCodeModal();
  });
}
