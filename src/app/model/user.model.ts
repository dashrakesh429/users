export interface userData {
    id?: number,
    userName?: string,
    email?: string,
    addressGroup?: addressGroup[]
}

export interface addressGroup {
    city?: string,
    state?: string,
    pincode?: string
}