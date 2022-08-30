import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {

});

export {router as currentUserRouter};