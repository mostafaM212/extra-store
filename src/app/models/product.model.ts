export class Product {
  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }
  constructor(
    private _id: number,
    public title: string,
    public price: string,
    public category: string,
    public image: string,
    public description: string,
    public rating: { rate: number; count: number },
    public quantity: number | null = null
  ) {}
}
