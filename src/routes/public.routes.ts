import { Router } from 'express';
import { PublicController } from '../controllers/public.controller';

const publicController = new PublicController();

export const publicRoutes: Router = Router();
publicRoutes.get('/*', publicController.sendErrorPage);