const APP_VERSION = "v0.6.3";
const BUILD_DATE = "2026-06-27";
const STORAGE_KEY = "jugando-carlitos:motion-progress:v1";

const ASSETS = {
  hero: "assets/generated/hero_jugando_con_carlitos.png",
  mascot: "assets/generated/carlitos_character_sheet_v01.png",
};

const MEDIAPIPE_VERSION = "0.10.21";
const VISION_SOURCES = [
  {
    label: "jsDelivr",
    bundle: `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MEDIAPIPE_VERSION}/vision_bundle.mjs`,
    wasm: `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MEDIAPIPE_VERSION}/wasm`,
  },
  {
    label: "unpkg",
    bundle: `https://unpkg.com/@mediapipe/tasks-vision@${MEDIAPIPE_VERSION}/vision_bundle.mjs`,
    wasm: `https://unpkg.com/@mediapipe/tasks-vision@${MEDIAPIPE_VERSION}/wasm`,
  },
];
const HAND_MODEL_URL = "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task";

const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [0, 17], [17, 18], [18, 19], [19, 20],
];

const AGE_GROUPS = [
  {
    id: "peques",
    label: "4 a 7",
    short: "Peques",
    title: "Exploradores con las manos",
    subtitle: "Conteo, comparacion y movimiento grande para jugar sin tocar la pantalla.",
    gameIds: ["dedos", "semillas", "ritmo"],
  },
  {
    id: "ninos",
    label: "8 a 12",
    short: "Ninos",
    title: "Aventura gestual",
    subtitle: "Dedos, punteria, robots y probabilidad con respuestas corporales.",
    gameIds: ["dedos", "semillas", "robots", "azar", "ritmo"],
  },
  {
    id: "mayores",
    label: "12+",
    short: "Mayores",
    title: "Laboratorio de movimiento",
    subtitle: "Datos, estrategia y lectura visual con gestos mas precisos.",
    gameIds: ["robots", "azar", "datos", "ritmo"],
  },
];

const GAMES = [
  {
    id: "dedos",
    title: "Dedos veloces",
    concept: "Conteo y suma",
    conceptKey: "suma",
    level: "Mision 1",
    ages: ["peques", "ninos"],
    color: "gold",
    gesture: "dedos",
    prompt: "Responder mostrando dedos",
  },
  {
    id: "semillas",
    title: "Guardian de semillas",
    concept: "Comparacion",
    conceptKey: "comparacion",
    level: "Mision 2",
    ages: ["peques", "ninos"],
    color: "green",
    gesture: "zona",
    prompt: "Mover la mano al canasto correcto",
  },
  {
    id: "robots",
    title: "Robot gestual",
    concept: "Multiplicacion",
    conceptKey: "multiplicacion",
    level: "Mision 3",
    ages: ["ninos", "mayores"],
    color: "steel",
    gesture: "dedos",
    prompt: "Elegir energia con dedos",
  },
  {
    id: "azar",
    title: "Rueda en el aire",
    concept: "Probabilidad",
    conceptKey: "probabilidad",
    level: "Mision 4",
    ages: ["ninos", "mayores"],
    color: "coral",
    gesture: "zona",
    prompt: "Girar y elegir la opcion mas probable",
  },
  {
    id: "datos",
    title: "Laboratorio de datos",
    concept: "Mediana, moda y lectura de datos",
    conceptKey: "estadistica",
    level: "Mision 5",
    ages: ["mayores"],
    color: "plum",
    gesture: "dedos",
    prompt: "Elegir una tarjeta con dedos",
  },
  {
    id: "ritmo",
    title: "Ritmo corporal",
    concept: "Patrones",
    conceptKey: "patrones",
    level: "Mision 6",
    ages: ["peques", "ninos", "mayores"],
    color: "sky",
    gesture: "dedos",
    prompt: "Completar una secuencia con dedos",
  },
];

const CONCEPTS = {
  suma: {
    label: "Suma y conteo",
    short: "Suma",
    color: "#ffd23f",
    door: "Junta dos grupos y cuenta el total.",
    repair: "Si el resultado no coincide, vuelve a formar los dos grupos por separado y despues juntalos.",
  },
  comparacion: {
    label: "Comparacion",
    short: "Comparar",
    color: "#137a4d",
    door: "Busca donde hay mas, menos o igual antes de elegir.",
    repair: "Compara dos opciones a la vez. La opcion mayor es la que conserva mas elementos.",
  },
  multiplicacion: {
    label: "Multiplicacion",
    short: "Multiplicar",
    color: "#5f7486",
    door: "Piensa en grupos iguales: filas por columnas.",
    repair: "Si dudas, cambia la multiplicacion por suma repetida y revisa cada grupo.",
  },
  probabilidad: {
    label: "Probabilidad",
    short: "Azar",
    color: "#ff6b6b",
    door: "La opcion con mas sectores tiene mas oportunidades.",
    repair: "No elijas por color favorito: cuenta cuantos sectores tiene cada opcion.",
  },
  estadistica: {
    label: "Datos",
    short: "Datos",
    color: "#635380",
    door: "Ordena, observa repeticiones y busca el valor central.",
    repair: "Primero ordena los datos. Luego decide si te piden centro o repeticion.",
  },
  patrones: {
    label: "Patrones",
    short: "Patron",
    color: "#63b7d0",
    door: "Encuentra la regla que se repite y predice el siguiente paso.",
    repair: "Mira la diferencia entre fichas vecinas y prueba si esa regla se mantiene.",
  },
};

const app = document.querySelector("#app");

const state = {
  route: "game",
  activeCategory: "ninos",
  activeGame: "dedos",
  challenge: null,
  answered: false,
  feedback: null,
  progress: readProgress(),
  vision: {
    enabled: false,
    loading: false,
    ready: false,
    mode: "demo",
    status: "Camara apagada",
    stream: null,
    landmarker: null,
    videoTime: -1,
    fingers: null,
    zone: "centro",
    gesture: "espera",
    confidence: 0,
    error: "",
    errorCode: "",
    stableValue: null,
    stableCount: 0,
    lastRaw: null,
    lockedUntil: 0,
  },
};

let animationFrame = null;
let visionModule = null;
let videoElement = null;
let canvasElement = null;
let canvasContext = null;
let detectorSourceLabel = "";

initApp();

function initApp() {
  state.activeGame = state.progress.lastGame || "dedos";
  state.activeCategory = state.progress.lastCategory || categoryForGame(state.activeGame).id;
  syncRoute();
  if (!state.challenge) state.challenge = createChallenge(state.activeGame);
  renderApp();
  registerServiceWorker();

  window.addEventListener("hashchange", () => {
    syncRoute();
    renderApp();
  });
  window.addEventListener("keydown", handleKeyboard);
  window.addEventListener("beforeunload", () => stopCamera(false));
}

