import request from 'supertest';
import { app } from '../../app';
import { generateMongoosId } from '../../helpers/mongoos_id';
import { getCookie } from '../../helpers/signin-test-helper';

it('returns 404 if ticket is not found', async () => {
  const id = generateMongoosId();
  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it('returns the ticket if the ticket is found', async () => {
  const title = 'concert';
  const price = 20;

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', getCookie())
    .send({ title, price })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
