// Include HTML
document.addEventListener("DOMContentLoaded", function () {
  var z, file, xhttp;
  z = document.getElementsByTagName("*");
  Array.prototype.forEach.call(z, (elmnt) => {
    file = elmnt.dataset.includeHtml;
    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
    }
  });
});
