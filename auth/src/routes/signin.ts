import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '@robinhaider3/ticketing-common';
import { validateRequest } from '@robinhaider3/ticketing-common';
import { User } from '../models/user';
import { Password } from '../services/password';

const router = express.Router();

router.post('/api/users/signin', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must enter a password')
],validateRequest, async (req: Request, res: Response) => {
  // validation is handaled by - validationRequest middleware
  // const erros = validationResult(req);

  // if (!erros.isEmpty()) {
  //   throw new RequestValidationError(erros.array());
  // }

  const { email, password } = req.body;

  // check if user exist
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError('Invalid Credentials');
  }

  // password check
  const passwordMatch = await Password.compare(user.password, password);
  if (!passwordMatch) {
    throw new BadRequestError('Invalid Credentials');
  }

  // generate jwt
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!
  );

  // store it on session object
  req.session = {
    jwt: userJwt,
  };

  return res.status(200).send(user);
});

export { router as signinRouter };
