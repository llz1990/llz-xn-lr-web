import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'xnArrayListToString'
})
export class ArrayListToStringPipe implements PipeTransform {
    transform(value: any) {
        if (!value) {
            return '';
        }
        const obj =
            typeof value === 'string'
                ? value
                : JSON.parse(JSON.stringify(value));
        if(Array.isArray(obj)){
            return  obj.length > 0 ? obj.map((obj) =>obj.Name).join('<br/>') : '';
        }

        if(typeof value === 'string'){
            return  obj.replace(/[\r\n\t\、]/g,"<br/>");
        }
        
        return '';
    }
}
