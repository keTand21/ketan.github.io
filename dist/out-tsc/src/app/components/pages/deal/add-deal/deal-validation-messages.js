const commanPattern = 'should be of [a-zA-Z0-9_] only.';
// const addressPattern = 'should contain [ a-z A-Z 0-9 _ @  # . / & * - : , [] " \' ] characters only.';
export default {
    ProdTitle: [
        { type: 'required', message: 'Product title is required' },
        { type: 'pattern', message: 'Product title is invalid' },
        // { type: 'alreadyExist', message: 'Product title already exist' },
        { type: 'unableToCheckWithServer', message: 'Unable to check with server' },
        { type: 'minlength', message: 'Product title must be at least 2 characters long' },
        { type: 'maxlength', message: 'Product title cannot be more than 100 characters long' },
    ],
    CompanyName: [
        { type: 'required', message: 'Company name is required' }
    ],
    PackType: [
        { type: 'required', message: 'Pack type is required' }
    ],
    PackSize: [
        { type: 'required', message: 'Pack size is required' }
    ],
    StartOn: [
        { type: 'required', message: 'Deal start on is required' },
    ],
    EndOn: [
        { type: 'required', message: 'Deal end on is required' },
    ],
    ActualStock: [
        { type: 'required', message: 'Actual stock is required' },
        { type: 'min', message: 'Actual stock must be at least 1' },
        { type: 'max', message: 'Actual stock cannot be more than 99999' },
    ],
    AvailableStock: [
        { type: 'required', message: 'Available stock is required' },
        { type: 'min', message: 'Available stock must be at least 0' },
        { type: 'max', message: 'Available stock cannot be more than 99999' },
    ],
    Mrp: [
        { type: 'required', message: 'Mrp is required' },
        { type: 'min', message: 'Mrp must be at least 1' }
    ],
    Ptr: [
        { type: 'required', message: 'Ptr is required' },
        { type: 'largeThanMrp', message: `Ptr can not be more than Mrp` },
    ],
    Discount: [
        { type: 'required', message: 'Percentage is required' },
        { type: 'min', message: 'Percentage must be at least 0' },
        { type: 'max', message: 'Percentage cannot be more than 100' },
    ],
    ImageWeb1: [
        { type: 'required', message: 'Web image is required' },
    ],
    ImageMobile1: [
        { type: 'required', message: 'Mobile image is required' },
    ],
    Buy: [
        { type: 'required', message: 'Buy  is required' },
        { type: 'min', message: 'Buy must be at least 0' },
        { type: 'max', message: 'Buy cannot be more than 99999' },
    ],
    Get: [
        { type: 'required', message: 'Get  is required' },
        { type: 'min', message: 'Get must be at least 0' },
        { type: 'max', message: 'Get cannot be more than 99999' },
    ],
    DealScheme: [
        { type: 'required', message: 'Deal scheme is required' }
    ],
    Gst: [
        { type: 'required', message: 'Gst is required' }
    ],
    DealRate: [
        { type: 'required', message: 'Deal rate is required' }
    ],
    ProdExpiryDate: [
        { type: 'required', message: 'Product expiry Date is required' },
    ],
    MaxQtyPerRetailer: [
        { type: 'required', message: 'Max qty per retailer is required' },
    ],
    MinQtyPerRetailer: [
        { type: 'required', message: 'Min qty per retailer is required' },
        { type: 'maxThanMaxQtyPerRetailer', message: 'Min qty can not be more than Max Qty' },
    ],
    BannerImage: [
        { type: 'required', message: 'Banner Image is required' },
    ],
};
//# sourceMappingURL=deal-validation-messages.js.map