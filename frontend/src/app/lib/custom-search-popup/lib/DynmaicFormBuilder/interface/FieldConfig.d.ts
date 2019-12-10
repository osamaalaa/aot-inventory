import { Validator } from "./Validator";

export interface FieldConfig {
    label?: Label;
    name?: string;
    inputType?: string;
    options?: string[];
    collections?: any;
    type: string;
    value?: any;
    validations?: Validator[];
}

export interface Label{
   en_name:string;
   ar_name?:string;
}