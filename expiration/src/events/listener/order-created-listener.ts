import {
  Listener,
  OrderStatus,
  Subjects,
} from '@robinhaider3/ticketing-common';
import { OrderCreatedEvent } from '@robinhaider3/ticketing-common/build/events/order-events/order-created-event';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  onMessage(data: OrderCreatedEvent['data'], msg: Message): void {
    throw new Error('Method not implemented.');
  }
}
