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
    notes: string;
}

const value = {
    dateFrom: '2020-01-12T03:25:45.000Z', // date as ISO string
    dateTo: 1578799545000, // date as number of milliseconds
    notes: 'brown fox'
};

toDates<Range>(value);

console.log(value);
```

Outputs:

```js
{
  dateFrom: 2020-01-12T03:25:45.000Z,
  dateTo: 2020-02-12T03:25:45.000Z,
  notes: 'brown fox'
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
                        before: [datesTransformer(program)]
                    })
                }
            }
        ]
    }
};
```

# License

MIT
