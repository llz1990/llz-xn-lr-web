import { isArray, isObject, isString } from 'util';
import { SpecialFlows } from '../config/special-flowId';

declare let $: any;

export class XnUtils {
    static isEmpty(v) {
        return v === undefined || v === null || v.length === 0;
    }

    /**
     *  时间推移量
     * @param n  推移天数
     * @param current 当前日期
     * @param Direc 正负
     * @returns {any}
     */
    static dateSalculate(n, current, Direc): any {
        const mins = 24 * 60 * 60 * 1000;
        const payDays = new Date(current).getTime() + Direc * n * mins;
        // 当前时间
        const date = XnUtils.formatDate(payDays);
        return date;
    }

    static formatDate(timestamp): string {
        if (typeof timestamp === 'string') {
            timestamp = parseFloat(timestamp);
        }
        if (!!timestamp && timestamp !== 0) {
            timestamp = Number(timestamp);
            let date = new Date(timestamp);
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            let sm = m < 10 ? ('0' + m) : m;
            let d = date.getDate();
            let sd = d < 10 ? ('0' + d) : d;
            return `${y}-${sm}-${sd}`;
        } else {
            return '';
        }
    }

    static formatDateZh(timestamp): string {
        if (timestamp !== 0) {
            let date = new Date(timestamp);
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            let d = date.getDate();
            return `${y}年${m}月${d}日`;
        } else {
            return '';
        }
    }

    static formatDatetime(timestamp): string {
        if (timestamp !== 0) {
            let date = new Date(timestamp);
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            let sm = m < 10 ? ('0' + m) : m;
            let d = date.getDate();
            let sd = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            let sh = h < 10 ? ('0' + h) : h;
            let minute = date.getMinutes();
            let sminute = minute < 10 ? ('0' + minute) : minute;
            return `${y}-${sm}-${sd} ${sh}:${sminute}`;
        } else {
            return '';
        }
    }

    static formatLongDatetime(timestamp): string {
        if (timestamp !== 0) {
            let date = new Date(timestamp);
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            let sm = m < 10 ? ('0' + m) : m;
            let d = date.getDate();
            let sd = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            let sh = h < 10 ? ('0' + h) : h;
            let minute = date.getMinutes();
            let sminute = minute < 10 ? ('0' + minute) : minute;
            let s = date.getSeconds();
            let ss = s < 10 ? ('0' + s) : s;
            return `${y}-${sm}-${sd} ${sh}:${sminute}:${ss}`;
        } else {
            return '';
        }
    }

    static formatShortDatetime(timestamp): string {
        if (timestamp !== 0) {
            let date = new Date(timestamp);
            let m = date.getMonth() + 1;
            let sm = m < 10 ? ('0' + m) : m;
            let d = date.getDate();
            let sd = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            let sh = h < 10 ? ('0' + h) : h;
            let minute = date.getMinutes();
            let sminute = minute < 10 ? ('0' + minute) : minute;
            return `${sm}-${sd} ${sh}:${sminute}`;
        } else {
            return '';
        }
    }

