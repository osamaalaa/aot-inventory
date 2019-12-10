import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'sort', pure: false })
export class ArraySortPipe implements PipeTransform {
  transform(array: any[], field: string, type: string = 'asc'): any[] {
    if (type == null || type == 'asc') {
      array.sort((a: any, b: any) => {
        if (a[field] < b[field]) {
          return -1
        } else if (a[field] > b[field]) {
          return 1
        } else {
          return 0
        }
      })
    } else {
      array.sort((a: any, b: any) => {
        if (a[field] > b[field]) {
          return -1
        } else if (a[field] < b[field]) {
          return 1
        } else {
          return 0
        }
      })
    }

    return array
  }
  // Wael Abdeen
}