function syncRoute() {
  const hash = decodeURIComponent(window.location.hash.replace(/^#/, "") || state.activeGame);
  const group = getAgeGroup(hash);
  const game = getGame(hash);

  if (group) {
    state.route = "category";
    state.activeCategory = group.id;
    state.progress.lastCategory = group.id;
    writeProgress();
    return;
  }

  if (game) {
    state.route = "game";
    state.activeGame = game.id;
    state.activeCategory = categoryForGame(game.id, state.progress.lastCategory).id;
    state.progress.lastGame = game.id;
    state.progress.lastCategory = state.activeCategory;
    state.challenge = createChallenge(game.id);
    state.answered = false;
    state.feedback = null;
    writeProgress();
    return;
  }

  state.route = "home";
}

function renderApp() {
  const totalStars = GAMES.reduce((total, game) => total + gameStars(game.id), 0);
  app.innerHTML = `
    <header class="app-top">
      <div class="top-inner">
        <a class="brand" href="#home">Jugando con Carlitos</a>
        <nav class="top-game-tabs" aria-label="Categorias">
          ${AGE_GROUPS.map((group) => `
            <a href="#${group.id}" class="${state.activeCategory === group.id && state.route !== "home" ? "active" : ""}">
              ${escapeHtml(group.label)} <span>${escapeHtml(group.short)}</span>
            </a>
          `).join("")}
        </nav>
        <div class="top-actions">
          <span class="score-pill">Puntos: ${state.progress.score}</span>
          <span class="level-pill">Racha: ${state.progress.streak}</span>
          <span class="mode-pill">Estrellas: ${totalStars}/${GAMES.length * 3}</span>
          <button type="button" class="reset-button" id="resetProgress">Reiniciar</button>
        </div>
      </div>
    </header>

    ${state.route === "category" ? renderCategoryView() : state.route === "home" ? renderHomeView() : renderGameView()}

    <footer class="footer">
      <span>Camara opcional. El video se procesa en este navegador y no se guarda.</span>
      <span class="version">${APP_VERSION} | ${BUILD_DATE}</span>
    </footer>
  `;
  app.classList.add("ready");
  bindEvents();
  attachVisionElements();
}

function renderHomeView() {
  return `
    <main class="motion-home">
      <section class="motion-hero" style="--hero-image: url('${ASSETS.hero}')">
        <div class="motion-hero-copy">
          <p class="eyebrow">Matematicas con movimiento</p>
          <h1>Juega con tus manos</h1>
          <p>Carlitos convierte dedos, palmas y movimientos en respuestas para resolver retos.</p>
          <div class="hero-actions">
            <a class="hero-button" href="#dedos">Empezar con dedos</a>
            <a class="hero-button secondary" href="#ninos">Elegir por edad</a>
          </div>
        </div>
        ${renderMascotCard()}
      </section>

      <section class="category-grid" aria-label="Categorias">
        ${AGE_GROUPS.map(renderCategoryCard).join("")}
      </section>

      <section class="game-hub" aria-label="Juegos">
        ${GAMES.map(renderGameCard).join("")}
      </section>
    </main>
  `;
}

function renderCategoryView() {
  const group = getAgeGroup(state.activeCategory) || AGE_GROUPS[1];
  const games = group.gameIds.map(getGame).filter(Boolean);
  return `
    <main class="category-view theme-category-${group.id}">
      <section class="category-hero">
        <div>
          <p class="eyebrow">Categoria ${escapeHtml(group.label)}</p>
          <h1>${escapeHtml(group.title)}</h1>
          <p>${escapeHtml(group.subtitle)}</p>
        </div>
        ${renderMascotCard()}
      </section>
      <section class="game-hub" aria-label="Juegos de la categoria">
        ${games.map(renderGameCard).join("")}
      </section>
    </main>
  `;
}

function renderGameView() {
  const game = getGame(state.activeGame) || GAMES[0];
  const stats = gameStats(game.id);
  return `
    <main class="motion-game theme-${game.color}">
      <nav class="view-tabs" aria-label="Juegos">
        <a href="#home">Inicio</a>
        ${GAMES.map((item) => `
          <a href="#${item.id}" class="${item.id === game.id ? "active" : ""}">
            <span>${escapeHtml(item.level)}</span>${escapeHtml(item.title)}
          </a>
        `).join("")}
      </nav>

      <section class="game-view-header">
        <div>
          <p class="eyebrow">${escapeHtml(game.concept)}</p>
          <h1>${escapeHtml(game.title)}</h1>
          <p>${escapeHtml(game.prompt)}</p>
        </div>
        <div class="game-hud">
          <div><strong>${stats.played}</strong><span>retos</span></div>
          <div><strong>${stats.correct}</strong><span>aciertos</span></div>
          <div><strong>${gameStars(game.id)}</strong><span>estrellas</span></div>
          <div><strong>${visionShortLabel()}</strong><span>sensor</span></div>
        </div>
      </section>

      <section class="motion-layout">
        <div class="gesture-stage">
          ${renderChallengePanel(game)}
          ${renderVisionPanel()}
        </div>
        <aside class="side-panel">
          <section class="control-card">
            <h2>Progreso</h2>
            <div class="mini-progress big"><i style="width:${gameProgressPercent(game.id)}%"></i></div>
            <p>${stats.correct} aciertos en esta mision.</p>
          </section>
          <section class="control-card">
            <h2>Dominios</h2>
            ${renderConceptMastery()}
          </section>
          <section class="control-card">
            <h2>Historial</h2>
            ${renderHistory(game.id)}
          </section>
          <section class="control-card">
            <h2>Sensor local</h2>
            <p>Dedos: <strong id="sideFingers">${visionNumberLabel()}</strong></p>
            <p>Zona: <strong id="sideZone">${escapeHtml(state.vision.zone)}</strong></p>
            <p>Gesto: <strong id="sideGesture">${escapeHtml(state.vision.gesture)}</strong></p>
          </section>
        </aside>
      </section>
    </main>
  `;
}

function renderMascotCard() {
  return `
    <aside class="mascot-card">
      <div class="mascot-frame">
        <img src="${ASSETS.mascot}" alt="Carlitos">
      </div>
      <div>
        <strong>Manos Magicas</strong>
        <span>Camara opcional y modo demo para aula.</span>
      </div>
    </aside>
  `;
}

function renderCategoryCard(group) {
  const stars = group.gameIds.reduce((total, id) => total + gameStars(id), 0);
  return `
    <article class="category-card theme-category-${group.id}">
      <span>${escapeHtml(group.label)}</span>
      <h3>${escapeHtml(group.title)}</h3>
      <p>${escapeHtml(group.subtitle)}</p>
      <div class="category-card-meta">
        <strong>${group.gameIds.length}</strong><small>juegos</small>
        <strong>${stars}</strong><small>estrellas</small>
      </div>
      <a class="play-link" href="#${group.id}">Abrir categoria</a>
    </article>
  `;
}

function renderGameCard(game) {
  const ages = game.ages.map((id) => getAgeGroup(id)?.label).filter(Boolean).join(" / ");
  return `
    <article class="hub-card theme-${game.color}">
      <div class="hub-card-top">
        <span>${escapeHtml(game.level)}</span>
        <span class="star-row">${renderStars(gameStars(game.id))}</span>
      </div>
      <h3>${escapeHtml(game.title)}</h3>
      <p>${escapeHtml(game.prompt)}</p>
      <div class="hub-meta">
        <span>${escapeHtml(game.concept)}</span>
        <span>${escapeHtml(ages)}</span>
      </div>
      <div class="mini-progress"><i style="width:${gameProgressPercent(game.id)}%"></i></div>
      <a class="play-link" href="#${game.id}">Jugar</a>
    </article>
  `;
}

function renderVisionPanel() {
  return `
    <section class="vision-panel">
      <div class="vision-preview ${state.vision.enabled ? "camera-on" : ""}">
        <video id="visionVideo" playsinline muted autoplay></video>
        <canvas id="visionCanvas"></canvas>
        <div class="capture-ribbon ${state.vision.enabled ? "on" : ""}">
          <i></i><span>${escapeHtml(cameraCaptureLabel())}</span>
        </div>
        <div class="vision-empty">
          <img src="${ASSETS.mascot}" alt="">
          <strong>Sensor de manos</strong>
          <span>${escapeHtml(state.vision.status)}</span>
        </div>
      </div>
      <div class="vision-controls">
        <button type="button" id="startCamera" ${state.vision.loading ? "disabled" : ""}>
          ${state.vision.enabled ? "Reiniciar camara" : "Activar camara"}
        </button>
        <button type="button" id="stopCamera" class="mini-button">Apagar</button>
        <span class="sensor-pill ${state.vision.ready ? "ready" : ""}" id="visionStatus">${escapeHtml(state.vision.status)}</span>
      </div>
      <div class="camera-panel ${state.vision.enabled ? "on" : ""} ${state.vision.error ? "has-error" : ""}" id="cameraPanel">
        <div>
          <strong>${escapeHtml(cameraPanelTitle())}</strong>
          <span>${escapeHtml(cameraPanelText())}</span>
        </div>
        ${state.vision.error ? `<p>${escapeHtml(state.vision.error)}</p>` : ""}
        ${renderCameraHelp()}
      </div>
      <div class="sensor-readout">
        <div><strong id="visionFingers">${visionNumberLabel()}</strong><span>dedos</span></div>
        <div><strong id="visionZone">${escapeHtml(state.vision.zone)}</strong><span>zona</span></div>
        <div><strong id="visionGesture">${escapeHtml(state.vision.gesture)}</strong><span>gesto</span></div>
      </div>
      <div class="demo-pad">
        <div>
          <span>Dedos demo</span>
          ${repeat(11, (value) => `<button type="button" data-sim-fingers="${value}">${value}</button>`)}
        </div>
        <div>
          <span>Movimiento demo</span>
          ${["izquierda", "centro", "derecha"].map((zone) => `<button type="button" data-sim-zone="${zone}">${escapeHtml(zone)}</button>`).join("")}
          <button type="button" data-sim-gesture="palma">palma</button>
        </div>
      </div>
    </section>
  `;
}

function renderChallengePanel(game) {
  const challenge = state.challenge || createChallenge(game.id);
  return `
    <section class="challenge-panel">
      <div class="challenge-heading">
        <p class="eyebrow">Reto activo</p>
        <h2>${escapeHtml(challenge.title)}</h2>
        <p>${escapeHtml(challenge.prompt)}</p>
      </div>
      <div class="motion-board">
        ${renderBoard(game.id, challenge)}
      </div>
      ${renderAnswerControls(challenge)}
      ${renderFeedback()}
      ${renderConceptCoach(challenge)}
      <div class="stage-footer">
        <button type="button" id="newChallenge" class="mini-button">Nuevo reto</button>
        <span>${escapeHtml(challenge.hint)}</span>
      </div>
    </section>
  `;
}

function renderBoard(gameId, challenge) {
  if (gameId === "dedos") return renderFingerBoard(challenge);
  if (gameId === "semillas") return renderSeedGuardianBoard(challenge);
  if (gameId === "robots") return renderRobotBoard(challenge);
  if (gameId === "azar") return renderChanceBoard(challenge);
  if (gameId === "datos") return renderDataBoard(challenge);
  return renderRhythmBoard(challenge);
}

function renderAnswerControls(challenge) {
  if (challenge.input === "fingers-exact") {
    return `
      <div class="answer-strip">
        ${repeat(11, (value) => `<button type="button" data-answer="${value}">${value}</button>`)}
      </div>
    `;
  }

  if (challenge.input === "zone") {
    return `
      <div class="zone-strip">
        ${challenge.options.map((option) => `
          <button type="button" data-answer="${escapeAttribute(option.value)}">${escapeHtml(option.label)}</button>
        `).join("")}
      </div>
    `;
  }

  return `
    <div class="choice-grid">
      ${challenge.options.map((option, index) => `
        <button type="button" data-answer="${escapeAttribute(option.value)}">
          <kbd>${index + 1}</kbd><span>${escapeHtml(option.label)}</span>
        </button>
      `).join("")}
    </div>
  `;
}

function renderFingerBoard(challenge) {
  return `
    <div class="finger-board">
      <div class="finger-target">
        <span>${challenge.a}</span><b>+</b><span>${challenge.b}</span>
      </div>
      <div class="seed-dots">${repeat(challenge.answer, (index) => `<i style="animation-delay:${index * 28}ms"></i>`)}</div>
      <div class="camera-answer">
        <strong id="liveAnswer">${visionNumberLabel()}</strong>
        <span>detectado</span>
      </div>
    </div>
  `;
}

function renderSeedGuardianBoard(challenge) {
  return `
    <div class="lane-board">
      ${challenge.options.map((option) => `
        <button type="button" class="lane-card ${state.vision.zone === option.value ? "active" : ""}" data-answer="${escapeAttribute(option.value)}">
          <span>${escapeHtml(option.label)}</span>
          <strong>${option.count}</strong>
          <div class="mini-seeds">${repeat(option.count, () => "<i></i>")}</div>
        </button>
      `).join("")}
    </div>
  `;
}

function renderRobotBoard(challenge) {
  const battle = state.progress.robotBattle;
  return `
    <div class="robot-arena-lite">
      <div class="robot-energy">
        <span>Tu robot <i style="width:${battle.player}%"></i></span>
        <span>Rival <i style="width:${battle.enemy}%"></i></span>
      </div>
      <div class="robot-operation">${challenge.a} x ${challenge.b}</div>
      <div class="air-options">
        ${challenge.options.map((option, index) => `
          <button type="button" data-answer="${option.value}">
            <small>${index + 1} dedo${index ? "s" : ""}</small>
            <strong>${option.label}</strong>
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function renderChanceBoard(challenge) {
  return `
    <div class="wheel-board">
      <div class="gesture-wheel ${state.vision.gesture === "palma" ? "spin" : ""}"></div>
      <div class="lane-board compact">
        ${challenge.options.map((option) => `
          <button type="button" class="lane-card ${state.vision.zone === option.value ? "active" : ""}" data-answer="${escapeAttribute(option.value)}">
            <span>${escapeHtml(option.label)}</span>
            <strong>${option.count}</strong>
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function renderDataBoard(challenge) {
  return `
    <div class="data-motion">
      <div class="data-row">
        ${challenge.data.map((value) => `<span>${value}</span>`).join("")}
      </div>
      <div class="air-options">
        ${challenge.options.map((option, index) => `
          <button type="button" data-answer="${option.value}">
            <small>${index + 1} dedo${index ? "s" : ""}</small>
            <strong>${option.label}</strong>
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function renderRhythmBoard(challenge) {
  return `
    <div class="rhythm-board ${state.vision.gesture === "palma" ? "pulse" : ""}">
      ${challenge.sequence.map((value) => `<span>${value}</span>`).join("")}
      <b>?</b>
      <div class="beat-bars">${repeat(12, (index) => `<i style="height:${28 + ((index * 17) % 80)}px"></i>`)}</div>
    </div>
  `;
}

function renderFeedback() {
  if (!state.feedback) return `<div class="feedback"></div>`;
  return `<div class="feedback show ${state.feedback.ok ? "good" : "try"}">${escapeHtml(state.feedback.message)}</div>`;
}

function renderConceptCoach(challenge) {
  const concept = conceptMeta(challenge.conceptKey);
  const answered = Boolean(state.feedback);
  const steps = challenge.steps || [];
  const status = answered ? (state.feedback.ok ? "Portal correcto" : "Portal para revisar") : "Puerta conceptual";
  const statusClass = answered ? (state.feedback.ok ? "ok" : "review") : "";
  const selected = answered ? answerDisplay(challenge, state.feedback.selected) : "";
  const answer = answered ? answerDisplay(challenge, state.feedback.answer) : "";
  const diagnosis = answered ? state.feedback.diagnosis : concept.door;

  return `
    <section class="concept-coach ${statusClass}">
      <div class="concept-coach-head">
        <span class="coach-chip" style="--coach-color:${escapeAttribute(concept.color)}">${escapeHtml(concept.short)}</span>
        <strong>${escapeHtml(status)}</strong>
      </div>
      <p class="portal-label">${escapeHtml(diagnosis)}</p>
      <div class="coach-grid">
        <div>
          <span>Estrategia</span>
          <p>${escapeHtml(challenge.strategy || concept.door)}</p>
        </div>
        <div>
          <span>Modelo</span>
          <p>${escapeHtml(challenge.model || concept.door)}</p>
        </div>
      </div>
      ${answered ? `
        <div class="coach-answer ${state.feedback.ok ? "ok" : "review"}">
          <span>Tu portal: <strong>${escapeHtml(selected)}</strong></span>
          <span>Portal esperado: <strong>${escapeHtml(answer)}</strong></span>
        </div>
      ` : ""}
      ${steps.length ? `
        <ol class="coach-steps">
          ${steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
        </ol>
      ` : ""}
    </section>
  `;
}

function bindEvents() {
  document.querySelector("#resetProgress")?.addEventListener("click", () => {
    state.progress = defaultProgress();
    state.activeGame = "dedos";
    state.activeCategory = "ninos";
    state.challenge = createChallenge(state.activeGame);
    state.feedback = null;
    state.answered = false;
    writeProgress();
    renderApp();
  });

  document.querySelector("#startCamera")?.addEventListener("click", startCamera);
  document.querySelector("#stopCamera")?.addEventListener("click", () => stopCamera());
  document.querySelector("#newChallenge")?.addEventListener("click", newChallenge);

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => submitAnswer(button.dataset.answer, "boton"));
  });

  document.querySelectorAll("[data-sim-fingers]").forEach((button) => {
    button.addEventListener("click", () => {
      updateVisionReading(Number(button.dataset.simFingers), state.vision.zone, "demo");
      processVisionAnswer(true);
    });
  });

  document.querySelectorAll("[data-sim-zone]").forEach((button) => {
    button.addEventListener("click", () => {
      updateVisionReading(state.vision.fingers, button.dataset.simZone, "demo");
    });
  });

  document.querySelectorAll("[data-sim-gesture]").forEach((button) => {
    button.addEventListener("click", () => {
      state.vision.gesture = button.dataset.simGesture;
      updateVisionWidgets();
      processVisionAnswer(true);
    });
  });
}

function attachVisionElements() {
  videoElement = document.querySelector("#visionVideo");
  canvasElement = document.querySelector("#visionCanvas");
  canvasContext = canvasElement?.getContext("2d") || null;
  if (videoElement && state.vision.stream) {
    videoElement.muted = true;
    videoElement.playsInline = true;
    videoElement.autoplay = true;
    videoElement.srcObject = state.vision.stream;
    videoElement.play().catch(() => {});
  }
}

async function startCamera() {
  if (state.vision.loading) return;
  state.vision.loading = true;
  state.vision.error = "";
  state.vision.errorCode = "";
  state.vision.status = "Solicitando permiso";
  renderApp();

  try {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error("El navegador no permite camara.");
    }

    stopCameraTracks();
    const stream = await requestCameraStream();

    state.vision.stream = stream;
    state.vision.enabled = true;
    state.vision.ready = false;
    state.vision.mode = "camara";
    state.vision.status = "Camara activa";
    state.vision.error = "";
    state.vision.errorCode = "";
    renderApp();
    attachVisionElements();

    state.vision.status = "Cargando detector";
    updateVisionWidgets();
  } catch (error) {
    state.vision.errorCode = cameraErrorCode(error);
    state.vision.enabled = false;
    state.vision.ready = false;
    state.vision.loading = false;
    state.vision.mode = "demo";
    state.vision.status = "Camara no disponible";
    state.vision.error = cameraErrorMessage(error);
    stopCameraTracks();
    renderApp();
    return;
  }

  try {
    await loadHandLandmarker();
    state.vision.ready = true;
    state.vision.loading = false;
    state.vision.status = "Manos listas";
    renderApp();
    startVisionLoop();
    updateVisionWidgets();
  } catch (error) {
    state.vision.ready = false;
    state.vision.loading = false;
    state.vision.mode = "camara";
    state.vision.landmarker = null;
    state.vision.status = "Video activo";
    state.vision.errorCode = "detector";
    state.vision.error = detectorErrorMessage(error);
    renderApp();
  }
}

async function requestCameraStream() {
  const preferred = {
    audio: false,
    video: {
      facingMode: { ideal: "user" },
      width: { ideal: 640 },
      height: { ideal: 480 },
    },
  };

  try {
    return await navigator.mediaDevices.getUserMedia(preferred);
  } catch (error) {
    if (isHardCameraError(error)) throw error;
    try {
      return await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    } catch (fallbackError) {
      fallbackError.primaryError = error;
      throw fallbackError;
    }
  }
}

async function loadHandLandmarker() {
  if (state.vision.landmarker) return;

  const errors = [];
  for (const source of VISION_SOURCES) {
    try {
      const module = await import(source.bundle);
      const { FilesetResolver, HandLandmarker } = module;
      const vision = await FilesetResolver.forVisionTasks(source.wasm);
      state.vision.landmarker = await createHandLandmarker(HandLandmarker, vision);
      visionModule = module;
      detectorSourceLabel = source.label;
      return;
    } catch (error) {
      errors.push(`${source.label}: ${error?.message || error}`);
    }
  }
  throw new Error(`No se pudo cargar MediaPipe (${errors.join(" | ")})`);
}

async function createHandLandmarker(HandLandmarker, vision) {
  try {
    return await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: HAND_MODEL_URL,
        delegate: "GPU",
      },
      runningMode: "VIDEO",
      numHands: 2,
      minHandDetectionConfidence: 0.55,
      minHandPresenceConfidence: 0.55,
      minTrackingConfidence: 0.5,
    });
  } catch (error) {
    return HandLandmarker.createFromOptions(vision, {
      baseOptions: { modelAssetPath: HAND_MODEL_URL },
      runningMode: "VIDEO",
      numHands: 2,
    });
  }
}

