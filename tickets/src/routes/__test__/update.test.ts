import request from 'supertest';
import { app } from '../../app';
import { generateMongoosId } from '../../helpers/mongoos_id';
import { getCookie } from '../../helpers/signin-test-helper';
import { natsWrapper } from '../../nats-wrapper';

it('returns a 404 if provided id does not exist', async () => {
  const id = generateMongoosId();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', getCookie())
    .send({ title: 'newtitle', price: 20 })
    .expect(404);
});

it('returns a 401 if user is not authenticated', async () => {
  const id = generateMongoosId();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: 'newtitle', price: 20 })
    .expect(401);
});

it('returns a 401 if user does not own the ticket', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', getCookie())
    .send({ title: 'newtitle', price: 20 });

  // sending the put request a another user, since getCookie generate new user every time
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', getCookie())
    .send({
      title: 'updatedTitle',
      price: 30,
    })
    .expect(401);
});

it('returns a 400 if user provies invalid title and price', async () => {
  const cookie = getCookie();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({ title: 'newtitle', price: 20 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 30,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'updateTitle',
      price: -30,
    })
    .expect(400);
});

it('update if user provide valid input', async () => {
  const cookie = getCookie();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({ title: 'newtitle', price: 20 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'updatedTitle',
      price: 100,
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual('updatedTitle');
  expect(ticketResponse.body.price).toEqual(100);
});

it('publish an event', async () => {
  const cookie = getCookie();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({ title: 'newtitle', price: 20 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'updatedTitle',
      price: 100,
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
