import { Injectable, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { AvengerApiService } from './avenger-api.service';
import { DragonApiService } from './api-extra.service';

@Injectable()
export class FileAdapterService {

    constructor(private api: ApiService,
        private avenger: AvengerApiService,
        private dragonApiService: DragonApiService) {
    }

    /**
     * 上传文件
     * @param data 文件表单数据
     * @param isAvenger 是否是采购融资业务，默认为 false
     */
    upload(data: FormData, isAvenger = false) {
        return (isAvenger ? this.avenger.upload('/file/upload', data) : this.api.upload('/attachment/upload', data))
            .map(x => {
                const obj = { ...x.data.data, isAvenger };
                x.data.data = obj;
                return x;
            });
    }
    /**
    * 龙光上传文件
    * @param data 文件表单数据
    */
    dragonUpload(data: FormData) {
        return this.dragonApiService.upload('/file/upload', data)
            .map(x => {
                return x;
            });
    }
    /**
     * 查看文件
     * @param params 文件信息参数
     * @param isAvenger 是否是采购融资业务，默认为 false
     */
    view(params: { fileId: string, filePath: string, isAvenger: boolean, isInvoice?:boolean}) {
        if (params.isAvenger) {
            const { t, sign } = this.avenger.getSignInfo();
            return params.isInvoice ? `/avenger/file/nuonuofp?id=${params.fileId.replace(/\.pdf/,"")}&mainFlowId=${params.filePath}&sign=${sign}&t=${t}` : `/avenger/file/view?key=${params.filePath || params.fileId}&sign=${sign}&t=${t}`;
        } else {
            return `/api/attachment/view?key=${params.fileId}`;
        }
    }


    /**
    * 龙光查看文件
    * @param params 文件信息参数
    *
    */
    dragonView(params: { fileId: string, filePath: string }) {
        const { t, sign } = this.dragonApiService.getSignInfo();
        return `/dragon/file/view?key=${params.fileId || params.filePath}&sign=${sign}&t=${t}`;
    }
    /**
     * 删除文件
     * @param fileId 文件 id
     * @param isAvenger 是否是采购融资业务，默认为 false
     */
    remove(fileId: string, isAvenger = false) {
        return isAvenger
            ? this.avenger.post(`/file/delete`, { key: fileId })
            : this.api.post(`/attachment/delete`, { key: fileId });
    }
    dragonRemove(fileId: string) {
        return this.dragonApiService.post('/file/delete', { key: fileId });
    }

    /**
     * 下载文件
     * @param files 文件 id
     * @param mainFlowId 流程 id
     * @param isAvenger 是否是采购融资业务，默认为 false
     */
    download(files: any[], mainFlowId?: string, isAvenger = false) {
        const params = { files, mainFlowId };
        if (isAvenger) {
              return  this.avenger.download('/file/downFile', params);
        } else {
            return this.api.download('/file/down_file', params);
        }

    }
}
