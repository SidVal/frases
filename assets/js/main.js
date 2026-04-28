const counter = document.querySelector("#counter");
const container = document.querySelector("#phrases");

const escapeHTML = value =>
  String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);

fetch("data/phrases.json")
  .then(response => response.json())
  .then(data => {
    counter.textContent = `${data.meta.totalPhrases} frases inmortalizadas`;

    container.innerHTML = data.phrases
      .map(phrase => `
        <article>
          <blockquote>${escapeHTML(phrase.text)}</blockquote>
          <cite>${escapeHTML(phrase.author)}</cite>
        </article>
      `)
      .join("");
  })
  .catch(() => {
    counter.textContent = "No se pudieron cargar las frases.";
  });
