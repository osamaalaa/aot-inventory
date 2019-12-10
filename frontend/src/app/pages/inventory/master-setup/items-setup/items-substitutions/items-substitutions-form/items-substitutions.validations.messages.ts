export const ITEM_SUBSTITUTION_VALIDATION_MESSAGES = {
    'SUBSTITUTIONS_ITEMS_ID': [
        { type: 'required', message:{en:'Substitution Item is a required Field !',ar: "عنصر الاستبدال هو حقل مطلوب!"}}
    ],
    'UNITS_ID': [
        { type: 'required', message:{en:'Unit is a required Field !',ar: "الوحدة حقل مطلوب!"}}
    ],
    'QUANTITY': [
        { type: 'required', message:{en:'Quantity is a required Field !',ar: "الكمية حقل مطلوب!"}} ,
        { type: 'max', message:{en:'Too large Value',ar: "قيمة كبيرة جدًا"}}
    ]
}
