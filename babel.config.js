module.exports = {
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', {
      targets: {
        esmodules: true,
        node: true,
        safari: 'tp'
      },
      bugfixes: true
    }]
  ],
  plugins: [
    '@babel/plugin-proposal-function-bind',
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ]
};