import { Product } from './product.model';
export class Cart {
  constructor(
    private id: number,
    private userId: number,
    public date: Date,
    public products: Product[],
    public totalPrice?: number
  ) {}
}
