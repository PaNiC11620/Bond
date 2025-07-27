export interface CartItem {
  id: string;
  coffeeId: number;
  coffeeName: string;
  coffeeImage: string;
  packageSize: string;
  quantity: number;
  pricePerItem: number;
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}