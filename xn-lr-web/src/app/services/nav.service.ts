import {Injectable} from '@angular/core';
import {isNullOrUndefined} from 'util';

@Injectable()
export class NavService {

    private cache: any = {};

    constructor() {
    }

    setNavIndex(res: any) {
        this.cache = res;
        window.sessionStorage.setItem('navIndex', res && res.navIndex || '');
    }

    get navIndex(): string {
        if (isNullOrUndefined(this.cache.index)) {
            this.cache.navIndex = window.sessionStorage.getItem('navIndex') || '';
        }
        return this.cache.navIndex;
    }

    removeNavIndex() {
        this.deleteCaches();
        window.sessionStorage.removeItem('navIndex');
    }

    deleteCaches() { // 删除缓存
        if (!this.cache) {
            return;
        }
        for (const i in this.cache) {
            if (this.cache.hasOwnProperty(i)) {
                delete this.cache[i];
            }
        }
    }
}
