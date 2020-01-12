import transformer from './transformer';

export declare function toDates<T extends object>(z: any): void;

export function toDatesByArray(value: any, props: string[][]) {
    props.forEach(path => {
        path.reduce((obj: any, prop: string, i: number) => {
            if (i + 1 < path.length)
                return obj[prop];
            else
                obj[prop] = new Date(obj[prop]);
        }, value);
    });
    return value;
}

export default transformer;