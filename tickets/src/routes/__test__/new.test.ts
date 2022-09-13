import request from 'supertest';
import { app } from '../../app';
import { getCookie } from '../../helpers/signin-test-helper';

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

  await request(app)
    .post('/api/tickets')
    .set('Cookie', getCookie())
    .send({ title: 'newtitle', price: 20 })
    .expect(201);
});
