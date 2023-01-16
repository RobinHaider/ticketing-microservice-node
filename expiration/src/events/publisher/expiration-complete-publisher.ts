import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@robinhaider3/ticketing-common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
