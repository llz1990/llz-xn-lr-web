import {Component, OnDestroy, Input, Output, EventEmitter, ElementRef, HostBinding} from '@angular/core';
import {ModalInstance, ModalResult} from './modal-instance';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'modal',
    host: {
        'class': 'modal',
        'role': 'dialog',
        'tabindex': '-1'
    },
    template: `
        <div class="modal-wrap">
            <div class="modal-dialog" [ngClass]="getCssClasses()">
                <div class="modal-content">
                    <ng-content></ng-content>
                </div>
            </div>
        </div>
    `,
})
export class ModalComponent implements OnDestroy {

    private overrideSize: string = null;

    instance: ModalInstance;
    visible: boolean = false;

    @Input() animation = true;
    @Input() backdrop: string | boolean = true;
    @Input() keyboard = true;
    @Input() size: string;
    @Input() cssClass = '';

    @Output() onClose: EventEmitter<any> = new EventEmitter(false);
    @Output() onDismiss: EventEmitter<any> = new EventEmitter(false);
    @Output() onOpen: EventEmitter<any> = new EventEmitter(false);

    @HostBinding('class.fade') get fadeClass(): boolean {
        return this.animation;
    }

    @HostBinding('attr.data-keyboard') get dataKeyboardAttr(): boolean {
        return this.keyboard;
    }

    @HostBinding('attr.data-backdrop') get dataBackdropAttr(): string | boolean {
        return this.backdrop;
    }

    constructor(public element: ElementRef) {
        this.instance = new ModalInstance(this.element);

        this.instance.hidden.subscribe((result) => {
            this.visible = this.instance.visible;
            if (result === ModalResult.Dismiss) {
                this.onDismiss.emit(undefined);
            }
        });

        this.instance.shown.subscribe(() => {
            this.onOpen.emit(undefined);
        });
    }

    ngOnDestroy() {
        if (this.instance) {
            // 需要subscribe，让instance把appendTo body的元素remove掉
            this.instance.destroy().subscribe(() => {
            });
        }
    }

    routerCanDeactivate(): any {
        return this.ngOnDestroy();
    }

    open(size?: string): Observable<void> {
        if (ModalSize.validSize(size)) {
            this.overrideSize = size;
        }
        return this.instance.open().map(() => {
            this.visible = this.instance.visible;
        });
    }

    close(value?: any): Observable<void> {
        return this.instance.close().map(() => {
            this.onClose.emit(value);
        });
    }

    dismiss(): Observable<void> {
        return this.instance.dismiss().map(() => {
        });
    }

    getCssClasses(): string {
        let classes: string[] = [];

        if (this.isSmall()) {
            classes.push('modal-sm');
        }

        if (this.isLarge()) {
            classes.push('modal-lg');
        }

        if (this.isXLarge()) {
            classes.push('modal-xlg');
        }
        if (this.isXXLarge()) {
            classes.push('modal-xxlg');
        }

        if (this.cssClass !== '') {
            classes.push(this.cssClass);
        }

        return classes.join(' ');
    }

    private isSmall() {
        return this.overrideSize !== ModalSize.Large && this.overrideSize !== ModalSize.XLarge && this.overrideSize !== ModalSize.XXLarge
            && this.size === ModalSize.Small
            || this.overrideSize === ModalSize.Small;
    }

    private isLarge() {
        return this.overrideSize !== ModalSize.Small && this.overrideSize !== ModalSize.XLarge && this.overrideSize !== ModalSize.XXLarge
            && this.size === ModalSize.Large
            || this.overrideSize === ModalSize.Large;
    }

    private isXLarge() {
        return this.overrideSize !== ModalSize.Small && this.overrideSize !== ModalSize.Large && this.overrideSize !== ModalSize.XXLarge
            && this.size === ModalSize.XLarge
            || this.overrideSize === ModalSize.XLarge;
    }

    private isXXLarge() {
        return this.overrideSize !== ModalSize.Small && this.overrideSize !== ModalSize.Large && this.overrideSize !== ModalSize.XLarge
            && this.size === ModalSize.XXLarge
            || this.overrideSize === ModalSize.XXLarge;
    }
}

export class ModalSize {
    static Small = 'sm';
    static Large = 'lg';
    static XLarge = 'xlg';
    static XXLarge = 'xxlg';

    static validSize(size: string) {
        return size && (size === ModalSize.Small || size === ModalSize.Large || size === ModalSize.XLarge || size === ModalSize.XXLarge);
    }
}
