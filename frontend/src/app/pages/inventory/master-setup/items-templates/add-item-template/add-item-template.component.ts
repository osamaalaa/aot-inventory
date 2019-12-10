import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { ItemsService } from 'src/app/services/items.service'
import { UIService } from 'src/app/services/ui.service'

@Component({
  selector: 'app-add-item-template',
  templateUrl: './add-item-template.component.html',
  styleUrls: ['./add-item-template.component.scss'],
})
export class AddItemTemplateComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemsService,
    private ui: UIService,
  ) {}

  ngOnInit() {}

  /** On Add Template */
  addItemTemplate(formData): void {
    this.itemService.insertItemTemplate(formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Added item template')
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
