export interface SIGNUP {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    isadmin: number;
    phone: string;
    companyname?: string;
    companydesc?: string;
    logo?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
}

export interface SIGNIN {
    email: string;
    password: string;
}

export interface ITEMS {
    id: string;
    itemname: string;
    type: string;
    category: string;
    price: string;
    description: string;
    quantity: string;
    image: string;
    createdAt?: string;
    updatedAt?: string;
}