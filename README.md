# Jugando con Carlitos

Appweb educativa infantil para una estacion ludica de feria: matematicas y estadistica con movimiento, camara, proyector y participacion del publico.

Repositorio:

`https://github.com/investigapyrm/jugando_con_carlitos.git`

URL publica:

`https://investigapyrm.github.io/jugando_con_carlitos/`

## Estado

Version actual en esta rama: `v0.7.0`

La rama `feature/maquina-que-aprende-feria` incorpora una mision experimental llamada `La Maquina que Aprende`. En esta experiencia, los ninos entrenan una IA didactica local con ejemplos etiquetados, prueban objetos frente a la camara y observan una matriz Real/Predicho para descubrir errores, sesgo y generalizacion.

La base estable viene de `v0.6.7`, que reoriento la app al uso en feria durante la Semana de la Ciencia. La pantalla principal sigue siendo el `modo feria`: la zona de captura de movimientos con camara es el escenario principal y los desafios matematicos aparecen directamente dentro de esa misma vista, con una consola minima para el facilitador.

Tambien conserva el flujo de camara estable de la version anterior: si el navegador bloquea permisos o no encuentra video, la app muestra pasos concretos para habilitar la camara y conserva modo demo para contingencia.

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

* `Dedos veloces`: suma y conteo respondiendo con dedos.
* `Guardian de semillas`: comparacion de cantidades moviendo la mano a izquierda, centro o derecha.
* `Robot gestual`: multiplicacion y estrategia eligiendo ataque con 1 a 4 dedos.
* `Rueda en el aire`: probabilidad con eleccion gestual por zonas.
* `Laboratorio de datos`: mediana y moda con seleccion por dedos.
* `Ritmo corporal`: patrones y secuencias respondiendo con dedos.
* `La Maquina que Aprende`: entrenamiento supervisado local con ejemplos, clasificacion por camara, matriz de confusion y exactitud.

## Categorias por edad

* `#feria`: modo principal para stand, proyector y turnos breves.
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
* escenario de camara grande, video velado, puntos de mano destacados y desafios dentro del mismo visor;
* reconocimiento de dedos y posicion de la mano cuando el navegador lo permite;
* modo demo con botones de dedos, zonas y gesto de palma;
* historial local por juego;
* retroalimentacion inmediata;
* avance, puntos, racha, estrellas e insignias;
* tablero de sensor local con dedos, zona y gesto detectados;
* portales conceptuales con estrategia, modelo, pasos y diagnostico;
* dominio acumulado por concepto: suma, comparacion, multiplicacion, probabilidad, datos, patrones e IA;
* entrenador de IA local para feria:
  * clases `Circulo`, `Cuadrado` y `Triangulo`;
  * captura de ejemplos etiquetados desde camara;
  * modo demo con datos buenos o datos sesgados;
  * pruebas con etiqueta real;
  * matriz Real/Predicho;
  * calculo de exactitud;
* mecanicas de juego por movimiento:
  * mostrar el total con dedos;
  * mover la mano hacia la opcion correcta;
  * elegir ataque con 1 a 4 dedos;
  * comparar sectores de una rueda;
  * identificar mediana o moda;
  * completar patrones corporales;
* procesamiento local de video en el navegador;
* funcionamiento offline basico despues de la primera carga;
* diseno orientado a feria, aula y proyector;
* soporte `prefers-reduced-motion`.

## Camara y privacidad

La camara se activa solo si el usuario presiona `Activar camara` y acepta el permiso del navegador.

El reconocimiento de manos usa MediaPipe Hand Landmarker en el navegador. El video no se envia a un backend del proyecto y la app no guarda imagenes ni videos.

Para reducir exposicion visual en aula o celular, la vista de camara no se muestra como espejo principal: el video queda desenfocado, con baja opacidad y una capa oscura suave. Lo importante en pantalla son los puntos brillantes de la mano, el cursor detectado y los objetos del juego que aparecen sobre ese mismo espacio de movimiento.

La camara y el detector se tratan como dos estados separados:

* `Video activo`: el nino ya debe verse en el panel.
* `Manos listas`: el detector de dedos y movimientos esta funcionando.

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

* Probar el reconocimiento de dedos con ninos reales y ajustar tolerancias.
* Validar la nueva mision `La Maquina que Aprende` con tarjetas impresas y objetos reales en mesa de feria.
* Crear imagenes especificas de Carlitos jugando con manos, camara y movimiento.
* Agregar modo docente con guia de conceptos, seguridad y actividades sin camara.
* Incorporar exportacion simple de progreso si se decide usar en aula.
* Conectar a Google Sheets/GAS solo si se necesita seguimiento institucional.
