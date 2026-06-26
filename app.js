const APP_VERSION = "v0.2.0";
const BUILD_DATE = "2026-06-25";
const STORAGE_KEY = "jugando-carlitos:progress:v1";

const ASSETS = {
  hero: "assets/generated/hero_jugando_con_carlitos.png",
  mascot: "assets/generated/carlitos_character_sheet_v01.png",
};

const GAMES = [
  {
    id: "semillas",
    title: "Semillas veloces",
    concept: "Suma y conteo",
    short: "Cuenta dos grupos, activa la racha y encuentra el total.",
    badge: "Explorador de sumas",
    level: "Nivel 1",
    mission: "Reunir semillas para abrir la huerta matematica.",
  },
  {
    id: "rio",
    title: "Rio de numeros",
    concept: "Orden y comparacion",
    short: "Ordena piedras numeradas antes de que cambie la corriente.",
    badge: "Guia del orden",
    level: "Nivel 2",
    mission: "Cruzar el rio construyendo una ruta de menor a mayor.",
  },
  {
    id: "fracciones",
    title: "Huerta partida",
    concept: "Fracciones",
    short: "Pinta partes iguales y arma huertas justas.",
    badge: "Constructor de fracciones",
    level: "Nivel 3",
    mission: "Repartir una huerta en partes iguales sin perder el todo.",
  },
  {
    id: "datos",
    title: "Datos del vivero",
    concept: "Promedio, mediana y moda",
    short: "Lee datos, encuentra pistas y responde como investigador.",
    badge: "Investigador de datos",
    level: "Nivel 4",
    mission: "Ayudar al vivero a entender sus registros diarios.",
  },
  {
    id: "azar",
    title: "Rueda del azar",
    concept: "Probabilidad",
    short: "Observa la rueda y predice que resultado tiene mas caminos.",
    badge: "Detective del azar",
    level: "Nivel 5",
    mission: "Descubrir que opcion tiene mas oportunidades de aparecer.",
  },
  {
    id: "barras",
    title: "Grafico reciclador",
    concept: "Graficos de barras",
    short: "Interpreta barras y transforma numeros en decisiones.",
    badge: "Lector de graficos",
    level: "Nivel 6",
    mission: "Leer un reporte visual de materiales recuperados.",
  },
  {
    id: "patrones",
    title: "Ritmo de patrones",
    concept: "Secuencias",
    short: "Sigue el ritmo de los numeros y completa el siguiente pulso.",
    badge: "Maestro de patrones",
    level: "Nivel 7",
    mission: "Escuchar la regla secreta de una secuencia numerica.",
  },
];

const app = document.querySelector("#app");

const state = {
  activeGame: "semillas",
  challenge: null,
  answered: false,
  feedback: null,
  picked: [],
  progress: readProgress(),
};

renderApp();
newChallenge();
registerServiceWorker();

