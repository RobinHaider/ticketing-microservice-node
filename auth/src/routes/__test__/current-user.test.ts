import request from 'supertest';
import { app } from '../../app';
import { getCookie } from '../../helpers/signin-test-helper';

it('responds with a details about current user', async () => {

  const cookie = await getCookie();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});


it('responds with a null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
