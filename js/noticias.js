const API_KEY = "97a7b8a432f44497bea284bb637f80ba";
const BASE_API = "http://newsapi.org";

const painelNoticias = document.querySelector("#listaDeNoticias");
const linkTecnologias = document.querySelector("#tecnologias");

const switchTema = document.querySelector("#theme div input")
const backgroundBody = document.querySelector("body")
const cardBody = document.getElementsByClassName('card-body')

linkTecnologias.onclick = (event) => {
  event.preventDefault();
  painelNoticias.innerHTML = "";
  getNoticias("&category=technology");
};

switchTema.addEventListener("change", () => {
  const cardList = document.querySelectorAll(".card");
  const header = document.querySelector(".bg-info");
  const body = document.querySelector("body");

  if (switchTema.checked) {
    body.setAttribute("class", "bg-secondary text-white");
    cardList.forEach((card) => {
      card.classList.add("bg-secondary", "text-white");
    });
    header.classList.add("bg-dark", "text-white");
  } else {
    body.removeAttribute("class");
    cardList.forEach((card) => {
      card.classList.remove("bg-secondary", "text-white");
    });
    header.classList.remove("bg-dark", "text-white");
  }
});

async function getNoticias(categoria = "") {
  const res = await fetch(
    `${BASE_API}/v2/top-headlines?country=br${categoria}`,
    {
      method: "GET",
      headers: {
        Authorization: API_KEY,
      },
    }
  );
  const noticias = await res.json();

  if (res.status !== 200) {
    return alert("error ao carregar noticias");
  }

  noticias.articles.forEach((noticia) => {
    const noticiaHtml = `
    <div class="col-md-6 my-3">
      <div class="card">
        <img
          class="card-img-top"
          src="${noticia.urlToImage}"
        />
        <div class="card-body">
          <h5 class="card-title">
            ${noticia.title}
          </h5>
          <p class="card-text">
             ${noticia.description}
          </p>
          <a
            class="btn btn-primary"
            target='_blank'
            href="${noticia.url}"
            >Ir para noticia</a
          >
        </div>
      </div>
    </div>`;

    painelNoticias.insertAdjacentHTML("beforeend", noticiaHtml);
  });
}

getNoticias();
