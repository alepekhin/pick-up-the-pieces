export interface DeviceQuery {
    limit: number
    offset: number
    filter: string
}

export interface DeviceData {
    device: string
}

export type DeviceStore = DeviceData[]