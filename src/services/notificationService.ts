
import { OrderNotification, NotificationType, Order } from '@/types/order';
import { toast } from 'sonner';

// In a real app, this would connect to an email service provider
// like SendGrid, Mailchimp, etc.
export const sendEmail = async (
  to: string,
  subject: string,
  body: string
): Promise<boolean> => {
  console.log(`MOCK EMAIL SERVICE: Sending email to ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${body}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate success (95% of the time)
  const success = Math.random() > 0.05;
  
  if (!success) {
    console.error('Mock email service: Failed to send email');
  } else {
    console.log('Mock email service: Email sent successfully');
  }
  
  return success;
};

// Get notification template based on type
const getNotificationTemplate = (
  type: NotificationType, 
  order: Order
): { subject: string; body: string } => {
  const formattedDate = new Date(order.createdAt).toLocaleDateString();
  const formattedTotal = `$${order.totalAmount.toFixed(2)} MXN`;
  
  switch (type) {
    case 'order_confirmation':
      return {
        subject: `Confirmación de Pedido #${order.id} - WEM México`,
        body: `
          Hola,
          
          ¡Gracias por tu compra en WEM México!
          
          Tu pedido #${order.id} ha sido recibido y está siendo procesado.
          
          Detalles del pedido:
          - Fecha: ${formattedDate}
          - Total: ${formattedTotal}
          - Artículos: ${order.items.length}
          
          Puedes revisar el estado de tu pedido en cualquier momento en tu cuenta.
          
          Gracias por elegir WEM México.
        `
      };
    
    case 'shipment_update':
      return {
        subject: `Tu pedido #${order.id} ha sido enviado - WEM México`,
        body: `
          Hola,
          
          ¡Buenas noticias! Tu pedido #${order.id} ha sido enviado.
          
          Detalles de envío:
          - Número de seguimiento: ${order.trackingNumber || 'No disponible'}
          - Fecha de envío: ${new Date().toLocaleDateString()}
          
          Puedes revisar el estado de tu envío en cualquier momento en tu cuenta.
          
          Gracias por elegir WEM México.
        `
      };
    
    case 'delivery_confirmation':
      return {
        subject: `Tu pedido #${order.id} ha sido entregado - WEM México`,
        body: `
          Hola,
          
          Tu pedido #${order.id} ha sido entregado.
          
          Esperamos que estés satisfecho con tu compra. Si tienes alguna pregunta o comentario, no dudes en contactarnos.
          
          Gracias por elegir WEM México.
        `
      };
    
    case 'order_cancelled':
      return {
        subject: `Tu pedido #${order.id} ha sido cancelado - WEM México`,
        body: `
          Hola,
          
          Tu pedido #${order.id} ha sido cancelado.
          
          Si tienes alguna pregunta sobre esta cancelación, por favor contáctanos.
          
          Gracias por elegir WEM México.
        `
      };
      
    default:
      return {
        subject: `Actualización de tu pedido #${order.id} - WEM México`,
        body: `
          Hola,
          
          Hay una actualización sobre tu pedido #${order.id}.
          
          Por favor, revisa tu cuenta para más detalles.
          
          Gracias por elegir WEM México.
        `
      };
  }
};

// Send notification for an order
export const sendOrderNotification = async (
  order: Order,
  type: NotificationType
): Promise<OrderNotification | null> => {
  if (!order.customerEmail) {
    console.error('Cannot send notification: No customer email provided');
    return null;
  }
  
  const template = getNotificationTemplate(type, order);
  
  const notification: OrderNotification = {
    id: `notification_${Date.now()}`,
    type,
    sentAt: new Date().toISOString(),
    emailTo: order.customerEmail,
    subject: template.subject,
    status: 'pending'
  };
  
  try {
    const success = await sendEmail(
      order.customerEmail,
      template.subject,
      template.body
    );
    
    notification.status = success ? 'sent' : 'failed';
    
    if (success) {
      toast.success(`Notificación enviada: ${template.subject}`);
    } else {
      toast.error(`Error al enviar notificación: ${template.subject}`);
    }
    
    return notification;
  } catch (error) {
    console.error('Error sending notification:', error);
    notification.status = 'failed';
    toast.error(`Error al enviar notificación: ${template.subject}`);
    return notification;
  }
};
