import { isArray, isString } from 'util';

type Converter = (v: string | number) => Date

export declare function toDates<T extends object>(value: any, converter?: Converter): T;

export function toDatesByArray(value: any, paths: string[][], converter: Converter = (v) => new Date(v)): any {

    const convertPath = (value: any, path: string[]) => {
        let i = 0;
        let parent = null;
        let obj = value;

        while (obj && !isArray(obj) && i < path.length) {
            parent = obj;
            obj = obj[path[i++]];
        }

        if (obj || isString(obj)) {
            if (isArray(obj)) {
                const subPath = path.slice(i);
                obj.forEach((e, i) => obj[i] = convertPath(e, subPath));
            } else if (i === path.length) {
                const converted = obj ? converter(obj) : null;
                if (parent)
                    parent[path[i - 1]] = converted;
                else
                    return converted;
            }
        }
        return value;
    };

    paths.forEach(path => convertPath(value, path));
    return value;
}