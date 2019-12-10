import {
    ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit,
    ViewContainerRef,
    Renderer2
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { InputComponent } from './components/input.component';
import { ButtonComponent } from './components/button.component';
import { FieldConfig } from './interface/FieldConfig';

const FORM_ALIGNMENTS = {
    VERTICAL:'vertical',
    HORIZONTAL:'horizontal'
}

const HORIZONTAL_CLASS = 'col-md-12'
const VERTICAL_CLASS = 'col-md-6'
const componentMapper = {
    input: InputComponent,
    button:ButtonComponent
};
@Directive({
    selector: '[dynamicField]'
})
export class DynamicFieldDirective implements OnInit {

    @Input() field: FieldConfig;

    @Input() group: FormGroup;

    @Input() formAlignment:string = FORM_ALIGNMENTS.HORIZONTAL

    componentRef: any;

    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef,
        private renderer2: Renderer2) { }

    ngOnInit() {

        const factory = this.resolver.resolveComponentFactory(
            componentMapper[this.field.type]
        );
        
        this.componentRef = this.container.createComponent(factory);
        if(this.field.type == 'button'){
            this.renderer2.addClass(this.componentRef.location.nativeElement, HORIZONTAL_CLASS);
        }
        else if(this.formAlignment == FORM_ALIGNMENTS.HORIZONTAL){
            this.renderer2.addClass(this.componentRef.location.nativeElement, HORIZONTAL_CLASS);
        }else{
            this.renderer2.addClass(this.componentRef.location.nativeElement, VERTICAL_CLASS);
        }
        this.componentRef.instance.field = this.field;
        this.componentRef.instance.group = this.group;
    }
}