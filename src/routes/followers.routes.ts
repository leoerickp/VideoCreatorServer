import { Router } from "express";
import { check } from "express-validator";
import { FollowersController } from "../controllers/followers.controller";
import { ValidFields } from "../middlewares/valid-fields.middleware";
import { validateJWT } from "../middlewares/valid-jwt";

const followersController = new FollowersController();
export const followersRoutes: Router = Router();

followersRoutes.get('/r', [
    validateJWT
], followersController.getAllFollowers);

followersRoutes.get('/d', [
    validateJWT
], followersController.getAllFolloweds);

followersRoutes.get('/:userId', [
    validateJWT,
    check('userId', 'userId field must be a UUID value').isUUID(4),
    ValidFields
], followersController.getOneById);

followersRoutes.post('/', [
    validateJWT,
    check('userId', 'userId field must be a UUID value').isUUID(4),
    ValidFields
], followersController.create);

followersRoutes.delete('/:userId', [
    validateJWT,
    check('userId', 'userId field must be a UUID value').isUUID(4),
    ValidFields
], followersController.remove);