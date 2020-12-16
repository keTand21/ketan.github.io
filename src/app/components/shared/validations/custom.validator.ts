import { FormControl, Validators, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidator extends Validators {

    static upperCase(control: FormControl) {
        const regex = /^[A-Z]+$/;
        if (control.value && !regex.test(control.value)) {
            return { upper: true };
        }
        return null;
    }

    static lowerCase(control: FormControl) {
        const regex = /^[a-z]+$/;
        if (control.value && !regex.test(control.value)) {
            return { lower: true };
        }
        return null;
    }
    static oneNumber(control: FormControl) {
        const regex = /^[0-9]*$/;
        if (control.value && !regex.test(control.value)) {
            return { number: true };
        }
        return null;
    }

    static specialChar(control: FormControl) {
        const regex = /^[!@#\$&*~]+$/;
        if (control.value && !regex.test(control.value)) {
            return { special: true };
        }
        return null;
    }



    static alphaNumeric(control: FormControl) {
        const regex = /^[0-9a-zA-Z]+$/;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }
    static alphaNumericWithoutSpace(control: FormControl) {
        const regex = /^[a-zA-Z0-9]+$/i;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }
    static alphaOnlyWithoutSpace(control: FormControl) {
        const regex = /^[a-zA-Z]/;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };

        }
    }
    static email(control: FormControl) {
        // tslint:disable-next-line:max-line-length
        const regex = /^(([^<>\-()\~|`\#\=\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,4}))$/;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
    }
    static numberOnly(control: FormControl) {
        const regex = /^[0-9]*$/;
        if ((control.value || control.touched) && !regex.test(control.value)) {
            return { pattern: true };
        }
    }

    static alphaNumericHyphenUnderscoreSpace(control: FormControl) {
        const regex = /^[-_ a-zA-Z0-9]+$/;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
    }

    static alphaNumericWithoutOnlyNumber(control: FormControl) {
        // It will not accept only numeric input. 
        // It will accept hyphen, Underscore, space
        const regex = /^(?![0-9\s]*$)[-_ a-zA-Z0-9]+$/;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
    }

    static alteration(control: FormControl) {
        const regex = /[|]/g;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
    }

    static mobileno(control: FormControl) {
        const regex = /^((\\+91-?)|0)?[0-9]{10}$/g;

        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }
    static pincode(control: FormControl) {
        const regex = /^[1-9][0-9]{5}$/;

        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }
    static charAndSpace(control: FormControl) {
        const regex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;

        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }
    static charNumberHyphenUnderscoreAndSpace(control: FormControl) {
        // const regex = /^[A-Za-z_-][A-Za-z0-9_-]+$/;
        const regex = /^[a-z\d\-_\s]+$/i;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }

    static password(control: FormControl) {
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/g
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }
    static ssn(control: FormControl) {
        const regex = /^[0-9]{9}$/g;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }
    static fax(control: FormControl) {
        const regex = /^(\+?\d{1,}(\s?|\-?)\d*(\s?|\-?)\(?\d{2,}\)?(\s?|\-?)\d{3,}\s?\d{3,})$/g;

        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }
    static removeSpecializedSybmols(control: FormControl) {
        const regex = /^[^<>'\"/;%#$^]*$/
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }

    static charOnly(control: FormControl) {
        const regex = /^[a-zA-Z]+$/;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }


    static autoCompletevalueSelected(myArray: any[], keyinput?: string): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } => {
            if (!c.value || (!c.dirty && c.value)) {
                return null;
            }
            const selectboxValue = c.value;
            const pickedOrNot = myArray.filter((alias) => {
                if (keyinput) {
                    return alias[keyinput] === selectboxValue[keyinput];
                } else {
                    return selectboxValue === alias;
                }
            });

            if (pickedOrNot.length > 0) {
                // everything's fine. return no error. therefore it's null.
                return null;
            } else {
                // there's no matching selectboxvalue selected. so return match error.
                return { match: true };
            }
        };
    }

    static address(control: FormControl) {
        const regex = /^(?!\s*$)[a-zA-Z0-9_@.\/#&*-\:\s,\[\]\"'-]+$/;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }

    static zipcode(control: FormControl) {
        const regex = /^[0-9]{5}$/g;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }

    public static strong(control: FormControl): Validators {
        if (/[A-Z]/.test(control.value)) {
            return null;
        }
        return { strong: true };
    }

    static gstn(control: FormControl) {
        let timeout;
        if (control.value && control.value !== null) {
            if (/\d{2}[a-zA-Z]{5}\d{4}[a-zA-Z]{1}[a-zA-Z\d]{1}[zZ]{1}[a-zA-Z\d]{1}/.test(control.value)) {
                // if (timeout) {
                //     clearTimeout(timeout);
                // }
                // timeout = setTimeout(() => {
                //     control.setValue(control.value.toUpperCase().trim());
                // }, 1000);
                return null;
            }
            return { pattern: true };
        }
        return null;
    }

    static pan(control: FormControl) {
        let timeout;
        if (control.value && control.value !== null) {
            if (/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test(control.value)) {
                // if (timeout) {
                //     clearTimeout(timeout);
                // }
                // timeout = setTimeout(() => {
                //     control.setValue(control.value.toUpperCase().trim());
                // }, 1000);
                return null;
            }
            return { pattern: true };
        }
        return null;
    }
}

export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        // set error on matchingControl if validation fails
        if (control.value && matchingControl.value &&
            control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}
export function MustNotMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        // set error on matchingControl if validation fails
        if (control.value && matchingControl.value &&
            control.value === matchingControl.value) {
            matchingControl.setErrors({ mustNotMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}

export function minMax(controlName: number, matchingControlName: number) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl: any = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.minMax) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (matchingControl.value! <= control.value) {
            matchingControl.setErrors({ minMax: true });
            return { pattern: true };
        } else {
            matchingControl.setErrors(null);
        }
    }



}

