import { Router } from 'express';
import { check } from 'express-validator';
import { AuthController } from '../controllers/auth.controller';
import { ValidFields } from '../middlewares/valid-fields.middleware';

const authController = new AuthController();
export const authRoutes = Router();
authRoutes.post('/login', [
    check('email', 'email must be an email value').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    check('password', 'password: length must be more than 6 characters').isLength({ min: 6 }),
    ValidFields
], authController.login);

authRoutes.post('/sign-up', [
    check('fullName', 'fullName is required').not().isEmpty(),
    check('fullName', 'fullName: length must be between 3 and 100 characters').isLength({ min: 3, max: 100 }),
    check('email', 'email must be an email value').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    check('password', 'password: length must be more than 6 characters').isLength({ min: 6 }),
    check('urlPhoto', 'urlPhoto must be a valid url address').optional().isURL(),
    ValidFields
], authController.signUp);