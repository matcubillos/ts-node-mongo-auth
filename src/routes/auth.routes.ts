import { Router } from 'express';
import { check } from 'express-validator';
import { sessionCheck, loginUser, registerUser } from '../controllers/auth.controller';
import valideFields from '../middlewares/validate-fields';
import validateJWT from '../middlewares/validate-session';

const router = Router();

router.post('/register',[
    check('user', 'User is mandatory.').not().isEmpty(),
    check('email', 'Email is mandatory.').isEmail(),
    check('password', 'Password min 6.').isLength({min: 6}),
    valideFields
], registerUser)

router.post('/',[
    check('email', 'Email is mandatory.').isEmail(),
    check('password', 'Password min 6.').isLength({min: 6}),
    valideFields
], loginUser)

//token validation
router.post('/sessionCheck', validateJWT, sessionCheck) 

export default router
