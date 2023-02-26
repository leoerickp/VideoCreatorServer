

import { Router } from 'express';
import { check } from 'express-validator';
import { UsersController } from '../controllers/users.controller';
import { ValidFields } from '../middlewares/valid-fields.middleware';
import { validateJWT } from '../middlewares/valid-jwt';

const usersController = new UsersController();
export const usersRoutes: Router = Router();

usersRoutes.get('/', [
    validateJWT,
    check('limit', 'limit must be a number').optional().isNumeric(),
    check('limit', 'limit must be a positive over than 1').optional().isInt({ min: 1 }),
    check('offset', 'offset must be a number').optional().isNumeric(),
    check('offset', 'offset must be a positive over than 0').optional().isInt({ min: 0 }),
    ValidFields
], usersController.getAll);
usersRoutes.get('/:id', [
    check('id', 'id field must be a UUID value').isUUID(4),
    ValidFields
], usersController.getOneById);

usersRoutes.get('/by-email/:email', [
    validateJWT,
    check('email', 'email must be an email value').isEmail(),
    ValidFields
], usersController.getOneByEmail);

usersRoutes.put('/:id', [
    validateJWT,
    check('id', 'id field must be a UUID value').isUUID(4),
    check('fullName', 'fullName is required').optional().not().isEmpty(),
    check('fullName', 'fullName: length must be between 3 and 100 characters').optional().isLength({ min: 3, max: 100 }),
    check('email', 'email must be an email value').optional().isEmail(),
    check('password', 'password is required').optional().not().isEmpty(),
    check('password', 'password: length must be more than 6 characters').optional().isLength({ min: 6 }),
    check('urlPhoto', 'urlPhoto must be a valid url address').optional().optional().isURL(),
    check('isActive', 'isActive must be boolean value').optional().isBoolean(),
    ValidFields
], usersController.update);

usersRoutes.delete('/:id', [
    validateJWT,
    check('id', 'id field must be a UUID value').isUUID(4),
    ValidFields
], usersController.remove);