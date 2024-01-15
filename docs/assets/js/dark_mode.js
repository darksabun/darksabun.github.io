// Dark Mode
const prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark)");

const toggleDarkMode = () => {
  const html = document.querySelector("html");
  const isDarkMode = prefersColorScheme.matches;

  html.setAttribute("data-bs-theme", isDarkMode ? "dark" : "light");
};

const toggleDarkModeManually = () => {
  const html = document.querySelector("html");
  const currentTheme = html.getAttribute("data-bs-theme");

  html.setAttribute(
    "data-bs-theme",
    currentTheme === "dark" ? "light" : "dark"
  );
};

const onDOMContentLoaded = () => {
  toggleDarkMode();
  prefersColorScheme.addEventListener("change", toggleDarkMode);

  const html = document.querySelector("html");
  const currentTheme = html.getAttribute("data-bs-theme");

  if (!currentTheme || currentTheme === "light") {
    toggleDarkMode();
  }
};

window.addEventListener("DOMContentLoaded", onDOMContentLoaded);