function startVisionLoop() {
  if (animationFrame) cancelAnimationFrame(animationFrame);
  const loop = () => {
    if (!state.vision.enabled || !state.vision.landmarker || !videoElement) return;
    if (videoElement.readyState >= 2 && videoElement.currentTime !== state.vision.videoTime) {
      state.vision.videoTime = videoElement.currentTime;
      const result = state.vision.landmarker.detectForVideo(videoElement, performance.now());
      handleHandResult(result);
    }
    animationFrame = requestAnimationFrame(loop);
  };
  animationFrame = requestAnimationFrame(loop);
}

function stopCamera(shouldRender = true) {
  if (animationFrame) cancelAnimationFrame(animationFrame);
  animationFrame = null;
  stopCameraTracks();
  state.vision.enabled = false;
  state.vision.ready = false;
  state.vision.loading = false;
  state.vision.mode = "demo";
  state.vision.status = "Camara apagada";
  state.vision.error = "";
  state.vision.errorCode = "";
  if (videoElement) videoElement.srcObject = null;
  if (canvasContext && canvasElement) canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
  if (shouldRender) renderApp();
}

function stopCameraTracks() {
  if (state.vision.stream) {
    state.vision.stream.getTracks().forEach((track) => track.stop());
  }
  state.vision.stream = null;
}

