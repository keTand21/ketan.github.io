const commanPattern = 'should be of [a-zA-Z0-9_] only.';
// const addressPattern = 'should contain [ a-z A-Z 0-9 _ @  # . / & * - : , [] " \' ] characters only.';
export default {
    FirstName: [
        { type: 'required', message: 'First name is required' },
        { type: 'minlength', message: 'First name must be at least 2 characters long' },
        { type: 'maxlength', message: 'First name cannot be more than 10 characters long' },
    ],
    LastName: [
        { type: 'required', message: 'Last name is required' },
        { type: 'minlength', message: 'Last name must be at least 2 characters long' },
        { type: 'maxlength', message: 'Last name cannot be more than 10 characters long' },
    ],
    CustomerType: [
        { type: 'required', message: 'Customer Type  is required' },
    ],
    MobileNo: [
        { type: 'required', message: 'Mobile number is required' },
        { type: 'minlength', message: 'Mobile number must be at least 10 characters long' },
        { type: 'maxlength', message: 'Mobile number cannot be more than 10 characters long' },
        { type: 'alreadyexist', message: 'Mobile number already exist ' },
        { type: 'unableToCheckWithServer', message: 'Unable to check with server' },
        { type: 'pattern', message: 'Mobile number must contain only numbers' },
    ],
    MobileNoAlt: [
        { type: 'minlength', message: 'Mobile No must be at least 10 characters long' },
        { type: 'maxlength', message: 'Mobile No cannot be more than 10 characters long' },
        { type: 'mustNotMatch', message: 'Alter mobile no. must be different than mobile no.' },
    ],
    EmailId: [
        { type: 'required', message: 'Email Id is required' },
        { type: 'pattern', message: 'Email id is must be valid' },
    ],
    Password: [
        // { type: 'required', message: 'Password is required' },
        { type: 'minlength', message: 'Password must be at least 8 characters long' },
        { type: 'maxlength', message: 'Password cannot be more than 10 characters long' },
    ],
    ConfirmPassword: [
        // { type: 'required', message: 'Confirm Password is required' },
        { type: 'minlength', message: 'Confirm password must be at least 8 characters long' },
        { type: 'maxlength', message: 'Confirm password cannot be more than 10 characters long' },
        { type: 'mustMatch', message: 'Password and confirm password must same' }
    ],
};
//# sourceMappingURL=my-profile-validation-messages.js.map