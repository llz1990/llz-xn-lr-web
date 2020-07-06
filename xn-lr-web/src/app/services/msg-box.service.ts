import { Injectable } from '@angular/core';
import { isArray } from 'util';

declare let $: any;

@Injectable()
export class MsgBoxService {

    private dom: any;
    private shown = false;

    private isYesNo: boolean;
    private msg: string | string[];
    private yesOkCallback: Function;
    private noCallback: Function;

    constructor() {
        // 构造model
        this.dom = {};
        this.dom.content = $(
            `<div class="modal" style="z-index: 1060;">
              <div class="modal-dialog" style="position: absolute; top: 50%;">
                <div class="modal-content">
                  <div class="modal-body xn-msgbox-msg" style="position: relative;min-height: 100px;max-height:400px;overflow: auto;
              }">
                    <span></span>
                  </div>
                  <div class="modal-footer">
                    <button class="btn btn-default xn-btn-no">取消</button>
                    <button class="btn btn-primary xn-btn-yes">确定</button>
                  </div>
                </div>
              </div>
            </div>`
        );

        $(this.dom.content).on('click', 'button.xn-btn-yes', e => {
            e.preventDefault();
            this.close();
            this.onYes();
        });

        $(this.dom.content).on('click', 'button.xn-btn-no', e => {
            e.preventDefault();
            this.close();
            this.onNo();
        });
    }

    open(isYesNo: boolean, msg: string | string[], yesOkCallback?: Function, noCallback?: Function): void {
        if (this.shown) {
            console.log(`msgbox already shown, so return`);
            return;
        }

        this.isYesNo = isYesNo;
        this.msg = msg;
        this.yesOkCallback = yesOkCallback;
        this.noCallback = noCallback;

        if (isYesNo) {
            this.dom.content.find('button.xn-btn-no').show();
        } else {
            this.dom.content.find('button.xn-btn-no').hide();
        }

        if (isArray(msg)) {
            this.dom.content.find('.modal-body span').html((<string[]>msg).join('<br>'));
        } else {
            this.dom.content.find('.modal-body span').text(msg);
        }


        this.shown = true;
        $(this.dom.content)
            .one('shown.bs.modal', () => {
                // console.log(`one shown.bs.modal`);
            })
            .one('hidden', () => {
                // console.log(`one hidden`);
                this.shown = false;
            })
            .appendTo('body')
            .modal({
                backdrop: 'static',
                keyboard: false
            });
    }

    close(): void {
        if (!this.shown) {
            return;
        }

        $(this.dom.content)
            .one('hidden.bs.modal', (e) => {
                e.preventDefault();
                $(e.target).detach();
            })
            .modal('hide');

        this.shown = false;
    }

    showChangeText(data) {
        $('.xn-msgbox-msg span').text(data);

    }
    protected onYes(): void {
        if (this.yesOkCallback) {
            this.yesOkCallback();
        }
    }

    protected onNo(): void {
        if (this.noCallback) {
            this.noCallback();
        }
    }
}
