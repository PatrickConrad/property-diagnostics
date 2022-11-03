export interface IAddress {
    streetAdress1: string,
    streetAdress2?: string,
    city: string,
    state: string,
    zipCode: number,
    apartment?: string,
    country?: string
}

export interface Property {
    id: string,
    owners: IClient[],
    address: IAddress
}

export interface IClient {
    id: string,
    name: string,
    properties?: Property[]
}
