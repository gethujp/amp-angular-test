import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {CartItem} from '../../models/cart-item.model'
import {ProductService} from '../../services/product-service.service'
import { CartServiceService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	private items: CartItem[] = [];
	private total: number = 0;

	constructor(
		private activatedRoute: ActivatedRoute,
		private productService: ProductService , private cartService: CartServiceService
	) { }

	ngOnInit() {
		// subscribing to the values from service.
		this.cartService.cartItems.subscribe(itemList => this.items = itemList);
		this.cartService.currentTotal.subscribe(totalSub => this.total = totalSub)
	}
	remove(id: string): void {
		this.cartService.remove(id);
	}

	update(id: string,qty:number):void{
		this.cartService.update(id,qty);
	}

}
