const APP_VERSION = "v0.7.1";
const BUILD_DATE = "2026-06-27";
const STORAGE_KEY = "jugando-carlitos:motion-progress:v1";

const ASSETS = {
  hero: "assets/generated/hero_jugando_con_carlitos.png",
  mascot: "assets/generated/carlitos_character_sheet_v01.png",
};

const MEDIAPIPE_VERSION = "0.10.21";
const VISION_BUNDLE_URL = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MEDIAPIPE_VERSION}/vision_bundle.mjs`;
const VISION_WASM_URL = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MEDIAPIPE_VERSION}/wasm`;
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
    gameIds: ["dedos", "semillas", "robots", "azar", "ritmo", "ia"],
  },
  {
    id: "mayores",
    label: "12+",
    short: "Mayores",
    title: "Laboratorio de movimiento",
    subtitle: "Datos, estrategia y lectura visual con gestos mas precisos.",
    gameIds: ["robots", "azar", "datos", "ritmo", "ia"],
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
  {
    id: "ia",
    title: "Maquina que Aprende",
    concept: "IA, datos y sesgo",
    conceptKey: "aprendizaje",
    level: "Mision 7",
    ages: ["ninos", "mayores"],
    color: "plum",
    gesture: "camara",
    prompt: "Entrenar una IA con ejemplos y descubrir cuando se equivoca",
  },
];

const FAIR_GAME_IDS = ["dedos", "semillas", "robots", "azar", "datos", "ritmo", "ia"];

const AI_CLASSES = [
  { id: "circulo", label: "Circulo", mark: "●", prototype: [0.9, 0.18, 0.18, 0.42, 0.22, 0.72, 0.2] },
  { id: "cuadrado", label: "Cuadrado", mark: "■", prototype: [0.18, 0.58, 0.92, 0.48, 0.28, 0.62, 0.48] },
  { id: "triangulo", label: "Triangulo", mark: "▲", prototype: [0.95, 0.78, 0.18, 0.58, 0.24, 0.68, 0.36] },
];

const AI_MIN_SAMPLES = 2;

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
  aprendizaje: {
    label: "Aprendizaje supervisado",
    short: "IA",
    color: "#635380",
    door: "La IA compara ejemplos etiquetados. Si los datos son pobres, aprende mal.",
    repair: "Agrega ejemplos variados, cambia luz y fondos, y vuelve a probar la matriz.",
  },
};

const app = document.querySelector("#app");

