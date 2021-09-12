  export class QuoteModel {
        id?: number;
        clientId!: number;
        vehicleId!: number;
        vehicleChasisNumber!: string;
        items!: {
          item: string;
          unit: number;
          rate: number;
          amount: number;
    }[];
      }