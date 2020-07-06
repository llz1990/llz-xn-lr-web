import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'xnInvoiceStatus'})
export class XnInvoiceStatusPipe implements PipeTransform {
    transform(status: any): any {

        let invoiceStatus: any = '';
        switch (status) {
            case undefined:
                invoiceStatus = '未验证';
                break;
            case 1:
                invoiceStatus = '验证成功';
                break;
            case 2:
                invoiceStatus = '验证失败';
                break;
            case 3:
                invoiceStatus = '重复验证';
                break;
            case 4:
                invoiceStatus = '已作废';
                break;
            case 5:
                invoiceStatus = '未验证';
                break;
        }
        return invoiceStatus;

    }
}
