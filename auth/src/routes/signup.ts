import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({min: 4, max: 20})
        .withMessage('Password must be between 4 and 20 characters')
] ,(req: Request, res: Response) => {
    const erros = validationResult(req);

    if(!erros.isEmpty()){
        return res.status(400).send(erros.array());
    }

    const {email, password} = req.body;

    console.log('Creating a new user');
    res.send({});
});

export { router as signupRouter };
