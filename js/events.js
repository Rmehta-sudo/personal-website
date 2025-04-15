document.addEventListener("DOMContentLoaded", () => {
    const timestamp = () => new Date().toISOString();

    function getElementType(el) {
        const tag = el.tagName.toLowerCase();
        const type = el.getAttribute("type");

        if (el.closest("form")) return "form";
        if (tag === "img") return "image";
        if (tag === "a") return "link";
        if (tag === "button") return "button";
        if (tag === "select") return "drop-down";
        if (tag === "input" && type === "radio") return "radio";
        if (tag === "input" && type === "text") return "text box";
        if (tag === "textarea") return "text box";
        if (["li", "ul", "ol"].includes(tag)) return "list";
        if (["p", "div", "span"].includes(tag)) return "text";

        // Fallback: check if there's any visible text
        const textContent = el.textContent?.trim();
        if (textContent && textContent.length > 0) return "text";

        return "background";
    }

    // Clicks
    document.addEventListener("click", (e) => {
        const elType = getElementType(e.target);
        console.log(`${timestamp()}, click, ${elType}`);
    });

    // Views
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elType = getElementType(entry.target);
                console.log(`${timestamp()}, view, ${elType}`);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.25
    });

    // Observe everything
    document.querySelectorAll("*").forEach(el => observer.observe(el));
});
