# Webpack Intro

## Probando Webpack

### Armar la estructura del proyecto

```
|- webpack-intro
|----public/
|------index.html
|----src/
|------index.js
|------ops.js
|----package.json
|----.gitignore
```

### Instalar webpack

```sh
npm i -D webpack webpack-cli
```

### Agregamos un script de NPM

```json
{
  "scripts": {
    "build": "webpack"
  }
}
```

Por defecto, webpack busca como punto de entrada a `src/index.js` y como salida
exporta el resultado en la carpeta `dist/main.js` en modo de **production**.

Lo ejecutamos usando:

```sh
npm run build
```

### Agregar el build al HTML

Agregamos la etiqueta script en `public/index.html`:

```html
<script src="../dist/main.js"></script>
```

Y nuestro código funciona!

## Personalizamos nuestra configuración de Webpack

### Creamos un archivo de configuración

Creamos el archivo `webpack.config.js` en la raíz del proyecto. Este
archivo es un archivo de Node que necesita exportar un objeto.

```js
module.exports = {};
```

### Configuramos el entry point

El punto de inicio para Webpack por defecto es `src/index.js`, nosotros
modificamos el archivo inicial a `src/main.js` y se lo indicamos
a webpack a través del key `entry`.

```js
module.exports = {
  entry: "./src/main.js",
};
```

Ejecutamos `npm run build` y todo siguió funcionando.

### Configuramos el output

La salida de webpack por defecto es `dist/main.js` pero lo configuramos
para que sea `build/bundle.js`, cambiando la ruta y el nombre
de archivo a través del key `output` en el archivo de configuración.

```js
const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
};
```

Generamos el archivo utilizando el script `npm run build`.

### Cambiar el script del HTML

Dado que antes usábamos el archivo de JS generado por webpack
en la ruta `dist/main.js` y ahora la cambiamos a `build/bundle.js`,
tenemos que cambiar la etiqueta script de nuestro HTML.

```html
<script src="../build/bundle.js"></script>
```

## Extender la capacidad de entendimiento de Webpack

### Agregando `loaders`

Primero, agregamos dependencias de los loaders a utilizar. En nuestro
caso empezamos con `style-loader` y `css-loader` para poder entender
archivos de CSS dentro de JavaScript.

```sh
npm i style-loader css-loader -D
```

### Configurar loaders en Webpack

Agregamos el key `module.rules` al archivo de configuración:

```js
const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  module: {
    rules: [],
  },
};
```

Las reglas están compuestas por principalmente 2 keys, uno que indica
una expresión regular para saber el tipo de archivo y el otro para
indicar qué loaders van a interpretarlo.

En nuestro caso, los archivos seguían la expresión regular `/\.css$/i`.

```js
const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

### Haciendo pruebas con estilos

Creamos un archivo CSS:

```css
body {
  background-color: antiquewhite;
}
```

Importamos el archivo de CSS en JS.

```js
import "./styles.css";
```

Por último compilamos con Webpack:

```sh
npm run build
```

### Haciendo prueba de loaders con Babel

Instalar dependencias de Babel:

```sh
npm i -D babel-loader @babel/core @babel/preset-env
```

Luego configuramos el loader para archivos de JS:

```js
const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/i,
        use: "babel-loader",
      },
    ],
  },
};
```

Adicionalmente, configuramos Babel para indicarle que transformaciones aplicar
a través de su propio archivo de configuración, llamado
`.babelrc`:

```json
{
  "presets": ["@babel/preset-env"]
}
```

Por último compilamos nuestro código:

```sh
npm run build
```

Y probamos en una versión antigua de Node (ejemplo: v4) que no
soporta _rest arguments_.
