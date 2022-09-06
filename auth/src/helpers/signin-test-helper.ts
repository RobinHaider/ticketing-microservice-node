import request from 'supertest';
import { app } from '../app';

// auth for cookie
export const getCookie = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const authResponse = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = authResponse.get('Set-Cookie');
  return cookie;
};
