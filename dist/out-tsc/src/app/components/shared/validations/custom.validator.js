import { Validators } from '@angular/forms';
export class CustomValidator extends Validators {
    static alphaNumeric(control) {
        const regex = /^[0-9a-zA-Z]+$/;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }
    static alphaNumericWithoutSpace(control) {
        const regex = /^[a-zA-Z0-9]+$/i;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }
    static alphaOnlyWithoutSpace(control) {
        const regex = /^[a-zA-Z]/;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
    }
    static email(control) {
        // tslint:disable-next-line:max-line-length
        const regex = /^(([^<>\-()\~|`\#\=\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,4}))$/;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
    }
    static numberOnly(control) {
        const regex = /^[0-9]*$/;
        if ((control.value || control.touched) && !regex.test(control.value)) {
            return { pattern: true };
        }
    }
    static alphaNumericHyphenUnderscoreSpace(control) {
        const regex = /^[-_ a-zA-Z0-9]+$/;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
    }
    static alphaNumericWithoutOnlyNumber(control) {
        // It will not accept only numeric input. 
        // It will accept hyphen, Underscore, space
        const regex = /^(?![0-9\s]*$)[-_ a-zA-Z0-9]+$/;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
    }
    static alteration(control) {
        const regex = /[|]/g;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
    }
    static mobileno(control) {
        const regex = /^((\\+91-?)|0)?[0-9]{10}$/g;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }
    static charAndSpace(control) {
        const regex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }
    static charNumberHyphenUnderscoreAndSpace(control) {
        // const regex = /^[A-Za-z_-][A-Za-z0-9_-]+$/;
        const regex = /^[a-z\d\-_\s]+$/i;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }
    static password(control) {
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/g;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }
    static ssn(control) {
        const regex = /^[0-9]{9}$/g;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }
    static fax(control) {
        const regex = /^(\+?\d{1,}(\s?|\-?)\d*(\s?|\-?)\(?\d{2,}\)?(\s?|\-?)\d{3,}\s?\d{3,})$/g;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }
    static removeSpecializedSybmols(control) {
        const regex = /^[^<>'\"/;%#$^]*$/;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }
    static charOnly(control) {
        const regex = /^[a-zA-Z]+$/;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }
    static autoCompletevalueSelected(myArray, keyinput) {
        return (c) => {
            if (!c.value || (!c.dirty && c.value)) {
                return null;
            }
            const selectboxValue = c.value;
            const pickedOrNot = myArray.filter((alias) => {
                if (keyinput) {
                    return alias[keyinput] === selectboxValue[keyinput];
                }
                else {
                    return selectboxValue === alias;
                }
            });
            if (pickedOrNot.length > 0) {
                // everything's fine. return no error. therefore it's null.
                return null;
            }
            else {
                // there's no matching selectboxvalue selected. so return match error.
                return { match: true };
            }
        };
    }
    static address(control) {
        const regex = /^(?!\s*$)[a-zA-Z0-9_@.\/#&*-\:\s,\[\]\"'-]+$/;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }
    static zipcode(control) {
        const regex = /^[0-9]{5}$/g;
        if (control.value && !regex.test(control.value)) {
            return { pattern: true };
        }
        return null;
    }
    static strong(control) {
        if (/[A-Z]/.test(control.value)) {
            return null;
        }
        return { strong: true };
    }
    static gstn(control) {
        let timeout;
        if (control.value && control.value !== null) {
            if (/\d{2}[a-zA-Z]{5}\d{4}[a-zA-Z]{1}[a-zA-Z\d]{1}[zZ]{1}[a-zA-Z\d]{1}/.test(control.value)) {
                if (timeout) {
                    clearTimeout(timeout);
                }
                timeout = setTimeout(() => {
                    control.setValue(control.value.toUpperCase().trim());
                }, 1000);
                return null;
            }
            return { pattern: true };
        }
        return null;
    }
    static pan(control) {
        let timeout;
        if (control.value && control.value !== null) {
            if (/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test(control.value)) {
                if (timeout) {
                    clearTimeout(timeout);
                }
                timeout = setTimeout(() => {
                    control.setValue(control.value.toUpperCase().trim());
                }, 1000);
                return null;
            }
            return { pattern: true };
        }
        return null;
    }
}
export function MustMatch(controlName, matchingControlName) {
    return (formGroup) => {
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
        }
        else {
            matchingControl.setErrors(null);
        }
    };
}
export function MustNotMatch(controlName, matchingControlName) {
    return (formGroup) => {
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
        }
        else {
            matchingControl.setErrors(null);
        }
    };
}
export function minMax(controlName, matchingControlName) {
    return (formGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.minMax) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        // set error on matchingControl if validation fails
        if (matchingControl.value <= control.value) {
            matchingControl.setErrors({ minMax: true });
            return { pattern: true };
        }
        else {
            matchingControl.setErrors(null);
        }
    };
}
//# sourceMappingURL=custom.validator.js.map