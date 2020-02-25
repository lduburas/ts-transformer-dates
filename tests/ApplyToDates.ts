import { applyToDates } from '../lib/index';

const inSimple = {
    a: 12345000
};

const expSimple = {
    a: new Date(12345000)
};

test('applyToDates simple', () => {
    expect(applyToDates(inSimple, [{ d: ['a'] }])).toStrictEqual(expSimple);
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

test('applyToDates nested', () => {
    expect(applyToDates(inNested, [{ d: ['a'], c: [['b', 1]] }, { d: ['c'] }])).toStrictEqual(expNested);
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

test('applyToDates arrays', () => {
    expect(applyToDates(inArray, [{ d: [], da: ['z'], c: [['b', 1, true]] }, { d: ['c'] }])).toStrictEqual(expArray);
});
