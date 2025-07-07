import { Order, OrderStatus, OrderNotification } from '@/types/order';
import { sendOrderNotification } from '@/services/notificationService';

// Mock orders data
export const mockOrders: Order[] = [
  {
    id: 'order-001',
    userId: '2',
    items: [
      {
        id: 'item-001',
        productId: 'prod-001',
        name: 'Bolsa para basura 90x120',
        price: 149.99,
        quantity: 2,
        imageUrl: '/placeholder.svg',
      },
      {
        id: 'item-002',
        productId: 'prod-002',
        name: 'Rollo de polietileno 2m',
        price: 299.99,
        quantity: 1,
        imageUrl: '/placeholder.svg',
      },
    ],
    status: 'delivered',
    totalAmount: 599.97,
    shippingAddress: {
      street: 'Av. Insurgentes 123',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '03100',
      country: 'México',
    },
    paymentMethod: 'Tarjeta de crédito',
    createdAt: '2023-09-15T10:30:00Z',
    updatedAt: '2023-09-18T14:20:00Z',
    trackingNumber: 'MX9876543210',
    customerEmail: 'customer@example.com',
    notifications: [
      {
        id: 'notif-001',
        type: 'order_confirmation',
        sentAt: '2023-09-15T10:35:00Z',
        emailTo: 'customer@example.com',
        subject: 'Confirmación de Pedido #order-001 - WEM México',
        status: 'sent'
      },
      {
        id: 'notif-002',
        type: 'shipment_update',
        sentAt: '2023-09-17T09:20:00Z',
        emailTo: 'customer@example.com',
        subject: 'Tu pedido #order-001 ha sido enviado - WEM México',
        status: 'sent'
      },
      {
        id: 'notif-003',
        type: 'delivery_confirmation',
        sentAt: '2023-09-18T14:25:00Z',
        emailTo: 'customer@example.com',
        subject: 'Tu pedido #order-001 ha sido entregado - WEM México',
        status: 'sent'
      }
    ]
  },
  {
    id: 'order-002',
    userId: '2',
    items: [
      {
        id: 'item-003',
        productId: 'prod-003',
        name: 'Stretch film industrial 18"',
        price: 399.99,
        quantity: 3,
        imageUrl: '/placeholder.svg',
      },
    ],
    status: 'shipped',
    totalAmount: 1199.97,
    shippingAddress: {
      street: 'Calle Reforma 456',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '06500',
      country: 'México',
    },
    paymentMethod: 'Transferencia bancaria',
    createdAt: '2023-10-20T09:15:00Z',
    updatedAt: '2023-10-21T11:45:00Z',
    trackingNumber: 'MX1234567890',
    customerEmail: 'customer@example.com',
    notifications: [
      {
        id: 'notif-004',
        type: 'order_confirmation',
        sentAt: '2023-10-20T09:20:00Z',
        emailTo: 'customer@example.com',
        subject: 'Confirmación de Pedido #order-002 - WEM México',
        status: 'sent'
      },
      {
        id: 'notif-005',
        type: 'shipment_update',
        sentAt: '2023-10-21T11:50:00Z',
        emailTo: 'customer@example.com',
        subject: 'Tu pedido #order-002 ha sido enviado - WEM México',
        status: 'sent'
      }
    ]
  },
  {
    id: 'order-003',
    userId: '2',
    items: [
      {
        id: 'item-004',
        productId: 'prod-004',
        name: 'Bolsas para camiseta 30x40',
        price: 89.99,
        quantity: 5,
        imageUrl: '/placeholder.svg',
      },
      {
        id: 'item-005',
        productId: 'prod-005',
        name: 'Bolsas transparentes 20x30',
        price: 69.99,
        quantity: 2,
        imageUrl: '/placeholder.svg',
      },
    ],
    status: 'processing',
    totalAmount: 589.93,
    shippingAddress: {
      street: 'Av. Universidad 789',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '04360',
      country: 'México',
    },
    paymentMethod: 'PayPal',
    createdAt: '2023-11-05T15:45:00Z',
    updatedAt: '2023-11-06T09:30:00Z',
    customerEmail: 'customer@example.com',
    notifications: [
      {
        id: 'notif-006',
        type: 'order_confirmation',
        sentAt: '2023-11-05T15:50:00Z',
        emailTo: 'customer@example.com',
        subject: 'Confirmación de Pedido #order-003 - WEM México',
        status: 'sent'
      }
    ]
  },
];

// Export OrderStatus correctly using export type
export type { OrderStatus };

// Function to get orders by user ID
export const getOrdersByUserId = (userId: string): Order[] => {
  return mockOrders.filter(order => order.userId === userId);
};

// Function to get all orders
export const getAllOrders = (): Order[] => {
  return mockOrders;
};

// Function to get order by ID
export const getOrderById = (orderId: string): Order | undefined => {
  return mockOrders.find(order => order.id === orderId);
};

// Function to update order status
export const updateOrderStatus = (
  orderId: string,
  newStatus: OrderStatus
): Order | undefined => {
  const orderIndex = mockOrders.findIndex(order => order.id === orderId);
  
  if (orderIndex === -1) {
    return undefined;
  }
  
  // Clone the order to avoid mutating the original
  const updatedOrder = { 
    ...mockOrders[orderIndex],
    status: newStatus,
    updatedAt: new Date().toISOString()
  };
  
  // Add tracking number if status is shipped
  if (newStatus === 'shipped' && !updatedOrder.trackingNumber) {
    updatedOrder.trackingNumber = `MX${Math.floor(Math.random() * 10000000000)}`;
  }
  
  // In a real app, this would update the database
  // For now, update the mock data
  mockOrders[orderIndex] = updatedOrder;
  
  // Send appropriate notification based on status change
  if (updatedOrder.customerEmail) {
    let notificationType: 'shipment_update' | 'delivery_confirmation' | 'order_cancelled' | null = null;
    
    switch (newStatus) {
      case 'shipped':
        notificationType = 'shipment_update';
        break;
      case 'delivered':
        notificationType = 'delivery_confirmation';
        break;
      case 'cancelled':
        notificationType = 'order_cancelled';
        break;
      default:
        break;
    }
    
    if (notificationType) {
      sendOrderNotification(updatedOrder, notificationType)
        .then(notification => {
          if (notification) {
            // In a real app, this would update the database
            // For now, update the mock data
            if (!updatedOrder.notifications) {
              updatedOrder.notifications = [];
            }
            updatedOrder.notifications.push(notification);
          }
        });
    }
  }
  
  return updatedOrder;
};

// Function to create a new order
export const createOrder = (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order => {
  const now = new Date().toISOString();
  
  const newOrder: Order = {
    ...order,
    id: `order-${mockOrders.length + 1}`.padStart(9, '0'),
    createdAt: now,
    updatedAt: now,
    status: 'pending',
  };
  
  // In a real app, this would update the database
  // For now, update the mock data
  mockOrders.push(newOrder);
  
  // Send order confirmation notification
  if (newOrder.customerEmail) {
    sendOrderNotification(newOrder, 'order_confirmation')
      .then(notification => {
        if (notification) {
          // In a real app, this would update the database
          // For now, update the mock data
          if (!newOrder.notifications) {
            newOrder.notifications = [];
          }
          newOrder.notifications.push(notification);
        }
      });
  }
  
  return newOrder;
};
