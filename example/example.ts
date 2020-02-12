import { toDates } from 'ts-transformer-dates';
import * as moment from 'moment';

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

const value2 = {
  dateFrom: "\/Date(1234567000000)\/",
  dateTo: "\/Date(1234656000000)\/"
}

toDates<Range>(value);
toDates<Range>(value2, netDate => moment(netDate).toDate());

console.log(value);
console.log(value2)
