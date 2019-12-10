

# Dynamic Form Builder
Dynmaic Form Builder Module is used to create form dynamically.



# Usage
**HTML**

    <dynamic-form  [fields]="regConfig" [formAlignment]='horizontal'  (submit)="submit($event)">
    </dynamic-form>


**Config**: **FieldConfig** : This is an example config. Give any range of configs to create dynamic forms

    regConfig:  FieldConfig[] = [

	    {
		    type:  "input",
		    label: {
                en_name:"User name",
                ar_name:"Ar User name"
            },
		    inputType:  "text",
		    name:  "name",
		    validations: [
			    {
				    name:  "required",
				    validator:  Validators.required,
				    message:  "Name Required"
			    },
			    {
				    name:  "pattern",
				    validator:  Validators.pattern("^[a-zA-Z]+$"),
				    message:  "Accept only text"
			    }
		    ]
	    },
	    {
		    type:  "input",
		    label:  {
                en_name:"Email address",
                ar_name:"Ar Email address"
            },
		    inputType:  "email",
		    name:  "email",
		    validations: [
		    {
			    name:  "required",
			    validator:  Validators.required,
			    message:  "Email Required"
		    },
		    {
			    name:  "pattern",
			    validator:  Validators.pattern(
			    "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
			    ),
			    message:  "Invalid email"
			    }
		    ]
	    },
	    {
		    type:  "input",
		    label: {
                en_name:"Password",
                ar_name:"Ar Password"
            },
		    inputType:  "password",
		    name:  "password",
		    validations: [
		    {
			    name:  "required",
			    validator:  Validators.required,
			    message:  "Password Required"
			    }
		    ]
	    },
	    {
		    type:  "button",
		    label: {
                en_name:"Save Button",
                ar_name:"Ar Save Button"
            },
	    }
    ];

**formAlignment** : This input is used for selecting alignment of form : 'horizontal' or 'vertical'


**TODO** : 

1. Radio
2. Checkbox
3. Select
4. Select Tree