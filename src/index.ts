import { isArray, isString } from 'util';

type Converter = (v: string | number) => Date;

export declare function toDates<T extends object>(value: any, converter?: Converter): T;

export function toDatesByArray(value: any, paths: string[][], converter: Converter = v => new Date(v)): any {
    paths.forEach(path => convertPath(value, path, converter));
    return value;
}

function convertPath(contextValue: any, path: string[], converter: Converter) {
    let i = 0;
    let parent = null;
    let obj = contextValue;

    while (obj && !isArray(obj) && i < path.length) {
        parent = obj;
        obj = obj[path[i++]];
    }

    if (obj || isString(obj)) {
        if (isArray(obj)) {
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
