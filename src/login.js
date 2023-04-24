let loginPage = document.getElementById("loginPage");
let loginBody = document.createElement("div");
loginBody.setAttribute("id","replace");
let signupBody = document.createElement("div");
signupBody.setAttribute("id" ,"replace");
window.onload = () => {
  let spanTexts = document.getElementsByClassName("backLetter");
  for (spanText of spanTexts) {
    spanText.classList.add("active");
  }
  
  fetch("components/loginForm.html")
    .then((response) => response.text())
    .then((html) => (loginBody.innerHTML = html.trim()));
    fetch("components/signUp.html")
    .then((response) => response.text())
    .then((html) => (signupBody.innerHTML = html.trim()));
  loginPage.appendChild(loginBody);
}
let spanLetters = document.getElementsByClassName("backLetter");
let spanTexts = document.getElementById("backText");

spanTexts.addEventListener("mouseover", function () {
  for (spanLetter of spanLetters) {
    spanLetter.classList.remove("active");
    spanLetter.classList.add("activeG");
  }
});

// Add a mouseout event listener to the div element
spanTexts.addEventListener("mouseout", function () {
  for (spanLetter of spanLetters) {
    spanLetter.classList.remove("activeG");
    spanLetter.classList.add("active");
  }
});
let signupButton,loginButton;
function refreshButtons(){
  signupButton = document.getElementById("signupButton");
  loginButton = document.getElementById("loginButton");
  if(signupButton!=undefined){
    signupButton.addEventListener("click",()=>{
      loginPage.removeChild(document.getElementById("replace"));
      loginPage.appendChild(signupBody);
      refreshButtons();
    });
  };
  if(loginButton!=undefined){
    loginButton.addEventListener("click",()=>{
      loginPage.removeChild(document.getElementById("replace"));
      loginPage.appendChild(loginBody);
      refreshButtons();
    });
  };
}

setTimeout(() => {
  refreshButtons();
}, 50);