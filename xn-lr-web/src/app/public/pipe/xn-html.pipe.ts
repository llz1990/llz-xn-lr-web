import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {XnUtils} from '../../common/xn-utils';

@Pipe({name: 'xnHtml'})
export class XnHtmlPipe implements PipeTransform {
    constructor(protected dom: DomSanitizer) {
    }

    transform(html: string): SafeHtml {
        return this.dom.bypassSecurityTrustHtml(html);
    }
}
