// function focusname() {
//   document.getElementById("id-number").focus();
// }

var idnumber = document.getElementById("id-number");
var loginpsw = document.getElementById("login-password");
var loginerror = document.getElementById("error-login");

idnumber.addEventListener("focusout", validateid);

function validateid() {
  if (idnumber.value > 99999 || idnumber.value < 10000) {
    loginerror.textContent = "شماره اشتراک میبایست یک عدد 5 رقمی باشد";
    idnumber.value = "";
    idnumber.focus();
    setTimeout(function () {
      loginerror.textContent = "";
    }, 5000);
  }
}

document.getElementById("login-form").addEventListener("submit", login);

function login(event) {
  event.preventDefault();

  if (idnumber.value === "" || loginpsw.value === "") {
    loginerror.textContent = "پر کردن هر دو فیلد الزامیست";
    return false;
  } else {
    fetch("https://portal-razy.fandogh.cloud/api/authenticate/", {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(idnumber.value + ":" + loginpsw.value),
      },
    })
      .then((res) => {
        console.log("#1");
        if (res.status !== 201) {
          console.log("#2");
          loginerror.innerHTML = "* شماره اشتراک یا رمز عبور نامعتبر است";
          throw Error("");
        }
        console.log("#3");
        return res.json();
      })
      .then((res) => {
        console.log("#4");
        console.log(res);
        var userToken = res.token;
        localStorage.setItem("token", userToken);
        loginerror.innerHTML = "";
        location.replace("Home.html");
      })
      .catch((e) => {
        console.log("#5");
        console.log(e);
      });
  }
}
