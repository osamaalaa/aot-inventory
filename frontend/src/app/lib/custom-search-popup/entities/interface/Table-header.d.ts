export interface TableHeader{
    /**
     * Label of the header : Type Label
     */
    label:Label,

    /**
     * name of the header value received from server
     */
    name:Label;

    /**
     * type can be status: If status type then `enable` and `disable` is shown
     */
    type?:string;
}



interface Label {
    en_name:string;
    ar_name?:string;
}