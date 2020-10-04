// for Multiple Language
var getLanguage = navigator.language;

if (getLanguage === "ko-KR" || getLanguage === "ko") {
    $(".lang-ko").show();
} else if (getLanguage === "ja-JP" || getLanguage === "ja") {
    $(".lang-jp").show();
} else {
    $(".lang-en").show();
}

function changeLangKO() {
    $(".lang-jp").hide();
    $(".lang-en").hide();
    $(".lang-ko").show();
}

function changeLangJP() {
    $(".lang-ko").hide();
    $(".lang-en").hide();
    $(".lang-jp").show();
}

function changeLangEN() {
    $(".lang-ko").hide();
    $(".lang-jp").hide();
    $(".lang-en").show();
}