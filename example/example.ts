import { toDates } from 'ts-transformer-dates';
import * as moment from 'moment';

interface Range {
    dateFrom: Date;
    dateTo: Date;
    notes: string;
}

const range = {
    dateFrom: '2020-01-12T03:25:45.000Z', // date as ISO string
    dateTo: 1578799545000, // date as number of milliseconds
    notes: 'brown fox'
};

const range2 = {
    dateFrom: '/Date(1234567000000)/',
    dateTo: '/Date(1234656000000)/',
    notes: 'brown fox'
};

toDates<Range>(range);
toDates<Range>(range2, netDate => moment(netDate).toDate());

console.log(range);
console.log(range2);
