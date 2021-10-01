export class updateQuoteModel {
  clientId: string = '';
  vehicleId: string = '';
  items: any = [
    {
      item: '',
      unit: 0,
      rate: 0,
      amount: 0,
    },
  ];
  totalAmount: number = 0;
  isApproved: boolean = false;
  isPending: boolean = true;
}
