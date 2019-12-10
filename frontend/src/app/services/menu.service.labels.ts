export const getLeftMenuData: any[] = [
  {
    title: 'Settings',
    translateKeys: 'SETTINGS',
    key: 'settings',
    icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
  },
  {
    divider: true,
  },
  {
    title: 'Home',
    translateKeys: 'HOME',
    key: 'dashboardBeta',
    url: '/dashboard/beta',
    icon: 'icmn icmn-home',
    pro: true,
  },

  {
    title: 'Inventory Setup',
    url: '/#/inv/setup',
    icon: 'icmn icmn-home',
    pro: true,
  },



  {
    title: 'Setup',
    translateKeys: 'SETUP',
    key: 'Setup',
    icon: 'icmn icmn-file-text',
    children: [
      {
        key: 'Inventory',
        title: 'Inventory',
        translateKeys: 'INVENTORY',
        url: '/inv/setup',
        pro: true,
      },
      {
        key: 'Items',
        title: 'Items',
        translateKeys: 'ITEMS',
        url: '/inv/setup/items',
        pro: true,

      },

      {
        title: 'ITEM_SETUP',
        translateKeys: 'ITEM_SETUP',
        url: '/inv/setup/items-setup',
        icon: 'icmn icmn-home',
        pro: true,
      },

      {
        title: 'ORGANIZATION',
        translateKeys: 'ORGANIZATION',
        url: '/inv/setup/organization',
        icon: 'icmn icmn-home',
        pro: true,
      },




      {
        key: 'Inventory Periods',
        title: 'Inventory Periods',
        translateKeys: 'INVENTORY_PERIODS',
        url: '/inv/setup/inventory-periods',
        pro: true
      },

      {
        key: 'Inventory Periods',
        title: 'Inventory Periods',
        translateKeys: 'INVENTORY_PERIODS',
        url: '/inv/setup/inventory-periods/{var}',
        pro: true
      },


      {
        key: 'Slow Moving Policy',
        title: 'Slow Moving Policy',
        translateKeys: 'SLOW_MOVING_POLICY',
        url: '/inv/setup/slow-moving-policy',
        pro: true
      },

      {
        key: 'Slow Moving Policy',
        title: 'Slow Moving Policy',
        translateKeys: 'SLOW_MOVING_POLICY',
        url: '/inv/setup/slow-moving-policy/{var}',
        pro: true
      },


      {
        key: 'Items Definition',
        title: 'Items Definition',
        translateKeys: 'ITEMS_DEFINITION',
        url: '/inv/setup/items-setup/items/{var}',
        pro: true
      },
      {
        key: 'Items Definition',
        title: 'Items Definition',
        translateKeys: 'ITEMS_DEFINITION',
        url: '/inv/setup/items-setup/items',
        pro: true
      },

      
      {
        key: 'ITEM_DETAILS',
        title: 'ITEM_DETAILS',
        translateKeys: 'ITEM_DETAILS',
        url: '/inv/setup/items-setup/items/{var}/details',
        pro: true
      },


      {
        key: 'ITEM_COMPONENTS',
        title: 'ITEM_COMPONENTS',
        translateKeys: 'ITEM_COMPONENTS',
        url: '/inv/setup/items-setup/items/{var}/item-components',
        pro: true
      },
      {
        key: 'ITEM_COMPONENTS',
        title: 'ITEM_COMPONENTS',
        translateKeys: 'ITEM_COMPONENTS',
        url: '/inv/setup/items-setup/items/{var}/item-components/{var}',
        pro: true
      },


      {
        key: 'UNITS',
        title: 'UNITS',
        translateKeys: 'UNITS',
        url: '/inv/setup/items-setup/items/{var}/item-units',
        pro: true
      },
      {
        key: 'UNITS',
        title: 'UNITS',
        translateKeys: 'UNITS',
        url: '/inv/setup/items-setup/items/{var}/item-units/{var}',
        pro: true
      },


      {
        key: 'SUPPLIER',
        title: 'SUPPLIER',
        translateKeys: 'SUPPLIER',
        url: '/inv/setup/items-setup/items/{var}/item-suppliers',
        pro: true
      },
      {
        key: 'SUPPLIER',
        title: 'SUPPLIER',
        translateKeys: 'SUPPLIER',
        url: '/inv/setup/items-setup/items/{var}/item-suppliers/{var}',
        pro: true
      },
      

      {
        key: 'ITEM_BALANCE',
        title: 'ITEM_BALANCE',
        translateKeys: 'ITEM_BALANCE',
        url: '/inv/setup/items-setup/items/{var}/item-balances',
        pro: true
      },
      {
        key: 'ITEM_BALANCE',
        title: 'ITEM_BALANCE',
        translateKeys: 'ITEM_BALANCE',
        url: '/inv/setup/items-setup/items/{var}/item-balances/{var}',
        pro: true
      },


      {
        key: 'ITEM_BALANCE',
        title: 'ITEM_BALANCE',
        translateKeys: 'ITEM_BALANCE',
        url: '/inv/setup/items-setup/items/{var}/item-balances',
        pro: true
      },
      {
        key: 'ITEM_BALANCE',
        title: 'ITEM_BALANCE',
        translateKeys: 'ITEM_BALANCE',
        url: '/inv/setup/items-setup/items/{var}/item-balances/{var}',
        pro: true
      },
      

      {
        key: 'ALIAS',
        title: 'ALIAS',
        translateKeys: 'ALIAS',
        url: '/inv/setup/items-setup/items/{var}/aliases',
        pro: true
      },
      {
        key: 'ALIAS',
        title: 'ALIAS',
        translateKeys: 'ALIAS',
        url: '/inv/setup/items-setup/items/{var}/aliases/{var}',
        pro: true
      },





      {
        key: 'Items Categories',
        title: 'Items Categories',
        translateKeys: 'ITEMS_CATEGORIES',
        url: '/inv/setup/item-groups/{var}',
        pro: true
      },
      {
        key: 'Items Categories',
        title: 'Items Categories',
        translateKeys: 'ITEMS_CATEGORIES',
        url: '/inv/setup/item-groups',
        pro: true
      },
      {
        key: 'Items Templates',
        title: 'Items Templates',
        translateKeys: 'ITEMS_TEMPLATES',
        url: '/inv/setup/item-templates',
        pro: true
      },
      {
        key: 'Items Templates',
        title: 'Items Templates',
        translateKeys: 'ITEMS_TEMPLATES',
        url: '/inv/setup/item-templates/{var}',
        pro: true
      },
      {
        key: 'Items Templates Details',
        title: 'Items Templates Details',
        translateKeys: 'ITEMS_TEMPLATES_DETAILS',
        url: '/inv/setup/item-templates/{var}/details',
        pro: true
      },

      {
        key: 'Shortage-Policy',
        title: 'Shortage-Policy',
        translateKeys: 'SHORTAGE',
        url: '/inv/setup/shortage-policy',
        pro: true
      },
      {
        key: 'Shortage-Policy',
        title: 'Shortage-Policy',
        translateKeys: 'SHORTAGE',
        url: '/inv/setup/shortage-policy/{var}',
        pro: true
      },
      {
        key: 'Tax Schema',
        title: 'Tax Schema',
        translateKeys: 'TAX_SCHEMA',
        url: '/inv/setup/tax-schemes',
        pro: true
      },
      {
        key: 'Tax Schema',
        title: 'Tax Schema',
        translateKeys: 'TAX_SCHEMA',
        url: '/inv/setup/tax-schemes/{var}',
        pro: true
      },
      {
        key: 'Tax Schema',
        title: 'Tax Schema',
        translateKeys: 'TAX_SCHEMA',
        url: '/inv/setup/tax-schemes/{var}/details',
        pro: true
      },





      {
        key: 'Demand',
        title: 'Demand',
        translateKeys: 'DEMAND',
        url: '/inv/demand',
        pro: true
      },

      {
        key: 'Demand',
        title: 'Demand',
        translateKeys: 'DEMAND',
        url: '/inv/demand/{var}',
        pro: true
      },



      {
        key: 'Supplier',
        title: 'Supplier',
        translateKeys: 'SUPPLIER',
        url: '/inv/setup/supplier',
        pro: true
      },
      {
        key: 'Suppliers',
        title: 'Suppliers',
        translateKeys: 'SUPPLIERS',
        url: '/inv/setup/supplier/{var}',
        pro: true
      },


      {
        key: 'Chart Of Accounts',
        title: 'Chart Of Accounts',
        translateKeys: 'CHART_OF_ACCOUNTS',
        url: '/inv/setup/chart-of-accounts',
        pro: true
      },
      {
        key: 'Chart Of Accounts',
        title: 'Chart Of Accounts',
        translateKeys: 'CHART_OF_ACCOUNTS',
        url: '/inv/setup/chart-of-accounts/{var}',
        pro: true
      },
      {
        key: 'Subsidiary Inv Setup',
        title: 'Subsidiary Inv Setup',
        translateKeys: 'SUBSIDIARY_INV_SETUP',
        url: '/inv/setup/subsidiary-inv-setup',
        pro: true
      },
      {
        key: 'Subsidiary Inv Setup',
        title: 'Subsidiary Inv Setup',
        translateKeys: 'SUBSIDIARY_INV_SETUP',
        url: '/inv/setup/subsidiary-inv-setup/{var}',
        pro: true
      },
      {
        key: 'Item',
        title: 'Item',
        translateKeys: 'ITEM',
        url: '/inv/setup/items/{var}',
        pro: false,
        children: [
          {
            key: 'Aliases',
            title: 'Aliases',
            translateKeys: 'ALIASES',
            url: '/inv/setup/items/{var}/aliases',
            pro: false,
          },
          {
            key: 'Alias',
            title: 'Alias',
            translateKeys: 'ALIAS',
            url: '/inv/setup/items/{var}/aliases/{var}',
            pro: false,
          },
          {
            key: 'Item Componentses',
            title: 'Item Componentses',
            translateKeys: 'ITEM_COMPONENTSES',
            url: '/inv/setup/items/{var}/item-components',
            pro: false,
          },
          {
            key: 'Item Components',
            title: 'Item Components',
            translateKeys: 'ITEM_COMPONENTS',
            url: '/inv/setup/items/{var}/item-components/{var}',
            pro: false,
          },
          {
            key: 'Item Balances',
            title: 'Item Balances',
            translateKeys: 'ITEM_BALANCES',
            url: '/inv/setup/items/{var}/item-balances',
            pro: false,
          },
          {
            key: 'Item Balance',
            title: 'Item Balance',
            translateKeys: 'ITEM_BALANCE',
            url: '/inv/setup/items/{var}/item-balances/{var}',
            pro: false,
          },
          {
            key: 'Item Substitutions',
            title: 'Item Substitutions',
            translateKeys: 'ITEM_SUBSTITUTIONS',
            url: '/inv/setup/items-setup/items/{var}/item-substitutions',
            pro: false,
          },
          {
            key: 'Item Substitution',
            title: 'Item Substitution',
            translateKeys: 'ITEM_SUBSTITUTION',
            url: '/inv/setup/items-setup/items/{var}/item-substitutions/{var}',
            pro: false,
          },
          {
            key: 'Item Suppliers',
            title: 'Item Suppliers',
            translateKeys: 'ITEM_SUPPLIERS',
            url: '/inv/setup/items/{var}/item-suppliers',
            pro: false,
          },
          {
            key: 'Item Supplier',
            title: 'Item Supplier',
            translateKeys: 'ITEM_SUPPLIER',
            url: '/inv/setup/items/{var}/item-suppliers/{var}',
            pro: false,
          },
          {
            key: 'Item Balances Details',
            title: 'Item Balances Details',
            translateKeys: 'ITEM_BALANCES_DETAILS',
            url: '/inv/setup/items/{var}/item-balances/{var}/details',
            pro: false,
          },
          {
            key: 'Item Balances Units',
            title: 'Item Balances Units',
            translateKeys: 'ITEM_BALANCES_UNITS',
            url: '/inv/setup/items/{var}/item-balance-units',
            pro: false,
          },
          {
            key: 'Item Balances Units',
            title: 'Item Balances Units',
            translateKeys: 'ITEM_BALANCES_UNITS',
            url: '/inv/setup/items/{var}/item-balance-units/{var}',
            pro: false,
          },
          {
            key: 'Item Supplier',
            title: 'Item Supplier',
            translateKeys: 'ITEM_SUPPLIER',
            url: '/inv/setup/items/{var}/suppliers',
            pro: false,
          },
          {
            key: 'Item Supplier',
            title: 'Item Supplier',
            translateKeys: 'ITEM_SUPPLIER',
            url: '/inv/setup/items/{var}/suppliers/{var}',
            pro: false,
          },
          {
            key: 'Item Details',
            title: 'Item Details',
            translateKeys: 'ITEM_DETAILS',
            url: '/inv/setup/items/{var}/details',
            pro: false,
          }
        ]
      },
      {
        key: 'Inventory',
        title: 'Inventory',
        translateKeys: 'INVENTORY',
        url: 'setup/items/main',
        pro: true,
      },
      {
        key: 'Inventory',
        title: 'Stores',
        translateKeys: 'STORES',
        url: '/inv/setup/stores',
        pro: true
      },
      {
        key: 'Inventory',
        title: 'Inventory',
        translateKeys: 'INVENTORY',
        url: '/inv/setup/stores/{var}/edit',
        pro: true,
      },
      {
        key: 'Store',
        title: 'Store',
        translateKeys: 'STORE',
        url: '/inv/setup/stores/{var}',
        pro: false,
        children: [
          {
            key: 'Store',
            title: 'Store',
            translateKeys: 'STORE',
            url: '/inv/setup/stores/{var}/edit/',
            pro: false,
          },
          {
            key: 'Stores Item Categories',
            title: 'Stores Item Categories',
            translateKeys: 'STORES_ITEM_CATEGORIES',
            url: '/inv/setup/stores/{var}/stores-item-group',
            pro: false,
          },
          {
            key: 'Stores Item Category',
            title: 'Stores Item Category',
            translateKeys: 'STORES_ITEM_CATEGORY',
            url: '/inv/setup/stores/{var}/stores-item-group/{var}',
            pro: false,
          },
          {
            key: 'Stores Item Groups No',
            title: 'Stores Item Groups No',
            translateKeys: 'STORES_ITEM_GROUPS_NO',
            url: '/inv/setup/stores/{var}/stores-item-group-no',
            pro: false,
          },
          {
            key: 'Stores Item Group No',
            title: 'Stores Item Group No',
            translateKeys: 'STORES_ITEM_GROUP_NO',
            url: '/inv/setup/stores/{var}/stores-item-group-no/{var}',
            pro: false,
          },
          {
            key: 'Stores Items',
            title: 'Stores Items',
            translateKeys: 'STORES_ITEMS',
            url: '/inv/setup/stores/{var}/stores-items',
            pro: false,
          },
          {
            key: 'Stores Item',
            title: 'Stores Item',
            translateKeys: 'STORES_ITEM',
            url: '/inv/setup/stores/{var}/stores-items/{var}',
            pro: false,
          },
          {
            key: 'Stores Items No',
            title: 'Stores Items No',
            translateKeys: 'STORES_ITEMS_NO',
            url: '/inv/setup/stores/{var}/stores-items-no',
            pro: false,
          },
          {
            key: 'Stores Item No',
            title: 'Stores Item NO',
            translateKeys: 'STORES_ITEM_NO',
            url: '/inv/setup/stores/{var}/stores-items-no/{var}',
            pro: false,
          },
          {
            key: 'Stores Document Types',
            title: 'Stores Document Types',
            translateKeys: 'STORES_DOCUMENT_TYPES',
            url: '/inv/setup/stores/{var}/stores-document-types',
            pro: false,
          },
          {
            key: 'Stores Document Type',
            title: 'Stores Document Type',
            translateKeys: 'STORES_DOCUMENT_TYPE',
            url: '/inv/setup/stores/{var}/stores-document-types/{var}',
            pro: false,
          },
          {
            key: 'Stores Locations',
            title: 'Stores Locations',
            translateKeys: 'STORES_LOCATIONS',
            url: '/inv/setup/stores/{var}/stores-locations',
            pro: false,
          },
          {
            key: 'Stores Location',
            title: 'Stores Location',
            translateKeys: 'STORES_LOCATION',
            url: '/inv/setup/stores/{var}/stores-locations/{var}',
            pro: false,
          },
        ]
      }
    ],
  },
  {
    title: 'Operations',
    translateKeys: 'OPERATIONS',
    key: 'Operations',
    icon: 'icmn icmn-file-text',
    children: [


      {
        key: 'Custody Transfer',
        title: 'Custody Transfer',
        translateKeys: 'Custody Transfer',
        url: '/inv/operations/operation/transfers-custody',
        pro: true
      },

      {
        key: 'CUSTODY_TRANSFER_BWT_EMP',
        title: 'CUSTODY_TRANSFER_BWT_EMP',
        translateKeys: 'CUSTODY_TRANSFER_BWT_EMP',
        url: '/inv/operations/operation/transfers-custody/inv-transfer',
        pro: true
      },
      {
        key: 'CUSTODY_TRANSFER_BWT_EMP',
        title: 'CUSTODY_TRANSFER_BWT_EMP',
        translateKeys: 'CUSTODY_TRANSFER_BWT_EMP',
        url: '/inv/operations/operation/transfers-custody/inv-transfer/add',
        pro: true
      },
      {
        key: 'CUSTODY_TRANSFER_BWT_EMP',
        title: 'CUSTODY_TRANSFER_BWT_EMP',
        translateKeys: 'CUSTODY_TRANSFER_BWT_EMP',
        url: '/inv/operations/operation/transfers-custody/inv-transfer/{var}',
        pro: true
      },

      {
        key: 'CUSTODY TRANSFER RECEIVE',
        title: 'CUSTODY TRANSFER RECEIVE',
        translateKeys: 'CUSTODY_TRANSFER_RECEIVE',
        url: '/inv/operations/operation/transfers-custody/inv-transfer-r',
        pro: true
      },


      {
        key: 'CUSTODY TRANSFER RECEIVE',
        title: 'CUSTODY TRANSFER RECEIVE',
        translateKeys: 'CUSTODY_TRANSFER_RECEIVE',
        url: '/inv/operations/operation/transfers-custody/inv-transfer-r/{var}',
        pro: true
      },

      {
        key: 'DISPENSE_TXN',
        title: 'DISPENSE_TXN',
        translateKeys: 'DISPENSE_TXN',
        url: '/inv/operations/operation/dsp-txn',
        pro: true
      },


      {
        key: 'DISPENSE_TXN',
        title: 'DISPENSE_TXN',
        translateKeys: 'DISPENSE_TXN',
        url: '/inv/operations/operation/dsp-txn/req-items',
        pro: true
      },


      {
        key: 'DISPENSE_TXN',
        title: 'DISPENSE_TXN',
        translateKeys: 'DISPENSE_TXN',
        url: '/inv/operations/operation/dsp-txn/req-items/{var}',
        pro: true
      },

      {
        key: 'DISPENSE_TXN',
        title: 'DISPENSE_TXN',
        translateKeys: 'DISPENSE_TXN',
        url: '/inv/operations/operation/dsp-txn/req-items-re',
        pro: true
      },

      {
        key: 'DISPENSE_TXN',
        title: 'DISPENSE_TXN',
        translateKeys: 'DISPENSE_TXN',
        url: '/inv/operations/operation/dsp-txn/req-items-re/{var}',
        pro: true
      },




      {
        key: 'TRANSFER',
        title: 'TRANSFER',
        translateKeys: 'TRANSFER',
        url: '/inv/operations/operation/transfers',
        pro: true
      },

      {
        key: 'TRANSFER',
        title: 'TRANSFER',
        translateKeys: 'TRANSFER',
        url: '/inv/operations/operation/transfers/inv-transfer',
        pro: true
      },
      {
        key: 'TRANSFER',
        title: 'TRANSFER',
        translateKeys: 'TRANSFER',
        url: '/inv/operations/operation/transfers/inv-transfer/{var}',
        pro: true
      },

      
      {
        key: 'TRANSFER_RECEIVING',
        title: 'TRANSFER_RECEIVING',
        translateKeys: 'TRANSFER_RECEIVING',
        url: '/inv/operations/operation/transfers/inv-transfer-r',
        pro: true
      },


      {
        key: 'TRANSFER_RECEIVING',
        title: 'TRANSFER_RECEIVING',
        translateKeys: 'TRANSFER_RECEIVING',
        url: '/inv/operations/operation/transfers/inv-transfer-r/{var}',
        pro: true
      },




      

      {
        key: 'Operations',
        title: 'OPERATIONS',
        translateKeys: 'OPERATIONS',
        url: '/inv/operations/operation',
        pro: true
      },


      {
        key: 'StoreList',
        title: 'StoreList',
        translateKeys: 'STORELIST',
        url: '/inv/operations/stores',
        pro: true,
      },
      {
        key: 'Operations',
        title: 'Operations',
        translateKeys: 'OPERATIONS',
        url: '/inv/operations/stores/{var}',
        pro: true,
      },
      {
        key: 'Documents',
        title: 'Documents',
        translateKeys: 'DOCUMENTS',
        url: '/inv/operations/operation/doc',
        pro: true,
      },
      {
        key: 'Open Balance',
        title: 'Open Balance',
        translateKeys: 'OPEN_BALANCE',
        url: '/inv/operations/operation/open-balance',
        pro: true,
      },
      {
        key: 'Open Balance',
        title: 'Open Balance',
        translateKeys: 'OPEN_BALANCE',
        url: '/inv/operations/operation/open-balance/{var}',
        pro: true,
      },



      {
        key: 'JOB_ORDER_REQUEST',
        title: 'JOB_ORDER_REQUEST',
        translateKeys: 'JOB_ORDER_REQUEST',
        url: '/inv/operations/operation/job-order-req',
        pro: true,
      },
      {
        key: 'JOB_ORDER_REQUEST',
        title: 'JOB_ORDER_REQUEST',
        translateKeys: 'JOB_ORDER_REQUEST',
        url: '/inv/operations/operation/job-order-req/{var}',
        pro: true,
      },


      {
        key: 'JOB_ORDER_REQUEST',
        title: 'JOB_ORDER_REQUEST',
        translateKeys: 'JOB_ORDER_REQUEST',
        url: '/inv/operations/operation/job-order-req',
        pro: true,
      },
      {
        key: 'JOB_ORDER_REQUEST',
        title: 'JOB_ORDER_REQUEST',
        translateKeys: 'JOB_ORDER_REQUEST',
        url: '/inv/operations/operation/job-order-req/{var}',
        pro: true,
      },

      {
        key: 'JOB_ORDER_ISSUES',
        title: 'JOB_ORDER_ISSUES',
        translateKeys: 'JOB_ORDER_ISSUES',
        url: '/inv/operations/operation/job-order-disp',
        pro: true,
      },
      {
        key: 'JOB_ORDER_ISSUES',
        title: 'JOB_ORDER_ISSUES',
        translateKeys: 'JOB_ORDER_ISSUES',
        url: '/inv/operations/operation/job-order-disp/{var}',
        pro: true,
      },


      {
        key: 'PHYSICAL_INVENTORY',
        title: 'PHYSICAL_INVENTORY',
        translateKeys: 'PHYSICAL_INVENTORY',
        url: '/inv/operations/operation/stock-taking',
        pro: true,
      },
      {
        key: 'PHYSICAL_INVENTORY',
        title: 'PHYSICAL_INVENTORY',
        translateKeys: 'PHYSICAL_INVENTORY',
        url: '/inv/operations/operation/stock-taking/{var}',
        pro: true,
      },



      {
        key: 'Return Request',
        title: 'Return Request',
        translateKeys: 'Return Request',
        url: '/inv/operations/operation/req-doc',
        pro: true,
      },
      {
        key: 'Return Request',
        title: 'Return Request',
        translateKeys: 'Return Request',
        url: '/inv/operations/operation/req-doc/{var}',
        pro: true,
      },


      {
        key: 'ITEM_RETURN_REQUEST',
        title: 'ITEM_RETURN_REQUEST',
        translateKeys: 'ITEM_RETURN_REQUEST',
        url: '/inv/operations/operation/req-item-return',
        pro: true,
      },
      {
        key: 'ITEM_RETURN_REQUEST',
        title: 'ITEM_RETURN_REQUEST',
        translateKeys: 'ITEM_RETURN_REQUEST',
        url: '/inv/operations/operation/req-item-return/{var}',
        pro: true,
      },



      {
        key: 'CUSTODY_REQUEST',
        title: 'CUSTODY_REQUEST',
        translateKeys: 'CUSTODY_REQUEST',
        url: '/inv/operations/operation/req-emp-custody',
        pro: true,
      },
      {
        key: 'CUSTODY_REQUEST',
        title: 'CUSTODY_REQUEST',
        translateKeys: 'CUSTODY_REQUEST',
        url: '/inv/operations/operation/req-emp-custody/{var}',
        pro: true,
      },


      {
        key: 'ITEM_LOST_REQUEST',
        title: 'ITEM_LOST_REQUEST',
        translateKeys: 'ITEM_LOST_REQUEST',
        url: '/inv/operations/operation/req-item-lost',
        pro: true,
      },
      {
        key: 'ITEM_LOST_REQUEST',
        title: 'ITEM_LOST_REQUEST',
        translateKeys: 'ITEM_LOST_REQUEST',
        url: '/inv/operations/operation/req-item-lost/{var}',
        pro: true,
      },


      {
        key: 'TRANSACTIONS',
        title: 'TRANSACTIONS',
        translateKeys: 'TRANSACTIONS',
        url: '/inv/operations/operation/transactions',
        pro: true,
      },


      {
        key: 'PURCHASE_REQUEST_VIEW',
        title: 'PURCHASE_REQUEST_VIEW',
        translateKeys: 'PURCHASE_REQUEST_VIEW',
        url: '/inv/operations/operation/purchase/pur-req-view',
        pro: true,
      },
      {
        key: 'PURCHASE_REQUEST_VIEW',
        title: 'PURCHASE_REQUEST_VIEW',
        translateKeys: 'PURCHASE_REQUEST_VIEW',
        url: '/inv/operations/operation/purchase/pur-req-view/{var}',
        pro: true,
      },




      {
        key: 'PURCHASE_REQUESTS',
        title: 'PURCHASE_REQUESTS',
        translateKeys: 'PURCHASE_REQUESTS',
        url: '/inv/operations/operation/purchase/pur-req',
        pro: true,
      },
      {
        key: 'PURCHASE_REQUESTS',
        title: 'PURCHASE_REQUESTS',
        translateKeys: 'PURCHASE_REQUESTS',
        url: '/inv/operations/operation/purchase/pur-req/{var}',
        pro: true,
      },
      {
        key: 'PURCHASE_REQUESTS',
        title: 'PURCHASE_REQUESTS',
        translateKeys: 'PURCHASE_REQUESTS',
        url: '/inv/operations/operation/purchase',
        pro: true,
      },


      {
        key: 'ITEM_BALANCE',
        title: 'ITEM_BALANCE',
        translateKeys: 'ITEM_BALANCE',
        url: '/inv/operations/operation/item-balance',
        pro: true,
      },





      {
        key: 'Receiving',
        title: 'Receiving',
        translateKeys: 'RECEIVING',
        url: '/inv/operations/operation/rcv-doc',
        pro: true,
      },
      {
        key: 'Receiving Document',
        title: 'Receiving Document',
        translateKeys: 'RECEIVING_DOCUMENT',
        url: '/inv/operations/operation/rcv-doc/{var}',
        pro: true,
      },
      {
        key: 'Receiving Inspection',
        title: 'Receiving Inspection',
        translateKeys: 'RECEIVING_INSPECTION',
        url: '/inv/operations/operation/rcv-insp',
        pro: true,
      },
      {
        key: 'Receiving Inspection',
        title: 'Receiving Inspection',
        translateKeys: 'RECEIVING_INSPECTION',
        url: '/inv/operations/operation/rcv-insp/{var}',
        pro: true,
      },
      {
        key: 'Receiving Temporary',
        title: 'Receiving Temporary',
        translateKeys: 'RECEIVING_TEMPORARY',
        url: '/inv/operations/operation/rcv-temp',
        pro: true,
      },
      {
        key: 'Receiving Temporary',
        title: 'Receiving Temporary',
        translateKeys: 'RECEIVING_TEMPORARY',
        url: '/inv/operations/operation/rcv-temp/{var}',
        pro: true,
      },
      {
        key: 'Transfer',
        title: 'Transfer',
        translateKeys: 'TRANSFER',
        url: '/inv/operations/operation/inv-transfer',
        pro: true,
      },
      {
        key: 'Transfer',
        title: 'Transfer',
        translateKeys: 'TRANSFER',
        url: '/inv/operations/operation/inv-transfer/{var}',
        pro: true,
      },
    ]
  }
]
export const getTopMenuData: any[] = [
  {
    title: 'Settings',
    translateKeys: 'SETTINGS',
    key: 'settings',
    icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
  },
  {
    title: 'Documentation',
    translateKeys: 'DOCUMENTATION',
    key: 'documentation',
    url: 'https://docs.cleanuitemplate.com/angular/getting-started',
    target: '_blank',
    icon: 'icmn icmn-books',
  },
  {
    divider: true,
  },
  {
    title: 'Home',
    translateKeys: 'HOME',
    key: 'dashboardBeta',
    url: '/dashboard/beta',
    icon: 'icmn icmn-home',
    pro: true,
  },

  {
    title: 'Setup',
    translateKeys: 'SETUP',
    key: 'Setup',
    icon: 'icmn icmn-file-text',
    children: [
      {
        key: 'Inventory',
        title: 'Inventory',
        translateKeys: 'INVENTORY',
        url: '/inv/setup',
        pro: true,
      },
      {
        key: 'Items',
        title: 'Items',
        translateKeys: 'ITEMS',
        url: '/inv/setup/items',
        pro: true,

      },
      {
        key: 'Item',
        title: 'Item',
        translateKeys: 'ITEM',
        url: '/inv/setup/items/{var}',
        pro: false,
        children: [
          {
            key: 'Aliases',
            title: 'Aliases',
            translateKeys: 'ALIASES',
            url: '/inv/setup/items/{var}/aliases',
            pro: false,
          },
          {
            key: 'Alias',
            title: 'Alias',
            translateKeys: 'ALIAS',
            url: '/inv/setup/items/{var}/aliases/{var}',
            pro: false,
          },
          {
            key: 'Item Componentses',
            title: 'Item Componentses',
            translateKeys: 'ITEM_COMPONENTSES',
            url: '/inv/setup/items/{var}/item-components',
            pro: false,
          },
          {
            key: 'Item Components',
            title: 'Item Components',
            translateKeys: 'ITEM_COMPONENTS',
            url: '/inv/setup/items/{var}/item-components/{var}',
            pro: false,
          },
          {
            key: 'Item Balances',
            title: 'Item Balances',
            translateKeys: 'ITEM_BALANCES',
            url: '/inv/setup/items/{var}/item-balances',
            pro: false,
          },
          {
            key: 'Item Balance',
            title: 'Item Balance',
            translateKeys: 'ITEM_BALANCE',
            url: '/inv/setup/items/{var}/item-balances/{var}',
            pro: false,
          },
          {
            key: 'Item Balances Units',
            title: 'Item Balances Units',
            translateKeys: 'ITEM_BALANCES_UNITS',
            url: '/inv/setup/items/{var}/item-balance-units',
            pro: false,
          },
          {
            key: 'Item Balances Units',
            title: 'Item Balances Units',
            translateKeys: 'ITEM_BALANCES_UNITS',
            url: '/inv/setup/items/{var}/item-balance-units/{var}',
            pro: false,
          }
        ]
      },
      {
        key: 'Inventory',
        title: 'Inventory',
        translateKeys: 'INVENTORY',
        url: '/inv/setup/items/createupdateitem/:mode',
        pro: true,
      },
      {
        key: 'Inventory',
        title: 'Inventory',
        translateKeys: 'INVENTORY',
        url: 'setup/items/main',
        pro: true,
      },
    ],
  }
]
