let formBox = document.getElementById("loginPage");
let x = document.createElement("div");
fetch("components/loginForm.html")
  .then((response) => response.text())
  .then((html) => (x.innerHTML = html));
  console.log(formBox);
formBox.appendChild(x);