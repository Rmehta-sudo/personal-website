const typedText = "Hi, I'm Rachit :)";
let i = 0;
function typeWriter() {
  if (i < typedText.length) {
    document.getElementById("typewriter").innerHTML += typedText.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}
window.onload = typeWriter;

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
