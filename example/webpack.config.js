const datesTransformer = require('ts-transformer-dates/lib/transformer').default;

module.exports = ['ts-loader', 'awesome-typescript-loader'].map(loader => ({
  mode: 'development',
  entry: './example.ts',
  output: {
    filename: `${loader}.js`,
    path: __dirname
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader,
        options: {
          getCustomTransformers: program => ({
              before: [
                  datesTransformer(program)
              ]
          })
        }
      }
    ]
  }
}));
