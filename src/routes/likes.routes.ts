import { Router } from 'express';
import { check } from 'express-validator';
import { LikesController } from '../controllers/likes.controller';
import { ValidFields } from '../middlewares/valid-fields.middleware';
import { validateJWT } from '../middlewares/valid-jwt';

const likesController = new LikesController();
export const likesRoutes: Router = Router();

likesRoutes.get('/', [
    validateJWT
], likesController.getAll);

likesRoutes.get('/:videoId', [
    validateJWT,
    check('videoId', 'videoId field must be a UUID value').isUUID(4),
    ValidFields
], likesController.getOneById);

likesRoutes.post('/', [
    validateJWT,
    check('videoId', 'videoId field must be a UUID value').isUUID(4),
    ValidFields
], likesController.create);

likesRoutes.delete('/:videoId', [
    validateJWT,
    check('videoId', 'videoId field must be a UUID value').isUUID(4),
    ValidFields
], likesController.remove);