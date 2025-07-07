
export type OrderStatus = 
  | 'pending' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled';

export type NotificationType = 
  | 'order_confirmation' 
  | 'shipment_update' 
  | 'delivery_confirmation' 
  | 'order_cancelled';

export type OrderNotification = {
  id: string;
  type: NotificationType;
  sentAt: string;
  emailTo: string;
  subject: string;
  status: 'sent' | 'failed' | 'pending';
};

export type OrderItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

export type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
  notifications?: OrderNotification[];
  customerEmail?: string;
};
