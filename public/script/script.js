fetch("/api/products")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    let html = "<ul>";

    for (let index = 0; index < data.length; index++) {
      html += `<li>${data[index].title}</li>`;
    }
    html += "</ul>";

    document.querySelector("#main").innerHTML = html;
  });
