import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-errror';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';

const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({min: 4, max: 20})
        .withMessage('Password must be between 4 and 20 characters')
] , async (req: Request, res: Response) => {
    const erros = validationResult(req);

    if(!erros.isEmpty()){
        throw new RequestValidationError(erros.array());
    }

    const {email, password} = req.body;

    // check is user exist with the email
    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new BadRequestError('Email already in use');
    }

    // create new user
    const user = User.build({email,password});
    await user.save();

    return res.status(201).send(user);

    
});

export { router as signupRouter };
