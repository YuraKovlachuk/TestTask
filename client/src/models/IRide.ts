import {IStation} from "./IStation";

export interface IRide {
    id: number
    departureTime: string,
    arrivalTime: string,
    departureStation: IStation
    arrivalStation: IStation
}
