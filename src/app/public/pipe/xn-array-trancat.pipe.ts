import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'xnArrayTruncate'
})
export class ArrayTruncatePipe implements PipeTransform {
    transform(value: string, limit = 2, ellipsis = '...') {
        if (!value) {
            return '';
        }

        const obj =
            typeof value === 'string'
                ? JSON.parse(value)
                : JSON.parse(JSON.stringify(value));

        return Array.isArray(obj) && obj.length > limit
            ? `${obj.slice(0, limit)} ${ellipsis}`
            : obj;
    }
}
