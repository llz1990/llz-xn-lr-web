import { Headers, RequestOptions, Http, Response, ResponseContentType } from '@angular/http';
import { Router } from '@angular/router';
import { MsgBoxService } from './msg-box.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import { isObject } from 'util';
import { isString } from 'util';
import { LoadingService } from './loading.service';
import { avengerRoot, dragonRoot } from '../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as md5 from 'js-md5';

declare let $: any;

export abstract class ApiBaseService {
    private readonly options = new RequestOptions({
        headers: new Headers({
            'Content-Type': 'application/json; charset=utf-8',
            'X-Requested-With': 'XMLHttpRequest'  // 告诉后台thinkjs这是个ajax请求，这样thinkjs对于其他错误也会用json格式返回
        })
    });

    constructor(protected router: Router,
        protected http: Http,
        protected msgBox: MsgBoxService,
        protected loading: LoadingService) {
    }

    abstract get apiRoot();

    /**
     * 发送POST请求，错误用msgBox显示，并过滤错误
     * @param url
     * @param params
     * @returns {any}
     */
    post(url: string, params: any): Observable<any> {

        return this.postMapCatch(url, params)
            .filter(json => {
                // 错误情况在这里处理，并且直接过滤掉
                return this.handleJsonRet(json);
            });
    }

    /**
     * 发送POST请求，错误用msgBox显示，不过滤错误
     * @param url
     * @param params
     * @returns {Observable<R>}
     */
    post2(url: string, params: any): Observable<any> {

        return this.postMapCatch(url, params)
            .map(json => {
                // 错误情况在这里处理，但不过滤
                this.handleJsonRet(json);
                return json;
            });
    }

    /**
     * 发送POST请求，错误用alert显示，并过滤错误
     * @param url
     * @param params
     * @returns {any}
     */
    post3(url: string, params: any): Observable<any> {

        return this.postMapCatch(url, params)
            .filter(json => {
                // 错误情况在这里处理，并且直接过滤掉
                return this.handleJsonRet(json, true);
            });
    }

    postOnly(url: string, params: any): Observable<Response> {
        return this.http.post(this.apiRoot + url, JSON.stringify(params), this.options);
    }

    postMap(url: string, params: any): Observable<any> {
        return this.postOnly(url, params)
            .map(res => {
                this.loading.close();
                return res.json();
            });
    }

    postMapCatch(url: string, params: any): Observable<any> {
        return this.postMap(url, params)
            .catch(err => {
                // 把错误信息也包装成json格式
                console.log('catch', err);
                let msg: string = '请求出现异常';
                if (err instanceof Response) {
                    if ((<any>err)._body) {
                        msg = `请求异常，状态码${err.status}，${(<any>err)._body}`;
                    } else {
                        msg = `请求异常，状态码${err.status}`;
                    }
                }
                return Observable.of({
                    ret: 99900,
                    msg: msg
                });
            });
    }

    handleJsonRet(json: any, useAlert?: boolean): boolean {
        if (json.ret !== 0) {
            if (json.ret === 99902 || json.ret === 20001) {
                // 用户没有登录，跳转到登录界面
                console.log('loginout res', json);
                this.msgBox.open(false, '您的登录已经超时，请重新登录!', () => {
                    this.router.navigate(['/user/login']);
                });
            } else if (json.ret === 10105) {
                this.msgBox.open(false, '首次登陆需要修改密码', () => {
                    this.router.navigate(['/user/find']);
                });
            } else if (json.ret === 10107) {
                this.msgBox.open(false, '首次登陆需要修改密码', () => {
                    this.router.navigate(['/user/reset']);
                });
            } else if (json.ret === 30000012) {
                this.msgBox.open(false, `请求失败：${json.msg}(错误代码: ${json.ret})`, () => {
                    this.router.navigate([`/console/record/new/supplier_upload_information`]);
                });
            } else if (json.ret === 30000013) {
                this.msgBox.open(true, `请求失败：${json.msg}(错误代码: ${json.ret})`, () => {
                    this.router.navigate([`/console/record/record/upload_base`]);
                });
            } else {
                console.log('handleJsonRet fail', json);
                let msg;
                if (json.msg) {
                    if (json.ret === 1000 && isString(json.msg) && json.data) {
                        msg = `${json.msg}：${Object.values(json.data).join(',')}(错误代码: ${json.ret})`;
                    } else if (isObject(json.msg)) {
                        msg = `请求失败：${JSON.stringify(json.msg)}(错误代码: ${json.ret})`;
                    } else if (isString(json.msg)) {
                        msg = `请求失败：${json.msg}(错误代码: ${json.ret})`;
                    } else {
                        msg = `请求失败：${json.msg}(错误代码: ${json.ret})`;
                    }
                } else {
                    msg = `请求失败：(错误代码: ${json.ret})`;
                }
                if (useAlert) {
                    alert(msg);
                } else {
                    this.msgBox.open(false, msg);
                }
            }

            return false;
        } else {
            return true;
        }
    }

