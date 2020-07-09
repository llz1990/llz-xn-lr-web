import {EventEmitter, Injectable} from '@angular/core';

/**
 *  组建间通讯服务
 */
@Injectable()
export class ContractTypeCommunicateService {
    public change = new EventEmitter<any>();

    public constructor() {
        //
    }
}
