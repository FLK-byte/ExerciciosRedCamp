import { IPokemon } from "./IPokemon"

export interface IDataApi {
    data: {
        data: [IPokemon],
        metaData: [{
            total: number,
            page: number
        }]
    }

}