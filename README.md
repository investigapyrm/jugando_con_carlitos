# Jugando con Carlitos

Appweb educativa infantil para aprender conceptos matematicos y estadisticos mediante juegos interactivos.

Repositorio:

`https://github.com/investigapyrm/jugando_con_carlitos.git`

## Estado

Version actual: `v0.3.0`

La version `v0.3.0` convierte cada juego en una vista independiente tipo pestana interna (`#semillas`, `#rio`, `#fracciones`, `#datos`, `#azar`, `#barras`, `#patrones`). Cada vista tiene su propio tablero, dificultad, historial, progreso y panel de ayuda.

Arquitectura:

```text
index.html              Entrada publica para GitHub Pages.
styles.css              Interfaz responsive, animaciones y tableros de juego.
app.js                  Logica de juegos, progreso local y validaciones.
manifest.webmanifest    Configuracion PWA basica.
service-worker.js       Cache offline de la app estatica.
assets/generated/       Imagenes de Carlitos reutilizadas como referencia visual.
```

## Juegos incluidos

* `Semillas veloces`: suma y conteo.
* `Rio de numeros`: orden numerico y comparacion.
* `Huerta partida`: fracciones.
* `Datos del vivero`: promedio, mediana y moda.
* `Rueda del azar`: probabilidad.
* `Grafico reciclador`: lectura de graficos de barras.
* `Ritmo de patrones`: secuencias numericas.

## Experiencia de usuario

La app abre directamente en la experiencia jugable. No usa landing page ni pasos intermedios.

Incluye:

* seleccion de juegos;
* vistas independientes por juego mediante rutas hash;
* dificultad por juego: `Explorar`, `Desafio`, `Experto`;
* historial local por vista;
* retos generados dinamicamente;
* retroalimentacion inmediata;
* puntos, racha, estrellas e insignias;
* mision diaria y misiones por nivel;
* control local para reducir animaciones;
* nombre local opcional del equipo;
* progreso en `localStorage`;
* funcionamiento offline basico despues de la primera carga;
* diseno responsive para celular, aula y proyector;
* soporte `prefers-reduced-motion`.

## Uso local

```powershell
python -m http.server 8790 --bind 127.0.0.1
```

URL local:

`http://127.0.0.1:8790/`

Rutas utiles:

```text
http://127.0.0.1:8790/#inicio
http://127.0.0.1:8790/#semillas
http://127.0.0.1:8790/#rio
http://127.0.0.1:8790/#fracciones
http://127.0.0.1:8790/#datos
http://127.0.0.1:8790/#azar
http://127.0.0.1:8790/#barras
http://127.0.0.1:8790/#patrones
```

## Publicacion

La app esta preparada para GitHub Pages desde la rama `main`.

Antes de publicar:

1. Confirmar autorizacion de uso de la figura de Carlitos e imagenes.
2. Activar GitHub Pages sobre `main` y raiz del repositorio.
3. Verificar URL publica con cache-busting.
4. Validar en celular real.

## Derechos y permisos

Las imagenes y el personaje deben tratarse como material de muestra interna hasta confirmar autorizacion formal de los titulares.

No publicar como version final sin validacion editorial, legal e institucional.

## Proximos pasos

* Generar iconos propios para cada juego.
* Crear imagenes especificas de Carlitos jugando con numeros, graficos, fracciones y probabilidad.
* Crear una escena visual especifica para `Ritmo de patrones`.
* Agregar modo docente con guia de conceptos y actividades.
* Incorporar exportacion simple de progreso si se decide usar en aula.
* Conectar a Google Sheets/GAS solo si se necesita seguimiento institucional.
