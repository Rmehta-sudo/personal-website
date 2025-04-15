const typewriter = document.getElementById("typewriter");

const intro = "Hi, I'm Rachit :)";
const paragraphs = [
  "I love building things that live on the web, from websites to web apps, and everything in between.",
  "I have a knack for problem solving, especially when it comes to clean and efficient code.",
  "Outside of coding, I enjoy exploring tech trends, writing about code, and brewing the perfect cup of coffee."
];

const finalMessage = "Welcome to my website :)";

let charIndex = 0;
let deleting = false;
let stage = 'intro';
let currentText = intro;
let loopFinished = false;

function stopCursorBlink() {
  typewriter.classList.add("no-cursor");
}

function typeEffect() {
  if (loopFinished) return;

  if (!deleting) {
    typewriter.textContent = currentText.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      let pause = (stage === 'intro') ? 3000 : 1500;
      setTimeout(() => {
        deleting = true;
        typeEffect();
      }, pause);
      return;
    }

  } else {
    typewriter.textContent = currentText.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      if (stage === 'intro') {
        stage = 'p1';
        currentText = paragraphs[0];
      } else if (stage === 'p1') {
        stage = 'p2';
        currentText = paragraphs[1];
      } else if (stage === 'p2') {
        stage = 'p3';
        currentText = paragraphs[2];
      } else {
        // Final message begins
        stage = 'final';
        charIndex = 0;
        currentText = finalMessage;
        typewriter.innerHTML = `${intro}<br>`;
      }
    }
  }

  setTimeout(typeEffect, deleting ? 40 : 60);
}

function typeFinalMessage() {
  const existing = `${intro}<br><span class="final-message">${finalMessage.slice(0, charIndex + 1)}</span>`;
  typewriter.innerHTML = existing;
  charIndex++;

  if (charIndex < finalMessage.length) {
    setTimeout(typeFinalMessage, 60);
  } else {
    stopCursorBlink();
    loopFinished = true;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});

// Extend effect for final stage
const observer = new MutationObserver(() => {
  if (stage === 'final' && !loopFinished) {
    observer.disconnect();
    charIndex = 0;
    setTimeout(typeFinalMessage, 300);
  }
});

observer.observe(typewriter, { childList: true, subtree: true });


window.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});


const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

const fonts = [
  'Fira Code',
  'Orbitron',
  'Roboto Mono',
  'Major Mono Display',
  'Zilla Slab Highlight',
];
let currentFont = 0;

const fontToggleBtn = document.getElementById("font-toggle");
fontToggleBtn.addEventListener("click", () => {
  currentFont = (currentFont + 1) % fonts.length;
  document.body.style.fontFamily = fonts[currentFont];
});

function trackEvent(type, target) {
  const timestamp = new Date().toISOString();
  const tag = target.tagName.toLowerCase();
  const cls = target.className;
  const id = target.id;
  const description = `${tag}${cls ? "." + cls : ""}${id ? "#" + id : ""}`;
  console.log(`${timestamp}, ${type}, ${description}`);
}

document.querySelectorAll("*").forEach(el => {
  el.addEventListener("click", (e) => trackEvent("click", e.target));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          trackEvent("view", entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  observer.observe(el);
});

const sideNav = document.querySelector(".side-nav");
let currentTop = window.scrollY + window.innerHeight / 2 - sideNav.offsetHeight / 2;
function animateNav() {
  const targetTop = window.scrollY + window.innerHeight / 2 - sideNav.offsetHeight / 2;
  currentTop += (targetTop - currentTop) * 0.2;
  sideNav.style.top = `${currentTop}px`;
  requestAnimationFrame(animateNav);
}
requestAnimationFrame(animateNav);

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
