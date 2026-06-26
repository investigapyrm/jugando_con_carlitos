# Secuencia de prompts - Jugando con Carlitos

Fecha de ultima edicion: 2026-06-25

Proyecto: Jugando con Carlitos

Repositorio: `https://github.com/investigapyrm/jugando_con_carlitos.git`

## Prompt inicial

> ahora vamos a crear otra appweb en [investigapyrm/jugando_con_carlitos.git](https://github.com/investigapyrm/jugando_con_carlitos.git) pero esta vez carlitos va a ofrecer a los ninos varios juegos interactivos super geniales relacionados a conceptos matematicos, estadisticos

## Prompt de mejora visual y de contenido

> inspirate en esta idea para crea contenido mas interesante

Referencia adjunta: prototipo HTML de juego tipo ritmo con estetica arcade infantil, tarjetas de niveles, HUD, estrellas, rachas, controles de movimiento y dinamica de juego inmediata.

## Alcance operativo

* Se interpreto el pedido como una nueva appweb estatica para GitHub Pages.
* Se clono el repositorio remoto, que estaba vacio.
* Se creo una app directa de juegos, sin landing intermedia.
* Se definieron seis juegos iniciales:
  * `Semillas veloces`: conteo y suma.
  * `Rio de numeros`: orden y comparacion.
  * `Huerta partida`: fracciones.
  * `Datos del vivero`: promedio, mediana y moda.
  * `Rueda del azar`: probabilidad.
  * `Grafico reciclador`: graficos de barras.
* Se agrego progreso local con puntos, racha, aciertos, retos jugados e insignias.
* Se agrego PWA/offline basico.
* Se creo `README.md` y bitacora propia del proyecto.
* Se valido con `node --check app.js`, `node --check service-worker.js`, HTTP local, manifest, service worker, capturas Playwright desktop/movil y prueba funcional headless `interactive games OK`.
* Se ajusto el juego `Datos del vivero` para que siempre exista al menos un valor repetido cuando se trabaja la moda.
* Se creo el commit local `9cc33b6dc570797348beb6c558d6c24a1ab5720b`, mensaje `Inicializa appweb de juegos con Carlitos`.
* El push a `origin/main` fallo porque GitHub nego permiso de escritura a `diegomezapy` con error `403`.
* En `v0.2.0` se tomo la referencia del juego ritmico para mejorar:
  * mapa de aventura;
  * tarjetas de niveles mas expresivas;
  * estrellas por mision;
  * mision diaria;
  * rachas con bonificacion;
  * control local de animaciones;
  * nuevo juego `Ritmo de patrones`, centrado en secuencias numericas.

## Criterios editoriales y tecnicos

* No recolectar datos personales de ninos.
* Usar nombre de equipo opcional y local.
* Guardar progreso solo en el navegador.
* Mantener advertencia de derechos sobre Carlitos e imagenes.
* Priorizar juegos cortos, visuales, verificables y aptos para celular.
* Mantener version visible y cache-busting.
* Adaptar la inspiracion visual sin copiar el codigo ni el tema musical original: la app conserva foco en matematicas, estadistica y aprendizaje con Carlitos.
