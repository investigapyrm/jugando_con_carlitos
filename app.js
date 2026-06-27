const APP_VERSION = "v0.5.0";
const BUILD_DATE = "2026-06-27";
const STORAGE_KEY = "jugando-carlitos:progress:v2";
const LEGACY_STORAGE_KEY = "jugando-carlitos:progress:v1";

const ASSETS = {
  hero: "assets/generated/hero_jugando_con_carlitos.png",
  mascot: "assets/generated/carlitos_character_sheet_v01.png",
};

const ROBOT_MAX_HP = 100;

const DIFFICULTIES = {
  explorar: {
    label: "Explorar",
    short: "Calmo",
    range: [2, 10],
    target: 4,
    bonus: 0,
    timeLimit: 24000,
  },
  desafio: {
    label: "Desafio",
    short: "Activo",
    range: [5, 24],
    target: 6,
    bonus: 3,
    timeLimit: 17000,
  },
  experto: {
    label: "Experto",
    short: "Rapido",
    range: [9, 48],
    target: 8,
    bonus: 6,
    timeLimit: 12000,
  },
};

const AGE_GROUPS = [
  {
    id: "peques",
    label: "4 a 7",
    navTitle: "Peques",
    title: "Pequenos exploradores",
    subtitle: "Juegos visuales, cortos y manipulables para contar, ordenar y descubrir patrones.",
    goal: "Reconocer cantidades, comparar, tocar piezas y ganar confianza sin presion.",
    recommendedDifficulty: "explorar",
    gameIds: ["semillas", "rio", "patrones"],
  },
  {
    id: "ninos",
    label: "8 a 12",
    navTitle: "Ninos",
    title: "Aventureros matematicos",
    subtitle: "Retos con calculo mental, fracciones, datos, probabilidad y batalla matematica.",
    goal: "Practicar velocidad, estrategia, lectura de datos y operaciones combinadas.",
    recommendedDifficulty: "desafio",
    gameIds: ["semillas", "rio", "fracciones", "datos", "azar", "barras", "patrones", "robots"],
  },
  {
    id: "mayores",
    label: "12+",
    navTitle: "Mayores",
    title: "Desafio avanzado",
    subtitle: "Misiones de analisis, patrones, estadistica y estrategia para estudiantes mayores.",
    goal: "Resolver con argumentos, comparar escenarios y tomar decisiones con datos.",
    recommendedDifficulty: "experto",
    gameIds: ["datos", "azar", "barras", "patrones", "robots"],
  },
];

const GAMES = [
  {
    id: "semillas",
    title: "Semillas veloces",
    concept: "Suma y conteo",
    short: "Cuenta dos grupos y encuentra el total antes de perder la racha.",
    badge: "Explorador de sumas",
    level: "Nivel 1",
    mission: "Reunir semillas para abrir la huerta matematica.",
    color: "gold",
    ages: ["peques", "ninos"],
    mechanic: "El reto aparece como una tarjeta de operacion. Mira los dos grupos, suma y toca la respuesta correcta.",
  },
  {
    id: "rio",
    title: "Rio de numeros",
    concept: "Orden y comparacion",
    short: "Construye una ruta ordenada de menor a mayor.",
    badge: "Guia del orden",
    level: "Nivel 2",
    mission: "Cruzar el rio construyendo una ruta numerica segura.",
    color: "sky",
    ages: ["peques", "ninos"],
    mechanic: "Toca las piedras en orden ascendente y luego pulsa comprobar.",
  },
  {
    id: "fracciones",
    title: "Huerta partida",
    concept: "Fracciones",
    short: "Selecciona partes iguales para representar una fraccion.",
    badge: "Constructor de fracciones",
    level: "Nivel 3",
    mission: "Repartir una huerta en partes iguales sin perder el todo.",
    color: "green",
    ages: ["ninos", "mayores"],
    mechanic: "Pinta la cantidad de partes pedidas y comprueba la fraccion.",
  },
  {
    id: "datos",
    title: "Datos del vivero",
    concept: "Promedio, mediana y moda",
    short: "Ordena mentalmente los datos y encuentra la medida solicitada.",
    badge: "Investigador de datos",
    level: "Nivel 4",
    mission: "Ayudar al vivero a entender sus registros diarios.",
    color: "plum",
    ages: ["ninos", "mayores"],
    mechanic: "Mira las tarjetas de datos y responde promedio, mediana o moda.",
  },
  {
    id: "azar",
    title: "Rueda del azar",
    concept: "Probabilidad",
    short: "Compara sectores y predice que resultado tiene mas caminos.",
    badge: "Detective del azar",
    level: "Nivel 5",
    mission: "Descubrir que opcion tiene mas oportunidades de aparecer.",
    color: "coral",
    ages: ["ninos", "mayores"],
    mechanic: "Observa cuantos sectores tiene cada color y elige el mas probable.",
  },
  {
    id: "barras",
    title: "Grafico reciclador",
    concept: "Graficos de barras",
    short: "Lee barras y convierte datos visuales en respuestas.",
    badge: "Lector de graficos",
    level: "Nivel 6",
    mission: "Leer un reporte visual de materiales recuperados.",
    color: "green",
    ages: ["ninos", "mayores"],
    mechanic: "Compara las barras para hallar total o diferencia.",
  },
  {
    id: "patrones",
    title: "Ritmo de patrones",
    concept: "Secuencias",
    short: "Sigue el ritmo numerico y completa el siguiente pulso.",
    badge: "Maestro de patrones",
    level: "Nivel 7",
    mission: "Escuchar la regla secreta de una secuencia numerica.",
    color: "navy",
    ages: ["peques", "ninos", "mayores"],
    mechanic: "Busca la regla: sumar, restar, duplicar o crecer por cuadrados.",
  },
  {
    id: "robots",
    title: "Guerra de Robots",
    concept: "Multiplicacion, parentesis y estrategia",
    short: "Ataca el escudo rival resolviendo cartas, poderes y calculo mental.",
    badge: "Piloto de robots",
    level: "Nivel 8",
    mission: "Reducir los puntos de vida del robot enemigo con multiplicaciones correctas.",
    color: "steel",
    ages: ["ninos", "mayores"],
    mechanic: "Resuelve tu operacion de cartas. Si aciertas, tu robot ataca; si fallas, el disparo rebota.",
  },
];

const app = document.querySelector("#app");
let challengeTimer = null;

const state = {
  route: "inicio",
  activeGame: "semillas",
  activeCategory: "ninos",
  challenge: null,
  answered: false,
  feedback: null,
  picked: [],
  progress: readProgress(),
};

initApp();

function initApp() {
  state.activeGame = state.progress.lastGame || "semillas";
  state.activeCategory = normalizeCategoryId(state.progress.lastCategory || "ninos");
  syncRoute();
  renderApp();
  registerServiceWorker();

  window.addEventListener("hashchange", () => {
    syncRoute();
    renderApp();
  });
  window.addEventListener("keydown", handleKeyboard);
}

