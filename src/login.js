let loginPage = document.getElementById("loginPage");
let loginBody = document.createElement("div");
let signupButton, loginButton, submitButton;
loginBody.setAttribute("id", "replace");
let signupBody = document.createElement("div");
signupBody.setAttribute("id", "replace");
let x = false;
window.onload = async () => {
  let spanTexts = document.getElementsByClassName("backLetter");
  for (spanText of spanTexts) {
    spanText.classList.add("active");
  }

  await fetch("components/loginForm.html")
    .then((response) => response.text())
    .then((html) => (loginBody.innerHTML = html.trim()));
  await fetch("components/signUp.html")
    .then((response) => response.text())
    .then((html) => (signupBody.innerHTML = html.trim()));

  loginPage.children[1].insertAdjacentElement("beforebegin", loginBody);

  let loginButtonList = loginBody.children[0].children[0];
  let signupButtonList = signupBody.children[0].children[0];

  loginButtonList.children[4].addEventListener("click", () => {
    loginPage.removeChild(document.getElementById("replace"));
    loginPage.children[1].insertAdjacentElement("beforebegin", signupBody);
    if (!x) refreshFields();
    x = true;
  });

  signupButtonList.children[7].addEventListener("click", () => {
    loginPage.removeChild(document.getElementById("replace"));
    loginPage.children[1].insertAdjacentElement("beforebegin", loginBody);
  });

  loginButtonList.children[3].addEventListener("click", () => {
    location.href = "index.html";
  });
  console.log(signupButtonList.children[4].children[1]);
  signupButtonList.children[6].addEventListener("click", () => {
    if (
      checkData(
        signupButtonList.children[4].children[1],
        signupButtonList.children[5].children[1].value
      )
    )
      location.href = "index.html";
  });
};
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

function refreshFields() {
  let lastName = document.getElementById("lastName");
  let firstName = document.getElementById("firstName");
  if (lastName != null) {
    lastName.addEventListener("keyup", () => {
      if (firstName.value == "" || lastName.value == "") setDefault();
      else {
        document.getElementById("username").placeholder =
          firstName.value + lastName.value;
        document.getElementById("email").placeholder =
          firstName.value + lastName.value + "@gmail.com";
      }
    });
  }
  if (firstName != null) {
    firstName.addEventListener("keyup", () => {
      if (firstName.value == "" || lastName.value == "") setDefault();
      else {
        document.getElementById("username").placeholder =
          firstName.value + lastName.value;
        document.getElementById("email").placeholder =
          firstName.value + lastName.value + "@gmail.com";
      }
    });
  }
}

function setDefault() {
  document.getElementById("username").placeholder = "username";
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
      password.includes(lastName.value)) ||
    (username !== undefined &&
      username.value.length !== 0 &&
      password.includes(username.value))
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
