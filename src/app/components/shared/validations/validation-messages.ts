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
        Otp: [
            { type: 'required', message: 'OTP. is required' },
            { type: 'minlength', message: 'OTP no. must be 6 digit number' },
            { type: 'maxlength', message: 'OTP no. must be 6 digit number' },
            { type: 'pattern', message: 'OTP no. must contain only numbers' },
        ],

        EmailId: [
            { type: 'required', message: 'Email id is required' },
            { type: 'pattern', message: 'Email id is must be valid' },
        ],
        Password: [
            { type: 'required', message: 'Password is required' },
            { type: 'minlength', message: 'Password should be minimum 8 characters' },
            { type: 'maxlength', message: 'Password cannot be more than 24 characters long' },
            { type: 'pattern', message: 'Password should contain at least one upper case char.' },
            { type: 'upper', message: 'Password should contain at least one upper case char.' },
            { type: 'lower', message: 'Password should contain at least one small case char.' },
            { type: 'number', message: 'Password should contain at least one digit.' },
            { type: 'special', message: 'Password should contain at least one Special character.' },
        ],
        ConfirmPassword: [
            { type: 'required', message: 'Confirm Password is required' },
            { type: 'minlength', message: 'Confirm Password should be minimum 8 characters' },
            { type: 'maxlength', message: 'Confirm Password cannot be more than 24 characters long' },
            { type: 'mustMatch', message: 'Confirm Password must match with Password' },
            { type: 'upper', message: 'Password should contain at least one upper case char.' },
            { type: 'lower', message: 'Password should contain at least one small case char.' },
            { type: 'number', message: 'Password should contain at least one digit.' },
            { type: 'special', message: 'Password should contain at least one Special character.' },
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
    },
    PICKUPORDER: {
        ExpectedPackageCount: [
            { type: 'required', message: 'Expected Package Count number is required' },
            { type: 'minlength', message: 'Expected Package Count number must be 1 digit number' },
            { type: 'maxlength', message: 'Expected Package Count number must be 1000 digit number' },

        ],
    },
    WAYBILLNUMBER: {
        WayBillNumber: [
            { type: 'required', message: 'Way Bill Number is required' },
            { type: 'minlength', message: 'Pincode must be 6 digit' },
            { type: 'maxlength', message: 'Pincode must be 6 digit' },
        ],
        Weight: [
            { type: 'required', message: 'Weight is required' },
            { type: 'minlength', message: 'Pincode must be 6 digit' },
            { type: 'maxlength', message: 'Pincode must be 6 digit' },
        ],

        DeliveryStatus: [
            { type: 'required', message: 'Status is required' },
        ],
    },

    INVOICENUMBER: {
        Weight: [
            { type: 'required', message: 'Weights is required' },
            { type: 'minlength', message: 'Pincode must be 6 digit' },
            { type: 'maxlength', message: 'Pincode must be 6 digit' },
        ],
        InvoiceNumber: [
            { type: 'required', message: 'Invoice Number is required' },
            { type: 'minlength', message: 'Invoice Number must be at least 2 characters long' },
            { type: 'maxlength', message: 'Invoice Number must be 6 digit' },
        ],
        InvoiceAmount: [
            { type: 'required', message: 'Invoice Amount is required' },
            { type: 'minlength', message: 'Invoice Amount must be 1 digit' },
            { type: 'maxlength', message: 'Invoice Amount must be 6 digit' },
        ],
        InvoiceDate: [
            { type: 'required', message: 'Invoice Date is required' },
        ],

    },
    MYPURCHASE: {
        EstimatedPrice: [
            { type: 'required', message: 'Estimated Price is required' },
            { type: 'minlength', message: 'Estimated Price must be 1 digit' },
            //  { type: 'maxlength', message: 'Estimated Price must be 6 digit' },
        ],
    },

    SIGNUPOTP: {
        MobileNo: [
            { type: 'required', message: 'Mobile No. is required' },
            { type: 'minlength', message: 'Mobile No. must be 10 digit number' },
            { type: 'maxlength', message: 'Mobile No. must be 10 digit number' },

        ],

        EmailId: [
            { type: 'required', message: 'Email id is required' },
            { type: 'pattern', message: 'Email id is must be valid' },
        ],
        MobileOtp: [
            { type: 'required', message: ' Mobile Otp No. is required' },
            { type: 'minlength', message: 'Mobile Otp No. must be 6 digit number' },
            { type: 'maxlength', message: 'Mobile Otp No. must be 6 digit number' },

        ],

        EmailOtp: [
            { type: 'required', message: 'Email Otp No. is required' },
            { type: 'minlength', message: 'Email Otp No. must be 6 digit number' },
            { type: 'maxlength', message: 'Email Otp No. must be 6 digit number' },
            { type: 'pattern', message: 'Email Otp No. must contain only numbers' },
        ],
    }




};
