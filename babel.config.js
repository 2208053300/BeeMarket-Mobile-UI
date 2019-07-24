module.exports = {
  'env': {
    'development': {
      'sourceMaps': true,
      'retainLines': true
    }
  },
  presets: [['@vue/app', { useBuiltIns: 'entry' }]],
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      },
      'vant'
    ]
  ]
}
