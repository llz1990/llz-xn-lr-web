import {Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {ModalComponent, ModalSize} from '../../common/modal/components/modal';
import {Observable} from 'rxjs/Observable';
import {XnService} from '../../services/xn.service';
import {FormGroup} from '@angular/forms';
import {XnFormUtils} from '../../common/xn-form-utils';

@Component({
    templateUrl: './article-add-modal.component.html',
    styles: [

        `.panel { margin-bottom: 0 }`,
        `.form-group .input { height: 28px; line-height: normal }`,
        `.button-list { margin-bottom: 10px; position: relative;}`,
        `.editor { height: 300px; border: 1px solid #ddd; border-radius: 5px; overflow-y: scroll}`,
        `@media (min-width: 768px){ .col-sm-3 {width: 20%;} }`,
        `.btn-file { position: relative }`,
        `.photo-input { position: absolute; left: 0; top: 0; width: 100%; height: 100%; cursor: pointer}`,
        `.title { width: 100%; outline: none; background: none;}`,
        // 滚动条改造
        `.editor::-webkit-scrollbar {width: 10px; height: 10px;}`,
        `.editor::-webkit-scrollbar-track,.editor::-webkit-scrollbar-thumb {border-right: 1px solid transparent; border-left: 1px solid transparent; }`,
        `.editor::-webkit-scrollbar-button:start:hover{background-color:#eee;}`,
        `.editor::-webkit-scrollbar-button:end{background-color:#eee;}`,
        `.editor::-webkit-scrollbar-thumb {-webkit-border-radius: 8px; border-radius: 8px; background-color: rgba(0, 0, 0, 0.2);}`,
        `.editor::-webkit-scrollbar-corner {display: block;}`,
        `.editor::-webkit-scrollbar-track:hover {background-color: rgba(0, 0, 0, 0.15);}`,
        `.editor::-webkit-scrollbar-thumb:hover { -webkit-border-radius: 8px; border-radius: 8px; background-color: rgba(0, 0, 0, 0.5);}`,

        `.editor-modal{position:absolute;top:45px;left:50px;background:#fff;padding:10px;box-shadow:2px 2px 3px 3px #999;border-radius:5px;}`,
        `.editor-link-input{padding: 0 10px;height: 25px;border-radius: 5px;border: 1px solid #d9d9d9;}`,
        `.editor-confirm{background: #2489C5;color: #fff;border: none;padding: 0 10px;height: 25px;border-radius: 5px;}`,
        `.editor-confirm:active{opacity:.8;}`,
        `.re-editor a{color:#2489C5;cursor:pointer;}`,
        `.re-editor p {font-size: 16px;line-height: 30px;}`,
        `.editor-input { float: left; margin-right: 5px; }`,
        `.editor-group { margin-bottom: 5px; }`,
        `.link-radio { margin-right: 10px; font-weight: normal}`,

        `.ke-dialog{display: block;width: 458px;position: absolute;z-index: 10;left: 50px;top: 45px;height: 385px;box-shadow: 2px 2px 3px 3px #999;border-radius: 5px;}`,
        `.ke-dialog-content{background-color: #FFF;width: 100%;height: 100%;color: #333;border: 1px solid #A0A0A0;}`,
        `.ke-dialog-header{border: 0;margin: 0;padding: 0 10px;border-bottom: 1px solid #CFCFCF;height: 24px;font: 12px/24px "sans serif",tahoma,verdana,helvetica;text-align: left;color: #222;cursor: move;}`,
        `.ke-dialog-body {font: 12px/1.5 "sans serif",tahoma,verdana,helvetica;text-align: left;overflow: hidden;width: 100%;}`,
        `.ke-textarea{width: 460px; height: 260px}`,
        `.dialog-inner{padding: 10px 20px;}`,
        `.dialog-title{margin-bottom: 20px;}`,
        `.ke-dialog-body .ke-textarea{display: block; width: 408px;height: 260px;resize: none;font-family: "sans serif",tahoma,verdana,helvetica;font-size: 12px;border:1px solid #848484;}`,
        `.ke-dialog-footer{font: 12px/1 "sans serif",tahoma,verdana,helvetica;text-align: right;padding: 0 0 5px 0;background-color: #FFF;width: 100%;}`,
        `.ke-button-outer{background-position: 0 -25px;padding: 0;display: -moz-inline-stack;display: inline-block;vertical-align: middle;zoom: 1;}`,
        `.ke-button-common{cursor: pointer;height: 23px;overflow: visible;display: inline-block;vertical-align: top;cursor: pointer;}`,
        `.ke-dialog-preview, .ke-dialog-yes {margin: 5px;}`,
        `.ke-dialog-no {margin: 5px 20px 5px 0px;}`
    ]
})
export class ArticleAddModalComponent implements OnInit, AfterViewInit {

    @Input() row: any;
    @Input() form: FormGroup;
    @ViewChild('modal') modal: ModalComponent;
    @ViewChild('editor') editor: ElementRef;
    @ViewChild('file') file: ElementRef;
    @ViewChild('KeTextArea') KeTextArea: ElementRef;

    private observer: any;

    params: any = {};
    steped = 0;
    rows: any[] = [];
    shows: any[] = [];
    mainForm: FormGroup;
    formValid = false;
    files: any[];
    articalParams: any = {};
    title = '';
    content = '';
    link: any = {};
    showLink = false;
    showTextArea = false;
    selections: any = {};
    selectedRange: any;
    linkValue = false;
    linkRadio = 'yes';  // 初始化默认为yes
    targetlinkTemp = '';

    constructor(private xn: XnService) {
    }

    ngOnInit() {
        this.initEditor();
        this.clearLinkEditor();
        this.initSelections();
    }

    ngAfterViewInit() {
        this.initLinkValue();
    }

    open(params: any): Observable<string> {

        this.articalParams.columnId = params.columnId;
        this.modal.open(ModalSize.XLarge);

        // 处理数据
        this.shows = [];

        this.shows.push({
            name: 'coverPhoto',
            type: 'file',
            require: true,
            title: '封面图片',
            validators: false,
            memo: '类型jpg， 最佳尺寸396*273'
        });

        this.shows.push({
            name: 'attachments',
            type: 'mfile',
            require: false,
            title: '附件',
            validators: false
        });

        this.mainForm = XnFormUtils.buildFormGroup(this.shows);

        this.mainForm.valueChanges.subscribe((v) => {
            this.formValid = this.mainForm.valid;
        });

        this.formValid = this.mainForm.valid;

        return Observable.create(observer => {
            this.observer = observer;
        });
    }

    private close(value) {
        this.modal.close();
        this.observer.next(value);
        this.observer.complete();
    }

    cssClass(step): string {
        if (step === this.steped) return 'current';
        if (step > this.steped) return 'disabled';
        else return 'success';
    }

    checkValid() {
        if (this.mainForm && this.mainForm.value) {
            const htmlData = $(this.editor.nativeElement).html();
            this.articalParams.content = htmlData;
            // 有可能存在空格，导致无法判断内容为空
            let tempData = htmlData;
            tempData = tempData.replace(/^\s+|\s+$/g, ''); // 去除开头结尾的任何不可见字符
            if (this.mainForm.value.coverPhoto === '' || this.articalParams.title === '' || tempData === '') {
                return true;
            } else if (!this.mainForm.value.coverPhoto || !this.articalParams.title || !tempData) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    onOk() {

    }

    onSubmit() {
        let htmlData = $(this.editor.nativeElement).html();
        this.articalParams.content = htmlData;

        // 有可能存在空格，导致无法判断内容为空
        let tempData = htmlData;
        tempData = tempData.replace(/^\s+|\s+$/g, ''); // 去除开头结尾的任何不可见字符
        if (tempData === '') {
            this.xn.msgBox.open(false, '很抱歉，您需要填写内容', () => {

            });
            return false;
        }

        this.articalParams.attachments = this.mainForm.value.attachments;
        this.articalParams.coverPhoto = this.mainForm.value.coverPhoto;

        this.xn.api.post('/portalsite/insert_article', this.articalParams).subscribe(json => {
            this.params.createTime = json.data.creatTime;
            this.params.title = this.articalParams.title;
            this.params.content = this.articalParams.content;
            this.params.attachments = this.articalParams.attachments;
            this.params.coverPhoto = this.articalParams.coverPhoto;
            this.params.columnId = this.articalParams.columnId;
            this.params.id = json.data.id;

            this.close(this.params);
        });
    }

    changeText(param) {
        this.selections.restoreSelection();
        $(this.editor.nativeElement).focus();
        document.execCommand(param, false, null);
    }

    // 这里也是一个坑，change函数会使input-file打开过慢，用一个假的click处理一下
    beforeUploadPhoto(e: any) {
        $(this.file.nativeElement).focus();
    }

    uploadPhoto(e: any) {
        this.selections.restoreSelection();
        $(this.editor.nativeElement).focus();
        if (e.target.files.length === 0) {
            return;
        }

        let files = e.target.files;
        let file = null;
        let url = null;
        if (files && files[0].size / 1024 / 1024 > 80) {
            this.xn.msgBox.open(false, '很抱歉，您允许上传的图片不能超过80M，谢谢');
            return;
        }

        if (files && files.length > 0) {
            file = files[0];
            try {
                let fileReader = new FileReader();
                fileReader.onload = (e: any) => {
                    url = e.target.result;
                    this.xn.api.post('/attachment/image/upload', {
                        data: url
                    }).subscribe(v => {
                        let img = '<img src="' + v.data.url + '" style="max-width: 100%"/>';
                        document.execCommand('insertHTML', false, img);
                    });
                };
                fileReader.readAsDataURL(file);
            } catch (e) {

            }
        }
    }

    getLink() {
        if (!this.link.title || !this.link.ref) {
            return;
        }


        let targetlink = '';
        (this.linkRadio === 'yes') ? targetlink = '_self' : targetlink = '_blank';
        this.targetlinkTemp = targetlink;
        this.selections.restoreSelection();
        // 必须触发该控件，不然鼠标会跑到别的地方去
        $(this.editor.nativeElement).focus();

        if (this.link && this.link.ref && this.link.title) {
            let html = '<a href="' + this.link.ref + '" target = "' + this.targetlinkTemp + '">' + this.link.title + '</a>';
            document.execCommand('insertHTML', false, html);
        }
        this.showLink = false;
    }

    addLink(e) {
        this.selections.restoreSelection();
        this.showLink === false ? this.showLink = true : this.showLink = false;
        this.selections.saveSelection();
        e.stopPropagation();
    }

    editorClick(e) {   // 这里是弹框内部，编辑时候不触发页面点击
        e.stopPropagation();
    }

    linkEditor = () => {
        if (this.showLink === true) {
            this.showLink = false;
        }
    };

    pasteEditor = () => {
        if (this.showTextArea === true) {
            this.showTextArea = false;
        }
    };

    clearLinkEditor() {
        // 这里有一个坑，不能用document.onclick！！！不然要点击两次才能让弹窗消失，应用监听函数没有问题！
        document.addEventListener('click', this.linkEditor, false);
        document.addEventListener('click', this.pasteEditor, false);
    }

    eventKeyUp = () => {
        this.selections.saveSelection();
    };

    eventMouseUp = () => {
        this.selections.saveSelection();
    };

    initEditor() {
        // 监听函数抽取开来，才可以解绑
        this.editor.nativeElement.addEventListener('keyup', this.eventKeyUp, false);
        this.editor.nativeElement.addEventListener('mouseup', this.eventMouseUp, false);
    }

    initSelections() {
        this.selections = {
            getCurrentRange: () => {
                // 获取当前range
                if (window.getSelection) {
                    // 使用 window.getSelection() 方法获取鼠标划取部分的起始位置和结束位置
                    let sel = window.getSelection();
                    if (sel.rangeCount > 0) {
                        // 通过selection对象的getRangeAt方法来获取selection对象的某个Range对象
                        return sel.getRangeAt(0);
                    }
                }
                return null;
            },
            saveSelection: () => {
                this.selectedRange = this.selections.getCurrentRange();
            },
            restoreSelection: () => { // 重置为上个range
                let selection = window.getSelection();
                if (this.selectedRange) {
                    try {
                        selection.removeAllRanges();
                    }
                    finally {

                    }
                    selection.addRange(this.selectedRange);
                }
            }
        };
    }

    initLinkValue() {
        // (!this.link.title || !this.link.ref ) ? this.linkValue = false : this.linkValue = true;
        if (!this.link.title || !this.link.ref) {
            this.linkValue = false;
        } else {
            this.linkValue = true;
        }
    }

    editorActive() {
        console.log('editorActive');
    }

    addPaste(e) {
        this.selections.restoreSelection();
        this.showTextArea === false ? this.showTextArea = true : this.showTextArea = false;
        this.selections.saveSelection();
        e.stopPropagation();
    }

    textAreaClick(e) {
        e.stopPropagation();
    }

    submitTextArea() {
        let textAreaData = $(this.KeTextArea.nativeElement).val();
        if (textAreaData === '') {
            this.showTextArea = false;
            return;
        }

        this.selections.restoreSelection();
        // 必须触发该控件，不然鼠标会跑到别的地方去
        $(this.editor.nativeElement).focus();

        let html = textAreaData;
        html = this.escape(html);
        html = html.replace(/ {2}/g, ' &nbsp;');
        // 这里是当textarea有换行的时候，复制为纯文本会去掉换行，这里给加上p标签，就会换行了。
        html = html.replace(/^/, '<p>').replace(/$/, '</p>').replace(/\n/g, '</p><p>');

        document.execCommand('insertHTML', false, html);

        this.showTextArea = false;
    }

    escape(val) {
        return val.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
}
