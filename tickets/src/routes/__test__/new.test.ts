import request from 'supertest';
import { app } from '../../app';
import { getCookie } from '../../helpers/signin-test-helper';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';

it('has a route handler to /api/tickets for post request', async () => {
  const response = await request(app).post('/api/tickets').send({});
  expect(response.status).not.toEqual(404);
});

it('can only be access if user is signedin', async () => {
  await request(app).post('/api/tickets').send({}).expect(401);
});

it('return a status other than 401 if user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', getCookie())
    .send({});
  console.log(response.status);
  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', getCookie())
    .send({
      title: '',
      price: 10,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', getCookie())
    .send({
      price: 10,
    })
    .expect(400);
});

it('return an error if an invalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', getCookie())
    .send({
      title: 'newtitle',
      price: -10,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', getCookie())
    .send({
      title: 'newtitle',
    })
    .expect(400);
});

it('create a ticket with valid input', async () => {
  // add in a check to make sure the ticket is saved
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const title = 'newtitle';
  const price = 20;

  await request(app)
    .post('/api/tickets')
    .set('Cookie', getCookie())
    .send({ title, price })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].title).toEqual(title);
  expect(tickets[0].price).toEqual(price);
});

it('publish an event', async () => {
  const title = 'newtitle';
  const price = 20;

  await request(app)
    .post('/api/tickets')
    .set('Cookie', getCookie())
    .send({ title, price })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
