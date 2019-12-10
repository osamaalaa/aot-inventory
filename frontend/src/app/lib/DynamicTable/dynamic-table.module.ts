import { NgModule } from "@angular/core";
import { DynamicTableComponent } from './dynamic-table.component';
import { NzTableModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { DynamicTableService } from './dynamic-table.service';
import { StatusCellRenderer } from './cell-renderers/status-cell-renderer.component';
import { CellRendererFactory } from './cell-renderers/cell-renderer-factory.component';
import { DefaultCellRenderer } from './cell-renderers/default-cell-renderer.component';
import { DateCellRenderer } from './cell-renderers/date-renderer.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared.module';

const CELL_RENDERER_COMPONENTS = [StatusCellRenderer,CellRendererFactory,DefaultCellRenderer,DateCellRenderer]
@NgModule({
    imports:[SharedModule],
    declarations:[DynamicTableComponent,...CELL_RENDERER_COMPONENTS],
    exports:[DynamicTableComponent],
    providers:[DynamicTableService]
})
export class DynmaicTableModule{}