function syncRoute() {
  const hash = decodeURIComponent(window.location.hash.replace(/^#/, "") || "inicio");
  const clean = hash.replace(/^juego-/, "");
  const game = getGame(clean);
  const category = getAgeGroup(clean);

  if (category) {
    state.route = "category";
    state.activeCategory = category.id;
    state.progress.lastCategory = category.id;
    writeProgress();
    return;
  }

  if (game && clean !== "inicio") {
    state.route = "game";
    state.activeCategory = categoryForGame(game.id, state.progress.lastCategory).id;
    if (state.activeGame !== game.id || !state.challenge) {
      state.activeGame = game.id;
      state.challenge = createChallenge(game.id);
      state.answered = false;
      state.feedback = null;
      state.picked = [];
    }
    state.progress.lastGame = game.id;
    state.progress.lastCategory = state.activeCategory;
    writeProgress();
    return;
  }

  state.route = "inicio";
}

function renderApp() {
  document.body.classList.toggle("motion-off", prefersReducedMotion());
  const totalStars = GAMES.reduce((total, game) => total + gameStars(game.id), 0);

  app.innerHTML = `
    <header class="app-top">
      <div class="top-inner">
        <a class="brand" href="#inicio">Jugando con Carlitos</a>
        <nav class="top-game-tabs" aria-label="Categorias por edad">
          ${AGE_GROUPS.map((category) => `
            <a href="#${category.id}" class="${state.activeCategory === category.id && state.route !== "inicio" ? "active" : ""}">
              ${escapeHtml(category.label)} <span>${escapeHtml(category.navTitle)}</span>
            </a>
          `).join("")}
        </nav>
        <div class="top-actions">
          <span class="score-pill">Puntos: ${state.progress.score}</span>
          <span class="level-pill">Racha: ${state.progress.streak}</span>
          <span class="mode-pill">Estrellas: ${totalStars}/${GAMES.length * 3}</span>
          <button type="button" class="reset-button" id="toggleSound">Sonido: ${state.progress.soundOn ? "Si" : "No"}</button>
          <button type="button" class="reset-button" id="toggleMotion">Animaciones: ${state.progress.motionOff ? "No" : "Si"}</button>
          <button type="button" class="reset-button" id="resetProgress">Reiniciar</button>
        </div>
      </div>
    </header>

    ${state.route === "game" ? renderGameView() : state.route === "category" ? renderCategoryView() : renderHomeView()}

    <footer class="footer">
      <span>Borrador interno. Personaje e imagenes requieren autorizacion antes de publicacion final.</span>
      <span class="version">${APP_VERSION} | ${BUILD_DATE}</span>
    </footer>
  `;

  bindEvents();
}

function renderHomeView() {
  const unlockedBadges = GAMES.filter((game) => gameStars(game.id) > 0).length;
  const last = getGame(state.progress.lastGame || state.activeGame) || GAMES[0];

  return `
    <section class="hero home-hero" style="--hero-image: url('${ASSETS.hero}')">
      <div class="hero-inner">
        <div class="hero-copy">
          <p class="eyebrow">Matematicas y estadistica jugando</p>
          <h1>Jugando con Carlitos</h1>
          <p>Ahora la app se organiza por edades: juegos visuales para 4 a 7, retos activos para 8 a 12 y desafios avanzados para mayores de 12.</p>
          <div class="hero-actions">
            <a class="hero-button" href="#${state.progress.lastCategory || "ninos"}">Entrar por edad</a>
            <a class="hero-button secondary" href="#${last.id}">Continuar: ${escapeHtml(last.title)}</a>
          </div>
        </div>
        ${renderPlayerCard(unlockedBadges)}
      </div>
    </section>

    <main class="home-view" id="mapa">
      <section class="hub-intro">
        <p class="eyebrow">Vistas por edad</p>
        <h2>Elige la categoria de aprendizaje</h2>
        <p>Cada grupo tiene una ruta propia, dificultad sugerida y juegos que calzan mejor con su nivel de lectura, calculo y abstraccion.</p>
      </section>

      <section class="category-grid" aria-label="Categorias por edad">
        ${AGE_GROUPS.map((category) => renderCategoryCard(category)).join("")}
      </section>

      <section class="game-hub" aria-label="Juegos disponibles">
        ${GAMES.map((game) => renderHubCard(game)).join("")}
      </section>

      <section class="progress-panel home-progress" id="progreso">
        <h2>Insignias de aprendizaje</h2>
        <div class="badge-grid">
          ${GAMES.map((game) => `
            <div class="badge${gameStars(game.id) ? "" : " locked"}">
              <strong>${escapeHtml(gameStars(game.id) ? game.badge : game.title)}</strong>
              <span>${renderStars(gameStars(game.id))}</span>
            </div>
          `).join("")}
        </div>
      </section>
    </main>
  `;
}

function renderCategoryView() {
  const category = getAgeGroup(state.activeCategory) || AGE_GROUPS[1];
  const games = gamesForCategory(category.id);
  const recommended = DIFFICULTIES[category.recommendedDifficulty] || DIFFICULTIES.desafio;

  return `
    <main class="category-view theme-category-${category.id}">
      <section class="category-hero">
        <div>
          <p class="eyebrow">Categoria ${escapeHtml(category.label)}</p>
          <h1>${escapeHtml(category.title)}</h1>
          <p>${escapeHtml(category.subtitle)}</p>
          <span>${escapeHtml(category.goal)}</span>
        </div>
        <aside>
          <strong>${escapeHtml(recommended.label)}</strong>
          <p>Dificultad sugerida para esta categoria.</p>
          <button type="button" data-category-difficulty="${escapeAttribute(category.recommendedDifficulty)}">
            Usar modo ${escapeHtml(recommended.label)}
          </button>
        </aside>
      </section>

      <section class="category-path">
        <div class="section-minihead">
          <p class="eyebrow">Ruta recomendada</p>
          <h2>Juegos para ${escapeHtml(category.label)}</h2>
        </div>
        <div class="game-hub">
          ${games.map((game) => renderHubCard(game)).join("")}
        </div>
      </section>
    </main>
  `;
}

function renderCategoryCard(category) {
  const games = gamesForCategory(category.id);
  const stars = games.reduce((total, game) => total + gameStars(game.id), 0);
  return `
    <article class="category-card theme-category-${category.id}">
      <span>${escapeHtml(category.label)}</span>
      <h3>${escapeHtml(category.title)}</h3>
      <p>${escapeHtml(category.subtitle)}</p>
      <div class="category-card-meta">
        <strong>${games.length}</strong>
        <small>juegos</small>
        <strong>${stars}</strong>
        <small>estrellas</small>
      </div>
      <a class="play-link" href="#${category.id}">Abrir categoria</a>
    </article>
  `;
}

function renderPlayerCard(unlockedBadges) {
  return `
    <aside class="player-card" aria-label="Perfil local del jugador">
      <div class="player-head">
        <div class="mascot">
          <img src="${ASSETS.mascot}" alt="Carlitos">
        </div>
        <div>
          <p class="eyebrow">Jugador local</p>
          <h2>${escapeHtml(state.progress.name || "Equipo Carlitos")}</h2>
          <p>Los avances se guardan solo en este navegador.</p>
        </div>
      </div>
      <div class="name-row">
        <input id="playerName" maxlength="32" value="${escapeAttribute(state.progress.name)}" aria-label="Nombre del jugador" placeholder="Nombre del equipo">
        <button type="button" id="saveName">Guardar</button>
      </div>
      <div class="stats-row">
        <div class="stat-box"><strong>${state.progress.score}</strong><span>puntos</span></div>
        <div class="stat-box"><strong>${state.progress.played}</strong><span>retos</span></div>
        <div class="stat-box"><strong>${Math.round(accuracy() * 100)}%</strong><span>aciertos</span></div>
      </div>
      <div class="daily-mission">
        <span>Mision del dia</span>
        <strong>Completa retos en tres pestanas diferentes y compara tus aciertos.</strong>
        <small>${unlockedBadges}/${GAMES.length} misiones con al menos una estrella.</small>
      </div>
    </aside>
  `;
}

function renderHubCard(game) {
  const stats = getGameStats(game.id);
  const stars = gameStars(game.id);
  const progress = gameProgressPercent(game.id);
  const ageLabels = game.ages.map((age) => getAgeGroup(age)?.label).filter(Boolean).join(" / ");

  return `
    <article class="hub-card theme-${game.color}">
      <div class="hub-card-top">
        <span>${escapeHtml(game.level)}</span>
        <span class="star-row">${renderStars(stars)}</span>
      </div>
      <h3>${escapeHtml(game.title)}</h3>
      <p>${escapeHtml(game.short)}</p>
      <div class="hub-meta">
        <span>${escapeHtml(game.concept)}</span>
        <span>${escapeHtml(ageLabels)}</span>
        <span>${stats.correct}/${DIFFICULTIES[state.progress.difficulty].target} aciertos</span>
      </div>
      <div class="mini-progress" aria-label="Progreso del juego">
        <i style="width:${progress}%"></i>
      </div>
      <a class="play-link" href="#${game.id}">Abrir vista</a>
    </article>
  `;
}

function renderGameView() {
  const active = getGame(state.activeGame);
  const stats = getGameStats(active.id);
  const difficulty = DIFFICULTIES[state.progress.difficulty];

  return `
    <main class="game-route theme-${active.color}">
      <nav class="view-tabs" aria-label="Cambiar de juego">
        <a href="#inicio">Inicio</a>
        ${GAMES.map((game) => `
          <a href="#${game.id}" class="${game.id === active.id ? "active" : ""}">
            <span>${escapeHtml(game.level)}</span>
            ${escapeHtml(game.title)}
          </a>
        `).join("")}
      </nav>

      <section class="game-view">
        <header class="game-view-header">
          <div>
            <p class="eyebrow">${escapeHtml(active.concept)}</p>
            <h1>${escapeHtml(active.title)}</h1>
            <p>${escapeHtml(active.mission)}</p>
          </div>
          <div class="game-hud">
            <div><strong>${stats.played}</strong><span>retos aqui</span></div>
            <div><strong>${stats.correct}</strong><span>aciertos</span></div>
            <div><strong>${gameStars(active.id)}</strong><span>estrellas</span></div>
            <div><strong>${difficulty.short}</strong><span>dificultad</span></div>
            <div><strong>${stats.bestSpeed || 0}</strong><span>bonus veloz</span></div>
          </div>
        </header>

        <div class="game-layout">
          <section class="game-stage view-stage" aria-live="polite">
            <div class="stage-header">
              <div>
                <p class="eyebrow">Reto activo</p>
                <h2>${escapeHtml(active.short)}</h2>
                <p class="mission-copy">Mecanica: ${escapeHtml(active.mechanic)}</p>
              </div>
              <div class="rhythm-meter" aria-hidden="true">
                ${repeat(7, (index) => `<span style="animation-delay:${index * 90}ms"></span>`)}
              </div>
            </div>
            <div class="energy-bar" aria-label="Energia del reto">
              <span style="width:${Math.max(16, 100 - (stats.played % 10) * 8)}%"></span>
            </div>
            <div class="play-area" id="playArea">
              ${state.challenge ? renderChallenge() : ""}
            </div>
          </section>

          <aside class="control-dock">
            <section class="control-card">
              <h2>Dificultad</h2>
              <div class="difficulty-selector" role="group" aria-label="Dificultad">
                ${Object.entries(DIFFICULTIES).map(([id, item]) => `
                  <button type="button" class="${state.progress.difficulty === id ? "active" : ""}" data-difficulty="${id}">
                    ${escapeHtml(item.label)}
                  </button>
                `).join("")}
              </div>
            </section>

            <section class="control-card">
              <h2>Progreso de esta vista</h2>
              <div class="mini-progress big"><i style="width:${gameProgressPercent(active.id)}%"></i></div>
              <p>${stats.correct} aciertos de ${difficulty.target} para dominar este nivel.</p>
            </section>

            <section class="control-card">
              <h2>Historial</h2>
              ${renderHistory(active.id)}
            </section>

            <section class="control-card">
              <h2>Carlitos explica</h2>
              <p>${escapeHtml(active.mechanic)}</p>
              <button type="button" id="nextChallengeSide">Nuevo reto</button>
            </section>
          </aside>
        </div>
      </section>
    </main>
  `;
}

function renderChallenge() {
  const gameId = state.activeGame;
  const challenge = state.challenge;

  return `
    <div class="challenge-clock" aria-label="Tiempo del reto">
      <span style="animation-duration:${challenge.timeLimit}ms"></span>
    </div>
    <div class="challenge">${escapeHtml(challenge.prompt)}</div>
    <div class="board">${renderBoard(gameId, challenge)}</div>
    ${renderChallengeTools(gameId, challenge)}
    ${renderChoices(challenge)}
    ${renderFeedback()}
    <div class="stage-footer">
      <button type="button" class="mini-button" id="nextChallenge">Nuevo reto</button>
      <span><strong>Carlitos dice:</strong> ${escapeHtml(challenge.hint)}</span>
    </div>
  `;
}

function renderBoard(gameId, challenge) {
  if (gameId === "semillas") return renderSeedBoard(challenge);
  if (gameId === "rio") return renderRiverBoard(challenge);
  if (gameId === "fracciones") return renderFractionBoard(challenge);
  if (gameId === "datos") return renderDataBoard(challenge);
  if (gameId === "azar") return renderChanceBoard(challenge);
  if (gameId === "barras") return renderBarBoard(challenge);
  if (gameId === "robots") return renderRobotBoard(challenge);
  return renderPatternBoard(challenge);
}

function renderChoices(challenge) {
  if (challenge.mode === "interactive") {
    return `<button type="button" id="checkInteractive">Comprobar</button>`;
  }

  return `
    <div class="choice-grid">
      ${challenge.options.map((option, index) => `
        <button type="button" data-answer="${escapeAttribute(option.value)}">
          <kbd>${index + 1}</kbd>
          <span>${escapeHtml(option.label)}</span>
        </button>
      `).join("")}
    </div>
  `;
}

function renderChallengeTools(gameId, challenge) {
  if (gameId === "rio") {
    return `
      <div class="challenge-tools">
        <button type="button" data-undo-pick>Deshacer piedra</button>
      </div>
    `;
  }

  if (gameId === "fracciones") {
    return `
      <div class="challenge-tools">
        <button type="button" data-clear-pieces>Limpiar huerta</button>
      </div>
    `;
  }

  if (gameId === "datos") {
    return `
      <div class="challenge-tools">
        <button type="button" data-sort-data>${challenge.sorted ? "Ver registro original" : "Ordenar datos"}</button>
      </div>
    `;
  }

  if (gameId === "azar") {
    return `
      <div class="challenge-tools">
        <button type="button" data-spin-wheel>Girar una vez</button>
        ${challenge.spinResult ? `<span>Salio: <strong>${escapeHtml(challenge.spinResult)}</strong></span>` : "<span>Gira para observar un resultado posible.</span>"}
      </div>
    `;
  }

  if (gameId === "barras") {
    return `
      <div class="challenge-tools">
        <button type="button" data-highlight-bars>${challenge.highlight ? "Ocultar pistas" : "Resaltar extremos"}</button>
      </div>
    `;
  }

  if (gameId === "patrones") {
    return `
      <div class="challenge-tools">
        <button type="button" data-play-pattern>${challenge.playing ? "Ritmo marcado" : "Marcar ritmo"}</button>
      </div>
    `;
  }

  if (gameId === "robots") {
    return `
      <div class="challenge-tools">
        <button type="button" data-reset-robot-battle>Reparar robots</button>
        <span>Escudo negro divide el dano recibido. Par igual duplica el ataque.</span>
      </div>
    `;
  }

  return "";
}

function renderFeedback() {
  if (!state.feedback) return `<div class="feedback"></div>`;
  return `
    <div class="feedback show ${state.feedback.ok ? "good" : "try"}">
      ${escapeHtml(state.feedback.message)}
    </div>
  `;
}

function bindEvents() {
  document.querySelector("#resetProgress")?.addEventListener("click", () => {
    state.progress = defaultProgress();
    writeProgress();
    state.challenge = state.route === "game" ? createChallenge(state.activeGame) : null;
    state.feedback = null;
    state.answered = false;
    state.picked = [];
    renderApp();
  });

  document.querySelector("#toggleMotion")?.addEventListener("click", () => {
    state.progress.motionOff = !state.progress.motionOff;
    writeProgress();
    renderApp();
  });

  document.querySelector("#toggleSound")?.addEventListener("click", () => {
    state.progress.soundOn = !state.progress.soundOn;
    writeProgress();
    renderApp();
  });

  document.querySelector("#saveName")?.addEventListener("click", () => {
    const input = document.querySelector("#playerName");
    state.progress.name = input.value.trim().slice(0, 32);
    writeProgress();
    renderApp();
  });

  document.querySelectorAll("[data-difficulty]").forEach((button) => {
    button.addEventListener("click", () => {
      state.progress.difficulty = button.dataset.difficulty;
      writeProgress();
      newChallenge();
    });
  });

  document.querySelector("[data-category-difficulty]")?.addEventListener("click", (event) => {
    state.progress.difficulty = event.currentTarget.dataset.categoryDifficulty;
    writeProgress();
    renderApp();
  });

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => submitAnswer(button.dataset.answer, button));
  });

  document.querySelectorAll("[data-number-pick]").forEach((button) => {
    button.addEventListener("click", () => pickNumber(Number(button.dataset.numberPick)));
  });

  document.querySelectorAll("[data-piece]").forEach((button) => {
    button.addEventListener("click", () => togglePiece(Number(button.dataset.piece)));
  });

  document.querySelector("#checkInteractive")?.addEventListener("click", checkInteractive);
  document.querySelector("#nextChallenge")?.addEventListener("click", newChallenge);
  document.querySelector("#nextChallengeSide")?.addEventListener("click", newChallenge);
  document.querySelector("[data-undo-pick]")?.addEventListener("click", () => {
    state.picked = state.picked.slice(0, -1);
    renderApp();
  });
  document.querySelector("[data-clear-pieces]")?.addEventListener("click", () => {
    state.picked = [];
    renderApp();
  });
  document.querySelector("[data-sort-data]")?.addEventListener("click", () => {
    state.challenge.sorted = !state.challenge.sorted;
    renderApp();
  });
  document.querySelector("[data-spin-wheel]")?.addEventListener("click", () => {
    state.challenge.spinResult = weightedChance(state.challenge.colors);
    state.challenge.spinning = true;
    renderApp();
  });
  document.querySelector("[data-highlight-bars]")?.addEventListener("click", () => {
    state.challenge.highlight = !state.challenge.highlight;
    renderApp();
  });
  document.querySelector("[data-play-pattern]")?.addEventListener("click", () => {
    state.challenge.playing = true;
    renderApp();
  });
  document.querySelector("[data-reset-robot-battle]")?.addEventListener("click", () => {
    state.progress.robotBattle = defaultRobotBattle();
    writeProgress();
    newChallenge();
  });

  scheduleChallengeTimeout();
}

