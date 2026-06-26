const APP_VERSION = "v0.3.0";
const BUILD_DATE = "2026-06-26";
const STORAGE_KEY = "jugando-carlitos:progress:v2";
const LEGACY_STORAGE_KEY = "jugando-carlitos:progress:v1";

const ASSETS = {
  hero: "assets/generated/hero_jugando_con_carlitos.png",
  mascot: "assets/generated/carlitos_character_sheet_v01.png",
};

const DIFFICULTIES = {
  explorar: {
    label: "Explorar",
    short: "Calmo",
    range: [2, 10],
    target: 4,
    bonus: 0,
  },
  desafio: {
    label: "Desafio",
    short: "Activo",
    range: [5, 24],
    target: 6,
    bonus: 3,
  },
  experto: {
    label: "Experto",
    short: "Rapido",
    range: [9, 48],
    target: 8,
    bonus: 6,
  },
};

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
    mechanic: "Busca la regla: sumar, restar, duplicar o crecer por cuadrados.",
  },
];

const app = document.querySelector("#app");

const state = {
  route: "inicio",
  activeGame: "semillas",
  challenge: null,
  answered: false,
  feedback: null,
  picked: [],
  progress: readProgress(),
};

initApp();

function initApp() {
  state.activeGame = state.progress.lastGame || "semillas";
  syncRoute();
  renderApp();
  registerServiceWorker();

  window.addEventListener("hashchange", () => {
    syncRoute();
    renderApp();
  });
}

function syncRoute() {
  const hash = decodeURIComponent(window.location.hash.replace(/^#/, "") || "inicio");
  const clean = hash.replace(/^juego-/, "");
  const game = getGame(clean);

  if (game && clean !== "inicio") {
    state.route = "game";
    if (state.activeGame !== game.id || !state.challenge) {
      state.activeGame = game.id;
      state.challenge = createChallenge(game.id);
      state.answered = false;
      state.feedback = null;
      state.picked = [];
    }
    state.progress.lastGame = game.id;
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
        <nav class="top-game-tabs" aria-label="Pestanas de juegos">
          ${GAMES.map((game) => `
            <a href="#${game.id}" class="${state.route === "game" && state.activeGame === game.id ? "active" : ""}">
              ${escapeHtml(game.title)}
            </a>
          `).join("")}
        </nav>
        <div class="top-actions">
          <span class="score-pill">Puntos: ${state.progress.score}</span>
          <span class="level-pill">Racha: ${state.progress.streak}</span>
          <span class="mode-pill">Estrellas: ${totalStars}/${GAMES.length * 3}</span>
          <button type="button" class="reset-button" id="toggleMotion">Animaciones: ${state.progress.motionOff ? "No" : "Si"}</button>
          <button type="button" class="reset-button" id="resetProgress">Reiniciar</button>
        </div>
      </div>
    </header>

    ${state.route === "game" ? renderGameView() : renderHomeView()}

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
          <p>Cada juego ahora es una vista propia: entra a una pestana, elige dificultad, resuelve retos, mira tu historial y cambia de juego cuando quieras.</p>
          <div class="hero-actions">
            <a class="hero-button" href="#${last.id}">Continuar: ${escapeHtml(last.title)}</a>
            <a class="hero-button secondary" href="#mapa">Ver juegos</a>
          </div>
        </div>
        ${renderPlayerCard(unlockedBadges)}
      </div>
    </section>

    <main class="home-view" id="mapa">
      <section class="hub-intro">
        <p class="eyebrow">Pestanas independientes</p>
        <h2>Elige una mision</h2>
        <p>Los juegos no dependen entre si. Puedes practicar una sola habilidad o saltar entre vistas como en una app de juegos.</p>
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
    <div class="challenge">${escapeHtml(challenge.prompt)}</div>
    <div class="board">${renderBoard(gameId, challenge)}</div>
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
  return renderPatternBoard(challenge);
}

function renderChoices(challenge) {
  if (challenge.mode === "interactive") {
    return `<button type="button" id="checkInteractive">Comprobar</button>`;
  }

  return `
    <div class="choice-grid">
      ${challenge.options.map((option) => `
        <button type="button" data-answer="${escapeAttribute(option.value)}">
          ${escapeHtml(option.label)}
        </button>
      `).join("")}
    </div>
  `;
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
}

function newChallenge() {
  if (state.route !== "game") return;
  state.challenge = createChallenge(state.activeGame);
  state.feedback = null;
  state.answered = false;
  state.picked = [];
  renderApp();
}

function createChallenge(gameId) {
  if (gameId === "semillas") return createSeedChallenge();
  if (gameId === "rio") return createRiverChallenge();
  if (gameId === "fracciones") return createFractionChallenge();
  if (gameId === "datos") return createDataChallenge();
  if (gameId === "azar") return createChanceChallenge();
  if (gameId === "barras") return createBarChallenge();
  return createPatternChallenge();
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
  return `
    <div class="data-row">
      ${challenge.data.map((value, index) => `
        <div class="data-card">
          <span>Dia ${index + 1}</span>
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
      <div class="spinner" aria-label="Rueda de probabilidad"></div>
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
  return `
    <div class="bar-chart">
      ${challenge.data.map((entry) => `
        <div class="bar-item">
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
    <div class="pattern-board">
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
  const game = getGame(state.activeGame);
  const stats = getGameStats(game.id);
  const difficulty = DIFFICULTIES[state.progress.difficulty] || DIFFICULTIES.desafio;
  state.progress.played += 1;
  stats.played += 1;

  if (ok) {
    state.progress.correct += 1;
    stats.correct += 1;
    state.progress.streak += 1;
    stats.bestStreak = Math.max(stats.bestStreak || 0, state.progress.streak);
    const points = 10 + difficulty.bonus + Math.min(8, state.progress.streak);
    state.progress.score += points;
    state.feedback = {
      ok: true,
      message: `Excelente. +${points} puntos, racha ${state.progress.streak}.`,
    };
  } else {
    state.progress.streak = 0;
    state.feedback = {
      ok: false,
      message: `Casi. La respuesta correcta era ${state.challenge.answer}. ${state.challenge.explain || "Probemos otro reto."}`,
    };
  }

  state.progress.completed[game.id] = gameStars(game.id) > 0 || ok;
  pushHistory(game.id, {
    ok,
    prompt: state.challenge.summary || state.challenge.prompt,
    selected: selectedValue || "",
    answer: state.challenge.answer,
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
          <small>Respuesta: ${escapeHtml(item.selected || "-")} | Correcta: ${escapeHtml(item.answer)}</small>
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

function accuracy() {
  if (!state.progress.played) return 0;
  return state.progress.correct / state.progress.played;
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
    difficulty: "desafio",
    lastGame: "semillas",
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
      difficulty: DIFFICULTIES[parsed.difficulty] ? parsed.difficulty : "desafio",
      statsByGame: parsed.statsByGame || {},
      historyByGame: parsed.historyByGame || {},
      lastGame: parsed.lastGame || "semillas",
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

function makeNumberOptions(answer, count, min, max) {
  const values = new Set([answer]);
  while (values.size < count) {
    const offset = rand(-6, 6) || 1;
    const candidate = Math.max(min, Math.min(max, Math.round(Number(answer) + offset)));
    values.add(candidate);
  }
  return [...values]
    .sort(() => Math.random() - 0.5)
    .map((value) => ({ label: String(value), value: String(value) }));
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
