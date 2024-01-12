// Dark Mode
const prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark)");
const html = document.querySelector("html");

const toggleDarkMode = () => {
  html.setAttribute(
    "data-bs-theme",
    prefersColorScheme.matches ? "dark" : "light"
  );
};

const onDOMContentLoaded = () => {
  toggleDarkMode();
  prefersColorScheme.addEventListener("change", toggleDarkMode);

  if (!html.getAttribute("data-bs-theme")) toggleDarkMode();
};

window.addEventListener("DOMContentLoaded", onDOMContentLoaded);
