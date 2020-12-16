export class DealModel {
    id?: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    city: string;
    zipcode: number;
    street: string;
    suite: string;
    lat: string;
    lng: string;
    cname: string;
    website: string;
    catchPhrase: string;
    bs: string;
    address: {
        city: string;
        geo: { lat: string, lng: string }
        street: string;
        suite: string;
        zipcode: number;
    }
    geo: string;
    company: {
        bs: string;
        catchPhrase: string;
        name: string;
    }
}
