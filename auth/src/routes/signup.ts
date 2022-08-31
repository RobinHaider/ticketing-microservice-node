import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

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

    console.log('Creating a new user');
    throw new DatabaseConnectionError();
    res.send({});
});

export { router as signupRouter };
