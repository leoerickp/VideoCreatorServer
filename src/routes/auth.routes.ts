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

/**
* @openapi
* /api/auth/login:
*   post:
*       tags:
*         - Auth
*       description: Login module to *authenticate* in VideoCreator as a user
*       operationId: login
*       requestBody:
*         description: Fields are needed to login
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/loginRequest'
*         required: true
*       responses:
*         '200':
*           description: User logged
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/userData'
*         '401':
*           description: Unauthorized
*         '400':
*           description: Bad Request
* /api/auth/sign-up:
*   post:
*       tags:
*         - Auth
*       description: Login module to *create* a new user in VideoCreator
*       operationId: signUp
*       requestBody:
*         description: Optional description in *Markdown*
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/signUpRequest'
*         required: true
*       responses:
*         '200':
*           description: User logged
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/userData'
*         '401':
*           description: Unauthorized
*         '400':
*           description: Bad Request
*      
* components:
*   schemas:
*     loginRequest:
*       type: object
*       required:
*           - email
*           - password
*       properties:
*         email:
*           type: string
*           example: jsmith@gmail.com
*         password:
*           type: string
*           example: 123456
*     signUpRequest:
*       type: object
*       required:
*           - email
*           - password
*           - fullName
*       properties:
*         email:
*           type: string
*           example: jsmith@gmail.com
*         password:
*           type: string
*           example: 123456
*         fullName:
*           type: string
*           example: Jhon Smith
*         urlPhoto:
*           type: string
*           example: Jhon Smith
*     userData:
*       type: object
*       properties:
*         token:
*           type: string
*         user:
*           type: object
*           properties:
*             id:
*               type: string
*             fullName:
*               type: string
*             email:
*               type: string
*             urlPhoto:
*               type: string
*             isActive: 
*               type: boolean
*             createdAt:
*               type: string
*               description: createdAt is a date type
*             updatedAt:
*               type: string
*               description: updatedAt is a date type                                
*/