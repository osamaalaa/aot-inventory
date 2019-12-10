import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ItemsService } from 'src/app/services/items.service'
import { UIService } from 'src/app/services/ui.service'

@Component({
  selector: 'app-edit-item-template',
  templateUrl: './edit-item-template.component.html',
  styleUrls: ['./edit-item-template.component.scss'],
})
export class EditItemTemplateComponent implements OnInit {
  itemTemplateData: any

  ITEMS_TEMPLATE_ID: string | number

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemsService,
    private ui: UIService,
    private router: Router,
  ) {
    this.getItemTemplateData()
    this.getItemTemplateId()
  }

  ngOnInit() {}

  /** Get item alias id from route param */
  getItemTemplateId(): void {
    this.ITEMS_TEMPLATE_ID = this.route.snapshot.params['ITEMS_TEMPLATE_ID']
  }

  /** Get Edit data from resolver */
  getItemTemplateData() {
    let formData = this.route.snapshot.data['itemTemplateData'].rows[0]
    formData.STATUS = formData.STATUS ? formData.STATUS.toString() : formData.STATUS;
    formData.FOR_SALE = formData.FOR_SALE == 1 ? true : false //parsing for FOR_SALE checkbox
    this.itemTemplateData = formData
  }

  /** Update Item template form */
  updateItemTemplate(formData: any) {
    this.itemService.updateItemTemplate(this.ITEMS_TEMPLATE_ID, formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Updated item template')
        this.navigateToList()
      },
      error => this.ui.createMessage('error', 'Error while adding item template'),
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }
}