function handleHandResult(result) {
  const hands = result.landmarks || [];
  if (!hands.length) {
    updateVisionReading(null, state.vision.zone, "sin mano", 0);
    clearVisionCanvas();
    return;
  }

  const fingers = hands.reduce((total, landmarks) => total + countExtendedFingers(landmarks), 0);
  const zone = handZone(hands[0]);
  const gesture = detectGesture(hands[0], fingers);
  updateVisionReading(fingers, zone, gesture, Math.min(1, hands.length / 2 + 0.5));
  drawHands(hands);
  processVisionAnswer(false);
}

function updateVisionReading(fingers, zone, gesture, confidence = 1) {
  const raw = fingers === null || fingers === undefined ? "x" : String(fingers);
  if (raw === state.vision.lastRaw) {
    state.vision.stableCount += 1;
  } else {
    state.vision.lastRaw = raw;
    state.vision.stableCount = 1;
  }

  state.vision.fingers = fingers;
  state.vision.zone = zone || "centro";
  state.vision.gesture = gesture || "demo";
  state.vision.confidence = confidence;
  if (state.vision.stableCount >= 6 && fingers !== null && fingers !== undefined) {
    state.vision.stableValue = fingers;
  }
  updateVisionWidgets();
}

function processVisionAnswer(force) {
  if (!state.challenge || state.answered) return;
  if (!force && Date.now() < state.vision.lockedUntil) return;

  const challenge = state.challenge;
  if (challenge.input === "fingers-exact") {
    const value = force ? state.vision.fingers : state.vision.stableValue;
    if (value === null || value === undefined) return;
    submitAnswer(String(value), "dedos");
    return;
  }

  if (challenge.input === "fingers-option") {
    const value = force ? state.vision.fingers : state.vision.stableValue;
    if (!Number.isFinite(Number(value))) return;
    const option = challenge.options[Number(value) - 1];
    if (option) submitAnswer(String(option.value), "dedos");
    return;
  }

  if (challenge.input === "zone" && (force || state.vision.gesture === "palma" || state.vision.gesture === "pinza")) {
    submitAnswer(state.vision.zone, "mano");
  }
}

