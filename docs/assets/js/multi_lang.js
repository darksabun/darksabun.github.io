// for Multiple Language
let getLanguage = navigator.language;
setTimeout(() => {
  const languages = {
    ko: document.querySelectorAll(".lang-ko"),
    ja: document.querySelectorAll(".lang-ja"),
    en: document.querySelectorAll(".lang-en"),
  };

  function setLanguageVisibility(nowLang) {
    Object.values(languages).forEach((lang) => {
      lang.forEach((element) => {
        const langClass = element.classList.contains(`lang-${nowLang}`);
        element.classList.toggle("text-secret", !langClass);
      });
    });
  }

  // Language setting based on navigator.language
  const nowLang = getLanguage.slice(0, 2);
  setLanguageVisibility(nowLang);
}, 200);

function changeLanguage(wantLang) {
  const languages = {
    ko: document.querySelectorAll(".lang-ko"),
    ja: document.querySelectorAll(".lang-ja"),
    en: document.querySelectorAll(".lang-en"),
  };

  Object.values(languages).forEach((lang) => {
    lang.forEach((element) => {
      const langClass = element.classList.contains(`lang-${wantLang}`);
      element.classList.toggle("text-secret", !langClass);
    });
  });
}
