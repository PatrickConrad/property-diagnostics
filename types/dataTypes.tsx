import { Role } from "./authState"

export interface Projection {
    year: number,
    initial: number,
}

export interface  PropertyImage {
    id: string,
    src: string,
    caption: string,
    location: string,
    date: Date,
}              


export interface IProperty {
    id: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    lastInspectionDate: Date,
    scheduledInspectoinDate: Date,
    owners: string[],
    group?: string,
    images: {
        mainImage?: string,
        propertyImages?: PropertyImage[],
    },
    notes: string[],
    projections: {
        grounds: Projection[],
        envelope: Projection[],
        interior: Projection[],
        mechanical: Projection[],
        plumbing: Projection[],
        electrical: Projection[],
    },
    reserve?: IReport[]
}

export interface IReport {
    summary: string,
    
}

export interface IUser{
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password?: string
    roles: Role[],
}

type MemberStatus = "pending" | "active"

export interface IMember {
    id: string, 
    status: MemberStatus
}

export interface Group {
    id: string,
    name: string,
    members: IMember[]
}

export interface Item {
    name: string,
    location: string,
    
}

export type UsState = "Alabama" | "Alaska" | "Arizona" | "Arkansas" | "California" | "Canal Zone" | "Colorado" | "Connecticut" | "Delaware" | "District of Columbia" | "Florida" | "Georgia" | "Guam" | "Hawaii" | "Idaho" | "Illinois" | "Indiana" | "Iowa" | "Kansas" | "Kentucky" | "Louisiana" | "Maine" | "Maryland" | "Massachusetts" | "Michigan" | "Minnesota" | "Mississippi" | "Missouri" | "Montana" | "Nebraska" | "Nevada" | "New Hampshire" | "New Jersey" | "New Mexico" | "New York" | "North Carolina" | "North Dakota" | "Ohio" | "Oklahoma" | "Oregon" | "Pennsylvania" | "Puerto Rico" | "Rhode Island" | "South Carolina" | "South Dakota" | "Tennessee" | "Texas" | "Utah" | "Vermont" | "Virgin Islands" | "Virginia" | "Washington" | "Washington D.C." | "West Virginia" | "Wisconsin" | "Wyoming";

export type UsStatePostal = ["Alabama", "AL"] | ["Alaska", "AK"] | ["Arizona", "AZ"] | ["Arkansas", "AR"] | ["California", "CA"] | ["Canal Zone", "CZ"] | ["Colorado", "CO"] | ["Connecticut", "CT"] | ["Delaware", "DE"] | ["District of Columbia", "DC"] | ["Florida", "FL"] | ["Georgia", "GA"] | ["Guam", "GU"] | ["Hawaii", "HI"] | ["Idaho", "ID"] | ["Illinois", "IL"] | ["Indiana", "IN"] | ["Iowa", "IA"] | ["Kansas", "KS"] | ["Kentucky", "KY"] | ["Louisiana", "LA"] | ["Maine", "ME"] | ["Maryland", "MD"] | ["Massachusetts", "MA"] | ["Michigan", "MI"] | ["Minnesota", "MN"] | ["Mississippi", "MS"] | ["Missouri", "MO"] | ["Montana", "MT"] | ["Nebraska", "NE"] | ["Nevada", "NV"] | ["New Hampshire", "NH"] | ["New Jersey", "NJ"] | ["New Mexico", "NM"] | ["New York", "NY"] | ["North Carolina", "NC"] | ["North Dakota", "ND"] | ["Ohio", "OH"] | ["Oklahoma", "OK"] | ["Oregon", "OR"] | ["Pennsylvania", "PA"] | ["Puerto Rico", "PR"] | ["Rhode Island", "RI"] | ["South Carolina", "SC"] | ["South Dakota", "SD"] | ["Tennessee", "TN"] | ["Texas", "TX"] | ["Utah", "UT"] | ["Vermont", "VT"] | ["Virgin Islands", "VI"] | ["Virginia", "VA"] | ["Washington", "WA"] | ["West Virginia", "WV"] | ["Wisconsin", "WI"] | ["Wyoming", "WY" ] 