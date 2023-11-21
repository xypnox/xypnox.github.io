const postcss = require('postcss');

const cssVariables = require('./cssVariables.json');

console.log({ cssVariables })

const plugin = () => {
  return {
    postcssPlugin: 'postcss-check-variables',
    Once(root, { result }) {
      // Check for undefined variables
      const localCssVariables = [];

      root.walkDecls(decl => {
        if (decl.prop.startsWith('--')) {
          localCssVariables.push(decl.prop);
        }
      });

      root.walkDecls(decl => {
        if (decl.value.includes('var(')) {
          const matches = decl.value.match(/var\(([^)]+)\)/);
          if (matches) {
            const variable = matches[1];
            if (!cssVariables.includes(variable) && !localCssVariables.includes(variable)) {
              const file = decl.source.input.file || 'unknown';
              const line = decl.source.start.line;
              result.warn(`${file} - ${line} : Undefined variable ${variable} used in ${decl.toString()}`);
            }
          }
        }
      });
    }
  }
};

module.exports = plugin;
