import request from 'supertest';
import { app } from '../../app';
import { generateMongoosId } from '../../helpers/mongoos_id';
import { getCookie } from '../../helpers/signin-test-helper';

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

it('returns a 400 if user provies invalid title and price', async () => {});

it('returns a 404 if provided id does not exist', async () => {});

it('update if user provide valid input', async () => {});
