  export interface QuoteModel {
        id?: number;
        clientId:number;
        vehicleId:number;
        items : {
            item: string,
            unit: number,
            rate: number,
            amount: number
        }[]
      }