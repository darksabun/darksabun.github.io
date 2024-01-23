// for Multiple Language
let getLanguage = navigator.language;
const languages = {
  ko: document.querySelectorAll(".lang-ko"),
  ja: document.querySelectorAll(".lang-ja"),
  en: document.querySelectorAll(".lang-en"),
};

function setLanguageVisibility(targetLang) {
  Object.values(languages).forEach((lang) => {
    lang.forEach((element) => {
      const langClass = element.classList.contains(`lang-${targetLang}`);
      element.classList.toggle("text-secret", !langClass);
    });
  });
}

// Initial language setting based on navigator.language
const initialLang = getLanguage.slice(0, 2);
setLanguageVisibility(initialLang);

function changeLanguage(lang) {
  setLanguageVisibility(lang);
}
