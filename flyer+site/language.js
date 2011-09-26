function language() {
    var possible = ["nl", "en", "fr"];
    var index = possible.indexOf(navigator.language);
    var language = index !== -1 ? possible[index] : "en"
    return language
}
