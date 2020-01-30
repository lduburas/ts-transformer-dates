# Typescript Transformer Dates
Converts object fields values from number or string to Date according to provided type having Date fields.
Main purpose to convert parsed JSON objects to match given TypeScript interface. 

Inspired by [ts-transformer-keys](https://github.com/kimamula/ts-transformer-keys).

# Requirement
TypeScript >= 2.4.1

# How to use 

## In TypeScript source

```ts
import { toDates } from "../ts-transformer-dates";

interface Values {
  dateFrom: Date;
  dateTo: Date;
  array: Date[];
  ignoredField: string;
}

const values = {
  dateFrom: "2020-01-12T03:25:45.000Z",
  dateTo: "2020-02-12T03:25:45.000Z", 
  array: [1578799545000, 1581477945000, "2020-02-12T03:25:45.000Z"],
  ignoredField: 1578799545000,
  extraField: "brown fox"
}

toDates<Values>(values);

console.log(values);
```

Outputs:
```js
{
  dateFrom: 2020-01-12T03:25:45.000Z,
  dateTo: 2020-02-12T03:25:45.000Z,
  array: [
    2020-01-12T03:25:45.000Z,
    2020-02-12T03:25:45.000Z,
    2020-02-12T03:25:45.000Z
  ],
  ignoredField: 1578799545000,
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
