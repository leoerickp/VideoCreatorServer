import { Router } from "express";
import { check } from "express-validator";
import { VideosController } from "../controllers/videos.controller";
import { ValidFields } from "../middlewares/valid-fields.middleware";
import { validateJWT } from "../middlewares/valid-jwt";


const videosController = new VideosController();
export const videosRoutes: Router = Router();

videosRoutes.get('/', [
    validateJWT,
    check('limit', 'limit must be a number').optional().isNumeric(),
    check('limit', 'limit must be a positive over than 1').optional().isInt({ min: 1 }),
    check('offset', 'offset must be a number').optional().isNumeric(),
    check('offset', 'offset must be a positive over than 0').optional().isInt({ min: 0 }),
    ValidFields
], videosController.getAllPublished);

videosRoutes.get('/my-videos', [
    validateJWT,
    check('limit', 'limit must be a number').optional().isNumeric(),
    check('limit', 'limit must be a positive over than 1').optional().isInt({ min: 1 }),
    check('offset', 'offset must be a number').optional().isNumeric(),
    check('offset', 'offset must be a positive over than 0').optional().isInt({ min: 0 }),
    ValidFields
], videosController.getAllMyVideos);

videosRoutes.get('/my-favorites', [
    validateJWT,
    check('limit', 'limit must be a number').optional().isNumeric(),
    check('limit', 'limit must be a positive over than 1').optional().isInt({ min: 1 }),
    check('offset', 'offset must be a number').optional().isNumeric(),
    check('offset', 'offset must be a positive over than 0').optional().isInt({ min: 0 }),
    ValidFields
], videosController.getAllMyFavorites);

videosRoutes.get('/:id', [
    validateJWT,
    check('id', 'id field must be a UUID value').isUUID(4),
    ValidFields
], videosController.getOneById);

videosRoutes.post('/', [
    validateJWT,
    check('title', 'title is required').not().isEmpty(),
    check('title', 'title: length must be between 3 and 100 characters').isLength({ min: 3, max: 100 }),
    check('description', 'description must be have until 1000 characters').optional().isLength({ max: 1000 }),
    check('link', 'link is required').not().isEmpty(),
    check('link', 'link must be a valid url address').isURL(),
    check('published', 'published must be boolean value').optional().isBoolean(),
    ValidFields
], videosController.create);

videosRoutes.put('/:id', [
    validateJWT,
    check('id', 'id field must be a UUID value').isUUID(4),
    check('title', 'title is required').optional().not().isEmpty(),
    check('title', 'title: length must be between 3 and 100 characters').optional().isLength({ min: 3, max: 100 }),
    check('description', 'description must be have until 1000 characters').optional().isLength({ max: 1000 }),
    check('link', 'lnk is required').optional().not().isEmpty(),
    check('link', 'link must be a valid url address').optional().isURL(),
    check('published', 'published must be boolean value').optional().isBoolean(),
    ValidFields
], videosController.update);

videosRoutes.delete('/:id', [
    validateJWT,
    check('id', 'id field must be a UUID value').isUUID(4),
    ValidFields
], videosController.remove);