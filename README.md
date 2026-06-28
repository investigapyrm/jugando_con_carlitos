# Jugando con Carlitos

Appweb educativa infantil para una estacion ludica de feria: matematicas y estadistica con movimiento, camara, proyector y participacion del publico.

Repositorio:

`https://github.com/investigapyrm/jugando_con_carlitos.git`

URL publica:

`https://investigapyrm.github.io/jugando_con_carlitos/`

## Estado

Version actual en esta rama independiente: `v0.8.1-visionai`

La rama `feature/visionai-laboratorio-carlitos` incorpora una vista experimental `#visionai` inspirada en una app VisionAI de reconocimiento de objetos. El laboratorio carga TensorFlow.js y COCO-SSD bajo demanda, abre la camara, dibuja recuadros de deteccion, muestra confianza, lista objetos reconocidos y permite capturas temporales de sesion. Desde `v0.8.1-visionai`, la vista tambien estima de manera didactica la altura aproximada de personas detectadas y calcula numero de personas, promedio, mediana y moda para trabajar estadistica en vivo.

La rama `feature/maquina-que-aprende-feria` incorpora una mision experimental llamada `La Maquina que Aprende`. En esta experiencia, los ninos entrenan una IA didactica local con ejemplos etiquetados, prueban objetos frente a la camara y observan una matriz Real/Predicho para descubrir errores, sesgo y generalizacion.

La base estable viene de `v0.6.7`, que reoriento la app al uso en feria durante la Semana de la Ciencia. La pantalla principal sigue siendo el `modo feria`: la zona de captura de movimientos con camara es el escenario principal y los desafios matematicos aparecen directamente dentro de esa misma vista, con una consola minima para el facilitador.

Tambien conserva el flujo de camara estable de la version anterior: si el navegador bloquea permisos o no encuentra video, la app muestra pasos concretos para habilitar la camara y conserva modo demo para contingencia.

La version `v0.7.1` ajusta el conteo de dedos: mejora la deteccion de pulgares para manos abiertas y reconoce el cero con el gesto tipo `OK`, juntando pulgar e indice.

La version `v0.7.2` mejora el seguimiento: suaviza el cursor de mano, reduce carga del detector limitando lecturas a un ritmo mas estable, corrige la zona visual en video espejado y agrega seleccion por permanencia de la mano sobre una zona.

La version `v0.7.3` corrige la experiencia reportada en prueba real: la zona ya no solo cambia de color, tambien dispara feedback visible dentro del escenario. Agrega objetos movibles que siguen la mano en comparacion de semillas y una rueda real visible para probabilidad.

La version `v0.7.4` ajusta la interaccion gestual fina: suaviza las marcas de reconocimiento para que no tapen los objetos, separa agarre y soltado con pinza/puno y palma abierta, deja el objeto anclado al canasto al soltarlo, y hace que la ruleta gire por movimiento de mano en vez de solo mostrarse animada.

La version `v0.7.5` vuelve el flujo mas automatico para feria: el objeto sigue la mano sin pedir pinza, la palma abierta suelta, el empuje de palma hacia la camara funciona como clic de ruleta, los mensajes pasan a ser toasts en esquina y cada respuesta avanza sola al siguiente reto.

La version `v0.7.6` hace mas comprensible la accion gestual: la ruleta gira rapido durante unos segundos al pasar la mano por encima y recien toma la respuesta cuando se detiene; ademas agrega la vista `#formas` para probar traslado de objetos geometricos con la mano sin puntaje ni preguntas.

La version `v0.7.7` simplifica toda la interaccion: el reconocimiento muestra un solo punto tipo cursor, que sigue el dedo indice o la mano y selecciona opciones por permanencia, como un cursor aereo. Se ocultan las marcas tecnicas de landmarks y se eliminan gestos principales de palma, pinza, empuje o arrastre.

La version `v0.8.1-visionai` mejora la rama VisionAI: traduce la experiencia visible al castellano, agrega estadisticas de personas y alturas aproximadas, incorpora controles de calibracion por distancia/campo visual, hace que la ruleta gire al pasar la mano sobre ella y vuelve mas claro el traslado de formas/semillas con el cursor.

Uso previsto: notebook o computadora conectada a proyector/pantalla grande, con camara integrada o externa apuntando al espacio donde participa el nino. No esta pensada principalmente como experiencia individual de celular.

## Arquitectura