function updateVisionWidgets() {
  const updates = [
    ["#visionStatus", state.vision.status],
    ["#visionFingers", visionNumberLabel()],
    ["#visionZone", state.vision.zone],
    ["#visionGesture", state.vision.gesture],
    ["#sideFingers", visionNumberLabel()],
    ["#sideZone", state.vision.zone],
    ["#sideGesture", state.vision.gesture],
    ["#liveAnswer", visionNumberLabel()],
  ];
  updates.forEach(([selector, value]) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = value;
  });
}

function drawHands(hands) {
  if (!canvasElement || !canvasContext || !videoElement) return;
  const width = videoElement.videoWidth || 640;
  const height = videoElement.videoHeight || 480;
  canvasElement.width = width;
  canvasElement.height = height;
  canvasContext.clearRect(0, 0, width, height);
  canvasContext.lineWidth = Math.max(3, width / 180);
  canvasContext.strokeStyle = "#ffd23f";
  canvasContext.fillStyle = "#0b5d3b";
  hands.forEach((landmarks) => {
    HAND_CONNECTIONS.forEach(([a, b]) => {
      canvasContext.beginPath();
      canvasContext.moveTo(landmarks[a].x * width, landmarks[a].y * height);
      canvasContext.lineTo(landmarks[b].x * width, landmarks[b].y * height);
      canvasContext.stroke();
    });
    landmarks.forEach((point) => {
      canvasContext.beginPath();
      canvasContext.arc(point.x * width, point.y * height, Math.max(4, width / 150), 0, Math.PI * 2);
      canvasContext.fill();
    });
  });
}

function clearVisionCanvas() {
  if (canvasContext && canvasElement) canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
}

function countExtendedFingers(landmarks) {
  let count = 0;
  if (landmarks[8].y < landmarks[6].y - 0.025) count += 1;
  if (landmarks[12].y < landmarks[10].y - 0.025) count += 1;
  if (landmarks[16].y < landmarks[14].y - 0.025) count += 1;
  if (landmarks[20].y < landmarks[18].y - 0.025) count += 1;
  if (Math.abs(landmarks[4].x - landmarks[3].x) > 0.055 && landmarks[4].y < landmarks[6].y + 0.08) count += 1;
  return count;
}

function handZone(landmarks) {
  const center = landmarks.reduce((total, point) => total + point.x, 0) / landmarks.length;
  if (center < 0.36) return "izquierda";
  if (center > 0.64) return "derecha";
  return "centro";
}

