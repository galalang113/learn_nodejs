document.querySelector("#submit").onclick = function (event) {
  event.preventDefault();

  var input = document.querySelector('input[type="file"]');

  var data = new FormData();
  data.append("avatar", input.files[0]);

  fetch("/profile", {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};
