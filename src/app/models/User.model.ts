export class User {
  public get _password(): string {
    return this.password;
  }
  public set _password(value: string) {
    this.password = value;
  }
  public get _id(): number {
    return this.id;
  }
  public set _id(value: number) {
    this.id = value;
  }
  constructor(
    private id: number,
    public email: string,
    public username: string,
    private password: string,
    public name: { firstname: string; lastname: string },
    public address: {
      city: string;
      street: string;
      number: number;
      zipcode: string;
      geolocation: {
        lat: string;
        long: string;
      };
    },
    public phone: string
  ) {}
}