function newChallenge() {
  if (state.route !== "game") return;
  clearChallengeTimer();
  state.challenge = createChallenge(state.activeGame);
  state.feedback = null;
  state.answered = false;
  state.picked = [];
  renderApp();
}

function createChallenge(gameId) {
  let challenge;
  if (gameId === "semillas") challenge = createSeedChallenge();
  else if (gameId === "rio") challenge = createRiverChallenge();
  else if (gameId === "fracciones") challenge = createFractionChallenge();
  else if (gameId === "datos") challenge = createDataChallenge();
  else if (gameId === "azar") challenge = createChanceChallenge();
  else if (gameId === "barras") challenge = createBarChallenge();
  else if (gameId === "robots") challenge = createRobotChallenge();
  else challenge = createPatternChallenge();
  return withChallengeMeta(challenge);
}

function withChallengeMeta(challenge) {
  const difficulty = DIFFICULTIES[state.progress.difficulty] || DIFFICULTIES.desafio;
  return {
    ...challenge,
    startedAt: Date.now(),
    timeLimit: difficulty.timeLimit,
  };
}

function difficultyRange() {
  return DIFFICULTIES[state.progress.difficulty]?.range || DIFFICULTIES.desafio.range;
}

function createSeedChallenge() {
  const [min, max] = difficultyRange();
  const a = rand(min, Math.max(min, Math.floor(max / 2)));
  const b = rand(min, Math.max(min + 1, Math.floor(max / 2) + 4));
  const answer = a + b;
  return {
    prompt: `Operacion relampago: ${a} + ${b}. Cuantas semillas junta Carlitos?`,
    hint: "Suma juntando los dos grupos. Si dudas, cuenta primero el grupo mas grande.",
    summary: `${a} + ${b}`,
    a,
    b,
    answer,
    options: makeNumberOptions(answer, 4, 1, max * 2),
  };
}

