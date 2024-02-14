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
  const nowHref = window.location.href;
  // Multiple Language for Venue (exclude BOFXVI Diary)
  if (nowHref.indexOf("venue") !== 1) {
    document.querySelector(".venue-content").innerHTML = "";
    document.querySelector("#venue-content-load").style.display = "";
    nowLang = wantLang;
    fetchJson();
    setLanguageVisibility(wantLang);
  }
}
