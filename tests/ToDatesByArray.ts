import { toDatesByArray } from '../lib/index';

const inSimple = {
    a: 12345000
};

const expSimple = {
    a: new Date(12345000)
};

test('toDatesByArray simple', () => {
    expect(toDatesByArray(inSimple, [['a']])).toStrictEqual(expSimple);
});

const inNested = {
    a: 12345000,
    b: {
        c: 54321000
    },
    z: 12345000
};

const expNested = {
    a: new Date(12345000),
    b: {
        c: new Date(54321000)
    },
    z: 12345000
};

test('toDatesByArray nested', () => {
    expect(toDatesByArray(inNested, [['a'], ['b', 'c']])).toStrictEqual(expNested);
});

const inArray = {
    a: 12345000,
    b: [{ c: 54321000 }, { c: 12345000 }],
    z: [12345000, 54321000]
};

const expArray = {
    a: 12345000,
    b: [{ c: new Date(54321000) }, { c: new Date(12345000) }],
    z: [new Date(12345000), new Date(54321000)]
};

test('toDatesByArray nested', () => {
    expect(toDatesByArray(inArray, [['b', 'c'], ['z']])).toStrictEqual(expArray);
});
