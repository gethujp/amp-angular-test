import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[];
  constructor() {
      this.products = [
        { id: '1', name: 'Ice cream', price: 6, image: 'ice_cream.jpg', description: 'Strawberries & Cream 1L Cream (22%), skim milk concentrate, strawberry sauce [strawberries, sugar, water, thickener (1442).' },
        { id: '2', name: 'Chocolate', price: 4, image: 'chocolate.jpeg', description: 'Sugar, vegetable fats, cocoa butter, cocoa mass, whole milk powder, skim milk powder, lactose, milk fat, emulsifier (soy lecithin), barley malt extract, flavourings.' },
        { id: '3', name: 'Chicken', price: 9, image: 'chicken.jpg', description: 'Fried chicken is a dish consisting of chicken pieces usually from broiler chickens which have been floured or battered and then pan-fried, deep fried, or pressure fried.' },
        { id: '4', name: 'Bread', price: 2, image: 'bread.jpeg', description: 'Bread is a staple food prepared from a dough of flour and water, usually by baking' }
    ];
  }

  findAll(): Product[] {
    return this.products;
  }

  find(id: string): Product {
    return this.products[this.getSelectedIndex(id)];
  }

  private getSelectedIndex(id: string) {
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id == id) {
              return i;
          }
      }
      return -1;
  }
}