function detectGesture(landmarks, fingers) {
  const pinchDistance = distance(landmarks[4], landmarks[8]);
  if (pinchDistance < 0.055) return "pinza";
  if (fingers >= 4) return "palma";
  if (fingers === 0) return "puno";
  if (fingers === 1) return "apuntar";
  return "mano";
}

function createChallenge(gameId) {
  if (gameId === "dedos") return createFingerChallenge();
  if (gameId === "semillas") return createSeedGuardianChallenge();
  if (gameId === "robots") return createRobotChallenge();
  if (gameId === "azar") return createChanceChallenge();
  if (gameId === "datos") return createDataChallenge();
  return createRhythmChallenge();
}

function createFingerChallenge() {
  const a = rand(1, 5);
  const b = rand(1, 5);
  const answer = a + b;
  return {
    input: "fingers-exact",
    conceptKey: "suma",
    title: "Suma con las manos",
    prompt: `Muestra ${a} + ${b} con tus dedos.`,
    hint: "Si no hay camara, toca el numero de la fila demo.",
    strategy: "Forma el primer grupo, agrega el segundo y cuenta todo junto.",
    model: `${a} semillas y ${b} semillas forman ${answer} semillas.`,
    steps: [
      `Empieza con ${a}.`,
      `Agrega ${b} mas.`,
      `Cuenta todo junto: ${answer}.`,
    ],
    a,
    b,
    answer,
  };
}

function createSeedGuardianChallenge() {
  const options = ["izquierda", "centro", "derecha"].map((zone) => ({ value: zone, label: zone, count: rand(2, 9) }));
  ensureUniqueCountWinner(options);
  const winner = options.slice().sort((a, b) => b.count - a.count)[0];
  return {
    input: "zone",
    conceptKey: "comparacion",
    title: "Canasto con mas semillas",
    prompt: "Mueve la mano al canasto que tiene mas semillas y abre la palma.",
    hint: "Tambien puedes tocar el canasto.",
    strategy: "Compara las tres cantidades y busca la mayor.",
    model: `El canasto ${winner.label} tiene ${winner.count}; por eso es el grupo mayor.`,
    steps: [
      "Mira cada canasto como un grupo.",
      `Compara: ${options.map((option) => `${option.label} ${option.count}`).join(", ")}.`,
      `El grupo mayor esta en ${winner.label}.`,
    ],
    options,
    answer: winner.value,
  };
}

function createRobotChallenge() {
  const a = rand(2, 12);
  const b = rand(2, 12);
  const answer = a * b;
  return {
    input: "fingers-option",
    conceptKey: "multiplicacion",
    title: "Energia del robot",
    prompt: `El robot necesita resolver ${a} x ${b}. Muestra 1 a 4 dedos para elegir.`,
    hint: "Cada cantidad de dedos elige una tarjeta de energia.",
    strategy: "Piensa en grupos iguales: una carta dice cuantas filas y la otra cuantas columnas.",
    model: `${a} grupos de ${b} energia producen ${answer} unidades.`,
    steps: [
      `Toma ${a} grupos.`,
      `Cada grupo vale ${b}.`,
      `Multiplica ${a} x ${b}: ${answer}.`,
    ],
    a,
    b,
    answer,
    options: makeNumberOptions(answer, 4, 1, 160),
  };
}

function createChanceChallenge() {
  const options = [
    { value: "izquierda", label: "verde", count: rand(3, 8) },
    { value: "centro", label: "dorado", count: rand(1, 7) },
    { value: "derecha", label: "coral", count: rand(1, 7) },
  ];
  ensureUniqueCountWinner(options);
  const answer = options.slice().sort((a, b) => b.count - a.count)[0].value;
  const winner = options.find((option) => option.value === answer);
  return {
    input: "zone",
    conceptKey: "probabilidad",
    title: "La rueda decide",
    prompt: "Gira con la palma y elige el color con mas sectores.",
    hint: "Mas sectores significa mas oportunidad.",
    strategy: "Cuenta sectores: la opcion con mas partes aparece mas veces en la rueda.",
    model: `${winner.label} tiene ${winner.count} sectores, asi que tiene mas oportunidades.`,
    steps: [
      "Observa cuantos sectores tiene cada color.",
      `Compara: ${options.map((option) => `${option.label} ${option.count}`).join(", ")}.`,
      `El color con mas sectores es ${winner.label}.`,
    ],
    options,
    answer,
  };
}

function createDataChallenge() {
  const data = [rand(2, 8), rand(2, 8), rand(2, 8), rand(2, 8), rand(2, 8)];
  data[4] = data[1];
  const sorted = data.slice().sort((a, b) => a - b);
  const ask = Math.random() > 0.5 ? "mediana" : "moda";
  const answer = ask === "mediana" ? sorted[2] : getMode(data);
  return {
    input: "fingers-option",
    conceptKey: "estadistica",
    title: `Encuentra la ${ask}`,
    prompt: `Muestra 1 a 4 dedos para elegir la tarjeta correcta.`,
    hint: "Ordenar con la mirada ayuda antes de responder.",
    strategy: ask === "mediana"
      ? "Ordena los datos y busca el valor que queda en el centro."
      : "Busca el valor que se repite mas veces.",
    model: ask === "mediana"
      ? `Ordenados: ${sorted.join(", ")}. El centro es ${answer}.`
      : `En ${data.join(", ")}, el valor que mas se repite es ${answer}.`,
    steps: ask === "mediana" ? [
      `Ordena los datos: ${sorted.join(", ")}.`,
      "Con cinco datos, el tercero queda en el centro.",
      `La mediana es ${answer}.`,
    ] : [
      `Mira los datos: ${data.join(", ")}.`,
      "Cuenta que valor aparece mas veces.",
      `La moda es ${answer}.`,
    ],
    data,
    answer,
    options: makeNumberOptions(answer, 4, 1, 12),
  };
}

function createRhythmChallenge() {
  const patterns = [
    { sequence: [1, 2, 3], answer: 4, rule: "sumar 1" },
    { sequence: [2, 4, 6], answer: 8, rule: "sumar 2" },
    { sequence: [1, 3, 5], answer: 7, rule: "sumar 2" },
    { sequence: [1, 2, 4], answer: 8, rule: "multiplicar por 2" },
    { sequence: [3, 5, 7], answer: 9, rule: "sumar 2" },
  ];
  const pattern = patterns[rand(0, patterns.length - 1)];
  return {
    input: "fingers-exact",
    conceptKey: "patrones",
    title: "Ritmo secreto",
    prompt: `Completa ${pattern.sequence.join(", ")}, ? con tus dedos.`,
    hint: `Busca el ritmo: ${pattern.rule}.`,
    strategy: "Encuentra que cambia de una ficha a la siguiente y repite esa regla.",
    model: `La regla es ${pattern.rule}; por eso sigue ${pattern.answer}.`,
    steps: [
      `Observa la secuencia: ${pattern.sequence.join(", ")}.`,
      `Detecta la regla: ${pattern.rule}.`,
      `Aplica la regla una vez mas: ${pattern.answer}.`,
    ],
    sequence: pattern.sequence,
    answer: pattern.answer,
  };
}

