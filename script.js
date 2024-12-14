const OPTIONS = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "bd0aa44d41msh6d0d578eaa4c92ep14ef3ejsn8dae351e0a8c",
    "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
  },
};

const fetchIpInfo = (ip) => {
  return fetch(
    `https://weatherapi-com.p.rapidapi.com/current.json?q=${ip}`,
    OPTIONS
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

const form = document.querySelector("#form");
const input = document.querySelector("#input");
const submit = document.querySelector("#submit");
const resuts = document.querySelector("#results");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const { value } = input;
  if (!value) return;

  submit.setAttribute("disabled", " ");
  submit.setAttribute("aria-busy", "true");

  const ipinfo = await fetchIpInfo(value);

  if (ipinfo) {
    const { location, current } = ipinfo;
    results.innerHTML = `
        <h3>Información del clima</h3>
        <p><strong>Ubicación:</strong> ${location.name}, ${location.region}, ${location.country}</p>
        <p><strong>Temperatura:</strong> ${current.temp_c}°C</p>
        <p><strong>Condición:</strong> ${current.condition.text}</p>
        <img src="${current.condition.icon}" alt="Icono del clima">
    `;
  }

  submit.removeAttribute("disabled");
  submit.removeAttribute("aria-busy");
});
