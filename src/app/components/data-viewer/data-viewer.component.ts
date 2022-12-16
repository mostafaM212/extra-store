import { Product } from 'src/app/models/product.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-viewer',
  templateUrl: './data-viewer.component.html',
  styleUrls: ['./data-viewer.component.css'],
})
export class DataViewerComponent implements OnInit {
  @Input('products') products: Product[] = [];
  @Input('date') date: Date | null = null;
  @Input('price') price: number | undefined = 0;
  dateString: string | undefined;
  constructor() {}

  ngOnInit(): void {
    if (this.date != null) {
      this.dateString = new Date(this.date).toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
  }
}
