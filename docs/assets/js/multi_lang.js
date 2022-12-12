// for Multiple Language
let getLanguage = navigator.language;
const $ko = document.querySelectorAll(".lang-ko");
const $ja = document.querySelectorAll(".lang-ja");
const $en = document.querySelectorAll(".lang-en");

if (getLanguage.slice(0, 2) === "ko") {
  $ko.forEach((element) => {
    element.classList.remove("text-secret");
  });
} else if (getLanguage.slice(0, 2) === "ja") {
  $ja.forEach((element) => {
    element.classList.remove("text-secret");
  });
} else {
  $en.forEach((element) => {
    element.classList.remove("text-secret");
  });
}

function changeLangKO() {
  $ja.forEach((element) => {
    element.classList.add("text-secret");
  });
  $en.forEach((element) => {
    element.classList.add("text-secret");
  });
  $ko.forEach((element) => {
    element.classList.remove("text-secret");
  });
}

function changeLangJA() {
  $ko.forEach((element) => {
    element.classList.add("text-secret");
  });
  $en.forEach((element) => {
    element.classList.add("text-secret");
  });
  $ja.forEach((element) => {
    element.classList.remove("text-secret");
  });
}

function changeLangEN() {
  $ko.forEach((element) => {
    element.classList.add("text-secret");
  });
  $ja.forEach((element) => {
    element.classList.add("text-secret");
  });
  $en.forEach((element) => {
    element.classList.remove("text-secret");
  });
}
