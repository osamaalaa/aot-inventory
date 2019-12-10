import { TableHeader } from "./Table-header";
import { Label, FieldConfig } from "../../lib/DynmaicFormBuilder/interface/FieldConfig";

export interface IEntity{
    apiPath:string;
    headers:TableHeader[];
    title:Label;
    filterFn:Function;
    formConfig:FieldConfig[];
    primaryKeyName:string;
}