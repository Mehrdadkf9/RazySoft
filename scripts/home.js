function loadHome() {
  let token = localStorage.getItem("token");
  fetch("https:portal-razy.fandogh.cloud/api/user/profile/", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .then((res) => {
        console.log("Hello");
      console.log(JSON.stringify(res));
    });
}

loadHome();
