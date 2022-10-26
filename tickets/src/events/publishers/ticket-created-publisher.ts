import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@robinhaider3/ticketing-common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
