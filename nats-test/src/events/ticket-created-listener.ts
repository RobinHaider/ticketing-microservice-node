import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { Subjects } from './subjects';
import { TicketCreatedEvent } from './ticket-created-event';

// using abastract class
export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;

  queueGroupName = 'payment-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
    console.log('Event Data', data);
    console.log(data.id);

    msg.ack();
  }
}
