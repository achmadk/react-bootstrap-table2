const path = require('path');
const rollupPluginSCSS = require('rollup-plugin-scss');
const sass = require('sass');
const { name } = require('./package.json');

const checkProduction = process.env.NODE_ENV === 'production';

module.exports = {
  input: path.resolve(__dirname, 'index.js'),
  output: [{
    format: 'es',
    file: path.resolve(__dirname, 'dist', 'css', 'index.js')
  }],
  plugins: [
    rollupPluginSCSS({
      output: path.resolve(__dirname, 'dist', 'css', `${name}${checkProduction ? '.min' : ''}.css`),
      outputStyle: checkProduction ? 'compressed' : 'expanded',
      sass
    })
  ]
};
