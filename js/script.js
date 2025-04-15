const typewriter = document.getElementById("typewriter");

const texts = [
  "Hi, I'm Rachit :)",
  "I love building things that live on the web.",
  "Clean, efficient code makes me happy.",
  "Welcome to my corner of the internet."
];

let i = 0, j = 0, current = "", isDeleting = false;

function typeEffect() {
  if (!isDeleting) {
    current = texts[i].substring(0, j++);
    typewriter.innerHTML = current;
    if (j > texts[i].length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    current = texts[i].substring(0, j--);
    typewriter.innerHTML = current;
    if (j < 0) {
      isDeleting = false;
      i = (i + 1) % texts.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 40 : 60);
}

document.addEventListener("DOMContentLoaded", typeEffect);

// Move navbar on scroll
const sideNav = document.getElementById("side-nav");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const homeHeight = document.getElementById("home").offsetHeight;
  const targetTop = (scrollY > homeHeight - 100)
    ? window.innerHeight / 2 - sideNav.offsetHeight / 2
    : 120;
  sideNav.style.top = `${targetTop}px`;
});

// Highlight current section
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 150) {
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
