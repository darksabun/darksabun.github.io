// for Multiple Language
var getLanguage = navigator.language;
var $ko = $(".lang-ko");
var $jp = $(".lang-jp");
var $en = $(".lang-en");

if (getLanguage === "ko-KR" || getLanguage === "ko-kr" || getLanguage === "ko") {
    $ko.show();
} else if (getLanguage === "ja-JP" || getLanguage === "ja") {
    $jp.show();
} else {
    $en.show();
}

function changeLangKO() {
    $jp.hide();
    $en.hide();
    $ko.show();
}

function changeLangJP() {
    $ko.hide();
    $en.hide();
    $jp.show();
}

function changeLangEN() {
    $ko.hide();
    $jp.hide();
    $en.show();
}