import { Injectable } from '@angular/core';
import { dragonRoot } from '../config/config';
import { HttpClientApiBaseService } from './api-base';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { MsgBoxService } from './msg-box.service';
import { LoadingService } from './loading.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DragonApiService extends HttpClientApiBaseService {

    get apiRoot() {
        return dragonRoot;
    }

    constructor(protected router: Router,
        protected http: Http,
        protected httpClient: HttpClient,
        protected msgBox: MsgBoxService,
        protected loading: LoadingService) {
        super(router, http, httpClient, msgBox, loading);
    }
}

