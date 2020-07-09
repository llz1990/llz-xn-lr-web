import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicForm } from '../../dynamic.decorators';

@Component({
    template: `
    <div style='width:100%'>
    <table class="table table-bordered table-hover file-row-table" width="100%">
    <thead>
    <tr>
      <th>{{label}}</th>
    </tr>
    </thead>
  </table>
    </div>
    `,
    //styleUrls: ['../../show-dragon-input.component.css']
})

@DynamicForm({ type: 'money', formModule: 'default-show' })
export class DragonShowMoneyComponent implements OnInit {
    @Input() row: any;
    @Input() form: FormGroup;

    label: any;

    constructor() {
    }

    ngOnInit() {
        this.label = this.row.data;
    }
}
