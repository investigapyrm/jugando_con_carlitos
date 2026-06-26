# Bitacora - Jugando con Carlitos

## 2026-06-25 20:13

### Proyecto

* Nombre: Jugando con Carlitos
* Cliente o institucion: PARACEL / FACEN / investigapyrm
* Ruta local: `C:\Users\Diego\OneDrive - PARACEL S.A\MONITOREO_IMPACTO_SOCIAL_PARACEL\PROYECTO_CARLITOS\jugando_con_carlitos`
* Repositorio: `https://github.com/investigapyrm/jugando_con_carlitos.git`
* URL local prevista: `http://127.0.0.1:8790/`
* Responsable: Codex, a solicitud de Diego
* Version: `v0.1.0`, commit local realizado, push bloqueado por permiso GitHub 403

### Objetivo de la intervencion

* Crear una nueva appweb donde Carlitos ofrezca a ninos varios juegos interactivos relacionados con conceptos matematicos y estadisticos.

### Diagnostico inicial

* El repositorio remoto existia pero estaba vacio.
* No habia checkout local previo.
* Se requiere una app directa para GitHub Pages, sin landing intermedia.
* Por tratarse de una app infantil, se prioriza experiencia visual atractiva, accesibilidad, responsive y juegos realmente interactivos.

### Acciones realizadas

* Se clono `investigapyrm/jugando_con_carlitos.git` en carpeta nueva `jugando_con_carlitos`.
* Se creo app estatica con:
  * `index.html`;
  * `styles.css`;
  * `app.js`;
  * `manifest.webmanifest`;
  * `service-worker.js`;
  * `.gitignore`;
  * `README.md`.
* Se copiaron imagenes de referencia de Carlitos desde `libros_de_carlitos/assets/generated/`.
* Se implementaron seis juegos:
  * suma y conteo;
  * orden numerico;
  * fracciones;
  * promedio, mediana y moda;
  * probabilidad;
  * graficos de barras.
* Se agrego progreso local con `localStorage`: puntos, racha, retos jugados, aciertos, insignias y nombre opcional del equipo.
* Se agrego PWA/offline basico con service worker.
* Se registro aprendizaje reutilizable en MASTER sobre appweb infantil con juegos matematicos y estadisticos.

### Archivos modificados

* `.gitignore`
* `README.md`
* `index.html`
* `styles.css`
* `app.js`
* `manifest.webmanifest`
* `service-worker.js`
* `assets/generated/hero_jugando_con_carlitos.png`
* `assets/generated/carlitos_character_sheet_v01.png`
* `BITACORA_JUGANDO_CON_CARLITOS_PARACEL_REPO.md`
* `PROMPTS_JUGANDO_CON_CARLITOS_2026-06-25.md`
* `G:\Mi unidad\MANUAL_MAESTRO_FORMATOS_FUNCIONES_APPWEB\APRENDIZAJE_CARLITOS_APPWEB_JUEGOS_MATEMATICOS_ESTADISTICOS_2026-06-25.md`

### Comandos o scripts ejecutados

* `git ls-remote https://github.com/investigapyrm/jugando_con_carlitos.git`
* `git clone https://github.com/investigapyrm/jugando_con_carlitos.git jugando_con_carlitos`
* `git status --branch --short`
* `Copy-Item` para imagenes base de Carlitos.
* `node --check app.js`
* `node --check service-worker.js`
* `python -m http.server 8790 --bind 127.0.0.1`
* `Invoke-WebRequest -UseBasicParsing http://127.0.0.1:8790/`
* `Invoke-WebRequest -UseBasicParsing http://127.0.0.1:8790/manifest.webmanifest`
* `Invoke-WebRequest -UseBasicParsing http://127.0.0.1:8790/service-worker.js`
* `npx --yes playwright screenshot --full-page http://127.0.0.1:8790/ _preview_jugando_desktop.png`
* `npx --yes playwright screenshot --viewport-size="390,1200" --full-page http://127.0.0.1:8790/ _preview_jugando_mobile.png`
* Prueba headless con Playwright via cache `npx`.
* `git diff --check`
* `git add .`
* `git diff --cached --check`
* `git commit -m "Inicializa appweb de juegos con Carlitos"`
* `git push -u origin main`
* `gh --version`
* `gh auth status`
* `git rev-parse HEAD`
* `git remote -v`

