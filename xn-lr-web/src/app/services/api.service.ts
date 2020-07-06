import { Injectable } from '@angular/core';
import { apiRoot } from '../config/config';
import { ApiBaseService } from './api-base';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { MsgBoxService } from './msg-box.service';
import { LoadingService } from './loading.service';
import { AvengerApiService } from './avenger-api.service';
import { DragonApiService } from './api-extra.service';

@Injectable()
export class ApiService extends ApiBaseService {
    get apiRoot() {
        return apiRoot;
    }

    constructor(protected router: Router,
        protected http: Http,
        protected msgBox: MsgBoxService,
        protected loading: LoadingService,
        public avenger: AvengerApiService,
        public dragon: DragonApiService,
    ) {
        super(router, http, msgBox, loading);
    }
}