function renderApp() {
  document.body.classList.toggle("motion-off", prefersReducedMotion());
  const active = getGame(state.activeGame);
  const unlockedBadges = GAMES.filter((game) => state.progress.completed[game.id]).length;
  const totalStars = unlockedBadges * 3;

  app.innerHTML = `
    <header class="app-top">
      <div class="top-inner">
        <a class="brand" href="#juegos">Jugando con Carlitos</a>
        <div class="top-actions">
          <span class="score-pill">Puntos: ${state.progress.score}</span>
          <span class="level-pill">Racha: ${state.progress.streak}</span>
          <span class="mode-pill">Estrellas: ${totalStars}/${GAMES.length * 3}</span>
          <button type="button" class="reset-button" id="toggleMotion">Animaciones: ${state.progress.motionOff ? "No" : "Si"}</button>
          <button type="button" class="reset-button" id="resetProgress">Reiniciar</button>
        </div>
      </div>
    </header>

    <section class="hero" style="--hero-image: url('${ASSETS.hero}')">
      <div class="hero-inner">
        <div class="hero-copy">
          <p class="eyebrow">Matematicas y estadistica jugando</p>
          <h1>Jugando con Carlitos</h1>
          <p>Carlitos abre una aventura de misiones cortas: contar semillas, cruzar rios de numeros, leer datos, vencer la rueda del azar y descubrir patrones como si fueran ritmos escondidos.</p>
          <div class="hero-actions">
            <button type="button" data-scroll-target="juegos">Jugar ahora</button>
            <button type="button" class="secondary" data-scroll-target="progreso">Ver progreso</button>
          </div>
        </div>
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
            <strong>Gana tres estrellas resolviendo un reto de datos, uno de fracciones y uno de patrones.</strong>
            <small>Carlitos premia la curiosidad: cada juego completado desbloquea una insignia.</small>
          </div>
        </aside>
      </div>
    </section>

    <main class="main-grid" id="juegos">
      <nav class="game-nav" aria-label="Juegos matematicos">
        <div class="nav-title">
          <span>Mapa de aventura</span>
          <strong>${unlockedBadges}/${GAMES.length} misiones</strong>
        </div>
        ${GAMES.map((game) => `
          <button type="button" class="game-tab${game.id === state.activeGame ? " active" : ""}" data-game="${game.id}">
            <b>${escapeHtml(game.level)}</b>
            <span>${escapeHtml(game.title)}</span>
            <small>${escapeHtml(game.concept)}</small>
            <em>${escapeHtml(game.mission)}</em>
            <i class="star-row" aria-label="Estrellas del juego">${renderStars(state.progress.completed[game.id] ? 3 : 0)}</i>
          </button>
        `).join("")}
      </nav>

      <div class="stage-wrap">
        <section class="game-stage" aria-live="polite">
          <div class="stage-header">
            <div>
              <p class="eyebrow">${escapeHtml(active.concept)}</p>
              <h2>${escapeHtml(active.title)}</h2>
              <p>${escapeHtml(active.short)}</p>
              <p class="mission-copy">Mision: ${escapeHtml(active.mission)}</p>
            </div>
            <div class="rhythm-meter" aria-hidden="true">
              ${repeat(7, (index) => `<span style="animation-delay:${index * 90}ms"></span>`)}
            </div>
          </div>
          <div class="play-area" id="playArea">
            ${state.challenge ? renderChallenge() : ""}
          </div>
        </section>

        <section class="progress-panel" id="progreso">
          <h2>Insignias de aprendizaje</h2>
          <div class="badge-grid">
            ${GAMES.map((game) => `
              <div class="badge${state.progress.completed[game.id] ? "" : " locked"}">
                <strong>${escapeHtml(state.progress.completed[game.id] ? game.badge : game.title)}</strong>
                <span>${renderStars(state.progress.completed[game.id] ? 3 : 0)}</span>
              </div>
            `).join("")}
          </div>
        </section>

        <section class="concept-panel">
          <h2>Conceptos que aparecen en los juegos</h2>
          <div class="concept-grid">
            <article class="concept"><strong>Promedio</strong><p>Reparte el total en partes iguales para ver el valor central aproximado.</p></article>
            <article class="concept"><strong>Mediana</strong><p>Ordena los datos y mira el valor que queda en el centro.</p></article>
            <article class="concept"><strong>Moda</strong><p>Busca el dato que mas se repite.</p></article>
            <article class="concept"><strong>Probabilidad</strong><p>Compara que resultado tiene mas caminos para aparecer.</p></article>
            <article class="concept"><strong>Grafico</strong><p>Convierte numeros en barras para comparar mas rapido.</p></article>
            <article class="concept"><strong>Fraccion</strong><p>Muestra cuantas partes de un todo estan seleccionadas.</p></article>
            <article class="concept"><strong>Secuencia</strong><p>Encuentra la regla que permite anticipar el siguiente numero.</p></article>
          </div>
        </section>
      </div>
    </main>

    <footer class="footer">
      <span>Borrador interno. Personaje e imagenes requieren autorizacion antes de publicacion final.</span>
      <span class="version">${APP_VERSION} | ${BUILD_DATE}</span>
    </footer>
  `;

  bindEvents();
}

