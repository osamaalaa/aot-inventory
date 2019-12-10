import { Component, OnInit, Injector, INJECTOR } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute } from '@angular/router';
import { UploadFile, UploadXHRArgs } from 'ng-zorro-antd';
import { HttpHeaders, HttpRequest, HttpEvent, HttpEventType, HttpResponse, HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ItemsService } from 'src/app/services/items.service';
import { ItemMainService } from '../items-main.service';


@Component({
  selector: 'app-item-image-upload',
  templateUrl: './item-image-upload.component.html',
  styleUrls: ['./item-image-upload.component.scss']
})
export class ItemImageUploadComponent implements OnInit {
  ITEMS_ID:string;

  get background() {
    return this.fileList.length ? (this.fileList[0].url || this.fileList[0].thumbUrl) : 'assets/images/photos/4.jpeg'
  }

  public static  instance:any;

  constructor(
    private ui:UIService,
    private route:ActivatedRoute,
    public handler:HttpBackend,
    private itemsService:ItemsService,
    private itemMainService:ItemMainService
  ) { 
    ItemImageUploadComponent.instance = this;
  }

  ngOnInit() {
    this.getItemId();
    this.getAllImagesForItem();

  }

  getAllImagesForItem() {

    
    this.fileList = this.route.snapshot.data['itemImages'].rows
      .map(img => {
        return {
          uid: img.ITEMS_IMAGES_ID,
          name: img.FILE_NAME,
          url: img.FILE_PATH,
          status: 'done'
        }
      });
    this.itemMainService.onImageListChange.next(this.fileList)
  }

  removeImage(ITEMS_IMAGES_ID){
    this.itemsService.deleteImage(ITEMS_IMAGES_ID).subscribe(data=>{
      this.ui.createMessage("success","Image deleted");
      this.fileList = this.fileList.filter(img=>img.uid != ITEMS_IMAGES_ID);
      this.itemMainService.onImageListChange.next(this.fileList)
    })
  }

  onRemove(d){
    ItemImageUploadComponent.instance.removeImage(d.uid)
    
  }
  

  getItemId(): void {
    this.ITEMS_ID = this.route.snapshot.params['ITEMS_ID'];
  }


  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isImageFile = ['image/png', 'image/jpeg', 'image/gif', 'image/bmp'].indexOf(file.type) != -1;
      if (!isImageFile) {
        this.ui.createMessage('error', 'You can only upload Image file!');
        observer.complete();
        return;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.ui.createMessage('error', 'Image must smaller than 10MB!');
        observer.complete();
        return;
      }
      // check height
      /**
       * TODO:Image dimension is not specified
       */
      this.checkImageDimension(file).then(dimensionRes => {
        // if (!dimensionRes) {
        //   this.ui.createMessage('error','Image only 300x300 above');
        //   observer.complete();
        //   return;
        // }
        // observer.next(isImageFile && isLt10M && dimensionRes);
        observer.next(isImageFile && isLt10M);
        observer.complete();
      });
    });
  };

  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        resolve(width === height && width >= 300);
      };
    });
  }

  previewImage;
  previewVisible = false;
  fileList = []
  showUploadList = {
    showPreviewIcon: false,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };


  uploadImage = (item: UploadXHRArgs) => {
    /**
     * TODO: Implement environment variable
     */
    var url = `${environment.INVENTORY_API_URL}/itemImage/insertnewImage/${this.ITEMS_ID}/${this.ITEMS_ID}`

    const formData = new FormData();
    formData.append('myfile', item.file as any);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    var http = new HttpClient(this.handler);
    const req = new HttpRequest('POST', url, formData, {
      headers: headers
    });
    return http.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          if (event.body['rows'].R_FILE_PATH) {
            
          }
          item.onSuccess!(event.body, item.file!, event);
          this.fileList = this.fileList.map(image=>{
            if(image.uid == item.file.uid){
              image.uid = event.body['rows'].R_ITEMS_IMAGES_ID
              image.name = event.body['rows'].R_FILE_NAME;
              image.url = event.body['rows'].R_FILE_PATH;
              image.status = 'done'
            }

            return image
          })
          this.itemMainService.onImageListChange.next(this.fileList)

        }
      },
      err => {
        item.onError!(err, item.file!);
      }
    );
  };

  onImageRemoved = (file: UploadFile) => {
    this.ui.createMessage('success', "Removed: But not from database")
  }

  
}
