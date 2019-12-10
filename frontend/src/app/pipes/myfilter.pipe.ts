import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'myfilter',
  pure: false,
})
export class MyFilterPipe implements PipeTransform {
  mreturn: any = []
  transform(
    items: any[],
    filter: Object,
    searchbyname: boolean = true,
    searchbyid: boolean,
    searchbydesc: boolean,
    searchbycreatedby: boolean,
  ): any {
    if (!items || !filter) {
      return items
    }

    return items.filter(item => {
      if (searchbyname) {
        this.mreturn =
          item['EVENT_NAME'].toLowerCase().indexOf(filter.toString().toLowerCase()) !== -1
      }
      if (searchbyid) {
        this.mreturn +=
          item['EVENT_ID']
            .toString()
            .toLowerCase()
            .indexOf(filter.toString()) !== -1
      }
      if (searchbydesc) {
        this.mreturn +=
          item['EVENT_DESC'].toLowerCase().indexOf(filter.toString().toLowerCase()) !== -1
      }

      if (searchbycreatedby) {
        this.mreturn +=
          item['CREATED_BY'].toLowerCase().indexOf(filter.toString().toLowerCase()) !== -1
      }

      return this.mreturn
    })

    // Wael Abdeen
  }
}
