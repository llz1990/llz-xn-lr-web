import {Component, OnInit} from '@angular/core';
import {DataTable} from '../../../../../src/app/common/data-table';
import {XnService} from '../../../../../src/app/services/xn.service';

declare let $: any;

class FlowDataTable extends DataTable {
    protected buildTableColumns(): any[] {
        let columns = super.buildTableColumns();
        let last = columns[columns.length - 1];
        last.defaultContent += '&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" class="editor_children">查看步骤</a>';
        last.width = '160px';

        return columns;
    }
}

class ProcedureDataTable extends DataTable {
    flowId: string;

    protected buildTableColumns(): any[] {
        let columns = super.buildTableColumns();
        let last = columns[columns.length - 1];
        last.defaultContent += '&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" class="editor_children">查看检查项</a>';
        last.width = '160px';

        return columns;
    }
}

@Component({
    templateUrl: './flow.component.html',
    styles: []
})
export class FlowComponent implements OnInit {

    private flowTable: FlowDataTable;
    private procedureTable: ProcedureDataTable;
    private checkerTable: DataTable;

    flowTitle = '所有流程';
    procedureTitle = '点击流程的"查看步骤"会显示具体步骤';
    checkerTitle = '点击步骤的"查看检查项"会显示具体检查项';

    constructor(private xn: XnService) {
    }

    ngOnInit() {
        this.flowTable = new FlowDataTable(this.xn, '#flowTable', 'flow');
        $('#flowTable').off('click', 'a.editor_children');
        $('#flowTable').on('click', 'a.editor_children', e => this.onSelectFlow(e));
    }

    private onSelectFlow(e) {
        e.preventDefault();
        let data = this.flowTable.datatable.row($(e.target).closest('tr')).data();
        console.log(data);

        this.procedureTitle = `<${data.flowName}>的具体步骤`;
        if (this.procedureTable) {
            this.procedureTable.destroy();
        }
        this.procedureTable = new ProcedureDataTable(this.xn, '#procedureTable', 'procedure', {
            where: {
                flowId: data.flowId
            }
        });
        this.procedureTable.flowId = data.flowId;
        $('#procedureTable').off('click', 'a.editor_children');
        $('#procedureTable').on('click', 'a.editor_children', e => this.onSelectProcedure(e));

        this.checkerTitle = '点击步骤的"查看检查项"会显示具体检查项';
        if (this.checkerTable) {
            this.checkerTable.destroy();
            this.checkerTable = null;
            $('#checkerTable').hide();
        }
    }

    private onSelectProcedure(e) {
        e.preventDefault();
        let data = this.procedureTable.datatable.row($(e.target).closest('tr')).data();
        console.log(`onSelectProcedure`);
        console.log(data);
        console.log(this);

        this.checkerTitle = `<${data.procedureName}>的具体检查项`;
        if (this.checkerTable) {
            this.checkerTable.destroy();
        }
        this.checkerTable = new DataTable(this.xn, '#checkerTable', 'checker', {
            where: {
                flowId: this.procedureTable.flowId,
                procedureId: data.procedureId
            }
        });
    }
}
