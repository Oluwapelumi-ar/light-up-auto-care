export class QuoteModel {
  id: string = '';
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
  //   isApproved: Boolean = false;
  //   isPending: Boolean = false;
}
