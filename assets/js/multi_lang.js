// for Multiple Language
getLanguage = navigator.language;

if (getLanguage === "ko-KR" || getLanguage === "ko") {
    $(".lang-ko").show()
} else if (getLanguage === "ja-JP" || getLanguage === "ja") {
    $(".lang-jp").show()
} else {
    $(".lang-en").show()
}