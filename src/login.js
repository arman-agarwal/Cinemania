import loginAuth from "./loginAuth.js";
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
  await loginAuth.signoutUser();
  await fetch("components/loginForm.html")
    .then((response) => response.text())
    .then((html) => (loginBody.innerHTML = html.trim()));
  await fetch("components/signUp.html")
    .then((response) => response.text())
    .then((html) => (signupBody.innerHTML = html.trim()));

  loginPage.children[1].insertAdjacentElement("beforebegin", loginBody);
  let loginButtonList = loginBody.children[0].children[0];
  let signupButtonList = signupBody.children[0].children[0];
  document
    .getElementById("googleSign")
    .addEventListener("click", handleGoogleSignIn);
  document.getElementById("signupButton").addEventListener("click", () => {
    loginPage.removeChild(document.getElementById("replace"));
    loginPage.children[1].insertAdjacentElement("beforebegin", signupBody);
    if (!x) refreshFields();
    x = true;
  });
  document.getElementById("submit").addEventListener("click", async () => {
    console.log(document.getElementById("username").value);
    console.log(document.getElementById("password").value);
    let status = await loginAuth.loginUser(
      document.getElementById("username").value,
      document.getElementById("password").value
    );
    if (status === 1) {
      sessionStorage.setItem("email", loginAuth.auth.currentUser.email);
      sessionStorage.setItem("name", loginAuth.auth.currentUser.name);
      sessionStorage.setItem("uid", loginAuth.auth.currentUser.uid);
      sessionStorage.setItem("login", true);
      location.href = "index.html";
    } else alert("error logging in");
  });

  document.getElementById("forgotPass").addEventListener("click", () => {
    const resetBox = document.getElementById("resetBox");
    resetBox.innerHTML = `<input required type="email" id="resetEmail" class="input" placeholder="email" />
    <button type="button" id="resetButton" value="">Submit</button>`;
    resetBox.children[1].addEventListener("click", async () => {
      let res = await loginAuth.resetPass(auth, resetBox.children[0].value);
      if (res === 1) {
        alert("Email Sent!");
        setTimeout(() => {
          document.getElementById("resetBox").innerHTML = "";
        }, 300);
      } else {
        alert("Error Sending Email");
      }
    });
  });
};

function refreshFields() {
  let lastName = document.getElementById("lastName");
  let firstName = document.getElementById("firstName");
  if (lastName !== null) {
    lastName.addEventListener("keyup", () => {
      if (firstName.value == "" || lastName.value == "") setDefault();
      else {
        document.getElementById("email").placeholder =
          firstName.value + lastName.value + "@gmail.com";
      }
    });
  }
  if (firstName !== null) {
    firstName.addEventListener("keyup", () => {
      if (firstName.value == "" || lastName.value == "") setDefault();
      else {
        document.getElementById("email").placeholder =
          firstName.value + lastName.value + "@gmail.com";
      }
    });
  }
  document
    .getElementById("googleSign")
    .addEventListener("click", handleGoogleSignIn);
  document.getElementById("loginButton").addEventListener("click", () => {
    loginPage.removeChild(document.getElementById("replace"));
    loginPage.children[1].insertAdjacentElement("beforebegin", loginBody);
  });

  document.getElementById("submit").addEventListener("click", async () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    if (checkData(email, password)) {
      let status = await loginAuth.signupUser(
        firstName,
        lastName,
        email,
        password
      );
      if (status === 1) {
        
        sessionStorage.setItem("email", loginAuth.auth.currentUser.email);
        sessionStorage.setItem("name", loginAuth.auth.currentUser.name);
        sessionStorage.setItem("uid", loginAuth.auth.currentUser.uid);
        console.log("logged in new user");
        location.href = "index.html";
      } else alert("error signing up");
    }
  });
}

function setDefault() {
  document.getElementById("email").placeholder = "email@gmail.com";
}

function checkStrength(password) {
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
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
  if (!regex.test(email)) {
    alert("invalid email");
    return false;
  }
  if (!checkStrength(password)) {
    alert("weak password");
    return false;
  }
  return true;
}

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
  const result = await loginAuth.google(auth).catch((e) => -1);
  if (result === -1) alert("error");
  else {
    sessionStorage.setItem("email", loginAuth.auth.currentUser.email);
    sessionStorage.setItem("name", loginAuth.auth.currentUser.name);
    sessionStorage.setItem("uid", loginAuth.auth.currentUser.uid);
    location.href = "index.html";
  }
}

//logout functionality
document.getElementById("Logout").addEventListener("click", () => {
  loginAuth.signoutUser();
});
