// for Multiple Language
const getLanguage = navigator.language;
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
let nowLang = getLanguage.slice(0, 2);
setLanguageVisibility(nowLang);

function changeLanguage(wantLang) {
  setLanguageVisibility(wantLang);
  // Multiple Language for Venue
  if (document.querySelector(".venue-content")) {
    document.querySelector(".venue-content").innerHTML = "";
    document.querySelector("#venue-content-load").style.display = "";
    nowLang = wantLang;
    fetchJson();
    setLanguageVisibility(wantLang);
  }
}