function renderSeedBoard(challenge) {
  return `
    <div class="fall-lane">
      <div class="falling-card">
        <span>${challenge.a}</span>
        <b>+</b>
        <span>${challenge.b}</span>
      </div>
      <div class="seed-field">
        <div class="seed-group">
          <strong>Caja A</strong>
          <div class="seed-dots">${repeat(challenge.a, (index) => `<span class="seed-dot" style="animation-delay:${index * 20}ms"></span>`)}</div>
        </div>
        <div class="seed-group">
          <strong>Caja B</strong>
          <div class="seed-dots">${repeat(challenge.b, (index) => `<span class="seed-dot" style="animation-delay:${index * 20}ms"></span>`)}</div>
        </div>
      </div>
    </div>
  `;
}

function createRiverChallenge() {
  const [min, max] = difficultyRange();
  const values = uniqueNumbers(5, min, max).sort(() => Math.random() - 0.5);
  const sorted = [...values].sort((a, b) => a - b);
  return {
    mode: "interactive",
    prompt: "Ordena las piedras del rio de menor a mayor.",
    hint: "Primero busca el numero mas pequeno y luego sigue subiendo.",
    summary: `Ordenar: ${values.join(", ")}`,
    values,
    answer: sorted.join(","),
  };
}

function renderRiverBoard(challenge) {
  return `
    <div class="river-board">
      <div class="number-pool">
        ${challenge.values
          .filter((value) => !state.picked.includes(value))
          .map((value) => `<button type="button" data-number-pick="${value}">${value}</button>`)
          .join("")}
      </div>
      <div class="number-answer" aria-label="Respuesta ordenada">
        ${state.picked.length ? state.picked.map((value) => `<span>${value}</span>`).join("") : "<em>Toca piedras para formar el camino</em>"}
      </div>
    </div>
  `;
}

