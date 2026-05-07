const counter = document.querySelector("#counter");
const bubble = document.querySelector("#quote-bubble");
const quoteText = document.querySelector("#quote-text");
const quoteAuthor = document.querySelector("#quote-author");

const escapeHTML = value =>
  String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);

fetch("data/phrases.json")
  .then(response => {
    if (!response.ok) throw new Error("Error al cargar JSON");
    return response.json();
  })
  .then(data => {
    if (data.phrases && data.phrases.length > 0) {
      // 1. Selección Aleatoria
      const randomIndex = Math.floor(Math.random() * data.phrases.length);
      const selectedPhrase = data.phrases[randomIndex];

      // 2. Inyectar datos en el globo (CSS se encarga del wrap y clamp)
      quoteText.innerHTML = `"${escapeHTML(selectedPhrase.text)}"`;
      quoteAuthor.textContent = `- ${escapeHTML(selectedPhrase.author)}`;
      
      // Mostrar el globo después de cargar el texto
      bubble.style.display = "flex";

      // 3. Actualizar contador (opcional)
      if (counter) {
        counter.textContent = `${data.meta.totalPhrases} frases inmortalizadas`;
      }
    }
  })
  .catch(err => {
    console.error(err);
    if (counter) counter.textContent = "Error al cargar la sabiduría del ninja.";
  });
