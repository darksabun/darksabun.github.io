// Dark Mode
const prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark)");
const html = document.documentElement;

const toggleDarkMode = () => {
  const isDarkMode = prefersColorScheme.matches;
  html.setAttribute("data-bs-theme", isDarkMode ? "dark" : "light");
  // Save the current theme state to localStorage
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
};

const toggleDarkModeManually = () => {
  const currentTheme = html.getAttribute("data-bs-theme");
  html.setAttribute(
    "data-bs-theme",
    currentTheme === "dark" ? "light" : "dark"
  );
  // Save the current theme state to localStorage
  localStorage.setItem("theme", html.getAttribute("data-bs-theme"));
};

const onDOMContentLoaded = () => {
  // Retrieve the saved theme from localStorage
  const savedTheme = localStorage.getItem("theme");

  // If a saved theme is found, apply it; otherwise, use the system's color scheme
  if (savedTheme) {
    html.setAttribute("data-bs-theme", savedTheme);
  } else {
    // If no saved theme, set the theme based on the system preference
    toggleDarkMode();
  }

  prefersColorScheme.addEventListener("change", toggleDarkMode);

  const currentTheme = html.getAttribute("data-bs-theme");

  if (!currentTheme) {
    toggleDarkMode();
  }
};

onDOMContentLoaded();
