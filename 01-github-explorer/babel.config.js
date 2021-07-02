module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-typescript",
    ["@babel/preset-react", {
      runtime: 'automatic' //evita ter que importar o React em todo arquivo
    }]
  ]
}