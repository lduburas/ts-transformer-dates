import transformer from './transformer';
import { isUndefined } from 'util';

export declare function toDates<T extends object>(z: any): void;

export function toDatesByArray(value: any, paths: string[][]) {
    paths.forEach(path => {
        const last = path.length - 1;
        let i = 0;
        let obj = value;

        while (obj && i < last) {
            obj = obj[path[i++]];
        }

        if (obj && i === last) {
            const dateValue = obj[path[last]];
            if (!isUndefined(dateValue))
                obj[path[last]] = dateValue ? new Date(dateValue) : null;
        }
    });
    return value;
}

export default transformer;