### Resultados verificados

* Repositorio local clonado.
* Estructura inicial creada.
* `app.js` y `service-worker.js` sin errores de sintaxis.
* HTTP local responde `200`.
* `manifest.webmanifest` y `service-worker.js` responden `200`.
* Capturas desktop y movil generadas y revisadas.
* Prueba headless resulto `interactive games OK`.
* `git diff --check` sin errores.
* Commit local creado:
  * `9cc33b6dc570797348beb6c558d6c24a1ab5720b`
  * mensaje: `Inicializa appweb de juegos con Carlitos`
* `gh auth status` confirma sesion activa como `diegomezapy`.

### Pruebas realizadas

* Validacion JavaScript con Node.
* Validacion HTTP local.
* Capturas Playwright desktop/movil.
* Prueba funcional headless:
  * abren los seis juegos;
  * aparece feedback en suma;
  * el juego de orden genera cinco numeros;
  * el juego de fracciones genera 4, 6 u 8 piezas;
  * el grafico genera cuatro barras.

### Errores o incidentes

* El repositorio remoto estaba vacio, lo cual era esperado para la primera version.
* Se ajusto el juego de estadistica para forzar al menos un valor repetido, de modo que la moda tenga sentido didactico.
* `git push -u origin main` fallo con:
  * `Permission to investigapyrm/jugando_con_carlitos.git denied to diegomezapy.`
  * `The requested URL returned error: 403`

### Soluciones aplicadas

* Se creo app estatica completa desde cero.
* Se reutilizo el patron validado de app infantil de Carlitos: visual grande, modo directo, animaciones suaves, version visible y derechos pendientes.

### Pendientes

* Otorgar permiso de escritura a `diegomezapy` sobre `investigapyrm/jugando_con_carlitos.git` o empujar desde una cuenta con acceso.
* Reintentar `git push -u origin main`.
* Activar/verificar GitHub Pages.
* Generar imagenes especificas para juegos matematicos y estadisticos.

### Riesgos

* Las imagenes reutilizadas requieren autorizacion antes de publicacion final.
* El progreso en `localStorage` no es seguimiento institucional; si se necesita seguimiento de aula, se debe disenar GAS/Sheets con permisos y privacidad.
* Mientras no haya permiso de escritura, el repositorio remoto seguira sin la app aunque la copia local este lista.

### Recomendaciones

* Mantener los juegos cortos y verificables.
* No recolectar datos personales de ninos.
* Si se usa en aula, preferir nombre de equipo y no nombre completo de estudiante.

## 2026-06-25 21:06

### Proyecto

* Nombre: Jugando con Carlitos
* Cliente o institucion: PARACEL / FACEN / investigapyrm
* Ruta local: `C:\Users\Diego\OneDrive - PARACEL S.A\MONITOREO_IMPACTO_SOCIAL_PARACEL\PROYECTO_CARLITOS\jugando_con_carlitos`
* Repositorio: `https://github.com/investigapyrm/jugando_con_carlitos.git`
* URL local verificada: `http://127.0.0.1:8790/`
* Responsable: Codex, a solicitud de Diego
* Version: `v0.2.0`, pendiente de push por bloqueo GitHub 403 ya detectado

### Objetivo de la intervencion

* Usar como inspiracion un prototipo HTML de juego ritmico tipo arcade para crear contenido mas interesante, atractivo y dinamico en la appweb de juegos matematicos y estadisticos con Carlitos.

### Diagnostico inicial

* La app `v0.1.0` ya funcionaba como experiencia directa, pero se percibia todavia como una coleccion de tarjetas y preguntas.
* La referencia aportada tenia ideas utiles para una app infantil:
  * tarjetas de niveles;
  * rachas;
  * estrellas;
  * HUD visible;
  * controles de movimiento;
  * sensacion de juego inmediato;
  * estetica arcade con sombras fuertes.
* No convenia copiar el tema ni el codigo musical original; se adapto la idea al dominio educativo de matematicas y estadistica.

### Acciones realizadas

