export interface AssociationQuery {
    limit: number
    offset: number
    filter: string
}

export interface AssociationData {
    location: string
    device: string
}

export type AssociationStore = AssociationData[]