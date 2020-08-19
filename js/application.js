const toggle = document.getElementById('toggle');
const label = document.querySelector('label[for="toggle"].switch');
const target = document.body;

const toggleTheme = () => {
    if (!target.hasAttribute("data-theme") || target.getAttribute("data-theme") == "light" || target.getAttribute("data-theme") == "default") {
        target.setAttribute("data-theme", "dark");
        label.setAttribute("title", "Enable Light Theme");
        toggle.setAttribute("aria-checked", false);
    } else if (target.getAttribute("data-theme") == "dark") {
        target.setAttribute("data-theme", "light");
        label.setAttribute("title", "Enable Dark Theme");
        toggle.setAttribute("aria-checked", true);
    }
}

toggle.addEventListener("change", toggleTheme);


if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("../sw.js")
        .catch((err) => console.error(`Service Worker: Error: ${err}`));
    });
}