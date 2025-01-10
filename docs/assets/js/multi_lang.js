// for Multi-Language Support
const languages = {
  ko: document.querySelectorAll(".lang-ko"),
  ja: document.querySelectorAll(".lang-ja"),
  en: document.querySelectorAll(".lang-en"),
};

function getCurrentLanguage() {
  const browserLanguage = navigator.language.slice(0, 2);
  return ["ko", "ja"].includes(browserLanguage) ? browserLanguage : "en";
}

function setLanguageVisibility(nowLang) {
  Object.values(languages).forEach((lang) => {
    lang.forEach((element) => {
      const langClass = element.classList.contains(`lang-${nowLang}`);
      element.classList.toggle("text-secret", !langClass);
    });
  });
}

let nowLang = getCurrentLanguage();
setLanguageVisibility(nowLang);

function changeLanguage(wantLang) {
  if (document.querySelector("#venue-content")) {
    document.querySelector("#venue-content").innerHTML = "";
    document.querySelector("#venue-content-load").style.display = "";
    nowLang = wantLang;
    fetchJson();
    setLanguageVisibility(wantLang);
  } else {
    setLanguageVisibility(wantLang);
  }
}