* Se actualizo la app a `v0.2.0`.
* Se agrego el juego `Ritmo de patrones` para trabajar secuencias numericas.
* Se agregaron misiones por nivel para los siete juegos.
* Se agrego mapa de aventura en la navegacion lateral.
* Se reemplazo el contador de insignias por estrellas de progreso.
* Se agrego mision diaria en la tarjeta del jugador.
* Se agrego bonificacion de puntos por racha.
* Se agrego control local `Animaciones: Si/No`.
* Se reforzo la identidad visual con tarjetas mas marcadas, sombras tipo arcade, barras animadas y tableros mas expresivos.
* Se actualizo cache-busting de `index.html` y `service-worker.js`.
* Se actualizo `README.md`, `manifest.webmanifest` y `PROMPTS_JUGANDO_CON_CARLITOS_2026-06-25.md`.

### Archivos modificados

* `app.js`
* `styles.css`
* `index.html`
* `manifest.webmanifest`
* `service-worker.js`
* `README.md`
* `PROMPTS_JUGANDO_CON_CARLITOS_2026-06-25.md`
* `BITACORA_JUGANDO_CON_CARLITOS_PARACEL_REPO.md`

### Comandos o scripts ejecutados

* `git status --branch --short`
* `node --check app.js`
* `node --check service-worker.js`
* `Invoke-WebRequest -UseBasicParsing http://127.0.0.1:8790/`
* `Invoke-WebRequest -UseBasicParsing http://127.0.0.1:8790/manifest.webmanifest`
* `Invoke-WebRequest -UseBasicParsing http://127.0.0.1:8790/service-worker.js`
* `npx --yes playwright screenshot --full-page http://127.0.0.1:8790/ _preview_jugando_v020_desktop.png`
* `npx --yes playwright screenshot --viewport-size="390,1200" --full-page http://127.0.0.1:8790/ _preview_jugando_v020_mobile.png`
* Prueba funcional headless con Playwright desde cache `npx`.

### Resultados verificados

* HTTP local responde `200`.
* `manifest.webmanifest` responde `200`.
* `service-worker.js` responde `200`.
* `app.js` y `service-worker.js` no presentan errores de sintaxis.
* Capturas desktop y movil generadas y revisadas visualmente.
* Prueba funcional headless resulto `jugando v0.2.0 interactive check OK`.
* Los siete juegos cambian correctamente desde el mapa de aventura.
* El nuevo juego `Ritmo de patrones` muestra el tablero de secuencia y genera feedback.
* El control `Animaciones: Si/No` aplica la clase `motion-off`.

### Pruebas realizadas

* Sintaxis JavaScript con Node.
* Validacion HTTP local.
* Validacion de manifest y service worker.
* Capturas Playwright desktop/movil.
* Recorrido automatizado de juegos:
  * `Semillas veloces`;
  * `Rio de numeros`;
  * `Huerta partida`;
  * `Datos del vivero`;
  * `Rueda del azar`;
  * `Grafico reciclador`;
  * `Ritmo de patrones`.

### Errores o incidentes

* El primer intento de prueba con `@playwright/test` no resolvio el modulo desde el repo local.
* Se reemplazo por un script temporal con `playwright.chromium` y aserciones manuales usando `NODE_PATH` al cache de `npx`.
* Los archivos temporales de prueba y capturas fueron eliminados despues de validar.

### Soluciones aplicadas

* Se adapto la referencia arcade a un lenguaje educativo propio de Carlitos.
* Se mantuvo app estatica, sin dependencia obligatoria de build ni backend.
* Se mantuvo progreso local sin datos personales.
* Se agrego control de animaciones para mejorar accesibilidad.

### Pendientes

* Reintentar `git push -u origin main` cuando `diegomezapy` tenga permiso de escritura sobre `investigapyrm/jugando_con_carlitos.git`.
* Activar/verificar GitHub Pages despues del push.
* Crear iconos o imagenes especificas para cada juego.
* Definir si se agregara modo docente y guia didactica.

### Riesgos

* Las imagenes de Carlitos siguen requiriendo autorizacion antes de publicacion final.
* La app aun no esta publicada en el remoto por bloqueo de permisos.
* El progreso es local y no representa seguimiento institucional de estudiantes.

### Recomendaciones

* Mantener el estilo de aventura y misiones en proximas iteraciones.
* Si se agregan nuevos juegos, conservar retos cortos y feedback inmediato.
* No agregar registro nominal de ninos sin diseno previo de privacidad, consentimiento y roles.
