import { Label } from "./Label";

export interface ColumnDef{
    /**
     * Label of the header : Type Label
     */
    label:Label,

    /**
     * name of the header value received from server
     */
    name:Label;

    /**
     *  Sortable 
     */
    sortable? : boolean,

    /**
     * if sortable, then provide comparator functions
     */
    comparator?:Function

    type?:string;
}
