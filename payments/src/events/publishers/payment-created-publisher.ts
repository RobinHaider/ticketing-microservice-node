import {
  PaymentCreatedEvent,
  Publisher,
  Subjects,
} from '@robinhaider3/ticketing-common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
