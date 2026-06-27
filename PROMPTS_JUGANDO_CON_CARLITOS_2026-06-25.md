# Secuencia de prompts - Jugando con Carlitos

Fecha de ultima edicion: 2026-06-27

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

## Prompt de nueva rama - La Maquina que Aprende

> procura incorporar esta idea en una nueva rama del mismo repo
>
> 5. “La Máquina que Aprende”: niños entrenan una IA en vivo
>
> Los propios niños entrenan un modelo de clasificación. Por ejemplo: piedra lisa vs piedra rugosa, hoja alargada vs hoja redondeada, triángulo vs cuadrado vs círculo, objeto natural vs objeto artificial, reciclable vs no reciclable, sólido, líquido representado en tarjeta, gas representado en tarjeta.
>
> Misión: responder preguntas científicas sobre pocos datos, luz, color, sesgo, error y generalización. Conceptos: aprendizaje supervisado, datos de entrenamiento, etiquetas, error de clasificación, sesgo de datos, generalización, matriz de confusión.

### Decision de implementacion

* Se creo la rama `feature/maquina-que-aprende-feria`.
* Se incorporo una mision 7 experimental: `La Maquina que Aprende`.
* Para sostener la feria sin depender de servicios externos, se implemento un clasificador local didactico:
  * captura caracteristicas simples del cuadro de camara;
  * guarda ejemplos etiquetados por clase;
  * clasifica por similitud con centroides de entrenamiento;
  * muestra confianza, matriz Real/Predicho y exactitud.
* La implementacion se inspira en la logica pedagogica de Teachable Machine, pero no depende de una cuenta ni de entrenamiento externo.

## Prompt de mejora - seguimiento de manos y aspecto visual

Fecha de registro: 2026-06-27

> ya funciona el reconocimiento, solo que es lento y medio torpe en seguimiento, mejoralo. Luego debenos lograr que los se puedan seleccionar elementos enla vista llevando la mano sobre una zona o algo asi, luego pensaremos en otras posibilidades como mover objetos como poligonons estirando con la mano a partir del reconocimentro de las manos. Ademas el aspecto es muy toco noada infantil ni moderno

### Decision de implementacion

* Se mantiene la carga MediaPipe estable que ya funcionaba en celular.
* Se mejora seguimiento sin cambiar modelo:
  * lectura limitada a ritmo estable;
  * suavizado del cursor de mano;
  * coordenadas de seleccion alineadas con el video espejado.
* Se agrega seleccion por permanencia de la mano sobre zonas del escenario.
* Se deja planteado como siguiente etapa el arrastre o estiramiento de objetos/poligonos con mano y pinza.
* Se moderniza la interfaz de feria con una estetica mas suave, infantil y educativa.
