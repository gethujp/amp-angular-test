import { Component, OnInit ,Input,HostListener} from '@angular/core';
import { ProductService } from '../../services/product-service.service'
import {Product} from '../../models/product.model'
import {CartServiceService} from '../../services/cart-service.service'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  private products: Product[];

  
  constructor(private productService: ProductService,
    private cartService: CartServiceService ){ }

  add(id:string) :void {
    this.cartService.addToCart(id);
   }

  ngOnInit() {
    this.products = this.productService.findAll();
  }
}
