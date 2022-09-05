import request from 'supertest';
import { app } from '../../app';

it('returns 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'robin@gmail.com',
      password: 'password',
    })
    .expect(201);
});

// test for invalid email
it('returns 400 with for invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'invalid email',
      password: 'password',
    })
    .expect(400);
});

// form invalid password
it('returns 400 with for invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'robin@gmail.com',
      password: 'p',
    })
    .expect(400);
});

// form invalid password and email
it('returns 400 with for invalid email and password', async () => {
  return request(app).post('/api/users/signup').send({}).expect(400);
});

// uniqe email
it('returns 400 for duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'robin@gmail.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'robin@gmail.com',
      password: 'password',
    })
    .expect(400);
});

// check cookie
it('set cookie on successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'robin@gmail.com',
      password: 'password',
    })
    .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});