function bindEvents() {
  document.querySelectorAll("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById(button.dataset.scrollTarget).scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
    });
  });

  document.querySelectorAll("[data-game]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeGame = button.dataset.game;
      state.feedback = null;
      state.answered = false;
      state.picked = [];
      newChallenge();
      document.getElementById("juegos").scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
    });
  });

  const saveName = document.querySelector("#saveName");
  const nameInput = document.querySelector("#playerName");
  saveName.addEventListener("click", () => {
    state.progress.name = nameInput.value.trim().slice(0, 32);
    writeProgress();
    renderApp();
  });

  document.querySelector("#resetProgress").addEventListener("click", () => {
    state.progress = defaultProgress();
    writeProgress();
    state.feedback = null;
    state.answered = false;
    state.picked = [];
    newChallenge();
  });

  document.querySelector("#toggleMotion").addEventListener("click", () => {
    state.progress.motionOff = !state.progress.motionOff;
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

  const checkButton = document.querySelector("#checkInteractive");
  if (checkButton) checkButton.addEventListener("click", checkInteractive);

  const nextButton = document.querySelector("#nextChallenge");
  if (nextButton) nextButton.addEventListener("click", newChallenge);
}

function newChallenge() {
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

function createSeedChallenge() {
  const a = rand(3, 9);
  const b = rand(2, 8);
  const answer = a + b;
  return {
    prompt: `Carlitos encontro ${a} semillas en una caja y ${b} en otra. Cuantas semillas hay en total?`,
    hint: "Suma juntando los dos grupos.",
    a,
    b,
    answer,
    options: makeNumberOptions(answer, 4, 1, 18),
  };
}

function renderSeedBoard(challenge) {
  return `
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
  `;
}

function createRiverChallenge() {
  const values = uniqueNumbers(5, 2, 32).sort(() => Math.random() - 0.5);
  const sorted = [...values].sort((a, b) => a - b);
  return {
    mode: "interactive",
    prompt: "Ordena las piedras del rio de menor a mayor.",
    hint: "Primero busca el numero mas pequeno y luego sigue subiendo.",
    values,
    answer: sorted.join(","),
  };
}

function renderRiverBoard(challenge) {
  return `
    <div class="number-pool">
      ${challenge.values
        .filter((value) => !state.picked.includes(value))
        .map((value) => `<button type="button" data-number-pick="${value}">${value}</button>`)
        .join("")}
    </div>
    <div class="number-answer" aria-label="Respuesta ordenada">
      ${state.picked.map((value) => `<span>${value}</span>`).join("")}
    </div>
  `;
}

function createFractionChallenge() {
  const denominator = [4, 6, 8][rand(0, 2)];
  const numerator = rand(1, denominator - 1);
  return {
    mode: "interactive",
    prompt: `Pinta ${numerator} de ${denominator} partes de la huerta.`,
    hint: "Una fraccion cuenta partes seleccionadas de un mismo todo.",
    numerator,
    denominator,
    answer: numerator,
  };
}

function renderFractionBoard(challenge) {
  return `
    <div class="fraction-grid">
      ${repeat(challenge.denominator, (index) => `
        <button type="button" class="fraction-piece${state.picked.includes(index) ? " selected" : ""}" data-piece="${index}">
          Parte ${index + 1}
        </button>
      `)}
    </div>
  `;
}

function createDataChallenge() {
  const data = [rand(2, 9), rand(2, 9), rand(2, 9), rand(2, 9), rand(2, 9)];
  const sourceIndex = rand(0, 4);
  let targetIndex = rand(0, 4);
  while (targetIndex === sourceIndex) targetIndex = rand(0, 4);
  data[targetIndex] = data[sourceIndex];
  const sorted = [...data].sort((a, b) => a - b);
  const mean = Math.round((sum(data) / data.length) * 10) / 10;
  const median = sorted[2];
  const mode = getMode(data);
  const ask = ["promedio", "mediana", "moda"][rand(0, 2)];
  const answer = ask === "promedio" ? mean : ask === "mediana" ? median : mode;
  return {
    prompt: `La huerta registro estos plantines por dia. Cual es la ${ask}?`,
    hint: "Ordenar los datos ayuda mucho antes de responder.",
    data,
    answer,
    options: makeNumberOptions(answer, 4, 1, 12),
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
  const colors = [
    { name: "verde", count: rand(3, 5), color: "#137a4d" },
    { name: "dorado", count: rand(1, 4), color: "#c8a24a" },
    { name: "coral", count: rand(1, 3), color: "#e26d5a" },
    { name: "azul", count: rand(1, 3), color: "#63b7d0" },
  ];
  const answer = [...colors].sort((a, b) => b.count - a.count)[0].name;
  return {
    prompt: "La rueda tiene sectores de colores. Que color tiene mas probabilidad de salir?",
    hint: "Mas sectores significa mas oportunidades.",
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
  const labels = ["papel", "latas", "botellas", "carton"];
  const data = labels.map((label) => ({ label, value: rand(2, 12) }));
  const total = sum(data.map((entry) => entry.value));
  const max = [...data].sort((a, b) => b.value - a.value)[0];
  const min = [...data].sort((a, b) => a.value - b.value)[0];
  const ask = rand(0, 1) === 0 ? "total" : "diferencia";
  const answer = ask === "total" ? total : max.value - min.value;
  return {
    prompt: ask === "total"
      ? "Cuantos materiales recupero el equipo en total?"
      : `Cuanta diferencia hay entre ${max.label} y ${min.label}?`,
    hint: "Las barras permiten comparar cantidades de un vistazo.",
    data,
    answer,
    options: makeNumberOptions(answer, 4, 1, 48),
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
  const patterns = [
    { sequence: [2, 4, 6, 8], answer: 10, rule: "sumar 2", name: "pasos pares" },
    { sequence: [3, 6, 9, 12], answer: 15, rule: "sumar 3", name: "tambor de tres" },
    { sequence: [5, 10, 15, 20], answer: 25, rule: "sumar 5", name: "palmas de cinco" },
    { sequence: [1, 2, 4, 8], answer: 16, rule: "duplicar", name: "eco doble" },
    { sequence: [1, 4, 9, 16], answer: 25, rule: "cuadrados", name: "huellas cuadradas" },
    { sequence: [21, 18, 15, 12], answer: 9, rule: "restar 3", name: "corriente que baja" },
  ];
  const pattern = patterns[rand(0, patterns.length - 1)];
  return {
    prompt: `El ritmo de Carlitos marca ${pattern.sequence.join(", ")} y luego se detiene. Que numero sigue?`,
    hint: "Mira si el ritmo suma, resta, duplica o crece con otra regla.",
    explain: `La regla era ${pattern.rule}.`,
    sequence: pattern.sequence,
    name: pattern.name,
    answer: pattern.answer,
    options: makeNumberOptions(pattern.answer, 4, 1, 30),
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
  scoreResult(ok);
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

  if (state.activeGame === "rio") {
    ok = state.picked.join(",") === state.challenge.answer;
  } else if (state.activeGame === "fracciones") {
    ok = state.picked.length === state.challenge.answer;
  }

  state.answered = true;
  scoreResult(ok);
}

function scoreResult(ok) {
  const game = getGame(state.activeGame);
  state.progress.played += 1;

  if (ok) {
    state.progress.correct += 1;
    state.progress.streak += 1;
    const points = 10 + Math.min(8, state.progress.streak);
    state.progress.score += points;
    state.progress.completed[state.activeGame] = true;
    state.feedback = {
      ok: true,
      message: `Excelente. +${points} puntos, racha ${state.progress.streak}. Carlitos desbloqueo: ${game.badge}.`,
    };
  } else {
    state.progress.streak = 0;
    state.feedback = {
      ok: false,
      message: `Casi. La respuesta correcta era ${state.challenge.answer}. ${state.challenge.explain || "Probemos otro reto."}`,
    };
  }

  writeProgress();
  window.setTimeout(renderApp, 260);
}

function getGame(id) {
  return GAMES.find((game) => game.id === id) || GAMES[0];
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
  };
}

function readProgress() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!parsed || typeof parsed !== "object") return defaultProgress();
    return {
      ...defaultProgress(),
      ...parsed,
      completed: parsed.completed || {},
      motionOff: Boolean(parsed.motionOff),
    };
  } catch (error) {
    return defaultProgress();
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
    const offset = rand(-4, 4);
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
