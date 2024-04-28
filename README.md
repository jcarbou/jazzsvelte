[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


[![jazzsvelte Hero](https://www.primefaces.org/static/social/jazzsvelte-preview.jpg)](https://www.jazzsvelte.org)

# JazzSvelte

JazzSvelte is a rich set of open source UI Components for Svelte adapting from jazzsvelte.

## Download

JazzSvelte is available at [npm](https://www.npmjs.com/package/jazzsvelte).

```
# Using npm
npm install jazzsvelte

# Using yarn
yarn add jazzsvelte

# Using pnpm
pnpm add jazzsvelte
```

## Import

Each component can be imported individually so that you only bundle what you use. Import path is available in the documentation of the corresponding component.

```javascript
<script>
      //import ComponentName from 'jazzsvelte/{componentname}';
      import Button from 'jazzsvelte/button';
</script>

<Button label="JazzSvelte" />
```

## Theming

JazzSvelte has two theming has modes; styled or unstyled.

**Styled Mode**

Styled mode is based on pre-skinned components with opinionated themes like Material, Bootstrap or PrimeOne themes. Theme is the required css file to be imported, visit the [Themes](https://jazzsvelte.org/theming) section for the complete list of available themes to choose from.

```javascript
// theme
import 'jazzsvelte/resources/themes/lara-light-cyan/theme.css';
```

**Unstyled Mode**

Unstyled mode is disabled by default for all components. Using the jazzsvelte context, set `unstyled` as true to enable it globally. Visit the [Unstyled mode](https://jazzsvelte.org/unstyled) documentation for more information and examples.

## Contributors

<a href="https://github.com/jcarbou/jazzsvelte/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=jcarbou/jazzsvelte" />
</a>
