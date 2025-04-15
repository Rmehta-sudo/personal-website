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
  // Back to Top functionality
  document.getElementById("back-to-top").addEventListener("click", () => {
      window.scrollTo({
          top: 0,
          behavior: "smooth"
      });
  });