const state = {
  route: "fair",
  activeCategory: "ninos",
  activeGame: "dedos",
  challenge: null,
  answered: false,
  aiTrainer: defaultAiTrainer(),
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
    handX: null,
    handY: null,
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
let aiFeatureCanvas = null;
let aiFeatureContext = null;

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
  const rawHash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  const hash = rawHash || "feria";
  const group = getAgeGroup(hash);
  const game = getGame(hash);

  if (hash === "feria" || hash === "stand" || hash === "ciencia") {
    state.route = "fair";
    if (!state.challenge) state.challenge = createChallenge(state.activeGame);
    return;
  }

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
  app.dataset.route = state.route;
  app.innerHTML = `
    <header class="app-top">
      <div class="top-inner">
        <a class="brand" href="#feria">Jugando con Carlitos</a>
        <nav class="top-game-tabs" aria-label="Categorias">
          <a href="#feria" class="${state.route === "fair" ? "active" : ""}">
            Feria <span>Semana de la Ciencia</span>
          </a>
          ${AGE_GROUPS.map((group) => `
            <a href="#${group.id}" class="${state.activeCategory === group.id && state.route !== "home" && state.route !== "fair" ? "active" : ""}">
              ${escapeHtml(group.label)} <span>${escapeHtml(group.short)}</span>
            </a>
          `).join("")}
        </nav>
        <div class="top-actions">
          <span class="score-pill">Puntos: ${state.progress.score}</span>
          <span class="level-pill">Racha: ${state.progress.streak}</span>
          <span class="mode-pill">Estrellas: ${totalStars}/${GAMES.length * 3}</span>
          <button type="button" class="reset-button booth-button" id="toggleFullscreen">Pantalla completa</button>
          <button type="button" class="reset-button" id="resetProgress">Reiniciar</button>
        </div>
      </div>
    </header>

    ${state.route === "fair" ? renderFairView() : state.route === "category" ? renderCategoryView() : state.route === "home" ? renderHomeView() : renderGameView()}

    <footer class="footer">
      <span>Modo feria. Camara local, proyector y turnos breves. El video se procesa en este navegador y no se guarda.</span>
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
          <p class="eyebrow">Semana de la Ciencia</p>
          <h1>Matematica en movimiento</h1>
          <p>Una estacion ludica para feria: un participante juega frente a la camara y el publico ayuda a pensar la estrategia.</p>
          <div class="hero-actions">
            <a class="hero-button" href="#feria">Abrir modo feria</a>
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

function renderFairView() {
  const game = getGame(state.activeGame) || GAMES[0];
  const stats = gameStats(game.id);
  return `
    <main class="fair-view theme-${game.color}">
      <section class="fair-arena" aria-label="Estacion interactiva de feria">
        <div class="fair-stage-heading">
          <div>
            <p class="eyebrow">Semana de la Ciencia</p>
            <p>Un participante entra al recuadro y responde con la mano.</p>
          </div>
          <div class="fair-stage-title">
            <strong>Estacion Carlitos</strong>
            <span>${escapeHtml(game.title)}</span>
          </div>
        </div>
        ${renderVisionPanel({ fair: true })}
      </section>

      <section class="fair-console" aria-label="Controles de la estacion">
        <div class="fair-current-game">
          <span>${escapeHtml(game.level)}</span>
          <strong>${escapeHtml(game.title)}</strong>
          <small>${escapeHtml(game.concept)} | ${stats.correct}/${Math.max(1, stats.played)} aciertos</small>
        </div>
        <div class="fair-main-actions">
          <button type="button" id="newChallenge" class="fair-next-button">Nuevo reto</button>
          <button type="button" id="toggleFullscreenSecondary" class="mini-button">Pantalla completa</button>
        </div>
        <div class="fair-mission-grid">
          ${FAIR_GAME_IDS.map(renderFairMissionButton).join("")}
        </div>
        ${game.id === "ia" ? renderAiTrainerPanel("fair") : ""}
        ${state.vision.error ? `
          <details class="fair-demo" open>
            <summary>Controles de apoyo si la camara falla</summary>
            ${renderDemoPad()}
          </details>
        ` : ""}
      </section>
    </main>
  `;
}

function renderFairMissionButton(gameId) {
  const game = getGame(gameId);
  if (!game) return "";
  const missionNumber = FAIR_GAME_IDS.indexOf(game.id) + 1;
  return `
    <button type="button" class="fair-mission-card ${game.id === state.activeGame ? "active" : ""}" data-fair-game="${escapeAttribute(game.id)}" aria-label="Cambiar a ${escapeAttribute(game.title)}">
      <span>Mision ${missionNumber}</span>
      <strong>${escapeHtml(game.title)}</strong>
    </button>
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

function renderVisionPanel(options = {}) {
  const fair = Boolean(options.fair);
  return `
    <section class="vision-panel ${fair ? "fair-vision-panel" : ""}">
      <div class="vision-preview ${state.vision.enabled ? "camera-on" : ""}">
        <video id="visionVideo" playsinline muted autoplay></video>
        <canvas id="visionCanvas"></canvas>
        ${renderMotionOverlay()}
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

function renderMotionOverlay() {
  const challenge = state.challenge || createChallenge(state.activeGame);
  const game = getGame(state.activeGame) || GAMES[0];
  const cursorStyle = pointerStyle();
  return `
    <div class="motion-overlay" id="motionOverlay" data-input="${escapeAttribute(challenge.input)}" data-zone="${escapeAttribute(state.vision.zone)}">
      <div class="overlay-grid-lines"></div>
      ${renderOverlayProblem(challenge)}
      ${renderOverlayTargets(game, challenge)}
      <div class="hand-cursor ${state.vision.handX === null ? "hidden" : ""}" id="handCursor" style="${cursorStyle}">
        <span id="handCursorValue">${visionNumberLabel()}</span>
      </div>
      <div class="overlay-instruction">
        <strong>${escapeHtml(challenge.title)}</strong>
        <span>${escapeHtml(challenge.prompt)}</span>
        <em>${escapeHtml(overlayHint(challenge))}</em>
      </div>
    </div>
  `;
}

function renderOverlayProblem(challenge) {
  let label = "Reto";
  let value = challenge.title;
  let detail = "";

  if (challenge.input === "ai-trainer") {
    const prediction = state.aiTrainer.prediction;
    label = "IA en vivo";
    value = prediction ? aiClassLabel(prediction.id) : "Entrena la IA";
    detail = prediction ? `${Math.round(prediction.confidence * 100)}% de confianza` : "captura ejemplos etiquetados";
  } else if (challenge.conceptKey === "suma" && Number.isFinite(challenge.a) && Number.isFinite(challenge.b)) {
    label = "Suma";
    value = `${challenge.a} + ${challenge.b}`;
    detail = "Muestra el total con dedos";
  } else if (challenge.conceptKey === "multiplicacion" && Number.isFinite(challenge.a) && Number.isFinite(challenge.b)) {
    label = "Robot";
    value = `${challenge.a} x ${challenge.b}`;
    detail = "Elige la tarjeta de energia";
  } else if (Array.isArray(challenge.data)) {
    label = challenge.title;
    value = challenge.data.join("  ");
    detail = "Usa 1 a 4 dedos";
  } else if (Array.isArray(challenge.sequence)) {
    label = "Patron";
    value = `${challenge.sequence.join("  ")}  ?`;
    detail = "Completa la secuencia";
  } else if (challenge.input === "zone") {
    label = "Movimiento";
    value = challenge.title;
    detail = "Mueve la mano al portal correcto";
  }

  return `
    <div class="overlay-problem">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <small>${escapeHtml(detail)}</small>
    </div>
  `;
}

function renderOverlayTargets(game, challenge) {
  if (challenge.input === "ai-trainer") {
    return renderAiVisionOverlay();
  }

  if (challenge.input === "zone") {
    return `
      <div class="camera-zones">
        ${challenge.options.map((option) => `
          <div class="camera-zone ${state.vision.zone === option.value ? "active" : ""}" data-camera-zone="${escapeAttribute(option.value)}">
            <small>${escapeHtml(option.label)}</small>
            <strong>${escapeHtml(option.count ?? "")}</strong>
          </div>
        `).join("")}
      </div>
    `;
  }

  if (challenge.input === "fingers-option") {
    return `
      <div class="camera-choice-ring">
        ${challenge.options.map((option, index) => `
          <div class="camera-choice">
            <small>${index + 1} dedo${index ? "s" : ""}</small>
            <strong>${escapeHtml(option.label)}</strong>
          </div>
        `).join("")}
      </div>
    `;
  }

  return `
    <div class="camera-number-target">
      <span>detectado</span>
      <strong id="overlayLiveAnswer">${visionNumberLabel()}</strong>
      <small>${escapeHtml(game.concept)}</small>
    </div>
  `;
}

function renderAiVisionOverlay() {
  const prediction = state.aiTrainer.prediction;
  return `
    <div class="ai-vision-overlay">
      <div class="ai-live-card">
        <span>Prediccion</span>
        <strong id="aiLivePrediction">${escapeHtml(prediction ? aiClassLabel(prediction.id) : "sin modelo")}</strong>
        <small id="aiLiveConfidence">${prediction ? `${Math.round(prediction.confidence * 100)}%` : "agrega ejemplos"}</small>
      </div>
      <div class="ai-sample-strip">
        ${AI_CLASSES.map((item) => `
          <span>${escapeHtml(item.mark)} ${escapeHtml(item.label)}: <b>${aiSampleCount(item.id)}</b></span>
        `).join("")}
      </div>
      <div class="ai-question-card">
        <strong>Pregunta cientifica</strong>
        <span>¿La IA generaliza si cambiamos luz, fondo u objetos?</span>
      </div>
    </div>
  `;
}

function overlayHint(challenge) {
  if (challenge.input === "ai-trainer") return "Entrena con ejemplos variados y luego prueba la matriz.";
  if (challenge.input === "zone") return "Abre la palma o haz pinza para confirmar.";
  if (challenge.input === "fingers-option") return "1 a 4 dedos seleccionan las tarjetas.";
  return "Mano abierta cuenta dedos; OK significa cero.";
}

function pointerStyle() {
  if (state.vision.handX === null || state.vision.handY === null) return "";
  const x = clamp(Math.round((1 - state.vision.handX) * 100), 4, 96);
  const y = clamp(Math.round(state.vision.handY * 100), 8, 92);
  return `left:${x}%;top:${y}%`;
}

function renderChallengePanel(game) {
  if (game.id === "ia") return renderAiChallengePanel();
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
  if (gameId === "ia") return renderAiBoard();
  return renderRhythmBoard(challenge);
}

function renderAnswerControls(challenge) {
  if (challenge.input === "ai-trainer") return "";
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

function renderAiChallengePanel() {
  const challenge = state.challenge || createChallenge("ia");
  return `
    <section class="challenge-panel ai-challenge-panel">
      <div class="challenge-heading">
        <p class="eyebrow">Reto activo</p>
        <h2>${escapeHtml(challenge.title)}</h2>
        <p>${escapeHtml(challenge.prompt)}</p>
      </div>
      ${renderAiBoard()}
      ${renderAiTrainerPanel("game")}
      ${renderFeedback()}
      ${renderConceptCoach(challenge)}
      <div class="stage-footer">
        <button type="button" id="newChallenge" class="mini-button">Nuevo reto</button>
        <span>${escapeHtml(challenge.hint)}</span>
      </div>
    </section>
  `;
}

function renderAiBoard() {
  const total = aiTotalSamples();
  const tested = state.aiTrainer.tests.length;
  const prediction = state.aiTrainer.prediction;
  return `
    <div class="ai-board">
      <div class="ai-board-kpi">
        <strong>${total}</strong><span>ejemplos</span>
      </div>
      <div class="ai-board-kpi">
        <strong>${tested}</strong><span>pruebas</span>
      </div>
      <div class="ai-board-kpi">
        <strong>${aiAccuracyLabel()}</strong><span>exactitud</span>
      </div>
      <div class="ai-board-prediction">
        <span>Prediccion actual</span>
        <strong>${escapeHtml(prediction ? aiClassLabel(prediction.id) : "sin modelo")}</strong>
        <small>${prediction ? `${Math.round(prediction.confidence * 100)}% de confianza` : "captura ejemplos para entrenar"}</small>
      </div>
    </div>
  `;
}

function renderAiTrainerPanel(mode = "game") {
  const active = state.aiTrainer.activeClass;
  const ready = aiReady();
  return `
    <section class="ai-trainer-panel ${mode === "fair" ? "fair-ai-trainer" : ""}">
      <div class="ai-trainer-head">
        <div>
          <span>La Maquina que Aprende</span>
          <strong>Entrena, prueba y descubre el sesgo</strong>
        </div>
        <em>${escapeHtml(state.aiTrainer.message || "Elige una etiqueta y captura ejemplos con la camara.")}</em>
      </div>
      <div class="ai-class-grid">
        ${AI_CLASSES.map((item) => `
          <button type="button" class="ai-class-card ${active === item.id ? "active" : ""}" data-ai-class="${escapeAttribute(item.id)}">
            <b>${escapeHtml(item.mark)}</b>
            <span>${escapeHtml(item.label)}</span>
            <small>${aiSampleCount(item.id)} ejemplos</small>
          </button>
        `).join("")}
      </div>
      <div class="ai-action-row">
        <button type="button" id="aiCaptureSample">Capturar ejemplo: ${escapeHtml(aiClassLabel(active))}</button>
        <button type="button" class="mini-button" data-ai-demo="balanced">Cargar datos buenos</button>
        <button type="button" class="mini-button" data-ai-demo="biased">Cargar sesgo rojo</button>
        <button type="button" class="mini-button" id="aiReset">Limpiar IA</button>
      </div>
      <div class="ai-test-row">
        <span>Probar objeto real:</span>
        ${AI_CLASSES.map((item) => `
          <button type="button" data-ai-test="${escapeAttribute(item.id)}" ${ready ? "" : "disabled"}>
            ${escapeHtml(item.label)}
          </button>
        `).join("")}
      </div>
      <div class="ai-results-grid">
        ${renderAiConfidenceBars()}
        ${renderAiConfusionMatrix()}
      </div>
    </section>
  `;
}

function renderAiConfidenceBars() {
  const prediction = state.aiTrainer.prediction;
  const scores = prediction?.scores || {};
  return `
    <div class="ai-confidence">
      <strong>Confianza del modelo</strong>
      ${AI_CLASSES.map((item) => {
        const value = Math.round((scores[item.id] || 0) * 100);
        return `
          <div class="ai-confidence-row">
            <span>${escapeHtml(item.label)}</span>
            <i style="width:${value}%"></i>
            <em>${value}%</em>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function renderAiConfusionMatrix() {
  const matrix = aiConfusionMatrix();
  const accuracy = aiAccuracy();
  return `
    <div class="ai-matrix">
      <div class="ai-matrix-title">
        <strong>Matriz Real / Predicho</strong>
        <span>Exactitud = ${accuracy.total ? `${accuracy.correct}/${accuracy.total} = ${Math.round(accuracy.value * 100)}%` : "sin pruebas"}</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Real</th>
            ${AI_CLASSES.map((item) => `<th>${escapeHtml(item.label)}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${AI_CLASSES.map((actual) => `
            <tr>
              <th>${escapeHtml(actual.label)}</th>
              ${AI_CLASSES.map((predicted) => {
                const count = matrix[actual.id]?.[predicted.id] || 0;
                return `<td class="${actual.id === predicted.id && count ? "hit" : ""}">${count}</td>`;
              }).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
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
    state.aiTrainer = defaultAiTrainer();
    state.feedback = null;
    state.answered = false;
    writeProgress();
    renderApp();
  });

  document.querySelector("#startCamera")?.addEventListener("click", startCamera);
  document.querySelector("#stopCamera")?.addEventListener("click", () => stopCamera());
  document.querySelector("#newChallenge")?.addEventListener("click", newChallenge);
  document.querySelector("#toggleFullscreen")?.addEventListener("click", toggleFullscreen);
  document.querySelector("#toggleFullscreenSecondary")?.addEventListener("click", toggleFullscreen);

  document.querySelectorAll("[data-fair-game]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeGame = button.dataset.fairGame;
      state.activeCategory = categoryForGame(state.activeGame, state.activeCategory).id;
      state.progress.lastGame = state.activeGame;
      state.progress.lastCategory = state.activeCategory;
      state.challenge = createChallenge(state.activeGame);
      state.feedback = null;
      state.answered = false;
      writeProgress();
      renderApp();
    });
  });

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => submitAnswer(button.dataset.answer, "boton"));
  });

  document.querySelectorAll("[data-ai-class]").forEach((button) => {
    button.addEventListener("click", () => {
      state.aiTrainer.activeClass = button.dataset.aiClass;
      state.aiTrainer.message = `Etiqueta activa: ${aiClassLabel(state.aiTrainer.activeClass)}.`;
      renderApp();
    });
  });

  document.querySelector("#aiCaptureSample")?.addEventListener("click", () => captureAiSample(state.aiTrainer.activeClass));

  document.querySelectorAll("[data-ai-test]").forEach((button) => {
    button.addEventListener("click", () => recordAiTest(button.dataset.aiTest));
  });

  document.querySelectorAll("[data-ai-demo]").forEach((button) => {
    button.addEventListener("click", () => loadAiDemoDataset(button.dataset.aiDemo));
  });

  document.querySelector("#aiReset")?.addEventListener("click", () => {
    state.aiTrainer = defaultAiTrainer();
    state.feedback = null;
    renderApp();
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
  if (!visionModule) visionModule = await import(VISION_BUNDLE_URL);
  const { FilesetResolver, HandLandmarker } = visionModule;
  const vision = await FilesetResolver.forVisionTasks(VISION_WASM_URL);
  try {
    state.vision.landmarker = await HandLandmarker.createFromOptions(vision, {
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
    state.vision.landmarker = await HandLandmarker.createFromOptions(vision, {
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
      if (state.activeGame === "ia") updateAiLivePrediction();
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
    state.vision.handX = null;
    state.vision.handY = null;
    updateVisionReading(null, state.vision.zone, "sin mano", 0);
    clearVisionCanvas();
    return;
  }

  const fingers = hands.reduce((total, landmarks) => total + countExtendedFingers(landmarks), 0);
  const zone = handZone(hands[0]);
  const gesture = detectGesture(hands[0], fingers);
  const center = handCenter(hands[0]);
  state.vision.handX = center.x;
  state.vision.handY = center.y;
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
  if (challenge.input === "ai-trainer") return;

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
    ["#overlayLiveAnswer", visionNumberLabel()],
    ["#handCursorValue", visionNumberLabel()],
  ];
  updates.forEach(([selector, value]) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = value;
  });
  const overlay = document.querySelector("#motionOverlay");
  if (overlay) overlay.dataset.zone = state.vision.zone;
  const cursor = document.querySelector("#handCursor");
  if (cursor) {
    const style = pointerStyle();
    cursor.classList.toggle("hidden", !style);
    if (style) cursor.setAttribute("style", style);
  }
  document.querySelectorAll("[data-camera-zone]").forEach((node) => {
    node.classList.toggle("active", node.dataset.cameraZone === state.vision.zone);
  });
  updateAiLiveWidgets();
}

function drawHands(hands) {
  if (!canvasElement || !canvasContext || !videoElement) return;
  const width = videoElement.videoWidth || 640;
  const height = videoElement.videoHeight || 480;
  canvasElement.width = width;
  canvasElement.height = height;
  canvasContext.clearRect(0, 0, width, height);
  canvasContext.lineCap = "round";
  canvasContext.lineJoin = "round";
  canvasContext.shadowColor = "rgba(255, 210, 63, 0.92)";
  canvasContext.shadowBlur = Math.max(10, width / 60);
  canvasContext.lineWidth = Math.max(6, width / 105);
  canvasContext.strokeStyle = "#ffd23f";
  canvasContext.fillStyle = "#15f59a";
  hands.forEach((landmarks) => {
    HAND_CONNECTIONS.forEach(([a, b]) => {
      canvasContext.beginPath();
      canvasContext.moveTo(landmarks[a].x * width, landmarks[a].y * height);
      canvasContext.lineTo(landmarks[b].x * width, landmarks[b].y * height);
      canvasContext.stroke();
    });
    landmarks.forEach((point) => {
      canvasContext.beginPath();
      canvasContext.arc(point.x * width, point.y * height, Math.max(6, width / 95), 0, Math.PI * 2);
      canvasContext.fill();
    });
    [4, 8, 12, 16, 20].forEach((index) => {
      const point = landmarks[index];
      canvasContext.beginPath();
      canvasContext.arc(point.x * width, point.y * height, Math.max(9, width / 70), 0, Math.PI * 2);
      canvasContext.stroke();
    });
  });
  canvasContext.shadowBlur = 0;
}

function clearVisionCanvas() {
  if (canvasContext && canvasElement) canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
}

function countExtendedFingers(landmarks) {
  if (isOkZeroGesture(landmarks)) return 0;

  const fingers = [
    [8, 6, 5],
    [12, 10, 9],
    [16, 14, 13],
    [20, 18, 17],
  ];
  let count = fingers.reduce((total, [tip, pip, mcp]) => (
    total + (isFingerExtended(landmarks, tip, pip, mcp) ? 1 : 0)
  ), 0);
  if (isThumbExtended(landmarks)) count += 1;
  return count;
}

function handScale(landmarks) {
  return Math.max(0.08, distance(landmarks[0], landmarks[9]));
}

function isFingerExtended(landmarks, tipIndex, pipIndex, mcpIndex) {
  const scale = handScale(landmarks);
  const wrist = landmarks[0];
  const tip = landmarks[tipIndex];
  const pip = landmarks[pipIndex];
  const mcp = landmarks[mcpIndex];
  const fartherFromWrist = distance(tip, wrist) > distance(pip, wrist) + scale * 0.1;
  const aboveJoint = tip.y < pip.y + scale * 0.05;
  const awayFromPalm = distance(tip, mcp) > distance(pip, mcp) + scale * 0.08;
  return (fartherFromWrist && aboveJoint) || (fartherFromWrist && awayFromPalm);
}

function isThumbExtended(landmarks) {
  if (isOkZeroGesture(landmarks)) return false;
  const scale = handScale(landmarks);
  const wrist = landmarks[0];
  const thumbTip = landmarks[4];
  const thumbIp = landmarks[3];
  const thumbMcp = landmarks[2];
  const indexMcp = landmarks[5];
  const openedFromIndex = distance(thumbTip, indexMcp) > distance(thumbIp, indexMcp) + scale * 0.12;
  const openedFromPalm = distance(thumbTip, wrist) > distance(thumbIp, wrist) + scale * 0.08;
  const longThumb = distance(thumbTip, thumbMcp) > scale * 0.34;
  return longThumb && (openedFromIndex || openedFromPalm);
}

function isOkZeroGesture(landmarks) {
  const scale = handScale(landmarks);
  const pinchDistance = distance(landmarks[4], landmarks[8]);
  if (pinchDistance > scale * 0.34) return false;
  const threeFingersUp = [
    isFingerExtended(landmarks, 12, 10, 9),
    isFingerExtended(landmarks, 16, 14, 13),
    isFingerExtended(landmarks, 20, 18, 17),
  ].filter(Boolean).length;
  const indexBent = distance(landmarks[8], landmarks[5]) < distance(landmarks[6], landmarks[5]) + scale * 0.24;
  return threeFingersUp >= 2 && indexBent;
}

function handZone(landmarks) {
  const center = landmarks.reduce((total, point) => total + point.x, 0) / landmarks.length;
  if (center < 0.36) return "izquierda";
  if (center > 0.64) return "derecha";
  return "centro";
}

function handCenter(landmarks) {
  return {
    x: landmarks.reduce((total, point) => total + point.x, 0) / landmarks.length,
    y: landmarks.reduce((total, point) => total + point.y, 0) / landmarks.length,
  };
}

function detectGesture(landmarks, fingers) {
  const pinchDistance = distance(landmarks[4], landmarks[8]);
  if (isOkZeroGesture(landmarks)) return "cero";
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
  if (gameId === "ia") return createAiChallenge();
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

function createAiChallenge() {
  return {
    input: "ai-trainer",
    conceptKey: "aprendizaje",
    title: "La Maquina que Aprende",
    prompt: "Captura ejemplos de circulo, cuadrado y triangulo. Luego prueba objetos reales y mira la matriz.",
    hint: "Cambia la luz, el fondo o el color para descubrir sesgos.",
    strategy: "La IA aprende de ejemplos etiquetados. Cada etiqueta necesita variedad para generalizar.",
    model: "El modelo calcula un retrato visual simple de cada ejemplo y compara el objeto nuevo con lo aprendido.",
    steps: [
      "Elige una etiqueta: circulo, cuadrado o triangulo.",
      "Captura varios ejemplos por etiqueta con buena variedad.",
      "Prueba un objeto y registra la etiqueta real.",
      "Observa la matriz: los aciertos quedan en diagonal.",
      "Cambia luz o color y revisa si baja la exactitud.",
    ],
    answer: "modelo entrenado",
  };
}

function defaultAiTrainer() {
  return {
    activeClass: AI_CLASSES[0].id,
    samples: Object.fromEntries(AI_CLASSES.map((item) => [item.id, []])),
    tests: [],
    prediction: null,
    message: "Elige una etiqueta y captura ejemplos con la camara.",
    demoMode: "balanced",
  };
}

function aiClassLabel(id) {
  return AI_CLASSES.find((item) => item.id === id)?.label || "sin clase";
}

function aiSampleCount(id) {
  return state.aiTrainer.samples[id]?.length || 0;
}

function aiTotalSamples() {
  return AI_CLASSES.reduce((total, item) => total + aiSampleCount(item.id), 0);
}

function aiReady() {
  return AI_CLASSES.filter((item) => aiSampleCount(item.id) >= AI_MIN_SAMPLES).length >= 2;
}

function captureAiSample(labelId) {
  const feature = readAiFeature() || demoAiFeature(labelId, state.aiTrainer.demoMode);
  if (!state.aiTrainer.samples[labelId]) state.aiTrainer.samples[labelId] = [];
  state.aiTrainer.samples[labelId].push(feature);
  state.aiTrainer.samples[labelId] = state.aiTrainer.samples[labelId].slice(-18);
  state.aiTrainer.prediction = classifyAiFeature(feature);
  state.aiTrainer.message = `Ejemplo agregado a ${aiClassLabel(labelId)}. Ahora tiene ${aiSampleCount(labelId)} ejemplos.`;
  state.feedback = null;
  renderApp();
}

function recordAiTest(actualId) {
  const feature = readAiFeature() || demoAiFeature(actualId, state.aiTrainer.demoMode);
  const prediction = classifyAiFeature(feature);
  if (!prediction) {
    state.aiTrainer.message = "Todavia falta entrenar: agrega ejemplos en al menos dos clases.";
    renderApp();
    return;
  }

  const ok = prediction.id === actualId;
  const game = getGame("ia");
  const stats = gameStats("ia");
  const concept = conceptStats("aprendizaje");
  state.aiTrainer.prediction = prediction;
  state.aiTrainer.tests.unshift({
    actual: actualId,
    predicted: prediction.id,
    confidence: prediction.confidence,
    at: new Date().toISOString(),
  });
  state.aiTrainer.tests = state.aiTrainer.tests.slice(0, 30);
  state.aiTrainer.message = ok
    ? `La IA acerto: era ${aiClassLabel(actualId)}.`
    : `La IA se confundio: dijo ${aiClassLabel(prediction.id)}, pero era ${aiClassLabel(actualId)}.`;

  state.progress.played += 1;
  stats.played += 1;
  concept.played += 1;
  concept.lastAt = new Date().toISOString();
  if (ok) {
    state.progress.correct += 1;
    stats.correct += 1;
    concept.correct += 1;
    state.progress.streak += 1;
    state.progress.score += 8 + Math.min(8, state.progress.streak);
  } else {
    state.progress.streak = 0;
  }
  state.progress.completed.ia = gameStars("ia") > 0 || ok;
  pushHistory("ia", {
    ok,
    selected: aiClassLabel(prediction.id),
    answer: aiClassLabel(actualId),
    prompt: "Prueba de clasificacion",
    source: "camara IA",
  });
  state.feedback = {
    ok,
    message: ok ? "La prediccion coincide con la etiqueta real." : "Buen hallazgo: esa confusion alimenta la matriz.",
    selected: aiClassLabel(prediction.id),
    answer: aiClassLabel(actualId),
    source: "IA local",
    diagnosis: ok
      ? "El modelo generalizo para esta prueba. Ahora prueba otra luz o fondo."
      : "La IA tambien se equivoca. Revisa si faltan ejemplos variados o si hay sesgo de datos.",
  };
  writeProgress();
  renderApp();
}

function loadAiDemoDataset(mode) {
  const next = defaultAiTrainer();
  next.demoMode = mode === "biased" ? "biased" : "balanced";
  AI_CLASSES.forEach((item) => {
    const count = mode === "biased" ? 3 : 5;
    next.samples[item.id] = repeatArray(count, () => demoAiFeature(item.id, next.demoMode));
  });
  next.prediction = classifyAiFeature(demoAiFeature(next.activeClass, next.demoMode), next.samples);
  next.message = mode === "biased"
    ? "Datos con sesgo cargados: las clases se parecen demasiado. Prueba la matriz."
    : "Datos variados cargados: prueba objetos reales y compara exactitud.";
  state.aiTrainer = next;
  state.feedback = null;
  renderApp();
}

function updateAiLivePrediction() {
  if (state.activeGame !== "ia" || !aiReady()) return;
  const feature = readAiFeature();
  if (!feature) return;
  state.aiTrainer.prediction = classifyAiFeature(feature);
  updateAiLiveWidgets();
}

function updateAiLiveWidgets() {
  const prediction = state.aiTrainer.prediction;
  const label = prediction ? aiClassLabel(prediction.id) : "sin modelo";
  const confidence = prediction ? `${Math.round(prediction.confidence * 100)}%` : "agrega ejemplos";
  const labelNode = document.querySelector("#aiLivePrediction");
  const confidenceNode = document.querySelector("#aiLiveConfidence");
  if (labelNode) labelNode.textContent = label;
  if (confidenceNode) confidenceNode.textContent = confidence;
}

function readAiFeature() {
  const video = videoElement || document.querySelector("#visionVideo");
  if (!video || video.readyState < 2 || !video.videoWidth || !video.videoHeight) return null;
  if (!aiFeatureCanvas) {
    aiFeatureCanvas = document.createElement("canvas");
    aiFeatureCanvas.width = 32;
    aiFeatureCanvas.height = 24;
    aiFeatureContext = aiFeatureCanvas.getContext("2d", { willReadFrequently: true });
  }
  if (!aiFeatureContext) return null;

  aiFeatureContext.drawImage(video, 0, 0, aiFeatureCanvas.width, aiFeatureCanvas.height);
  const { data } = aiFeatureContext.getImageData(0, 0, aiFeatureCanvas.width, aiFeatureCanvas.height);
  let r = 0;
  let g = 0;
  let b = 0;
  let brightness = 0;
  let brightnessSq = 0;
  let saturation = 0;
  let edge = 0;
  let previous = null;
  const pixels = data.length / 4;

  for (let index = 0; index < data.length; index += 4) {
    const red = data[index] / 255;
    const green = data[index + 1] / 255;
    const blue = data[index + 2] / 255;
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const light = (red + green + blue) / 3;
    r += red;
    g += green;
    b += blue;
    brightness += light;
    brightnessSq += light * light;
    saturation += max === 0 ? 0 : (max - min) / max;
    if (previous !== null) edge += Math.abs(light - previous);
    previous = light;
  }

  const mean = brightness / pixels;
  const contrast = Math.sqrt(Math.max(0, brightnessSq / pixels - mean * mean));
  return [
    r / pixels,
    g / pixels,
    b / pixels,
    mean,
    contrast,
    saturation / pixels,
    edge / Math.max(1, pixels - 1),
  ];
}

function classifyAiFeature(feature, samples = state.aiTrainer.samples) {
  if (!feature) return null;
  const centroids = AI_CLASSES
    .map((item) => ({ item, centroid: aiCentroid(samples[item.id] || []) }))
    .filter((entry) => entry.centroid);
  if (!centroids.length) return null;

  const distances = centroids.map(({ item, centroid }) => ({
    id: item.id,
    distance: euclidean(feature, centroid),
  }));
  const weights = distances.map((entry) => ({ ...entry, weight: 1 / Math.max(0.0001, entry.distance) }));
  const total = weights.reduce((sum, entry) => sum + entry.weight, 0) || 1;
  const scores = Object.fromEntries(weights.map((entry) => [entry.id, entry.weight / total]));
  const best = weights.slice().sort((a, b) => b.weight - a.weight)[0];
  return {
    id: best.id,
    confidence: scores[best.id] || 0,
    scores,
  };
}

function aiCentroid(samples) {
  if (!samples.length) return null;
  const size = samples[0].length;
  const total = Array(size).fill(0);
  samples.forEach((sample) => sample.forEach((value, index) => {
    total[index] += value;
  }));
  return total.map((value) => value / samples.length);
}

function euclidean(a, b) {
  return Math.sqrt(a.reduce((sum, value, index) => sum + ((value - b[index]) ** 2), 0));
}

function demoAiFeature(labelId, mode = "balanced") {
  const item = AI_CLASSES.find((entry) => entry.id === labelId) || AI_CLASSES[0];
  const base = mode === "biased"
    ? [0.82, 0.22, 0.18, 0.43, 0.18, 0.7, 0.28 + (AI_CLASSES.findIndex((entry) => entry.id === labelId) * 0.02)]
    : item.prototype;
  return base.map((value) => clamp(value + ((Math.random() - 0.5) * 0.08), 0, 1));
}

function aiConfusionMatrix() {
  const matrix = Object.fromEntries(AI_CLASSES.map((actual) => [
    actual.id,
    Object.fromEntries(AI_CLASSES.map((predicted) => [predicted.id, 0])),
  ]));
  state.aiTrainer.tests.forEach((item) => {
    if (matrix[item.actual]?.[item.predicted] !== undefined) {
      matrix[item.actual][item.predicted] += 1;
    }
  });
  return matrix;
}

function aiAccuracy() {
  const total = state.aiTrainer.tests.length;
  const correct = state.aiTrainer.tests.filter((item) => item.actual === item.predicted).length;
  return { total, correct, value: total ? correct / total : 0 };
}

function aiAccuracyLabel() {
  const accuracy = aiAccuracy();
  return accuracy.total ? `${Math.round(accuracy.value * 100)}%` : "-";
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
  if (state.activeGame === "ia" && state.vision.enabled) return "Video + IA";
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
  if (state.vision.ready) return "Muestra dedos abiertos. Para cero, une pulgar e indice como un OK.";
  if (state.vision.enabled && state.vision.loading) return "El escenario ya recibe video. Estamos preparando el detector de manos.";
  if (state.vision.enabled) return "El video funciona. Si el detector no cargo, usa los botones demo mientras tanto.";
  if (state.vision.errorCode === "permission") return "El navegador nego el permiso. Habilitalo y vuelve a tocar Activar camara.";
  if (state.vision.errorCode === "insecure") return "Los navegadores solo permiten camara en GitHub Pages HTTPS o en localhost.";
  if (state.vision.errorCode === "unsupported") return "Prueba Chrome, Edge o Safari actualizado. El modo demo sigue disponible.";
  if (state.vision.errorCode === "notfound") return "Conecta una camara o usa otro dispositivo. Tambien puedes seguir con demo.";
  if (state.vision.error) return "Puedes seguir jugando con los controles demo mientras se revisa el permiso.";
  return "Toca Activar camara y coloca la mano dentro del escenario proyectado.";
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
  return "El video esta activo, pero el detector de manos no termino de cargar. Puedes ver la camara y jugar con el modo demo.";
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
    return;
  }
  document.documentElement.requestFullscreen?.().catch(() => {});
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

function repeatArray(count, renderer) {
  return Array.from({ length: count }, (_, index) => renderer(index));
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
