function getJoke() {
  let config = {
    headers: {
      Accept: "application/json",
    },
  };

  axios
    .get("https://icanhazdadjoke.com", config)
    .then((res) => {
      console.log(res.data.joke);

      document.getElementById("joke").textContent = res.data.joke;
    })
    .catch((err) => {
      document.getElementById("joke").textContent =
        "An error occurred while fetching joke";
    });
}

window.onload = getJoke;
