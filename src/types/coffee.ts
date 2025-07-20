export interface Coffee {
  id: number;
  name: string;
  description: string;
  composition: string;
  origin: string;
  roastLevel: string;
  intensity: number;
  imageUrl: string;
  details: {
    price250g: number;
    price500g: number;
    price1kg: number;
    brewTime: string;
    temperature: string;
    grindSize: string;
    notes: string[];
  };
}

export interface OrderData {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  coffee_type: string;
  package_size: string;
  quantity: number;
  total_price: number;
}