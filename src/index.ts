type Converter = (v: string | number) => Date;

export declare function toDates<T extends object>(value: any, converter?: Converter): T;

interface Type {
    d?: string[];
    da?: string[];
    c?: [string, number, boolean?][];
}

export function applyToDates(value: any, types: Type[], index: number = 0) {
    const { d, da, c } = types[index];

    d?.forEach(dateField => {
        const dateFieldValue = value[dateField];
        if (undefined !== dateFieldValue && null !== dateFieldValue) value[dateField] = new Date(dateFieldValue);
    });

    da?.forEach(arrayField => {
        const dateArray = value[arrayField];
        if (undefined !== dateArray && null !== dateArray)
            if (Array.isArray(dateArray)) {
                dateArray.forEach((elem, i) => {
                    if (undefined !== elem && null !== elem) dateArray[i] = new Date(elem);
                });
            } else throw new TypeError(`Array is expected in field ${arrayField}`);
    });

    c?.forEach(([fieldName, typeIndex, isArray]: [string, number, boolean?]) => {
        const fieldValue = value[fieldName];
        if (undefined !== fieldValue && null !== fieldValue) {
            if (isArray) {
                if (Array.isArray(fieldValue)) {
                    fieldValue.forEach(elem => applyToDates(elem, types, typeIndex));
                } else throw new TypeError(`Array is expected in field ${fieldName}`);
            } else applyToDates(fieldValue, types, typeIndex);
        }
    });

    return value;
}

export function toDatesByArray(value: any, paths: string[][], converter: Converter = v => new Date(v)): any {
    paths.forEach(path => convertPath(value, path, converter));
    return value;
}

function convertPath(contextValue: any, path: string[], converter: Converter) {
    let i = 0;
    let parent = null;
    let obj = contextValue;

    while (obj && !Array.isArray(obj) && i < path.length) {
        parent = obj;
        obj = obj[path[i++]];
    }

    if (obj || typeof obj === 'string') {
        if (Array.isArray(obj)) {
            const subPath = path.slice(i);
            obj.forEach((e, index) => (obj[index] = convertPath(e, subPath, converter)));
        } else if (i === path.length) {
            const converted = obj ? converter(obj) : null;
            if (parent) parent[path[i - 1]] = converted;
            else return converted;
        }
    }
    return contextValue;
}