    /**
     * 把文件上传的ajax调用也用Observable包装起来
     * @param url
     * @param fd
     * @returns {Observable<any>}
     */
    upload(url: string, fd: FormData): Observable<any> {
        console.log('upload', url);
        return Observable.create(observer => {
            let $upload = null;
            $.ajax({
                url: this.apiRoot + url,
                type: 'POST',
                processData: false,
                contentType: false,
                data: fd,
                xhr: () => {
                    let xhr = $.ajaxSettings.xhr();
                    $upload = $(xhr.upload);
                    $upload.on('progress', null, (e) => {
                        observer.next({
                            type: 'progress',
                            data: e
                        });
                    });
                    return xhr;
                },
                success: (json) => {
                    if ($upload) {
                        console.log('upload success, remove event listener');
                        $upload.off('progress');
                    }
                    observer.next({
                        type: 'complete',
                        data: json
                    });
                    observer.complete();
                },
                error: (xhr, err) => {
                    if ($upload) {
                        console.log('upload error, remove event listener');
                        $upload.off('progress');
                    }
                    observer.error(err);
                }
            });
        });
    }

    /**
     * 方便测试的mock接口
     * @param url
     * @param params
     * @returns {any} 返回params
     */
    mock(url: string, params: any): Observable<any> {
        return Observable.of(params);
    }

    /**
     * ajax方式把文件下载到内存中
     * @param url
     * @param params
     * @returns {Observable<Response>}
     */
    download(url: string, params: any): Observable<Response> {
        return this.http.post(this.apiRoot + url, JSON.stringify(params), new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8',
                'X-Requested-With': 'XMLHttpRequest'  // 告诉后台thinkjs这是个ajax请求，这样thinkjs对于其他错误也会用json格式返回
            }),
            responseType: ResponseContentType.Blob
        }));
    }
    /**
     * ajax方式把文件下载到内存中
     * @param url
     * @param params
     * @returns {Observable<Response>}
     */
    AvengerDownload(url: string, params: any): Observable<Response> {
        return this.http.post(avengerRoot + url, JSON.stringify(params), new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8',
                'X-Requested-With': 'XMLHttpRequest'  // 告诉后台thinkjs这是个ajax请求，这样thinkjs对于其他错误也会用json格式返回
            }),
            responseType: ResponseContentType.Blob
        }));
    }

    /**
     * 把blob对象变成下载文件
     * @param blob
     * @param filename
     */
    save(blob: Blob, filename: string) {
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            let evt = document.createEvent('MouseEvents');
            evt.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            let link = document.createElement('a');
            link.download = filename;
            link.href = URL.createObjectURL(blob);
            link.dispatchEvent(evt);
        }
    }

    /**
     * 获取assets目录下的html资源
     * @param url 例如 /assets/html/shou-ze.html
     * @returns {Observable<Response>}
     */
    assets(url: string): Observable<Response> {
        return this.http.get(url, new RequestOptions({
            responseType: ResponseContentType.Text
        }));
    }
}

export abstract class HttpClientApiBaseService extends ApiBaseService {

    protected httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'X-Requested-With': 'XMLHttpRequest',  // 告诉后台thinkjs这是个ajax请求，这样thinkjs对于其他错误也会用json格式返回
            'Access-Control-Allow-Headers': 'x-requested-with,content-type,Authorization,timespan,sign'
        })
    };

    constructor(protected router: Router,
        protected http: Http,
        protected httpClient: HttpClient,
        protected msgBox: MsgBoxService,
        protected loading: LoadingService) {
        super(router, http, msgBox, loading);
    }

    getSignInfo() {
        const time = Math.floor(new Date().getTime() / 1000);
        console.info('time==>', time);
        const appId = window.sessionStorage.getItem('appId');
        const clientkey = window.sessionStorage.getItem('clientkey');

        return {
            t: time,
            sign: md5(`${appId}${clientkey}${time}`),
        };
    }

    postOnly(url: string, params: any): Observable<any> {
        const { t, sign } = this.getSignInfo();
        params['t'] = t;
        params['sign'] = sign;
        return this.httpClient.post(this.apiRoot + url, JSON.stringify(params), this.httpOptions);
    }

    postMap(url: string, params: any): Observable<any> {
        return this.postOnly(url, params)
            .map(res => {
                this.loading.close();
                return res;
            });
    }

    /**
    * 把文件上传的ajax调用也用Observable包装起来
    * @param url
    * @param fd
    * @returns {Observable<any>}
    */
    upload(url: string, fd: FormData): Observable<any> {
        console.log('upload', url);
        const { t, sign } = this.getSignInfo();
        fd.append('t', `${t}`);
        fd.append('sign', sign);

        return super.upload(url, fd);
    }

    /**
     * ajax方式把文件下载到内存中
     * @param url
     * @param params
     * @returns {Observable<Response>}
     */
    download(url: string, params: any): Observable<Response> {
        const { t, sign } = this.getSignInfo();
        params['t'] = t;
        params['sign'] = sign;
        return this.http.post(this.apiRoot + url, JSON.stringify(params), new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8',
                'X-Requested-With': 'XMLHttpRequest'  // 告诉后台thinkjs这是个ajax请求，这样thinkjs对于其他错误也会用json格式返回
            }),
            responseType: ResponseContentType.Blob
        }));
    }
}
