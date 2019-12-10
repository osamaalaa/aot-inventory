import { Component, OnInit, Input } from '@angular/core'
import { Router, NavigationStart } from '@angular/router'
import { filter } from 'rxjs/operators'
import * as _ from 'lodash'
import { select, Store } from '@ngrx/store'
import { MenuService } from 'src/app/services/menu.service'
import * as SettingsActions from 'src/app/store/settings/actions'
import * as Reducers from 'src/app/store/reducers'
import { ProfileService } from 'src/app/services/profile.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'cui-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.scss'],
})
export class MenuLeftComponent implements OnInit {
  @Input() isMenuCollapsed: boolean = false
  isLightTheme: boolean
  isSettingsOpen: boolean
  isMobileView: boolean
  menuData: any[]
  menuDataActivated: any[];

  userName:string = "User"

  constructor(
    private menuService: MenuService,
    private store: Store<any>,
    private router: Router,
    private profileservice:ProfileService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.menuService.getLeftMenuData().subscribe(menuData => (this.menuData = menuData))
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.isLightTheme = state.isLightTheme
      this.isMobileView = state.isMobileView
    })
    this.activateMenu(this.router.url)
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        this.activateMenu(event.url ? event.url : null)
      })

      this.getUserProfile();

      this.onLangugateChange()
      this.fetchCurrentLanguage()
      this.getUserImage()
  }

  lang
  onLangugateChange(){
    this.translate.onLangChange.subscribe(lang=>{
      this.lang = lang.lang
    })
  }

  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }

  img_url;
  spinning;
  getUserImage() {
    let userId = JSON.parse(localStorage.getItem('user')).USER_ID
    this.profileservice.getUserImage(userId).subscribe(url => {
      console.log(url.url)
      this.img_url = url.url
      this.spinning = false
    })
  }

  EN_NAME;
  AR_NAME;
  EMPLOYEE_EMAIL
  getUserProfile() {
    let USER_ID = JSON.parse(localStorage.getItem('user')).USER_ID
    this.profileservice.getUserProfile(USER_ID).subscribe(profile => {
      this.EN_NAME = profile.rows[0].EN_NAME
      this.AR_NAME = profile.rows[0].ARABIC_NAME
      this.EMPLOYEE_EMAIL = profile.rows[0].EMPLOYEE_EMAIL
    },
      error => {
      })
  }

  activateMenu(url: any, menuData = this.menuData) {
    menuData = JSON.parse(JSON.stringify(menuData))
    const pathWithSelection = this.getPath({ url: url }, menuData, (entry: any) => entry, 'url')
    if (pathWithSelection) {
      pathWithSelection.pop().selected = true
      _.each(pathWithSelection, (parent: any) => (parent.open = true))
    }
    this.menuDataActivated = menuData.slice()
  }

  getPath(
    element: any,
    source: any,
    property: any,
    keyProperty = 'key',
    childrenProperty = 'children',
    path = [],
  ) {
    let found = false
    const getElementChildren = (value: any) => _.get(value, childrenProperty)
    const getElementKey = (value: any) => _.get(value, keyProperty)
    const key = getElementKey(element)
    return (
      _.some(source, (e: any) => {
        if (getElementKey(e) === key) {
          path.push(e)
          return true
        } else {
          return (found = this.getPath(
            element,
            getElementChildren(e),
            property,
            keyProperty,
            childrenProperty,
            path.concat(e),
          ))
        }
      }) &&
      (found || _.map(path, property))
    )
  }

  toggleSettings() {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        isSettingsOpen: !this.isSettingsOpen,
      }),
    )
  }
}
