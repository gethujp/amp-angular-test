import { Injectable } from '@angular/core';
import {CartItem} from '../models/cart-item.model'
import {ProductService} from '../services/product-service.service'
import {CartComponent}  from '../components/cart/cart.component'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  private items: CartItem[] = [];
  private total: number = 0;

  // Exposing service variable to external components
  itemList: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  cartItems = this.itemList.asObservable();

  private totalSub = new BehaviorSubject(0);
  currentTotal = this.totalSub.asObservable();

  constructor(private productService: ProductService) { }

  // Method to load cart data
  loadCart(): void {
		this.total = 0;
		this.items = [];
		let cart = JSON.parse(localStorage.getItem('cart'));
		for (var i = 0; i < cart.length; i++) {
			let item = JSON.parse(cart[i]);
			this.items.push({
				product: item.product,
				quantity: item.quantity
			});
			this.total += item.product.price * item.quantity;
    }
    this.itemList.next(this.items);
    this.totalSub.next(this.total);
	}

  // Method to remove a product from cart
	remove(id: string): void {
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		let index: number = -1;
		for (var i = 0; i < cart.length; i++) {
			let item: CartItem = JSON.parse(cart[i]);
			if (item.product.id == id) {
				cart.splice(i, 1);
				break;
			}
    }
    
		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadCart();
  }
  
  // Method to add products to cart.
  addToCart(id: string): void{
      var id = id;
      if (id) {
        var item: CartItem = {
          product: this.productService.find(id),
          quantity: 1
        };
        if (localStorage.getItem('cart') == null) {
          let cart: any = [];
          cart.push(JSON.stringify(item));
          localStorage.setItem('cart', JSON.stringify(cart));
        } else {
          let cart: any = JSON.parse(localStorage.getItem('cart'));
          let index: number = -1;
          for (var i = 0; i < cart.length; i++) {
            let item: CartItem = JSON.parse(cart[i]);
            if (item.product.id == id) {
              index = i;
              break;
            }
          }
          if (index == -1) {
            cart.push(JSON.stringify(item));
            localStorage.setItem('cart', JSON.stringify(cart));
          } else {
            let item: CartItem = JSON.parse(cart[index]);
            item.quantity += 1;
            cart[index] = JSON.stringify(item);
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        }
        this.loadCart();
      } else {
        this.loadCart();
      }
  }

  // Update qty in cart
  update(id: string , qty: number): void {
    var id = id;
    var qty = qty;
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		let index: number = -1;
		for (var i = 0; i < cart.length; i++) {
			let item: CartItem = JSON.parse(cart[i]);
			if (item.product.id == id) {
        item.quantity =qty;
        cart[i]=JSON.stringify(item);
				break;
			}
    }

		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadCart();
  }


}
