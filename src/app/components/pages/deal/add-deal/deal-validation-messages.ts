const commanPattern = 'should be of [a-zA-Z0-9_] only.';
// const addressPattern = 'should contain [ a-z A-Z 0-9 _ @  # . / & * - : , [] " \' ] characters only.';

export default {
    name: [
        { type: 'required', message: 'Name is required' },
        
    ],

    username: [
        { type: 'required', message: 'User Name is required' }
    ],

    phone: [
        { type: 'required', message: 'Mobile number is required' },
        { type: 'minlength', message: 'Mobile number must be at least 10 characters long' },
        { type: 'maxlength', message: 'Mobile number cannot be more than 10 characters long' },
    ],

    email: [
        { type: 'required', message: 'Email Id is required' },
        { type: 'pattern', message: 'Email id is must be valid' },
    ],


    city: [
        { type: 'required', message: 'City is required' }
    ],

    zipcode: [
        { type: 'required', message: 'Zipcode is required' }
    ],

    street: [
        { type: 'required', message: 'Street is required' },
    ],

    suite: [
        { type: 'required', message: 'Suite is required' },
    ],

    lat: [
        { type: 'required', message: 'Lat is required' },
        
    ],

    lng: [
        { type: 'required', message: 'Lng is required' },
      
    ],

    cname: [
        { type: 'required', message: 'Company Name is required' },
       
    ],

    website: [
        { type: 'required', message: 'Website is required' },
        { type: 'pattern', message: 'Website is must be valid' },
        
    ],

    catchPhrase: [
        { type: 'required', message: 'CatchPhrase is required' },
        
    ],

    bs: [
        { type: 'required', message: 'Bs is required' },
    ],

    
};

