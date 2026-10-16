const themeToggle = document.querySelector("#theme-toggle");
const themeStorageKey = "posle-titrov-theme";

const readStoredTheme = () => {
  try {
    return localStorage.getItem(themeStorageKey);
  } catch {
    return null;
  }
};

const readWindowTheme = () => {
  const prefix = `${themeStorageKey}:`;
  return window.name.startsWith(prefix) ? window.name.slice(prefix.length) : null;
};

const applyTheme = (theme) => {
  const isLight = theme === "light";
  const actionText = isLight ? "Включить тёмную тему" : "Включить светлую тему";

  document.body.classList.toggle("light-theme", isLight);

  if (themeToggle) {
    themeToggle.setAttribute("aria-label", actionText);
    themeToggle.setAttribute("title", actionText);
    themeToggle.querySelector("span").textContent = isLight ? "☾" : "☀";
  }
};

const saveTheme = (theme) => {
  window.name = `${themeStorageKey}:${theme}`;

  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {
    // window.name сохраняет тему при переходах между локальными HTML-файлами.
  }
};

const initialTheme = readWindowTheme() || readStoredTheme() || "dark";
applyTheme(initialTheme);

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("light-theme") ? "dark" : "light";
  applyTheme(nextTheme);
  saveTheme(nextTheme);
});

const filterButtons = document.querySelectorAll(".filter-button");
const movieCards = document.querySelectorAll(".movie-card");
const filterStatus = document.querySelector("#filter-status");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedGenre = button.dataset.filter;
    let visibleCards = 0;

    filterButtons.forEach((item) => {
      const isCurrent = item === button;
      item.classList.toggle("is-active", isCurrent);
      item.setAttribute("aria-pressed", String(isCurrent));
    });

    movieCards.forEach((card) => {
      const genres = card.dataset.genre.split(" ");
      const shouldShow = selectedGenre === "all" || genres.includes(selectedGenre);

      card.hidden = !shouldShow;
      visibleCards += shouldShow ? 1 : 0;
    });

    if (filterStatus) {
      const word = visibleCards === 1 ? "фильм" : visibleCards < 5 ? "фильма" : "фильмов";
      filterStatus.textContent = `Показано: ${visibleCards} ${word}`;
    }
  });
});

const suggestionForm = document.querySelector("#suggestion-form");

if (suggestionForm) {
  const visitorName = document.querySelector("#visitor-name");
  const filmTitle = document.querySelector("#film-title");
  const formResponse = document.querySelector("#form-response");

  suggestionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = visitorName.value.trim();
    const film = filmTitle.value.trim();

    formResponse.textContent = `${name}, спасибо! Фильм «${film}» добавлен в список.`;
    suggestionForm.reset();
  });
}
