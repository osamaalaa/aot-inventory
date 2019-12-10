export const getLeftMenuData: any[] = [
  // {
  //   title: 'Settings',
  //   key: 'settings',
  //   icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
  // },
  // {
  //   divider: true,
  // },
  {
    title: 'Home',
    key: 'dashboardBeta',
    url: '/dashboard/beta',
    icon: 'icmn icmn-home',
    pro: false,
  },

  {
    title: 'General Setup',
    key: 'Setup',
    icon: 'icmn icmn-file-text',
    children: [
      {
        key: 'Inventory',
        title: 'Inventory',
        url: '/inv/setup',
        pro: true,
      },
    ],
  },




  {
    title: 'Inventory',
    key: 'Inventory',
    icon: 'icmn icmn-spinner9',
    children: [
      {
        key: 'Operations',
        title: 'OPERATIONS',
        url: '/inv/operations/operation',
        pro: false,
      },
    ],
  }
]
export const getTopMenuData: any[] = [
  // {
  //   title: 'Settings',
  //   key: 'settings',
  //   icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
  // },
  // {
  //   divider: true,
  // },
  {
    title: 'Home',
    key: 'dashboardBeta',
    url: '/dashboard/beta',
    icon: 'icmn icmn-home',
    pro: false,
  },


  {
    title: 'Home',
    key: 'dashboardBeta',
    url: '/dashboard/beta',
    icon: 'icmn icmn-home',
    pro: false,
  },

  {
    title: 'General Setup',
    key: 'Setup',
    icon: 'icmn icmn-file-text',
    children: [
      {
        key: 'Inventory',
        title: 'Inventory',
        url: '/inv/setup',
        pro: true,
      },
    ],
  },




  {
    title: 'Inventory',
    key: 'Inventory',
    icon: 'icmn icmn-spinner9',
    children: [
      {
        key: 'Operations',
        title: 'OPERATIONS',
        url: '/inv/operations',
        pro: false,
      },
    ],
  }
]
