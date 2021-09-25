export class ClientModel {
  id!: number;
  name: string = '';
  email: string = '';
  telephone: string = '';
  billingAddress: any = {
    repName: '',
    address: '',
    city: '',
    postalCode: 0,
    state: '',
  };
}
