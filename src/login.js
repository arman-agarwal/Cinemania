import * as loginAuth from "./loginAuth.js";
let auth;
let loginPage = document.getElementById("loginPage");
let loginBody = document.createElement("div");
loginBody.setAttribute("id", "replace");
let signupBody = document.createElement("div");
signupBody.setAttribute("id", "replace");
let x = false;
window.onload = async () => {
  let spanTexts = document.getElementsByClassName("backLetter");
  for (let spanText of spanTexts) {
    spanText.classList.add("active");
  }
  auth = loginAuth.init();
  loginAuth.signoutUser(auth);
  await fetch("components/loginForm.html")
    .then((response) => response.text())
    .then((html) => (loginBody.innerHTML = html.trim()));
  await fetch("components/signUp.html")
    .then((response) => response.text())
    .then((html) => (signupBody.innerHTML = html.trim()));

  loginPage.children[1].insertAdjacentElement("beforebegin", loginBody);
  let loginButtonList = loginBody.children[0].children[0];
  let signupButtonList = signupBody.children[0].children[0];
  document.getElementById("googleSign").addEventListener("click",handleGoogleSignIn);
  loginButtonList.children[4].addEventListener("click", () => {
    loginPage.removeChild(document.getElementById("replace"));
    loginPage.children[1].insertAdjacentElement("beforebegin", signupBody);
    if (!x) refreshFields();
    x = true;
  });

  signupButtonList.children[6].addEventListener("click", () => {
    loginPage.removeChild(document.getElementById("replace"));
    loginPage.children[1].insertAdjacentElement("beforebegin", loginBody);
  });
  loginButtonList.children[3].addEventListener("click", () => {
    let temp = loginBody.children[0].children[0].children;
    let status = loginAuth.loginUser(
      auth,
      temp[1].children[1].value,
      temp[2].children[1].value
    );
    if ((status = 1)) location.href = "index.html";
    else alert("error logging in");
  });
  signupButtonList.children[5].addEventListener("click", () => {
    if (
      checkData(
        signupButtonList.children[3].children[1],
        signupButtonList.children[4].children[1].value
      )
    ) {
      let email = signupButtonList.children[3].children[1].value;
      let pass = signupButtonList.children[4].children[1].value;
      let status = loginAuth.signupUser(auth, email, pass);
      location.href = "index.html";
      if ((status = 1)) location.href = "index.html";
      else alert("error signing up in");
    }
  });


  loginButtonList.children[5].addEventListener("click",()=>{
    const resetEmail = document.createElement("div");
    resetEmail.innerHTML = `<input required type="email" id="email" class="input" placeholder="email" />
    <button type="button" id="resetButton" value="">Submit</button>`;
    resetEmail.children[1].addEventListener("click",async ()=>{
      let res = await loginAuth.resetPass(auth, resetEmail.children[0].value);

      console.log(res);
      if (res == 1){
        resetEmail.children[2].innerHTML="Email Sent!";
        setTimeout(() => {
          resetEmail.innerHTML="";
        }, 200);
      }
      else{
        resetEmail.children[2].innerHTML="Error";
      }
    });
    loginButtonList.children[5].children[0].insertAdjacentElement("afterend",resetEmail);
  });
};
let spanLetters = document.getElementsByClassName("backLetter");
let spanTexts = document.getElementById("backText");

spanTexts.addEventListener("mouseover", function () {
  for (let spanLetter of spanLetters) {
    spanLetter.classList.remove("active");
    spanLetter.classList.add("activeG");
  }
});

// Add a mouseout event listener to the div element
spanTexts.addEventListener("mouseout", function () {
  for (let spanLetter of spanLetters) {
    spanLetter.classList.remove("activeG");
    spanLetter.classList.add("active");
  }
});

function refreshFields() {
  let lastName = document.getElementById("lastName");
  let firstName = document.getElementById("firstName");
  if (lastName != null) {
    lastName.addEventListener("keyup", () => {
      if (firstName.value == "" || lastName.value == "") setDefault();
      else {
        document.getElementById("email").placeholder =
          firstName.value + lastName.value + "@gmail.com";
      }
    });
  }
  if (firstName != null) {
    firstName.addEventListener("keyup", () => {
      if (firstName.value == "" || lastName.value == "") setDefault();
      else {
        document.getElementById("email").placeholder =
          firstName.value + lastName.value + "@gmail.com";
      }
    });
  }
  document.getElementById("googleSign").addEventListener("click", handleGoogleSignIn);
}

function setDefault() {
  document.getElementById("email").placeholder = "email@gmail.com";
}

function checkStrength(password) {
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let username = document.getElementById("username");
  if (
    "string" !== typeof password ||
    password.length < 5 ||
    (firstName !== undefined &&
      firstName.value.length !== 0 &&
      password.includes(firstName.value)) ||
    (lastName !== undefined &&
      lastName.value.length !== 0 &&
      password.includes(lastName.value))
  ) {
    return false;
  }
  return true;
}

function checkData(email, password) {
  let regex = /\S+@\S+\.\S+$/;
  if (!regex.test(email.value)) {
    alert("invalid email");
    return false;
  }
  if (!checkStrength(password)) {
    alert("weak password");
    return false;
  }
  return true;
}

//dark Mode code
const light = document.getElementById("lightButton");
const dark = document.getElementById("darkButton");
const sun = document.getElementById("sunImg");
const moon = document.getElementById("moonImg");
const body = document.body;

light.addEventListener("click", function () {
  moon.classList.add("img-faded");
  moon.classList.remove("img-normal");
  sun.classList.add("img-normal");
  sun.classList.remove("img-faded");
  body.classList.remove("dark-mode");
});

dark.addEventListener("click", function () {
  moon.classList.remove("img-faded");
  moon.classList.add("img-normal");
  sun.classList.remove("img-normal");
  sun.classList.add("img-faded");
  body.classList.add("dark-mode");
});

async function handleGoogleSignIn() {
  const result = await loginAuth.google(auth).catch(e=>-1);
  if(result==-1)alert("error");
  else location.href = "index.html";
}