function createFractionChallenge() {
  const difficulty = state.progress.difficulty;
  const denominators = difficulty === "experto" ? [8, 10, 12] : difficulty === "desafio" ? [6, 8, 10] : [4, 6, 8];
  const denominator = denominators[rand(0, denominators.length - 1)];
  const numerator = rand(1, denominator - 1);
  return {
    mode: "interactive",
    prompt: `Pinta ${numerator} de ${denominator} partes de la huerta.`,
    hint: "Una fraccion cuenta partes seleccionadas de un mismo todo.",
    summary: `${numerator}/${denominator}`,
    numerator,
    denominator,
    answer: numerator,
  };
}

function renderFractionBoard(challenge) {
  return `
    <div class="fraction-grid" style="--fraction-cols:${challenge.denominator > 8 ? 6 : 4}">
      ${repeat(challenge.denominator, (index) => `
        <button type="button" class="fraction-piece${state.picked.includes(index) ? " selected" : ""}" data-piece="${index}">
          Parte ${index + 1}
        </button>
      `)}
    </div>
  `;
}

function createDataChallenge() {
  const [min, max] = difficultyRange();
  const length = state.progress.difficulty === "experto" ? 7 : state.progress.difficulty === "desafio" ? 6 : 5;
  const data = Array.from({ length }, () => rand(min, Math.max(min + 4, Math.floor(max / 2))));
  const sourceIndex = rand(0, data.length - 1);
  let targetIndex = rand(0, data.length - 1);
  while (targetIndex === sourceIndex) targetIndex = rand(0, data.length - 1);
  data[targetIndex] = data[sourceIndex];
  const sorted = [...data].sort((a, b) => a - b);
  const mean = Math.round((sum(data) / data.length) * 10) / 10;
  const median = sorted[Math.floor(sorted.length / 2)];
  const mode = getMode(data);
  const ask = ["promedio", "mediana", "moda"][rand(0, 2)];
  const answer = ask === "promedio" ? mean : ask === "mediana" ? median : mode;
  return {
    prompt: `La huerta registro estos plantines. Cual es la ${ask}?`,
    hint: "Ordenar los datos ayuda mucho antes de responder.",
    summary: `${ask}: ${data.join(", ")}`,
    data,
    answer,
    options: makeNumberOptions(answer, 4, 1, max),
  };
}

