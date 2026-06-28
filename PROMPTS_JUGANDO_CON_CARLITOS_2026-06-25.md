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

## Prompt de correccion - seleccion sin efecto, rueda y objetos movibles

Fecha de registro: 2026-06-27

> las selecciones con la mano no funcionan, se nota que cambia de color el bloque pero no hay efecto
> luego no aparece la rueda qeu gira, no aparecen los objetos que el niño debe poder move con el gesto de la mano, luego el aspecto sigue igual de pobre

### Decision de implementacion

* Convertir el cambio de color de zona en una accion visible:
  * zona seleccionada marcada como tomada;
  * feedback grande dentro del visor;
  * registro de acierto/error.
* Agregar objeto visual que sigue la mano en `Guardian de semillas`.
* Agregar rueda real con sectores proporcionales en `Rueda en el aire`.
* Hacer mas tolerante la seleccion:
  * permanencia mas corta;
  * gesto de palma o pinza despues de una permanencia minima.
* Reforzar la estetica de feria con fondo visual, escenario mas inmersivo y objetos de juego.

## Prompt de correccion - marcas de mano, soltar objetos y ruleta real

Fecha de registro: 2026-06-27

> las marcas de reconocimiento de las manos son muy fuertes, muy brillantas, solapan la vistga de los bloques o elementos a mover
> al mover o trasladar elementos de un lugar a otro no queda claro como soltarlos o dejarlos caer
> el giro con la mano de la ruleta no funciona

### Decision de implementacion

* Bajar la intensidad visual de landmarks:
  * menor opacidad;
  * menor grosor;
  * menos brillo;
  * canvas debajo de los objetos del juego.
* Separar mecanica de agarre y soltado:
  * pinza o puno para agarrar;
  * palma abierta para soltar;
  * permanencia como respaldo operativo;
  * objeto anclado visualmente en el canasto elegido.
* Hacer que la ruleta responda al movimiento real:
  * calculo de angulo y velocidad por desplazamiento de mano;
  * giro con palma o pinza;
  * boton demo de palma como contingencia para facilitador.
* Publicar como `v0.7.4` con cache nuevo.

## Prompt de correccion - flujo automatico, mensajes emergentes y empuje de palma

Fecha de registro: 2026-06-27

> ESTAMOS MEJORANDO, PERO AUN LOS MOVIMIENTOS SE VEN LENTOS Y TORPES, LUEGO EL TOMAR Y SOLTA NO QUEDA CLARO, LOS ELEMETNOS COM MENSAJES D EEXITO O INSTRUCTIVOS SOLAPAN LAS ACCIONES, DEBE SER EMERGENTES, NO QUEDA CLARO CUANDO SE LOGRO ALGO O CUANDO SE DEBE CONTINUAR, LA APP DEBE ESTAR AUTOMATIZADA EN CASI TODO , EN POSAR DE PREGUNTA A PREGUNTA, O DE ACCION EN ACCION .
> EL GIRO DE LA RULETA NO FUNCIONA O NO SE ENTIENDE. Tal vez se pueda lograr hacer como un clic empujando la palma habierta hacia adelante o algo asi

### Decision de implementacion

* Acelerar el seguimiento:
  * mayor suavizado reactivo;
  * lectura de frames mas frecuente;
  * transiciones CSS mas cortas.
* Simplificar traslado:
  * mano visible toma/arrastra automaticamente;
  * palma abierta suelta;
  * permanencia corta funciona como respaldo.
* Evitar solapamiento:
  * feedback como toast en esquina;
  * reto como etiqueta compacta;
  * estado operativo como pastilla pequena.
* Automatizar el flujo:
  * despues de responder, se avanza automaticamente al siguiente reto;
  * el boton manual queda como atajo.
* Cambiar ruleta:
  * detectar empuje de palma por aumento rapido de escala de la mano;
  * usar el empuje como clic de giro/seleccion.
* Publicar como `v0.7.5` con cache nuevo.
