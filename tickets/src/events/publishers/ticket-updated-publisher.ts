import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@robinhaider3/ticketing-common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
