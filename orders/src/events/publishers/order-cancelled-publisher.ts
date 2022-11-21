import {
  OrderCancelledEvent,
  Publisher,
  Subjects,
} from '@robinhaider3/ticketing-common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
