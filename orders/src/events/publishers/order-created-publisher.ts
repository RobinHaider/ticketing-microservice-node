import {
  OrderCreatedEvent,
  Publisher,
  Subjects,
} from '@robinhaider3/ticketing-common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