function renderDataBoard(challenge) {
  const values = challenge.sorted ? [...challenge.data].sort((a, b) => a - b) : challenge.data;
  return `
    <div class="data-row${challenge.sorted ? " sorted" : ""}">
      ${values.map((value, index) => `
        <div class="data-card">
          <span>${challenge.sorted ? "Orden" : "Dia"} ${index + 1}</span>
          <strong>${value}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function createChanceChallenge() {
  const spread = state.progress.difficulty === "experto" ? 6 : state.progress.difficulty === "desafio" ? 5 : 4;
  const colors = [
    { name: "verde", count: rand(3, spread + 2), color: "#137a4d" },
    { name: "dorado", count: rand(1, spread), color: "#c8a24a" },
    { name: "coral", count: rand(1, spread), color: "#e26d5a" },
    { name: "azul", count: rand(1, spread), color: "#63b7d0" },
  ];
  ensureUniqueWinner(colors);
  const answer = [...colors].sort((a, b) => b.count - a.count)[0].name;
  return {
    prompt: "La rueda tiene sectores de colores. Que color tiene mas probabilidad de salir?",
    hint: "Mas sectores significa mas oportunidades.",
    summary: colors.map((entry) => `${entry.name}:${entry.count}`).join(" "),
    colors,
    answer,
    options: colors.map((entry) => ({ label: entry.name, value: entry.name })),
  };
}

function renderChanceBoard(challenge) {
  return `
    <div class="spinner-wrap">
      <div class="spinner${challenge.spinning ? " spinning-fast" : ""}" aria-label="Rueda de probabilidad"></div>
      <div class="legend">
        ${challenge.colors.map((entry) => `
          <div class="legend-row">
            <span class="legend-swatch" style="background:${entry.color}"></span>
            <strong>${escapeHtml(entry.name)}</strong>
            <span>${entry.count} sectores</span>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function createBarChallenge() {
  const [min, max] = difficultyRange();
  const labels = ["papel", "latas", "botellas", "carton"];
  const data = labels.map((label) => ({ label, value: rand(min, Math.max(min + 3, Math.floor(max / 2))) }));
  const total = sum(data.map((entry) => entry.value));
  const maxEntry = [...data].sort((a, b) => b.value - a.value)[0];
  const minEntry = [...data].sort((a, b) => a.value - b.value)[0];
  const ask = rand(0, 1) === 0 ? "total" : "diferencia";
  const answer = ask === "total" ? total : maxEntry.value - minEntry.value;
  return {
    prompt: ask === "total"
      ? "Cuantos materiales recupero el equipo en total?"
      : `Cuanta diferencia hay entre ${maxEntry.label} y ${minEntry.label}?`,
    hint: "Las barras permiten comparar cantidades de un vistazo.",
    summary: ask,
    data,
    answer,
    options: makeNumberOptions(answer, 4, 1, max * labels.length),
  };
}

function renderBarBoard(challenge) {
  const max = Math.max(...challenge.data.map((entry) => entry.value));
  const min = Math.min(...challenge.data.map((entry) => entry.value));
  return `
    <div class="bar-chart">
      ${challenge.data.map((entry) => `
        <div class="bar-item${challenge.highlight && entry.value === max ? " max-bar" : ""}${challenge.highlight && entry.value === min ? " min-bar" : ""}">
          <div class="bar" style="height:${Math.max(36, (entry.value / max) * 210)}px">${entry.value}</div>
          <div class="bar-label">${escapeHtml(entry.label)}</div>
        </div>
      `).join("")}
    </div>
  `;
}

function createPatternChallenge() {
  const basePatterns = [
    { sequence: [2, 4, 6, 8], answer: 10, rule: "sumar 2", name: "pasos pares" },
    { sequence: [3, 6, 9, 12], answer: 15, rule: "sumar 3", name: "tambor de tres" },
    { sequence: [5, 10, 15, 20], answer: 25, rule: "sumar 5", name: "palmas de cinco" },
    { sequence: [1, 2, 4, 8], answer: 16, rule: "duplicar", name: "eco doble" },
    { sequence: [1, 4, 9, 16], answer: 25, rule: "cuadrados", name: "huellas cuadradas" },
    { sequence: [21, 18, 15, 12], answer: 9, rule: "restar 3", name: "corriente que baja" },
  ];
  const expertPatterns = [
    { sequence: [2, 6, 12, 20], answer: 30, rule: "sumar 4, 6, 8 y luego 10", name: "saltos crecientes" },
    { sequence: [1, 3, 6, 10], answer: 15, rule: "sumar 2, 3, 4 y luego 5", name: "triangulos" },
  ];
  const patterns = state.progress.difficulty === "experto" ? basePatterns.concat(expertPatterns) : basePatterns;
  const pattern = patterns[rand(0, patterns.length - 1)];
  return {
    prompt: `El ritmo de Carlitos marca ${pattern.sequence.join(", ")} y luego se detiene. Que numero sigue?`,
    hint: "Mira si el ritmo suma, resta, duplica o crece con otra regla.",
    explain: `La regla era ${pattern.rule}.`,
    summary: pattern.sequence.join(", "),
    sequence: pattern.sequence,
    name: pattern.name,
    answer: pattern.answer,
    options: makeNumberOptions(pattern.answer, 4, 1, 60),
  };
}

function renderPatternBoard(challenge) {
  return `
    <div class="pattern-board${challenge.playing ? " playing" : ""}">
      <div class="pattern-name">${escapeHtml(challenge.name)}</div>
      <div class="beat-track">
        ${challenge.sequence.map((value, index) => `
          <span class="beat-step" style="animation-delay:${index * 90}ms">${value}</span>
        `).join("")}
        <span class="beat-step mystery">?</span>
      </div>
      <div class="beat-bars" aria-hidden="true">
        ${repeat(10, (index) => `<span style="height:${32 + ((index * 19) % 56)}px; animation-delay:${index * 70}ms"></span>`)}
      </div>
    </div>
  `;
}

function createRobotChallenge() {
  resetRobotBattleIfEnded();
  const playerCards = drawRobotHand();
  const enemyCards = drawRobotHand();
  const playerProfile = robotAttackProfile(playerCards);
  const enemyProfile = robotAttackProfile(enemyCards);
  const playerShield = hasRobotShield(playerCards);
  const enemyShield = hasRobotShield(enemyCards);
  const damageToEnemy = enemyShield ? Math.ceil(playerProfile.damage / 2) : playerProfile.damage;
  const damageToPlayer = playerShield ? Math.ceil(enemyProfile.damage / 2) : enemyProfile.damage;

  return {
    prompt: `Guerra de Robots: resuelve ${playerProfile.operation}. Cuanta energia carga tu ataque?`,
    hint: "Multiplica primero. Si hay poder especial, mira como cambia el dano efectivo.",
    summary: `Robot: ${robotHandLabel(playerCards)} -> ${playerProfile.operation}`,
    answer: playerProfile.answer,
    options: makeNumberOptions(playerProfile.answer, 4, 1, Math.max(120, playerProfile.answer + 120)),
    playerCards,
    enemyCards,
    playerProfile,
    enemyProfile,
    playerShield,
    enemyShield,
    damageToEnemy,
    damageToPlayer,
  };
}

function renderRobotBoard(challenge) {
  const battle = ensureRobotBattle();
  return `
    <div class="robot-board">
      <div class="robot-hud">
        ${renderRobotHp("Tu robot", battle.playerHp, "player")}
        ${renderRobotHp("Robot rival", battle.enemyHp, "enemy")}
      </div>
      <div class="robot-arena">
        <section class="robot-panel player">
          <span class="robot-label">Tus cartas</span>
          <div class="robot-cards">${challenge.playerCards.map(renderRobotCard).join("")}</div>
          <strong>${escapeHtml(challenge.playerProfile.operation)}</strong>
          <p>${escapeHtml(robotPowerText(challenge.playerProfile, challenge.playerShield))}</p>
          <em>Dano efectivo: ${challenge.damageToEnemy}</em>
        </section>
        <section class="robot-panel enemy">
          <span class="robot-label">Cartas del rival</span>
          <div class="robot-cards">${challenge.enemyCards.map(renderRobotCard).join("")}</div>
          <strong>${escapeHtml(challenge.enemyProfile.operation)}</strong>
          <p>${escapeHtml(robotPowerText(challenge.enemyProfile, challenge.enemyShield))}</p>
          <em>Dano que recibirias: ${challenge.damageToPlayer}</em>
        </section>
      </div>
      <div class="robot-scoreline">
        <span>Victorias: <strong>${battle.wins || 0}</strong></span>
        <span>Derrotas: <strong>${battle.losses || 0}</strong></span>
        <span>Rondas: <strong>${battle.rounds || 0}</strong></span>
      </div>
    </div>
  `;
}

function renderRobotHp(label, hp, side) {
  const safeHp = Math.max(0, Math.min(ROBOT_MAX_HP, Number(hp) || 0));
  return `
    <div class="robot-hp ${side}">
      <div>
        <strong>${escapeHtml(label)}</strong>
        <span>${safeHp}/${ROBOT_MAX_HP} PV</span>
      </div>
      <i style="width:${safeHp}%"></i>
    </div>
  `;
}

function renderRobotCard(card) {
  return `
    <div class="robot-card ${card.color}">
      <span>${escapeHtml(card.label)}</span>
      <small>${escapeHtml(card.suitName)}</small>
      <em>vale ${card.value}</em>
    </div>
  `;
}

function drawRobotHand() {
  return [drawRobotCard(), drawRobotCard()];
}

function drawRobotCard() {
  const simpleRanks = [
    { label: "A", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
    { label: "9", value: 9 },
  ];
  const advancedRanks = simpleRanks.concat([
    { label: "10", value: 10 },
    { label: "J", value: 11 },
    { label: "Q", value: 12 },
    { label: "K", value: 10 },
  ]);
  const suits = [
    { symbol: "C", suitName: "trebol", color: "black" },
    { symbol: "P", suitName: "pica", color: "black" },
    { symbol: "H", suitName: "corazon", color: "red" },
    { symbol: "D", suitName: "diamante", color: "red" },
  ];
  const ranks = state.progress.difficulty === "explorar" ? simpleRanks : advancedRanks;
  const rank = ranks[rand(0, ranks.length - 1)];
  const suit = suits[rand(0, suits.length - 1)];
  return { ...rank, ...suit };
}

function robotAttackProfile(cards) {
  const [first, second] = cards;
  const sameValue = first.value === second.value;
  const calculatorMode = first.color !== second.color
    && first.value <= 9
    && second.value <= 9
    && state.progress.difficulty !== "explorar";
  const product = first.value * second.value;
  const answer = calculatorMode ? Number(`${first.value}${second.value}`) * 10 : product;
  let damage = answer;
  const powers = [];

  if (calculatorMode) powers.push("Modo calculadora");
  if (sameValue) {
    powers.push("Mega-Robot");
    damage *= 2;
  }

  return {
    answer,
    damage,
    operation: calculatorMode
      ? `(${first.value}${second.value}) x 10`
      : `${first.value} x ${second.value}`,
    powers,
  };
}

function hasRobotShield(cards) {
  return cards.every((card) => card.color === "black");
}

function robotPowerText(profile, shield) {
  const powers = profile.powers.slice();
  if (shield) powers.push("Escudo protector");
  if (!powers.length) return "Ataque normal: calcula bien para disparar.";
  return `Poderes activos: ${powers.join(", ")}.`;
}

function robotHandLabel(cards) {
  return cards.map((card) => `${card.label}${card.symbol}`).join(" + ");
}

function submitAnswer(value, button) {
  if (state.answered) return;
  const answer = normalizeAnswer(state.challenge.answer);
  const selected = normalizeAnswer(value);
  const ok = answer === selected;

  state.answered = true;
  button.classList.add(ok ? "correct" : "wrong");
  scoreResult(ok, value);
}

function pickNumber(value) {
  if (state.answered) return;
  state.picked.push(value);
  renderApp();
}

function togglePiece(index) {
  if (state.answered) return;
  if (state.picked.includes(index)) {
    state.picked = state.picked.filter((value) => value !== index);
  } else {
    state.picked.push(index);
  }
  renderApp();
}

function checkInteractive() {
  if (state.answered) return;
  let ok = false;
  let selected = state.picked.join(",");

  if (state.activeGame === "rio") {
    ok = selected === state.challenge.answer;
  } else if (state.activeGame === "fracciones") {
    selected = String(state.picked.length);
    ok = state.picked.length === state.challenge.answer;
  }

  state.answered = true;
  scoreResult(ok, selected);
}

function scoreResult(ok, selectedValue) {
  clearChallengeTimer();
  const game = getGame(state.activeGame);
  const stats = getGameStats(game.id);
  const difficulty = DIFFICULTIES[state.progress.difficulty] || DIFFICULTIES.desafio;
  const elapsedMs = Date.now() - (state.challenge.startedAt || Date.now());
  const speedBonus = ok ? Math.max(0, Math.ceil((1 - Math.min(1, elapsedMs / state.challenge.timeLimit)) * 5)) : 0;

  if (game.id === "robots") {
    scoreRobotResult(ok, selectedValue, stats, difficulty, elapsedMs, speedBonus);
    return;
  }

  state.progress.played += 1;
  stats.played += 1;

  if (ok) {
    state.progress.correct += 1;
    stats.correct += 1;
    state.progress.streak += 1;
    stats.bestStreak = Math.max(stats.bestStreak || 0, state.progress.streak);
    stats.bestSpeed = Math.max(stats.bestSpeed || 0, speedBonus);
    const points = 10 + difficulty.bonus + Math.min(8, state.progress.streak) + speedBonus;
    state.progress.score += points;
    state.feedback = {
      ok: true,
      message: `Excelente. +${points} puntos, racha ${state.progress.streak}, bonus veloz ${speedBonus}.`,
    };
  } else {
    if (selectedValue === "tiempo") stats.timeouts = (stats.timeouts || 0) + 1;
    state.progress.streak = 0;
    state.feedback = {
      ok: false,
      message: selectedValue === "tiempo"
        ? `Se escapo el reto. La respuesta era ${state.challenge.answer}.`
        : `Casi. La respuesta correcta era ${state.challenge.answer}. ${state.challenge.explain || "Probemos otro reto."}`,
    };
  }
  playTone(ok);

  state.progress.completed[game.id] = gameStars(game.id) > 0 || ok;
  pushHistory(game.id, {
    ok,
    prompt: state.challenge.summary || state.challenge.prompt,
    selected: selectedValue || "",
    answer: state.challenge.answer,
    elapsed: Math.round(elapsedMs / 1000),
    speedBonus,
  });

  writeProgress();
  window.setTimeout(renderApp, 260);
}

function scoreRobotResult(ok, selectedValue, stats, difficulty, elapsedMs, speedBonus) {
  const game = getGame("robots");
  const battle = ensureRobotBattle();
  const challenge = state.challenge;
  state.progress.played += 1;
  stats.played += 1;
  battle.rounds = (battle.rounds || 0) + 1;

  if (ok) {
    state.progress.correct += 1;
    stats.correct += 1;
    state.progress.streak += 1;
    stats.bestStreak = Math.max(stats.bestStreak || 0, state.progress.streak);
    stats.bestSpeed = Math.max(stats.bestSpeed || 0, speedBonus);

    battle.enemyHp = Math.max(0, battle.enemyHp - challenge.damageToEnemy);
    battle.playerHp = Math.max(0, battle.playerHp - challenge.damageToPlayer);

    let points = 12
      + difficulty.bonus
      + Math.min(8, state.progress.streak)
      + speedBonus
      + Math.min(25, Math.ceil(challenge.damageToEnemy / 8));
    let outcome = `Hiciste ${challenge.damageToEnemy} de dano y recibiste ${challenge.damageToPlayer}.`;

    if (battle.enemyHp <= 0 && battle.playerHp <= 0) {
      battle.wins = (battle.wins || 0) + 1;
      battle.losses = (battle.losses || 0) + 1;
      points += 20;
      outcome = `${outcome} Doble final: ambos robots quedaron sin energia.`;
    } else if (battle.enemyHp <= 0) {
      battle.wins = (battle.wins || 0) + 1;
      points += 40;
      outcome = `${outcome} Victoria: el escudo rival llego a 0.`;
    } else if (battle.playerHp <= 0) {
      battle.losses = (battle.losses || 0) + 1;
      outcome = `${outcome} Tu robot quedo sin energia; toca reparar para seguir.`;
    }

    state.progress.score += points;
    state.feedback = {
      ok: true,
      message: `Ataque correcto. +${points} puntos. ${outcome}`,
    };
  } else {
    if (selectedValue === "tiempo") stats.timeouts = (stats.timeouts || 0) + 1;
    state.progress.streak = 0;
    const penalty = selectedValue === "tiempo" ? 15 : 10;
    battle.playerHp = Math.max(0, battle.playerHp - penalty);
    if (battle.playerHp <= 0) battle.losses = (battle.losses || 0) + 1;
    state.feedback = {
      ok: false,
      message: selectedValue === "tiempo"
        ? `Se agoto el turno. La energia correcta era ${challenge.answer}; tu robot recibe ${penalty} de rebote.`
        : `Tu robot fallo el disparo. La energia correcta era ${challenge.answer}; rebote de ${penalty} PV.`,
    };
  }

  playTone(ok);

  state.progress.completed[game.id] = gameStars(game.id) > 0 || ok;
  pushHistory(game.id, {
    ok,
    prompt: `${challenge.summary} | dano ${ok ? challenge.damageToEnemy : 0}`,
    selected: selectedValue || "",
    answer: challenge.answer,
    elapsed: Math.round(elapsedMs / 1000),
    speedBonus,
  });

  writeProgress();
  window.setTimeout(renderApp, 260);
}

function renderHistory(gameId) {
  const history = state.progress.historyByGame[gameId] || [];
  if (!history.length) {
    return `<div class="history-empty">Todavia no hay intentos en esta vista.</div>`;
  }

  return `
    <div class="history-list">
      ${history.map((item) => `
        <div class="history-item ${item.ok ? "correct" : "incorrect"}">
          <strong>${item.ok ? "OK" : "Revisar"}</strong>
          <span>${escapeHtml(item.prompt)}</span>
          <small>Respuesta: ${escapeHtml(item.selected || "-")} | Correcta: ${escapeHtml(item.answer)} | ${escapeHtml(item.elapsed || "-")}s</small>
        </div>
      `).join("")}
    </div>
  `;
}

function pushHistory(gameId, item) {
  if (!state.progress.historyByGame[gameId]) state.progress.historyByGame[gameId] = [];
  state.progress.historyByGame[gameId].unshift({
    ...item,
    at: new Date().toISOString(),
  });
  state.progress.historyByGame[gameId] = state.progress.historyByGame[gameId].slice(0, 6);
}

function getGameStats(gameId) {
  if (!state.progress.statsByGame[gameId]) {
    state.progress.statsByGame[gameId] = { played: 0, correct: 0, bestStreak: 0 };
  }
  return state.progress.statsByGame[gameId];
}

function gameStars(gameId) {
  const stats = getGameStats(gameId);
  const target = DIFFICULTIES[state.progress.difficulty]?.target || 6;
  if (!stats.correct) return 0;
  if (stats.correct >= target && stats.played && stats.correct / stats.played >= 0.7) return 3;
  if (stats.correct >= Math.ceil(target / 2)) return 2;
  return 1;
}

function gameProgressPercent(gameId) {
  const stats = getGameStats(gameId);
  const target = DIFFICULTIES[state.progress.difficulty]?.target || 6;
  return Math.min(100, Math.round((stats.correct / target) * 100));
}

function getGame(id) {
  return GAMES.find((game) => game.id === id);
}

function getAgeGroup(id) {
  return AGE_GROUPS.find((group) => group.id === id);
}

function normalizeCategoryId(id) {
  return getAgeGroup(id)?.id || "ninos";
}

function gamesForCategory(categoryId) {
  const category = getAgeGroup(categoryId) || AGE_GROUPS[1];
  return category.gameIds.map(getGame).filter(Boolean);
}

function categoryForGame(gameId, preferredCategoryId) {
  const preferred = getAgeGroup(preferredCategoryId);
  if (preferred?.gameIds.includes(gameId)) return preferred;
  return AGE_GROUPS.find((category) => category.gameIds.includes(gameId)) || AGE_GROUPS[1];
}

function accuracy() {
  if (!state.progress.played) return 0;
  return state.progress.correct / state.progress.played;
}

function defaultRobotBattle() {
  return {
    playerHp: ROBOT_MAX_HP,
    enemyHp: ROBOT_MAX_HP,
    wins: 0,
    losses: 0,
    rounds: 0,
  };
}

function normalizeRobotBattle(value) {
  const base = defaultRobotBattle();
  if (!value || typeof value !== "object") return base;
  const playerHp = Number(value.playerHp);
  const enemyHp = Number(value.enemyHp);
  return {
    playerHp: Number.isFinite(playerHp) ? Math.max(0, Math.min(ROBOT_MAX_HP, playerHp)) : ROBOT_MAX_HP,
    enemyHp: Number.isFinite(enemyHp) ? Math.max(0, Math.min(ROBOT_MAX_HP, enemyHp)) : ROBOT_MAX_HP,
    wins: Math.max(0, Number(value.wins) || 0),
    losses: Math.max(0, Number(value.losses) || 0),
    rounds: Math.max(0, Number(value.rounds) || 0),
  };
}

function ensureRobotBattle() {
  state.progress.robotBattle = normalizeRobotBattle(state.progress.robotBattle);
  return state.progress.robotBattle;
}

function resetRobotBattleIfEnded() {
  const battle = ensureRobotBattle();
  if (battle.playerHp > 0 && battle.enemyHp > 0) return battle;
  state.progress.robotBattle = {
    ...defaultRobotBattle(),
    wins: battle.wins || 0,
    losses: battle.losses || 0,
  };
  writeProgress();
  return state.progress.robotBattle;
}

function defaultProgress() {
  return {
    name: "",
    score: 0,
    streak: 0,
    played: 0,
    correct: 0,
    completed: {},
    motionOff: false,
    soundOn: false,
    difficulty: "desafio",
    lastGame: "semillas",
    lastCategory: "ninos",
    robotBattle: defaultRobotBattle(),
    statsByGame: {},
    historyByGame: {},
  };
}

function readProgress() {
  const base = defaultProgress();
  try {
    const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    const parsed = JSON.parse(stored || "null");
    if (!parsed || typeof parsed !== "object") return base;
    return {
      ...base,
      ...parsed,
      completed: parsed.completed || {},
      motionOff: Boolean(parsed.motionOff),
      soundOn: Boolean(parsed.soundOn),
      difficulty: DIFFICULTIES[parsed.difficulty] ? parsed.difficulty : "desafio",
      statsByGame: parsed.statsByGame || {},
      historyByGame: parsed.historyByGame || {},
      lastGame: parsed.lastGame || "semillas",
      lastCategory: normalizeCategoryId(parsed.lastCategory || "ninos"),
      robotBattle: normalizeRobotBattle(parsed.robotBattle),
    };
  } catch (error) {
    return base;
  }
}

function writeProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  } catch (error) {
    // El juego sigue funcionando aunque el navegador bloquee almacenamiento local.
  }
}

function scheduleChallengeTimeout() {
  clearChallengeTimer();
  if (state.route !== "game" || !state.challenge || state.answered) return;
  if (prefersReducedMotion()) return;

  const remaining = Math.max(0, state.challenge.timeLimit - (Date.now() - state.challenge.startedAt));
  const startedAt = state.challenge.startedAt;
  challengeTimer = window.setTimeout(() => {
    if (!state.challenge || state.challenge.startedAt !== startedAt || state.answered) return;
    state.answered = true;
    scoreResult(false, "tiempo");
  }, remaining + 200);
}

function clearChallengeTimer() {
  if (challengeTimer) window.clearTimeout(challengeTimer);
  challengeTimer = null;
}

function weightedChance(colors) {
  const total = sum(colors.map((entry) => entry.count));
  let pick = rand(1, total);
  for (const entry of colors) {
    pick -= entry.count;
    if (pick <= 0) return entry.name;
  }
  return colors[0].name;
}

function handleKeyboard(event) {
  if (state.route !== "game") return;
  if (event.key >= "1" && event.key <= "4") {
    const button = document.querySelectorAll("[data-answer]")[Number(event.key) - 1];
    if (button) {
      event.preventDefault();
      button.click();
    }
  }
  if (event.key === "Enter") {
    event.preventDefault();
    newChallenge();
  }
  if (event.key === "Backspace" && state.activeGame === "rio") {
    event.preventDefault();
    state.picked = state.picked.slice(0, -1);
    renderApp();
  }
}

function playTone(ok) {
  if (!state.progress.soundOn) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = ok ? "triangle" : "sawtooth";
    oscillator.frequency.value = ok ? 660 : 180;
    gain.gain.setValueAtTime(0.05, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.18);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.18);
  } catch (error) {
    // El sonido es opcional; la app no debe fallar si el navegador lo bloquea.
  }
}

