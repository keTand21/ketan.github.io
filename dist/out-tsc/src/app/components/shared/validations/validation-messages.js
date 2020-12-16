const commanPattern = 'should be of [a-zA-Z0-9_] only.';
// const addressPattern = 'should contain [ a-z A-Z 0-9 _ @  # . / & * - : , [] " \' ] characters only.';
export const ValidationMessages = {
    USER: {
        FirstName: [
            { type: 'required', message: 'First name is required' },
            { type: 'minlength', message: 'First name must be at least 2 characters long' },
            { type: 'maxlength', message: 'First name cannot be more than 25 characters long' },
            { type: 'pattern', message: 'First name must contain only letters' },
        ],
        LastName: [
            { type: 'required', message: 'Last name is required' },
            { type: 'minlength', message: 'Last name must be at least 2 characters long' },
            { type: 'maxlength', message: 'Last name cannot be more than 25 characters long' },
            { type: 'pattern', message: 'Last name must contain only letters' },
        ],
        Gender: [
            { type: 'required', message: 'Select Gender' }
        ],
        MobileNo: [
            { type: 'required', message: 'Mobile no. is required' },
            { type: 'minlength', message: 'Mobile no. must be 10 digit number' },
            { type: 'maxlength', message: 'Mobile no. must be 10 digit number' },
            { type: 'pattern', message: 'Mobile no. must contain only numbers' },
        ],
        MobileNoAlt: [
            { type: 'minlength', message: 'Alternate mobile no. must be 10 digit number' },
            { type: 'maxlength', message: 'Alternate mobile no. must be 10 digit number' },
            { type: 'mustNotMatch', message: 'Alter mobile no. must be different than mobile no' },
        ],
        EmailId: [
            { type: 'required', message: 'Email id is required' },
            { type: 'pattern', message: 'Email id is must be valid' },
        ],
        Password: [
            { type: 'required', message: 'Password is required' },
            { type: 'minlength', message: 'Password should be minimum 6 characters' },
            { type: 'maxlength', message: 'Password must be 20 digit number' },
        ],
        ConfirmPassword: [
            { type: 'required', message: 'Confirm Password is required' },
            { type: 'minlength', message: 'Confirm Password should be minimum 6 characters' },
            { type: 'maxlength', message: 'Confirm Password must be 20 digit number' },
            { type: 'mustMatch', message: 'Confirm Password must match with Password' },
        ]
    },
    Business: {
        BusinessName: [
            { type: 'required', message: 'Business name is required' },
            { type: 'pattern', message: 'Business name is invalid' },
            { type: 'alreadyExist', message: 'Business name already exist' },
            { type: 'unableToCheckWithServer', message: 'Unable to check with server' },
            { type: 'minlength', message: 'Business name must be at least 2 characters long' },
            { type: 'maxlength', message: 'Business name cannot be more than 100 characters long' },
        ],
        AddressLine1: [
            { type: 'required', message: 'Address line 1 is required' },
            { type: 'minlength', message: 'Address line 1 must be at least 2 characters long' },
            { type: 'maxlength', message: 'Address line 1 cannot be more than 255 characters long' },
        ],
        AddressLine2: [
            // { type: 'required', message: 'Address line 2 is required' },
            { type: 'minlength', message: 'Address line 2 must be at least 2 characters long' },
            { type: 'maxlength', message: 'Address line 2 cannot be more than 255 characters long' },
        ],
        Place: [
            { type: 'required', message: 'Place is required' },
            { type: 'minlength', message: 'Place must be at least 2 characters long' },
            { type: 'maxlength', message: 'Place cannot be more than 100 characters long' },
        ],
        Tahsil: [
            { type: 'required', message: 'Tahsil is required' },
            { type: 'minlength', message: 'Tahsil must be at least 2 characters long' },
            { type: 'maxlength', message: 'Tahsil cannot be more than 100 characters long' },
        ],
        Dist: [
            { type: 'required', message: 'District is required' },
            { type: 'minlength', message: 'District must be at least 2 characters long' },
            { type: 'maxlength', message: 'District cannot be more than 255 characters long' },
        ],
        State: [
            { type: 'required', message: 'State is required' }
        ],
        Pincode: [
            { type: 'required', message: 'Pincode is required' },
            { type: 'minlength', message: 'Pincode must be 6 digit' },
            { type: 'maxlength', message: 'Pincode must be 6 digit' },
        ],
        Landmark: [
            { type: 'required', message: 'Landmark is required' },
            { type: 'minlength', message: 'Landmark must be at least 2 characters long' },
            { type: 'maxlength', message: 'Landmark cannot be more than 255 characters long' },
        ],
        StatusInfo: [
            { type: 'required', message: 'Status info is required' },
            { type: 'minlength', message: 'Status info must be at least 10 characters long' },
            { type: 'maxlength', message: 'Status info cannot be more than 255 characters long' },
        ],
        CustomerType: [
            { type: 'required', message: 'Customer type is required' }
        ],
        Licence20: [
            { type: 'required', message: 'Licence20 is required' }
        ],
        Licence21: [
            { type: 'required', message: 'Licence21 is required' }
        ],
        ValidFrom: [
            { type: 'required', message: 'Valid from date is required' }
        ],
        ValidTill: [
            { type: 'required', message: 'Valid till is date required' }
        ],
        Gstn: [
            { type: 'required', message: 'GSTN is required' },
            { type: 'pattern', message: 'GSTN must be valid, eg. 11ABCDE2233A4ZU' }
        ],
        Pan: [
            { type: 'required', message: 'PAN is required' },
            { type: 'pattern', message: 'PAN must be valid, eg. ABCDE1234F' }
        ],
        PanImage: [
            { type: 'required', message: 'PAN image is required' },
        ],
    }
};
//# sourceMappingURL=validation-messages.js.map