function submitAnswer(value, source) {
  if (state.answered) return;
  const selected = normalizeAnswer(value);
  const answer = normalizeAnswer(state.challenge.answer);
  const ok = selected === answer;
  const game = getGame(state.activeGame);
  const stats = gameStats(game.id);
  const concept = conceptStats(state.challenge.conceptKey || game.conceptKey);

  state.answered = true;
  state.vision.lockedUntil = Date.now() + 1200;
  state.progress.played += 1;
  stats.played += 1;
  concept.played += 1;
  concept.lastAt = new Date().toISOString();

  if (ok) {
    state.progress.correct += 1;
    stats.correct += 1;
    concept.correct += 1;
    state.progress.streak += 1;
    const points = 10 + Math.min(10, state.progress.streak);
    state.progress.score += points;
    if (game.id === "robots") {
      state.progress.robotBattle.enemy = Math.max(0, state.progress.robotBattle.enemy - 24);
    }
    state.feedback = {
      ok: true,
      message: `Bien. +${points} puntos. Respuesta tomada por ${source}.`,
      selected: value,
      answer: state.challenge.answer,
      source,
      diagnosis: "Atravesaste el portal correcto. Ahora mira los pasos para explicar tu razonamiento.",
    };
  } else {
    state.progress.streak = 0;
    if (game.id === "robots") {
      state.progress.robotBattle.player = Math.max(0, state.progress.robotBattle.player - 18);
    }
    state.feedback = {
      ok: false,
      message: `Casi. La respuesta correcta era ${state.challenge.answer}.`,
      selected: value,
      answer: state.challenge.answer,
      source,
      diagnosis: conceptMeta(state.challenge.conceptKey || game.conceptKey).repair,
    };
  }

  state.progress.completed[game.id] = gameStars(game.id) > 0 || ok;
  pushHistory(game.id, {
    ok,
    selected: value,
    answer: state.challenge.answer,
    prompt: state.challenge.title,
    source,
  });
  writeProgress();
  renderApp();
}

function newChallenge() {
  state.challenge = createChallenge(state.activeGame);
  state.answered = false;
  state.feedback = null;
  renderApp();
}

function handleKeyboard(event) {
  if (event.key >= "0" && event.key <= "9") {
    updateVisionReading(Number(event.key), state.vision.zone, "teclado");
    processVisionAnswer(true);
  }
  if (event.key === "Enter") newChallenge();
}

function getGame(id) {
  return GAMES.find((game) => game.id === id);
}

function getAgeGroup(id) {
  return AGE_GROUPS.find((group) => group.id === id);
}

function categoryForGame(gameId, preferredId) {
  const preferred = getAgeGroup(preferredId);
  if (preferred?.gameIds.includes(gameId)) return preferred;
  return AGE_GROUPS.find((group) => group.gameIds.includes(gameId)) || AGE_GROUPS[1];
}

function defaultProgress() {
  return {
    score: 0,
    streak: 0,
    played: 0,
    correct: 0,
    lastGame: "dedos",
    lastCategory: "ninos",
    completed: {},
    statsByGame: {},
    conceptStats: {},
    historyByGame: {},
    robotBattle: { player: 100, enemy: 100 },
  };
}

function readProgress() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!parsed || typeof parsed !== "object") return defaultProgress();
    const playerLife = Number(parsed.robotBattle?.player);
    const enemyLife = Number(parsed.robotBattle?.enemy);
    return {
      ...defaultProgress(),
      ...parsed,
      completed: parsed.completed || {},
      statsByGame: parsed.statsByGame || {},
      conceptStats: parsed.conceptStats || {},
      historyByGame: parsed.historyByGame || {},
      robotBattle: {
        player: Number.isFinite(playerLife) ? Math.max(0, Math.min(100, playerLife)) : 100,
        enemy: Number.isFinite(enemyLife) ? Math.max(0, Math.min(100, enemyLife)) : 100,
      },
    };
  } catch (error) {
    return defaultProgress();
  }
}

function writeProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  } catch (error) {
    // El juego sigue sin almacenamiento local.
  }
}

function gameStats(gameId) {
  if (!state.progress.statsByGame[gameId]) {
    state.progress.statsByGame[gameId] = { played: 0, correct: 0 };
  }
  return state.progress.statsByGame[gameId];
}

function conceptStats(conceptKey) {
  const key = conceptKey || "suma";
  if (!state.progress.conceptStats) state.progress.conceptStats = {};
  if (!state.progress.conceptStats[key]) {
    state.progress.conceptStats[key] = { played: 0, correct: 0, lastAt: "" };
  }
  return state.progress.conceptStats[key];
}

function renderConceptMastery() {
  const keys = [...new Set(GAMES.map((game) => game.conceptKey))];
  return `
    <div class="concept-mastery">
      ${keys.map((key) => {
        const meta = conceptMeta(key);
        const stats = conceptStats(key);
        const percent = Math.round((stats.correct / Math.max(1, stats.played)) * 100);
        const width = stats.played ? percent : 4;
        return `
          <div class="mastery-row">
            <div>
              <strong>${escapeHtml(meta.short)}</strong>
              <span>${stats.played ? `${stats.correct}/${stats.played} aciertos` : "sin jugar"}</span>
            </div>
            <i style="--concept-color:${escapeAttribute(meta.color)};width:${width}%"></i>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function gameStars(gameId) {
  const stats = gameStats(gameId);
  if (!stats.correct) return 0;
  if (stats.correct >= 9 && stats.correct / Math.max(1, stats.played) >= 0.72) return 3;
  if (stats.correct >= 5) return 2;
  return 1;
}

function gameProgressPercent(gameId) {
  const stats = gameStats(gameId);
  return Math.min(100, Math.round((stats.correct / 9) * 100));
}

function renderHistory(gameId) {
  const history = state.progress.historyByGame[gameId] || [];
  if (!history.length) return `<div class="history-empty">Todavia no hay movimientos.</div>`;
  return `
    <div class="history-list">
      ${history.map((item) => `
        <div class="history-item ${item.ok ? "correct" : "incorrect"}">
          <strong>${item.ok ? "OK" : "Revisar"}</strong>
          <span>${escapeHtml(item.prompt)}</span>
          <small>${escapeHtml(item.source)}: ${escapeHtml(item.selected)} | correcta: ${escapeHtml(item.answer)}</small>
        </div>
      `).join("")}
    </div>
  `;
}

function pushHistory(gameId, item) {
  if (!state.progress.historyByGame[gameId]) state.progress.historyByGame[gameId] = [];
  state.progress.historyByGame[gameId].unshift({ ...item, at: new Date().toISOString() });
  state.progress.historyByGame[gameId] = state.progress.historyByGame[gameId].slice(0, 6);
}

function makeNumberOptions(answer, count, min, max) {
  const values = new Set([Number(answer)]);
  const offsets = [1, -1, 2, -2, 3, -3, 5, -5, 10, -10];
  offsets.forEach((offset) => {
    if (values.size < count) values.add(clamp(Number(answer) + offset, min, max));
  });
  while (values.size < count) values.add(rand(min, max));
  return [...values]
    .sort(() => Math.random() - 0.5)
    .map((value) => ({ value, label: String(value) }));
}

function ensureUniqueCountWinner(options) {
  const sorted = options.slice().sort((a, b) => b.count - a.count);
  if (sorted[0].count === sorted[1].count) sorted[0].count += 1;
}

function getMode(values) {
  const counts = new Map();
  values.forEach((value) => counts.set(value, (counts.get(value) || 0) + 1));
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0])[0][0];
}