```text
index.html              Entrada publica para GitHub Pages.
styles.css              Interfaz responsive, animaciones y tableros con sensor.
app.js                  Logica de juegos, sensor de manos, progreso local y validaciones.
manifest.webmanifest    Configuracion PWA basica.
service-worker.js       Cache offline de la app estatica.
assets/generated/       Imagenes de Carlitos reutilizadas como referencia visual.
```

La app sigue siendo estatica, sin backend obligatorio. El progreso se guarda localmente en `localStorage`.

## Juegos incluidos

* `Dedos veloces`: suma y conteo apuntando el resultado con el cursor.
* `Guardian de semillas`: comparacion de cantidades apuntando el canasto correcto.
* `Robot gestual`: multiplicacion y estrategia apuntando una tarjeta.
* `Rueda en el aire`: probabilidad apuntando el color con mas sectores.
* `Laboratorio de datos`: mediana y moda apuntando una tarjeta.
* `Ritmo corporal`: patrones y secuencias apuntando el siguiente valor.
* `La Maquina que Aprende`: entrenamiento supervisado local con ejemplos, clasificacion por camara, matriz de confusion y exactitud.
* `#formas`: banco de prueba para usar la mano o un dedo como cursor antes de jugar.
* `#visionai`: laboratorio experimental de vision artificial con reconocimiento de objetos reales usando COCO-SSD.
  * conteo de personas detectadas;
  * altura aproximada segun distancia y campo visual configurados;
  * promedio, mediana y moda de alturas agrupadas;
  * lista de objetos reconocidos con etiquetas en castellano;

## Categorias por edad

* `#feria`: modo principal para stand, proyector y turnos breves.
* `#formas`: vista de prueba para cursor aereo con reconocimiento de mano.
* `#visionai`: vista independiente para probar reconocimiento de objetos con camara.
* `#peques`: 4 a 7 anos. Conteo con dedos, comparacion visual y patrones simples.
* `#ninos`: 8 a 12 anos. Suma, multiplicacion, probabilidad y datos con respuestas gestuales.
* `#mayores`: mayores de 12 anos. Estadistica, probabilidad, patrones y estrategia con lectura de datos.

## Experiencia de usuario

La app abre directamente en el modo feria. No usa landing page ni pasos intermedios.

Incluye:

* vistas independientes por juego mediante rutas hash;
* modo feria como vista principal;
* categorias por edad;
* retos generados dinamicamente;
* sensor de manos con camara opcional;
* escenario de camara grande, video velado y desafios dentro del mismo visor;
* un unico cursor que sigue el dedo indice o la mano;
* seguimiento suavizado para reducir saltos visuales;
* seleccion por permanencia sobre respuestas grandes;
* objeto de semillas que acompana el cursor en retos de comparacion;
* ruleta que gira al pasar la mano sobre ella antes de seleccionar la respuesta;
* feedback emergente en esquina cuando una seleccion queda tomada;
* avance automatico al siguiente reto despues de responder;
* modo demo con botones de numeros y cursor por zonas;
* historial local por juego;
* retroalimentacion inmediata;
* avance, puntos, racha, estrellas e insignias;
* tablero de sensor local con cursor, zona y modo detectado;
* portales conceptuales con estrategia, modelo, pasos y diagnostico;
* dominio acumulado por concepto: suma, comparacion, multiplicacion, probabilidad, datos, patrones e IA;
* entrenador de IA local para feria:
  * clases `Circulo`, `Cuadrado` y `Triangulo`;
  * captura de ejemplos etiquetados desde camara;
  * modo demo con datos buenos o datos sesgados;
  * pruebas con etiqueta real;
  * matriz Real/Predicho;
  * calculo de exactitud;
* laboratorio `#visionai` en rama independiente:
  * carga bajo demanda de TensorFlow.js y COCO-SSD;
  * deteccion de objetos reales en video local;
  * recuadros sobre canvas, etiquetas y confianza;
  * estimacion didactica de altura aproximada de personas;
  * numero de personas, promedio, mediana y moda de alturas;
  * calibracion simple de distancia a camara y campo visual vertical;
  * filtros de confianza minima y tamano maximo;
  * captura temporal de frames dentro de la sesion;
* mecanicas de juego por cursor:
  * apuntar el resultado de una suma;
  * apuntar la opcion correcta;
  * mantener el cursor sobre una respuesta;
  * comparar sectores de una rueda;
  * identificar mediana o moda;
  * completar patrones;
* procesamiento local de video en el navegador;
* funcionamiento offline basico despues de la primera carga;
* diseno orientado a feria, aula y proyector;
* soporte `prefers-reduced-motion`.

## Camara y privacidad

La camara se activa solo si el usuario presiona `Activar camara` y acepta el permiso del navegador.

