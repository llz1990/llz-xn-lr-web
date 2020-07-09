import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'xnFilterText' })
export class XnFilterTextPipe implements PipeTransform {
    transform(data: string, arr: any): any {
        arr = arr.filter(v => v !== '');
        // arr = JSON.parse(arr);
        for (let i = 0; i < arr.length; i++) {
            data = data.replace(new RegExp(arr[i], 'g'), `<span class="light-red">${arr[i]}</span>`);
            data = data.replace("质", `<span class="light-red">质</span>`);
        }
        return data;
    }
}