function visionShortLabel() {
  if (state.vision.ready) return "detecta";
  if (state.vision.enabled) return "video";
  return "demo";
}

function visionNumberLabel() {
  return state.vision.fingers === null || state.vision.fingers === undefined ? "-" : String(state.vision.fingers);
}

function cameraCaptureLabel() {
  if (state.vision.ready) return "Video + manos";
  if (state.vision.enabled) return "Video activo";
  if (state.vision.loading) return "Esperando permiso";
  if (state.vision.error) return "Permiso o video";
  return "Camara apagada";
}

function cameraPanelTitle() {
  if (state.vision.ready) return "La camara esta leyendo movimientos";
  if (state.vision.enabled && state.vision.loading) return "La camara ya muestra video";
  if (state.vision.enabled) return "Video activo";
  if (state.vision.errorCode === "permission") return "Permiso de camara bloqueado";
  if (state.vision.errorCode === "insecure") return "Abre la app desde HTTPS";
  if (state.vision.errorCode === "unsupported") return "Este navegador no abre camara";
  if (state.vision.errorCode === "notfound") return "No se encontro camara";
  if (state.vision.error) return "La camara necesita revision";
  return "Camara apagada";
}

function cameraPanelText() {
  if (state.vision.ready) return `Mueve la mano o muestra dedos dentro del recuadro. Detector: ${detectorSourceLabel || "activo"}.`;
  if (state.vision.enabled && state.vision.loading) return "Ya deberias verte. Estamos preparando el detector de manos.";
  if (state.vision.enabled) return "El video funciona. Si el detector no cargo, usa los botones demo mientras tanto.";
  if (state.vision.errorCode === "permission") return "El navegador nego el permiso. Habilitalo y vuelve a tocar Activar camara.";
  if (state.vision.errorCode === "insecure") return "Los navegadores solo permiten camara en GitHub Pages HTTPS o en localhost.";
  if (state.vision.errorCode === "unsupported") return "Prueba Chrome, Edge o Safari actualizado. El modo demo sigue disponible.";
  if (state.vision.errorCode === "notfound") return "Conecta una camara o usa otro dispositivo. Tambien puedes seguir con demo.";
  if (state.vision.error) return "Puedes seguir jugando con los controles demo mientras se revisa el permiso.";
  return "Toca Activar camara para ver tu imagen en este panel.";
}

function renderCameraHelp() {
  const steps = cameraHelpSteps();
  if (!steps.length) return "";
  return `
    <ol class="camera-help">
      ${steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
    </ol>
  `;
}

function cameraHelpSteps() {
  if (state.vision.errorCode === "permission") {
    return [
      "Toca el candado o icono de camara en la barra del navegador.",
      "Cambia Camara a Permitir para este sitio.",
      "Recarga la pagina y vuelve a tocar Activar camara.",
      "Si estas en celular, revisa tambien permisos del navegador en Ajustes.",
    ];
  }
  if (state.vision.errorCode === "insecure") {
    return [
      "Abre la version publicada: https://investigapyrm.github.io/jugando_con_carlitos/",
      "Evita abrir el archivo HTML directo o desde una ruta no segura.",
      "En desarrollo local, usa http://127.0.0.1 o http://localhost.",
    ];
  }
  if (state.vision.errorCode === "notfound") {
    return [
      "Verifica que el dispositivo tenga camara conectada.",
      "Cierra otras aplicaciones que puedan estar usando la camara.",
      "Si no hay camara, usa Dedos demo y Movimiento demo.",
    ];
  }
  if (state.vision.errorCode === "unsupported") {
    return [
      "Usa un navegador moderno con soporte para getUserMedia.",
      "Actualiza el navegador si el dispositivo es compatible.",
      "La app conserva todos los juegos en modo demo.",
    ];
  }
  if (state.vision.errorCode === "detector") {
    return [
      "El panel de video ya sirve para confirmar que la camara captura.",
      "Si la red bloquea el detector, responde con los botones demo.",
      "Prueba buena luz y coloca la mano completa dentro del recuadro.",
    ];
  }
  return [];
}

function cameraErrorCode(error) {
  const name = error?.name || "";
  if (location.protocol !== "https:" && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    return "insecure";
  }
  if (name === "NotAllowedError" || name === "PermissionDeniedError" || name === "SecurityError") return "permission";
  if (name === "NotFoundError" || name === "DevicesNotFoundError") return "notfound";
  if (!navigator.mediaDevices?.getUserMedia) return "unsupported";
  return "unknown";
}

function cameraErrorMessage(error) {
  const code = cameraErrorCode(error);
  if (code === "permission") {
    return "El permiso fue denegado o quedo bloqueado para este sitio.";
  }
  if (code === "notfound") {
    return "No se encontro una camara disponible en este dispositivo.";
  }
  if (code === "insecure") {
    return "La camara necesita HTTPS o localhost. Abre la version publicada en GitHub Pages.";
  }
  if (code === "unsupported") {
    return "Este navegador no ofrece acceso a camara desde la web.";
  }
  return "No se pudo iniciar el video aun con configuracion basica. El modo demo queda disponible.";
}

function detectorErrorMessage(error) {
  return "El video esta activo, pero el detector de manos no termino de cargar desde las fuentes externas. Puedes ver la camara y jugar con el modo demo.";
}

function isHardCameraError(error) {
  const name = error?.name || "";
  return name === "NotAllowedError"
    || name === "PermissionDeniedError"
    || name === "SecurityError"
    || name === "NotFoundError"
    || name === "DevicesNotFoundError";
}

function conceptMeta(conceptKey) {
  return CONCEPTS[conceptKey] || CONCEPTS.suma;
}

function answerDisplay(challenge, value) {
  const normalized = normalizeAnswer(value);
  const option = challenge.options?.find((item) => normalizeAnswer(item.value) === normalized);
  if (option) {
    const count = Number.isFinite(Number(option.count)) ? `, ${option.count}` : "";
    return `${option.label}${count}`;
  }
  return String(value);
}

function normalizeAnswer(value) {
  return String(value).trim().toLowerCase();
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function repeat(count, renderer) {
  return Array.from({ length: count }, (_, index) => renderer(index)).join("");
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
