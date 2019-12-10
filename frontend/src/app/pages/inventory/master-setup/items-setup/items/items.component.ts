import { Component, OnInit, Input, ViewChild, TemplateRef, ElementRef } from '@angular/core'
import { ItemsService } from '../../../../../services/items.service'
import { Router, ActivatedRoute } from '@angular/router'
import { UIService } from 'src/app/services/ui.service';
import { ColumnDef } from 'src/app/lib/DynamicTable/interfaces/ColumnDef';
import { NzDrawerService } from 'ng-zorro-antd';
import { ItemViewComponent } from './items-view.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { CONSTANTS } from 'src/app/services/constants.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {

  headers = headers;
  apiPath = apiPath;
  searchText;
  nzTitle

  // @ViewChild('buttonPro') buttonPro:TemplateRef<any>;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemsService: ItemsService,
    private ui: UIService,
    private drawerService: NzDrawerService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.onLangugateChange();
    this.fetchCurrentLanguage()
  }

  lang;
  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang
    })
  }

  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }


  @ViewChild('tablePro') table;
  /** Deletes item  */
  deleteItem(ITEMS_ID: number | string): void {
    this.itemsService.deleteItem(ITEMS_ID).subscribe(
      data => {
        this.ui.createMessagedelete('success1', 'Item deleted successfully')
        // this.fetchData();
        this.table.fetchDataList()
      },
      error => this.ui.createMessage('error', 'Error while deleting template'),
    )
  }

  view(ITEMS_ID: string | number) {
    this.router.navigate([ITEMS_ID], {
      relativeTo: this.route
    })
  }

  onRowClick(e) {
    console.log(e)

    const drawerRef = this.drawerService.create<ItemViewComponent, { data: Object }, string>({
      nzTitle: this.lang == 'ar' ? 'بيانات الصنف' : 'Item Detail',
      nzContent: ItemViewComponent,
      nzContentParams: {
        data: e
      },
      nzWidth: 720
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log(data);
      if (typeof data === 'string') {
      }
    });
  }


  openAddItemForm() {

    const drawerRef = this.drawerService.create<ItemFormComponent, { data: Object }, string>({
      nzTitle: this.lang == 'ar' ? 'بيانات الصنف' : 'Item Detail',
      nzContent: ItemFormComponent,
      nzContentParams: {
        data: ""
      },
      nzWidth: 720
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      if (data) {
        this.itemsService.insertnewitem(data).subscribe(
          result => {
            this.ui.createMessage('success', 'Added item');
            this.itemsService.insertItemAlias({
              ITEMS_ID: result.rows.R_ITEMS_ID,
              SUBSIDIARY_ID: CONSTANTS.SUBSIDIARY_ID,
              ITEM_CODE: data['ITEM_CODE'],
              DEFAULT_ALIASES: 1,
              ALIASES_TYPE_ID: data['ALIASES_TYPE_ID'],
              CREATED_BY: CONSTANTS.CREATED_BY
            }).subscribe()
            this.table.fetchDataList()
          }, error => {
            this.ui.createMessage("error", error && error.error ? error.error.message : '')
          },
        )
      }
      console.log(data);

    });
  }

  openEdit(rowData) {
    const drawerRef = this.drawerService.create<ItemFormComponent, { formData: Object }, string>({
      nzTitle: 'Item',
      nzContent: ItemFormComponent,
      nzContentParams: {
        formData: rowData
      },
      nzWidth: 720
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log(data);
      this.table.fetchDataList()
    });
  }
}



const headers: ColumnDef[] = [
  {
    label: {
      en_name: "Item Code",
      ar_name: "معرف العنصر"
    },
    name: {
      en_name: "ITEM_CODE",
      ar_name: "ITEM_CODE"
    },
    sortable: true
  },
  {
    label: {
      en_name: "Name",
      ar_name: "اسم"
    },
    name: {
      en_name: "EN_NAME",
      ar_name: "AR_NAME"
    },
    sortable: true
  },
  {
    label: {
      en_name: "Item Group",
      ar_name: "أسم المجموعة"
    },
    name: {
      en_name: "GROUP_EN_NAME",
      ar_name: "GROUP_AR_NAME"
    }
  },
  {
    label: {
      en_name: "Kind Name",
      ar_name: "اسم النوع"
    },
    name: {
      en_name: "KIND_NAME",
      ar_name: "KIND_NAME"
    }
  },
  {
    label: {
      en_name: "Class Name",
      ar_name: "اسم الصف"
    },
    name: {
      en_name: "CLASS_NAME",
      ar_name: "CLASS_NAME"
    }
  },
  {
    label: {
      en_name: "Status",
      ar_name: "اسم"
    },
    name: {
      en_name: "STATUS",
      ar_name: "STATUS"
    },
    type: "status"
  },

];


const apiPath: string = "/items/getallitems/";