function makeNumberOptions(answer, count, min, max) {
  const numericAnswer = Number(answer);
  const values = new Set([normalizeAnswer(answer)]);
  const preferredOffsets = [1, -1, 2, -2, 3, -3, 5, -5, 10, -10];

  for (const offset of preferredOffsets) {
    if (values.size >= count || !Number.isFinite(numericAnswer)) break;
    const candidate = clampOption(numericAnswer + offset, min, max);
    values.add(normalizeAnswer(candidate));
  }

  while (values.size < count) {
    const offset = rand(-6, 6) || 1;
    const candidate = Number.isFinite(numericAnswer)
      ? clampOption(numericAnswer + offset, min, max)
      : rand(min, max);
    values.add(normalizeAnswer(candidate));
  }

  return [...values]
    .sort(() => Math.random() - 0.5)
    .map((value) => ({ label: value, value }));
}

function clampOption(value, min, max) {
  const rounded = Math.round(Number(value) * 10) / 10;
  return Math.max(min, Math.min(max, rounded));
}

function ensureUniqueWinner(colors) {
  const sorted = [...colors].sort((a, b) => b.count - a.count);
  if (sorted[0].count === sorted[1].count) {
    sorted[0].count += 1;
  }
}

function uniqueNumbers(count, min, max) {
  const values = new Set();
  while (values.size < count) values.add(rand(min, max));
  return [...values];
}

function getMode(values) {
  const counts = new Map();
  values.forEach((value) => counts.set(value, (counts.get(value) || 0) + 1));
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0])[0][0];
}

function sum(values) {
  return values.reduce((total, value) => total + Number(value), 0);
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function repeat(count, renderer) {
  return Array.from({ length: count }, (_, index) => renderer(index)).join("");
}

function normalizeAnswer(value) {
  const number = Number(value);
  if (Number.isFinite(number)) return String(Math.round(number * 10) / 10);
  return String(value).trim().toLowerCase();
}

function prefersReducedMotion() {
  return Boolean(state.progress.motionOff) || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function renderStars(count) {
  return [1, 2, 3].map((star) => `<span class="${star <= count ? "lit" : ""}">*</span>`).join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}