El reconocimiento de manos usa MediaPipe Hand Landmarker en el navegador. El video no se envia a un backend del proyecto y la app no guarda imagenes ni videos.

En la rama `feature/visionai-laboratorio-carlitos`, la vista `#visionai` usa TensorFlow.js y COCO-SSD en el navegador. El procesamiento tambien ocurre localmente; la primera carga del modelo necesita Internet por CDN. Las capturas de `#visionai` quedan solo en memoria de la sesion del navegador y no se suben al proyecto.

La altura estimada en `#visionai` no es una medicion biometrica ni oficial. Es una aproximacion para aula/feria que depende de la distancia real a la camara, el encuadre, si la persona esta completa en imagen y el campo visual configurado.

Para reducir exposicion visual en aula o celular, la vista de camara no se muestra como espejo principal: el video queda desenfocado, con baja opacidad y una capa oscura suave. Lo importante en pantalla es un unico punto de cursor y los objetivos grandes de respuesta.

La camara y el detector se tratan como dos estados separados:

* `Video activo`: el nino ya debe verse en el panel.
* `Manos listas`: el cursor de mano esta funcionando.

Si la camara no esta disponible o falla el permiso, la app cambia a modo demo y sigue funcionando con botones. En ese caso muestra una guia breve para revisar candado/icono de camara, permisos del sitio, recarga y origen HTTPS. Si el video funciona pero no carga el detector, la app mantiene la vista de camara activa y permite jugar con modo demo.

## Ideas tomadas de repositorios Git

Las versiones anteriores se inspiraron en patrones observados en repositorios publicos de juegos educativos:

* `d-tamang/hungry-brain`: objetivo activo, respuesta correcta como objeto de juego, puntos y perdida por error.
* `kapaha/math-castle`: dificultad, historial, puntaje y animaciones como capa de motivacion.
* `Carton/tica-math`: enfoque de misiones, logros, PWA y razonamiento matematico.
* `shadowandy/Multiplication-Wizard`: distractores inteligentes y feedback sonoro.
* `lancesnider/math-monsters-game`: tension amable mediante temporizador y recompensa por velocidad.

No se copio codigo externo. Se adaptaron ideas de interaccion a una app estatica propia, mantenible y alineada al contenido de Carlitos.

La version `v0.6.x` agrega un patron propio para juegos con movimiento:

* sensor opcional, nunca obligatorio;
* controles manuales equivalentes para accesibilidad y prueba;
* estado de deteccion visible para docente y estudiante;
* retos cortos que se entienden sin tutorial largo;
* rutas separadas por juego para poder usarlos como pestanas independientes.
* explicacion conceptual breve despues de responder, para que la app ensene y no solo puntue.

## Uso local

```powershell
python -m http.server 8790 --bind 127.0.0.1
```

URL local:

`http://127.0.0.1:8790/`

Rutas utiles:

```text
http://127.0.0.1:8790/#home
http://127.0.0.1:8790/#peques
http://127.0.0.1:8790/#ninos
http://127.0.0.1:8790/#mayores
http://127.0.0.1:8790/#dedos
http://127.0.0.1:8790/#semillas
http://127.0.0.1:8790/#robots
http://127.0.0.1:8790/#azar
http://127.0.0.1:8790/#datos
http://127.0.0.1:8790/#ritmo
http://127.0.0.1:8790/#ia
```

## Publicacion

La app esta preparada para GitHub Pages desde la rama `main`.

Antes de publicar:

1. Confirmar autorizacion de uso de la figura de Carlitos e imagenes.
2. Activar GitHub Pages sobre `main` y raiz del repositorio.
3. Verificar URL publica con cache-busting.
4. Validar en celular real.
5. Probar camara en HTTPS o localhost; los navegadores no la habilitan en origenes inseguros.

## Derechos y permisos

Las imagenes y el personaje deben tratarse como material de muestra interna hasta confirmar autorizacion formal de los titulares.

No publicar como version final sin validacion editorial, legal e institucional.

## Proximos pasos

* Probar el reconocimiento de dedos y la seleccion por permanencia con ninos reales y ajustar tolerancias.
* Validar la nueva mision `La Maquina que Aprende` con tarjetas impresas y objetos reales en mesa de feria.
* Crear imagenes especificas de Carlitos jugando con manos, camara y movimiento.
* Agregar modo docente con guia de conceptos, seguridad y actividades sin camara.
* Incorporar exportacion simple de progreso si se decide usar en aula.
* Conectar a Google Sheets/GAS solo si se necesita seguimiento institucional.
