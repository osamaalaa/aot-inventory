export const STORES_VALIDATION_MESSAGES = {
    'STORES_CODE': [
        { type: 'required', message:{en:'Store Code is a required Field !',ar: "رمز المتجر هو حقل مطلوب!"}}
    ],
    'EN_NAME': [
        { type: 'required', message:{en:'English Name is a required Field !',ar: "الاسم باللغة الإنجليزية هو حقل مطلوب!"}}
    ],
    'AR_NAME': [
        { type: 'required', message:{en:'Arabic Name is a required Field !',ar: "الاسم العربي هو حقل مطلوب!"}}
    ],
    'STORE_TYPE': [
        { type: 'required', message:{en:'Store Type is a required Field !',ar: "نوع المتجر حقل مطلوب!"}}
    ],
    'ISSUE_POLICY': [
        { type: 'required', message:{en:'Issue Policy is a required Field !',ar: "سياسة المشكلة هي حقل مطلوب!"}}
    ],
    'PROFIT_MARGIN': [
        { type: 'required', message:{en:'Profit Margin is a required Field !',ar: "هامش الربح هو حقل مطلوب!"}} ,
        { type: 'max', message:{en:'Too large Value',ar: "قيمة كبيرة جدًا"}}
    ],
    'SUBSIDIARY_ID': [
        { type: 'required', message:{en:'Subsidiary Id is a required Field !',ar: "المعرف الفرعي هو حقل مطلوب!"}}
    ],
    'COST_METHOD': [
        { type: 'required', message:{en:'Cost Method is a required Field !',ar: "طريقة التكلفة هي حقل مطلوب!"}}
    ],
    'PICKING_RULE_ID': [
        { type: 'required', message:{en:'Picking Rule is a required Field !',ar: "قاعدة الانتقاء هي حقل مطلوب!"}}
    ],
    'MATERIAL_ACCOUNT': [
        { type: 'required', message:{en:'Material Account is a required Field !',ar: "حساب المواد هو حقل مطلوب!"}}
    ],
    'MATERIAL_OVERHEAD_ACCOUNT': [
        { type: 'required', message:{en:'Material Overhead Account is a required Field !',ar: "حساب النفقات المادية هو حقل مطلوب!"}}
    ],
    'MATL_OVHD_ABSORPTION_ACCT': [
        { type: 'required', message:{en:'Material Overhead Absorption account is a required Field !',ar: "حساب امتصاص المواد الزائد هو حقل مطلوب!"}}
    ],
    'RESOURCE_ACCOUNT': [
        { type: 'required', message:{en:'Resource account is a required Field !',ar: "حساب المورد هو حقل مطلوب!"}}
    ],
    'PURCHASE_PRICE_VAR_ACCOUNT': [
        { type: 'required', message:{en:'Purchase price variable account is a required Field !',ar: "حساب متغير سعر الشراء هو حقل مطلوب!"}}
    ],
    'AP_ACCRUAL_ACCOUNT': [
        { type: 'required', message:{en:'Ap accrual account is a required Field !',ar: "حساب الاستحقاق هو حقل مطلوب!"}}
    ],
    'OVERHEAD_ACCOUNT': [
        { type: 'required', message:{en:'Overhead account is a required Field !',ar: "الحساب العام هو حقل مطلوب!"}}
    ],
    'OUTSIDE_PROCESSING_ACCOUNT': [
        { type: 'required', message:{en:'Outside processing account is a required Field !',ar: "الحساب الخارجي للمعالجة هو حقل مطلوب!"}}
    ],
    'INTRANSIT_INV_ACCOUNT': [
        { type: 'required', message:{en:'Intransit inv account is a required Field !',ar: "حساب intransit هو حقل مطلوب!"}}
    ],
    'INTERORG_RECEIVABLES_ACCOUNT': [
        { type: 'required', message:{en:'Interorg receivable account is a required Field !',ar: "حساب مدينة Interorg هو حقل مطلوب!"}}
    ],
    'INTERORG_PRICE_VAR_ACCOUNT': [
        { type: 'required', message:{en:'Interorg price var account is a required Field !',ar: 'حساب سعر Interorg هو حقل مطلوب!'}}
    ],
    'INTERORG_PAYABLES_ACCOUNT': [
        { type: 'required', message:{en:'Interorg payables account is a required Field !',ar: "حساب دائن Interorg هو حقل مطلوب!"}}
    ],
    'COST_OF_SALES_ACCOUNT': [
        { type: 'required', message:{en:'Cost of sales account is a required Field !',ar: "حساب تكلفة المبيعات هو حقل مطلوب!"}}
    ],
    'ENCUMBRANCE_ACCOUNT': [
        { type: 'required', message:{en:'Encumbrance account is a required Field !',ar: "حساب الرهان هو حقل مطلوب!"}}
    ],
    'PROJECT_COST_ACCOUNT': [
        { type: 'required', message:{en:'Project cost account is a required Field !',ar: "حساب تكلفة المشروع هو حقل مطلوب!"}}
    ],
    'INTERORG_TRANSFER_CR_ACCOUNT': [
        { type: 'required', message:{en:'Interorg tranfer cr account is a required Field !',ar: "حساب Interorg tranfer cr هو حقل مطلوب!"}}
    ],
    'INVOICE_PRICE_VAR_ACCOUNT': [
        { type: 'required', message:{en:'Invoice price var account is a required Field !',ar: "يعد حساب سعر الفاتورة حقلًا مطلوبًا!"}}
    ],
    'AVERAGE_COST_VAR_ACCOUNT': [
        { type: 'required', message:{en:'Average cost var account is a required Field !',ar: "متوسط ​​التكلفة var account هو حقل مطلوب!"}}
    ],
    'SALES_ACCOUNT': [
        { type: 'required', message:{en:'Sales account is a required Field !',ar: "حساب المبيعات هو حقل مطلوب!"}}
    ],
    'EXPENSE_ACCOUNT': [
        { type: 'required', message:{en:'Expense account is a required Field !',ar: "حساب المصاريف هو حقل مطلوب!"}}
    ],
    'BORRPAY_MATL_VAR_ACCOUNT': [
        { type: 'required', message:{en:'Borro pay matl var account is a required Field !',ar: "حساب Borro pay matl var هو حقل مطلوب!"}}
    ],
    'BORRPAY_MOH_VAR_ACCOUNT': [
        { type: 'required', message:{en:'Borrpay moh var account is a required Field !',ar: "حساب Borrpay moh var حقل مطلوب!"}}
    ],
    'BORRPAY_RES_VAR_ACCOUNT': [
        { type: 'required', message:{en:'Borrpay res var account is a required Field !',ar: "حساب Borrpay res var هو حقل مطلوب!"}}
    ],
    'BORRPAY_OSP_VAR_ACCOUNT': [
        { type: 'required', message:{en:'Borrpay osp var account is a required Field !',ar: "حساب Borrpay osp var هو حقل مطلوب!"}}
    ],
    'BORRPAY_OVH_VAR_ACCOUNT': [
        { type: 'required', message:{en:'Borrpay ovh var account is a required Field !',ar: "حساب Borrpay ovh var هو حقل مطلوب!"}}
    ],
    'DEFERRED_COGS_ACCOUNT': [
        { type: 'required', message:{en:'Deferred cogs account is a required Field !',ar: "حساب التروس المؤجلة هو حقل مطلوب!"}}
    ],
}
