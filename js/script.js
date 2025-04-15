// Typewriter
const typewriter = document.getElementById("typewriter");
const intro = "Hi, I'm Rachit :)";
const paragraphs = [
  "I love building things that live on the web, from websites to web apps, and everything in between.",
  "I have a knack for problem solving, especially when it comes to clean and efficient code.",
  "Outside of coding, I enjoy exploring tech trends, writing about code, and brewing the perfect cup of coffee.",
  "Hi, I'm Rachit :)<br>Welcome to my little corner of the internet <3"
];

let charIndex = 0;
let deleting = false;
let stage = 'intro';
let currentText = intro;

function typeEffect() {
  if (!deleting) {
    typewriter.innerHTML = currentText.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentText.length) {
      if (stage === 'p4') return;
      setTimeout(() => { deleting = true; typeEffect(); }, stage === 'intro' ? 3000 : 1500);
      return;
    }
  } else {
    typewriter.innerHTML = currentText.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      const next = {
        intro: 'p1',
        p1: 'p2',
        p2: 'p3',
        p3: 'p4'
      };
      stage = next[stage];
      currentText = paragraphs[parseInt(stage[1]) - 1];
    }
  }
  setTimeout(typeEffect, deleting ? 40 : 60);
}
window.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});

// Theme toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Font toggle
const fonts = ['Fira Code', 'Orbitron', 'Roboto Mono', 'Major Mono Display', 'Zilla Slab Highlight'];
let currentFont = 0;
document.getElementById("font-toggle").addEventListener("click", () => {
  currentFont = (currentFont + 1) % fonts.length;
  document.body.style.fontFamily = fonts[currentFont];
});

// Animate nav bar: top-right → center-right on scroll
const sideNav = document.querySelector(".side-nav");
function animateNav() {
  const scrollY = window.scrollY;
  const topRight = 40;
  const centerRight = window.innerHeight / 2 - sideNav.offsetHeight / 2;
  const targetTop = scrollY < 100 ? topRight : centerRight;
  sideNav.style.top = `${targetTop}px`;
  requestAnimationFrame(animateNav);
}
requestAnimationFrame(animateNav);

// Active nav link highlighting on scroll
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

// Activity tracker (optional)
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
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) trackEvent("view", entry.target);
    });
  }, { threshold: 0.5 });
  observer.observe(el);
});