    static convertCurrency(currency: string | number): [boolean, string] {
        // Constants:
        const MAXIMUM_NUMBER = 99999999999.99;
        // Predefine the radix characters and currency symbols for output:
        const CN_ZERO = '零';
        const CN_ONE = '壹';
        const CN_TWO = '贰';
        const CN_THREE = '叁';
        const CN_FOUR = '肆';
        const CN_FIVE = '伍';
        const CN_SIX = '陆';
        const CN_SEVEN = '柒';
        const CN_EIGHT = '捌';
        const CN_NINE = '玖';
        const CN_TEN = '拾';
        const CN_HUNDRED = '佰';
        const CN_THOUSAND = '仟';
        const CN_TEN_THOUSAND = '万';
        const CN_HUNDRED_MILLION = '亿';
        const CN_SYMBOL = '人民币';
        const CN_DOLLAR = '元';
        const CN_TEN_CENT = '角';
        const CN_CENT = '分';
        const CN_INTEGER = '整';
        const CN_MINUS = '负';


        // Variables:
        let integral;    // Represent integral part of digit number.
        let decimal;    // Represent decimal part of digit number.
        let outputCharacters;    // The output result.
        let parts;
        let digits, radices, bigRadices, decimals;
        let zeroCount;
        let i, p, d;
        let quotient, modulus;
        let currencyTemp, currencySymbol;

        // Validate input string:
        // 检测是否为负数
        currencyTemp = currency + '';
        if (parseInt(currencyTemp.indexOf('-'), 0) !== -1) {
            currencySymbol = -1;
            currency = currency.toString().replace(/-/g, '');
        }

        let currencyDigits = currency.toString();
        if (currencyDigits === '') {
            return [true, '请输入小写金额！'];
        }
        if (currencyDigits.match(/[^,.\d-]/) != null) {
            return [false, '小写金额含有无效字符！'];
        }
        if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?)|(\d+(.\d+)?))$/) == null) {
            return [false, '小写金额的格式不正确！'];
        }

        // Normalize the format of input digits:
        currencyDigits = currencyDigits.replace(/,/g, '');    // Remove comma delimiters.
        currencyDigits = currencyDigits.replace(/^0+/, '');    // Trim zeros at the beginning.
        // Assert the number is not greater than the maximum number.
        if (Number(currencyDigits) > MAXIMUM_NUMBER) {
            return [false, '金额过大，应小于1000亿元！'];
        }

        // Process the coversion from currency digits to characters:
        // Separate integral and decimal parts before processing coversion:
        parts = currencyDigits.split('.');
        if (parts.length > 1) {
            integral = parts[0];
            decimal = parts[1];
            // Cut down redundant decimal digits that are after the second.
            decimal = decimal.substr(0, 2);
        } else {
            integral = parts[0];
            decimal = '';
        }

        // Prepare the characters corresponding to the digits:
        digits = [CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE];
        radices = ['', CN_TEN, CN_HUNDRED, CN_THOUSAND];
        bigRadices = ['', CN_TEN_THOUSAND, CN_HUNDRED_MILLION];
        decimals = [CN_TEN_CENT, CN_CENT];

        // Start processing:
        outputCharacters = '';
        // Process integral part if it is larger than 0:
        if (Number(integral) > 0) {
            zeroCount = 0;
            for (i = 0; i < integral.length; i++) {
                p = integral.length - i - 1;
                d = integral.substr(i, 1);
                quotient = p / 4;
                modulus = p % 4;
                if (d === '0') {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        outputCharacters += digits[0];
                    }
                    zeroCount = 0;
                    outputCharacters += digits[Number(d)] + radices[modulus];
                }
                if (modulus === 0 && zeroCount < 4) {
                    outputCharacters += bigRadices[quotient];
                    zeroCount = 0;
                }
            }
            outputCharacters += CN_DOLLAR;
        }

        if (currencySymbol === -1) {
            outputCharacters = CN_MINUS + outputCharacters;
        }

        // Process decimal part if there is:
        if (decimal !== '') {
            for (i = 0; i < decimal.length; i++) {
                d = decimal.substr(i, 1);
                if (d !== '0') {
                    outputCharacters += digits[Number(d)] + decimals[i];
                }
            }
        }

        // Confirm and return the final output string:
        if (outputCharacters === '') {
            outputCharacters = CN_ZERO + CN_DOLLAR;
        }
        if (decimal === '') {
            outputCharacters += CN_INTEGER;
        }

        return [true, outputCharacters];
    }

    /**
     * 递归判断value中是否有field
     * @param value
     * @param field
     * @returns {boolean}
     */
    static hasField(value, field): boolean {
        if (isArray(value)) {
            for (const item of value) {
                if (!XnUtils.hasField(item, field)) {
                    return false;
                }
            }
            return true;
        }

        if (isObject(value)) {
            const v = value[field];
            return !(v === undefined || v === null || v === '');
        }

        return false;
    }

    /**
     * 把s转换为object对象
     * @param s
     * @returns {any}
     */
    static parseObject(s, def?) {
        if (XnUtils.isEmpty(s)) {
            return def || {};
        }
        if (isString(s) && !XnUtils.isZero(s)) {
            const d = JSON.parse(s);
            if (typeof d === 'number') {
                return s;
            }
            console.log(d);
            return d;
        }
        return s;
    }

    /**
     *  判断字符串不是0开头
     */
    static isZero(str: any): boolean {
        return str.toString().substr(0, 1) === '0';
    }
    /**
      * 将数字转换为百分比的字符串
      * - 精确到0.01%
      * @param paramValue 要格式化的值
      * @param paramDefault 无效值后，返回的字符串
      * @return 格式化的百分比字符串
      *  - 对于paramValue为null或undefined
      */
    public static formatPercentage(paramValue: number | string, paramDefault: string = '0%') {
        const minNumber = 1000000;
        const PercentNumber = 100;

        if (paramValue === null || paramValue === undefined) {
            return paramDefault;
        }

        let n = '';
        let v = 0;
        if (typeof paramValue === 'string') {
            v = Math.round(Number.parseFloat(paramValue) * 10000) / 10000;
        } else {
            v = paramValue;
        }

        if (Number.isNaN(v)) {
            return paramDefault;
        }

        if (v < 0) {
            // 如果是小于0的数
            n = '-';
            v = Math.abs(v);
        }

        v *= minNumber;
        v = Math.round(v) / (minNumber / PercentNumber);
        return [n, v.toString(), '%'].join('');
    }
    /**
     * 格式化金额每三位加小数点控件
     */
    static formatMoney(num: any): string {
        if (num === 0) {
            return num.toString();
        }
        if (!num) {
            return '';
        }
        num = num.toString();
        num = num.replace(/,/g, '').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        let numTemp = 0;
        // 检测是否为负数
        if (parseInt(num.toString().indexOf('-'), 0) !== -1) {
            numTemp = -1;
            num = num.replace(/-/g, '');
        }
        // 检测是否是小数
        if (parseInt(num.toString().indexOf('.'), 0) !== -1) {
            let regArrTemp = num.split('.');
            let regArrFirstTemp = regArrTemp[0];
            num = num.replace(/^0/, '');
            let regArr = num.split('.');
            regArr[0] = regArr[0].replace(/^0+/, '');  // 检测前面是否有0
            regArr[0] = regArr[0].replace(/,/g, '')
                .split('').reverse().join('').replace(/(\d{3})/g, '$1,')
                .replace(/\,$/, '').split('').reverse().join('');
            num = regArr.join('.');
            num = parseInt(regArrFirstTemp, 0) === 0 ? '0' + num : num;  // 检测小数是不是0.x的这种小数
        } else {
            if (parseInt(num, 0) !== 0) {
                num = num.replace(/^0+/, '');  // 不等于0，把0去掉
                // num += '.00';
            } else {
                num = num.replace(/^0+/, '0');  // 为0，保留1个0
            }
            num = num.replace(/,/g, '').split('').reverse().join('')
                .replace(/(\d{3})/g, '$1,').replace(/\,$/, '')
                .split('').reverse().join('');
            // num += '.00';
        }
        if (numTemp === -1) {
            num = '-' + num;
        }
        return num;
    }

    // 保留小数
    static formatMoneyFloat(num: any): string {
        num = num.toString();
        num = num.replace(/,/g, '').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        let numTemp = 0;
        // 检测是否为负数
        if (parseInt(num.toString().indexOf('-'), 0) !== -1) {
            numTemp = -1;
            num = num.replace(/-/g, '');
        }
        // 检测是否是小数
        if (parseInt(num.toString().indexOf('.'), 0) !== -1) {
            let regArrTemp = num.split('.');
            let regArrFirstTemp = regArrTemp[0];
            num = num.replace(/^0/, '');
            let regArr = num.split('.');
            regArr[0] = regArr[0].replace(/^0+/, '');  // 检测前面是否有0
            regArr[0] = regArr[0].replace(/,/g, '').split('')
                .reverse().join('').replace(/(\d{3})/g, '$1,')
                .replace(/\,$/, '').split('').reverse().join('');
            num = regArr.join('.');
            num = parseInt(regArrFirstTemp, 0) === 0 ? '0' + num : num;  // 检测小数是不是0.x的这种小数
        } else {
            if (parseInt(num, 0) !== 0) {
                num = num.replace(/^0+/, '');  // 不等于0，把0去掉
              //  num += '.00';
            } else {
                num = num.replace(/^0+/, '0');  // 为0，保留1个0
            }
            num = num.replace(/,/g, '').split('').reverse().join('')
                .replace(/(\d{3})/g, '$1,').replace(/\,$/, '')
                .split('').reverse().join('');
            num += '.00';
        }
        if (numTemp === -1) {
            num = '-' + num;
        }
        return num;
    }

    /**
     * 20170731这种日期校验
     */
    static toDateFromString(strDate: any): boolean {
        if (!strDate) {
            return;
        }
        if (isNaN(strDate) === true) {
            return false;
        }
        if (strDate.length !== 8) {
            return false;
        }

        let newDate;
        let nYear = parseInt(strDate.substring(0, 4), 10);
        let nMonth = parseInt(strDate.substring(4, 6), 10);
        let nDay = parseInt(strDate.substring(6, 8), 10);
        if (isNaN(nYear) === true || isNaN(nMonth) === true || isNaN(nDay) === true) {
            return false;
        }
        newDate = new Date(nYear, nMonth - 1, nDay);
        if (nYear !== newDate.getFullYear() || (nMonth - 1) !== newDate.getMonth() || nDay !== newDate.getDate()) {
            return false;
        }
        return true;
    }

    /**
     * 20170731这种日期校验
     */
    static toDate(strDate: string): any {
        if (!strDate) {
            return;
        }
        if (strDate.length !== 8) {
            return;
        }
        let newDate;
        let nYear = parseInt(strDate.substring(0, 4), 10);
        let nMonth = parseInt(strDate.substring(4, 6), 10);
        let nDay = parseInt(strDate.substring(6, 8), 10);
        if (isNaN(nYear) === true || isNaN(nMonth) === true || isNaN(nDay) === true) {
            return;
        }
        newDate = new Date(nYear, nMonth - 1, nDay);
        if (nYear !== newDate.getFullYear() || (nMonth - 1) !== newDate.getMonth() || nDay !== newDate.getDate()) {
            return;
        }
        return newDate;
    }

    /**
     * 图片旋转功能实现
     */
    static rotateImg(direction: string, degree: any, innerImg: any, outerImg: any, imgContainer: any, scaleValue?: number): number {
        let scale = 1;
        if (direction === 'left') {
            degree = degree - 90;
        } else if (direction === 'right') {
            degree = degree + 90;
        }
        // 没有缩放大小，默认为1
        if (!!scaleValue) {
            scale = scaleValue;
        }
        console.log('scale=>', scale);
        // 开启硬件加速
        $(outerImg).css({ 'transform': 'rotate(' + degree + 'deg)' });

        let inner_Img = $(innerImg);
        let img_container = $(imgContainer);

        let widePercentTemp = Number((inner_Img.width() / inner_Img.height()).toFixed(4)) * 100;
        let widePercent = widePercentTemp + '%';

        // translateX是为了兼容270的时候，顶部出不来的情况。
        let translateXpxTemp = img_container.width() * (widePercentTemp / 100 - 1);
        let translateXpx = 'translateX(-' + translateXpxTemp + 'px)';

        // -270 是减270整除360
        if ((degree % 90 === 0) && (degree % 180 !== 0) && ((degree - 270) % 360 !== 0)) {
            $(innerImg).css({ 'width': widePercent, 'transform': `translateX(0px) scale(${scale})` });
        } else if (((degree - 270) % 360 === 0) && (degree !== 0)) {
            $(innerImg).css({ 'width': widePercent, 'transform': `${translateXpx} scale(${scale})` });
        } else {
            $(innerImg).css({ 'width': '100%', 'transform': `translateX(0px) scale(${scale})` });
        }

        return degree;
    }

    /**
     * 门户是否登录可见函数
     * json callback number
     * items need change
     * newItems new array
     */
    static portalCheckLogin(json: any, items: any): any {
        for (let j = 0; j < items.length; j++) {
            if (!(items[j].children && items[j].children.length)) {
                continue;
            }
            for (let i = 0; i < items[j].children.length; i++) {
                // 设多一个z，不然数组会乱
                for (let z = 0; z < json.data.data.length; z++) {
                    if (items[j].children[i].id === json.data.data[z].columnId) {
                        items[j].children[i].status = json.data.data[z].state === 1 ? true : false;
                    }
                }
            }
        }
        return items;
    }

    static computeDay(controller, CalendarData) {
        if (!(controller.factoringDate || controller.params && controller.params.factoringDate)) {
            return controller;
        }
        let date = controller.factoringDate || controller.params.factoringDate;

        if (XnUtils.toDateFromString(date)) {
            if (isNaN(Number(date))) { // 该日历输入非数字
                controller.holidayAlert = '';
                controller.factoringEndAlert = '很抱歉，您需要输入格式为20170731的日期';
                controller.factoringDateTemp = false;
                return controller;
            }

            let week = CalendarData.toDateFromString(date);
            let nextYear = Date.parse(new Date(`${new Date().getFullYear() + 1}/01/01 00:00:00`).toString());
            let beforeYear = Date.parse(new Date('2017/01/01 00:00:00').toString()); // 2017/01/01 00:00:00 以前的日历
            let now = Date.parse(new Date(week).toString()); // 2018/01/01 00:00:00 以后的日历
            if (nextYear <= now || beforeYear > now) {
                let str = this.calcWeek(week.getDay());
                const substr = this.calcQuarterly(date);
                controller.factoringEndAlert = '';
                controller.holidayAlert = '该到期日为' + str + '，' + substr;
                return controller;
            }
        }

        // 计算日期，用mock数据，不与后台进行交互
        CalendarData.getDateInfo(date).subscribe(json => {
            if (!json) {
                controller.holidayAlert = '';
                controller.factoringEndAlert = '很抱歉，您需要输入格式为20170731的日期';
                controller.factoringDateTemp = false;
                return controller;
            }
            controller.factoringEndAlert = '';
            controller.factoringDateTemp = true;
            let str = '';

            str = this.calcWeek(json.week);
            const substr = this.calcQuarterly(date);
            if (json.isWorking === 0) {
                controller.holidayAlert = '该到期日为法定节假日，' + str + '，' + substr + '，下一个工作日为：' + json.dateTime;
            } else if (json.isWorking === 2) { // 特殊处理
                controller.holidayAlert = '该到期日为法定节假日，' + str + '，' + substr;
            } else {
                controller.holidayAlert = '该到期日为工作日，' + str + '，' + substr;
            }
        });
        return controller;
    }


    static computReceiveDay(controller, CalendarData) {// 判断应收账款到期日是否为工作日
        if (!(controller.receiveDate || controller.params && controller.params.receiveDate)) {
            return controller;
        }
        let date = controller.receiveDate || controller.params.receiveDate;
        let enddate = controller.endDate || controller.params.endDate;
        let addDay = controller.addDay;

        if (XnUtils.toDateFromString(date)) {
            let numDate = Number(date.replace(/-/g, ''));
            let numEnddate = Number(enddate.replace(/-/g, ''));
            if (numDate > numEnddate) {
                controller.factoringEndAlert = `贵公司期限是${addDay}天,请选择${enddate}之前的工作日`;
                controller.factoringDateTemp = false;
                controller.holidayAlert = '';
                return controller;
            }
        }

        // 计算日期，用mock数据，不与后台进行交互
        CalendarData.getDateInfo(date).subscribe(json => {
            if (!json) {
                controller.holidayAlert = '';
                controller.factoringEndAlert = '很抱歉，您需要输入格式为20170731的日期';
                //controller.factoringDateTemp = false;
                return controller;
            }
            //controller.factoringDateTemp = true;
            let str = '';

            str = this.calcWeek(json.week);
            const substr = this.calcQuarterly(date);
            if (json.isWorking === 0) {
                controller.holidayAlert = '该到期日为法定节假日，' + str + '，' + substr + '，请选择工作日';
                controller.factoringDateTemp = false;

            } else if (json.isWorking === 2) { // 特殊处理
                controller.holidayAlert = '该到期日为法定节假日，' + str + '，' + substr + '，请选择工作日';
                controller.factoringDateTemp = false;
            } else {
                controller.holidayAlert = '';
                controller.factoringDateTemp = true;

            }
        });
        return controller;
    }
    static calcWeek(week) {
        let str;
        switch (week) {
            case 0:
                str = '星期日';
                break;
            case 1:
                str = '星期一';
                break;
            case 2:
                str = '星期二';
                break;
            case 3:
                str = '星期三';
                break;
            case 4:
                str = '星期四';
                break;
            case 5:
                str = '星期五';
                break;
            case 6:
                str = '星期六';
                break;
        }
        return str;
    }

    // 计算季度的前一周时间
    static calcQuarterly(date1: any) {
        // const date = this.replace(date1);
        const date = this.formString(date1);
        let str = '';
        if (date >= this.formString('20180324') && date <= this.formString('20180331')) {
            // 第一季度
            str = '第一季度最后一周';
        } else if (date >= this.formString('20180623') && date <= this.formString('20180630')) {
            str = '第二季度最后一周';
        } else if (date >= this.formString('20180923') && date <= this.formString('20180930')) {
            str = '第三季度最后一周';
        } else if (date >= this.formString('20181224') && date <= this.formString('20181231')) {
            str = '第四个季度最后一周';
        }
        return str;
    }

    // 日期转为毫秒数
    static dateTimes(date: any) {
        return new Date(date);
    }

    // 将20180702日期格式转为2018-07-02
    static replace(str) {
        return str.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    }

    // 截取字符串的后四位，并转化为number类型
    static formString(str) {
        return parseInt(str.substr(4), 0);
    }

    // 获取URL参数
    static parseUrl(url: string) {
        let name: string, value: string;
        let num: number = url.indexOf('?') > 0 ? url.indexOf('?') : url.indexOf('#');
        if (num < 0) {
            return;
        }
        url = url.substr(num + 1); // 取得所有参数

        let arr: any = url.split('&'); // 各个参数放到数组里
        let obj: any = {};
        for (let i = 0; i < arr.length; i++) {
            num = arr[i].indexOf('=');
            if (num > 0) {
                name = arr[i].substring(0, num).trim();
                value = arr[i].substr(num + 1).trim();
                obj[name] = decodeURI(value);
            }
        }
        return obj;
    }

    // 找出数组中重复的元素
    static findArrayRepeat(arr, label?): any {
        const reps = [];  // 重复的
        const afterReps = []; // 过滤后的
        if (arr.length) {
            if (!!label) {
                for (let i = 0; i < arr.length; i++) {
                    for (let j = i + 1; j < arr.length; j++) {
                        if (!!arr[i][label] && !!arr[j][label] && (arr[i][label] === arr[j][label])) {
                            reps.push(arr[i][label]);
                        }
                    }
                }
            } else {
                for (let i = 0; i < arr.length; i++) {
                    for (let j = i + 1; j < arr.length; j++) {
                        if (arr[i] === arr[j]) {
                            reps.push(arr[i]);
                        } else {
                            afterReps.push(arr[i]);
                        }
                    }
                }
            }
        }
        return { reps, afterReps };
    }

    static distinctArray3(files: any[], id: string) {
        if (!files || files.length === 0) {
            return;
        }
        const hash = {};
        files = files.reduce((item, next) => {
            if (!hash[next[id]] || !next[id]) { // hash不存在 或者不存在发票号
                item.push(next);
                hash[next[id]] = true;
            }
            return item;
        }, []);
        return files;
    }
    // 根据两个字段去重复
    static distinctArrayTwo(files: any[], id: string, id1: string) {
        if (!files || files.length === 0) {
            return;
        }
        const hash = {};
        files = files.reduce((item, next) => {
            if (!hash[next[id]] || !next[id] || !hash[next[id1] || !next[id1]]) { // hash不存在 或者不存在发票号
                item.push(next);
                hash[next[id]] = true;
            }
            return item;
        }, []);
        return files;
    }
    /**
     * 数组去重复
     */
    static distinctArray(files) {
        if (!files || files.length === 0) {
            return;
        }
        let hash = {};
        return files.reduce((item, next) => {
            if (!hash[next]) {
                hash[next] = true;
                item.push(next);
            }
            return item;
        }, []);
    }

    /**
     * 数组去重复
     */
    static distinctArray2(files: any[], id: string) {
        if (!files || files.length === 0) {
            return;
        }
        let hash = {};
        return files.reduce((item, next) => {
            if (!hash[next[id]]) {
                hash[next[id]] = true;
                item.push(next);
            }
            return item;
        }, []);
    }

    // 数组去重
    static arrUnique(arrs, id) {
        const hash = {};
        return arrs.reduce((item, next) => {
            if (!hash[next[id]]) {
                hash[next[id]] = true;
                item.push(next);
            }
            return item;
        }, []);
    }



    /**
     * 检查loading
     */
    static checkLoading(controller) {
        controller.loadingback = true;
        controller.loading.open();

        const check = setInterval(() => {
            controller.loading.checkLoading().subscribe(v => {
                if (v === false) {
                    controller.loadingback = false;
                }
            });
            if (controller.loadingback === false) {
                clearInterval(check);
            }
        }, 1000);

        return controller;
    }

    /**
     * 判断对象是否为空
     * @param paramObj true:为空，false:不为空
     */
    static isEmptyObject(paramObj: Object): boolean {
        return Object.keys(paramObj).length === 0;
    }

    // 排序
    static sortData(data, rule) {
        if (data === '' || data.length === 0) {
            return;
        }
        return data.sort((a, b) => {
            if (a[rule] < b[rule]) {
                return 1;
            } else {
                return -1;
            }
        });
    }

    static brData(data): string {
        data = data.replace(/\n/g, '<br/>');
        return data;
    }

    /**
     * 合同和图片同时去重，有id的为合同，否则为图片
     * @param fileArr
     */
    static uniqueBoth(fileArr): any {
        const hash = {};
        return fileArr.reduce((item, next) => {
            if (!next.id) {
                if (hash[next.fileId]) {
                } else {
                    hash[next.fileId] = true;
                    item.push(next);
                }
            } else {
                if (hash[next.id]) {
                } else {
                    hash[next.id] = true;
                    item.push(next);
                }
            }
            return item;
        }, []);
    }

    /**
     * 流程处理操作  / 如果该交易flowId 为SpecialFlows中存在项则，则路径为 /console/record/avenger/todo/view/${record.recordId}
     * @param record 流程记录信息
     * @param xn
     */
    static doProcess(record: any, xn: any) {
        const isAvenger: boolean = SpecialFlows.some(flow => flow.flowId === record.flowId);
        // 流程已完成 或者账号没有权限查看流程
        if ((record.status !== 1 && record.status !== 0)
            || !XnUtils.getRoleExist(record.nowRoleId, xn.user.roles, record.proxyType)) {
            if (record.proxyType === undefined) {
                xn.router.navigate([`/console/record/todo/view/${record.recordId}`]);
            } else {
                xn.router.navigate([ViewflowSet[record.proxyType] + record.recordId]);

            }
            // record.proxyType > 0 ? xn.router.navigate([`/console/record/avenger/todo/view/${record.recordId}`])
            //     : xn.router.navigate([`/console/record/todo/view/${record.recordId}`]);
        } else {

            if (record.flowId === 'financing7'
                || record.flowId === 'financing_bank7'
                || record.flowId.indexOf('financing_factoring7') >= 0
                || record.flowId.indexOf('financing_supplier7') >= 0) {
                // 银行流程（保证付款 + 商品融资）
                xn.router.navigate([`/console/bank/record/todo/edit/${record.recordId}`]);
            } else if (record.flowId === 'yajule_add_contract') {
                // todo 特殊处理，雅居乐供应商补充协议 直接跳转签署合同页面
                xn.router.navigate([`/console/record/supplier_sign/${record.mainFlowId}`]);
            } else {
                if (record.proxyType === undefined) {
                    xn.router.navigate([`/console/record/todo/view/${record.recordId}`]);
                } else {
                    if (record.flowId === 'dragon_platform_verify' && record.zhongdengStatus === 1) {
                        xn.msgBox.open(false, '该流程中登登记处于登记中,不可处理');
                        return;
                    } else if(record.flowId === 'sub_dragon_book_change'){
                        //台账修改预录入
                        xn.router.navigate(['/machine-account/record/sub_dragon_book_change/edit/' + record.recordId]);
                    } else if (record.flowId === 'sub_bank_push_supplier_sign' || record.flowId === 'sub_bank_push_platform_sign'|| record.flowId === 'sub_bank_platform_add_file'|| record.flowId === 'sub_bank_platform_change_file') {
                        xn.router.navigate(['/console/bank-puhuitong/record/edit/' + record.recordId]);
                    } else {
                        xn.router.navigate([EditflowSet[record.proxyType] + record.recordId]);
                    }

                }
            }
        }
    }

    static transFormFilesConData(data): any[] {
        if (!data) {
            return [];
        }
        if (typeof data === 'string') {
            try {
                return JSON.parse(data);
            } catch (e) {
                return [];
            }
        } else {
            return JSON.parse(JSON.stringify(data));
        }
    }

    /**
     *  json 字符串转换
     * @param paramValue
     */
    static jsonTostring(paramValue: any): any {
        let str = '';
        if (!XnUtils.isEmpty(paramValue)) {
            str = typeof paramValue === 'string' ? JSON.parse(paramValue) : paramValue;
        }
        return str;

    }

    static getRoleExist(nowRoleId: string, userRoles: any, proxyType?: number) {
        // if (proxyType === 0) {
        return userRoles.includes(nowRoleId);
    }

    // let nowRoleIds = [];
    // try {
    //     nowRoleIds = JSON.parse(nowRoleId);
    // } catch (e) {
    //     console.error(nowRoleId);
    //     nowRoleIds.push(nowRoleId);
    // }
    // for (let role of nowRoleIds) {
    //     if (userRoles.includes(role)) {
    //         return true;
    //     }
    // }
    // return false;


    /**
     *  判断输入的字符都为全角
     * @param paramValue
     */
    static fullOrHalf(paramValue: string): boolean {
        let res: boolean = true;
        for (let i = 0; i < paramValue.length; i++) {
            if (paramValue.charCodeAt(i) <= 128) {
                res = false;
                break;
            }
        }
        return res;
    }
}
enum EditflowSet {
    '/console/record/todo/edit/' = 0,
    '/console/record/avenger/todo/edit/' = 1,
    '/dragon/record/todo/edit/' = 2,
}
enum ViewflowSet {
    '/console/record/todo/view/' = 0,
    '/console/record/avenger/todo/view/' = 1,
    '/dragon/record/todo/view/' = 2,
}
