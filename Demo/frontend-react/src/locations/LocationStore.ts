export interface LocationQuery {
    limit: number
    offset: number
    filter: string
}

export interface LocationData {
    location: string
}

export type LocationStore = LocationData[]