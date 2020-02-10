# TypeScript Transformer Dates
Converts object properties from number or string to Date according to provided type having Date fields.
Aimed to convert parsed JSON objects to match given TypeScript interface. 

Inspired by [ts-transformer-keys](https://github.com/kimamula/ts-transformer-keys).

# Requirement
TypeScript >= 2.4.1

# How to use 

## In TypeScript source

```ts
import { toDates } from 'ts-transformer-dates';

interface Range {
  dateFrom: Date;
  dateTo: Date;
  ignoredField: number;
}

const value = {
  dateFrom: "2020-01-12T03:25:45.000Z",
  dateTo: 1578799545000, 
  ignoredField: "2020-02-12T03:25:45.000Z",
  extraField: "brown fox"
}

toDates<Range>(value);

console.log(value);
```

Outputs:
```js
{
  dateFrom: 2020-01-12T03:25:45.000Z,
  dateTo: 2020-02-12T03:25:45.000Z,
  ignoredField: '2020-02-12T03:25:45.000Z',
  extraField: 'brown fox'
}
```

## webpack
```js
// webpack.config.js
const datesTransformer = require('ts-transformer-dates/lib/transformer').default;

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader', // or 'awesome-typescript-loader'
        options: {
          // make sure not to set `transpileOnly: true` here, otherwise it will not work
          getCustomTransformers: program => ({
              before: [
                  datesTransformer(program)
              ]
          })
        }
      }
    ]
  }
};

```

# License

ISC
