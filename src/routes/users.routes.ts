

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
    validateJWT,
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


/**
* @openapi
* /api/users:
*   get:
*       tags:
*           - Users
*       description: Get all users from the database
*       operationId: users
*       parameters:
*       - $ref: '#/components/parameters/BearerToken'
*       - $ref: '#/components/parameters/limitPagination'
*       - $ref: '#/components/parameters/offsetPagination'
*       responses:
*           '200':
*               description: User list with a counter
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/usersResponse'
*           '401':
*               description: Unauthorized
*           '400':
*               description: Bad Request
* /api/users/{id}:
*   get:
*       tags:
*           - Users
*       description: Get user information from the database using id parameter
*       operationId: oneUserById
*       parameters:
*       - $ref: '#/components/parameters/BearerToken'
*       - $ref: '#/components/parameters/idParameter'
*       responses:
*           '200':
*               description: User information
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/user'
*           '401':
*               description: Unauthorized
*           '400':
*               description: Bad Request
*   put:
*       tags:
*           - Users
*       description: Update user information using id parameter
*       operationId: updateUser
*       parameters:
*       - $ref: '#/components/parameters/BearerToken'
*       - $ref: '#/components/parameters/idParameter'
*       responses:
*           '200':
*               description: User information updated
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/user'
*           '401':
*               description: Unauthorized
*           '400':
*               description: Bad Request
*   delete:
*       tags:
*           - Users
*       description: Block a user using id parameter
*       operationId: deleteUser
*       parameters:
*       - $ref: '#/components/parameters/BearerToken'
*       - $ref: '#/components/parameters/idParameter'
*       responses:
*           '200':
*               description: User information updated isActive field in false
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/user'
*           '401':
*               description: Unauthorized
*           '400':
*               description: Bad Request
* /api/users/by-email/{email}:
*   get:
*       tags:
*           - Users
*       description: Get user information from the database using email parameter
*       operationId: oneUserByEmail
*       parameters:
*       - $ref: '#/components/parameters/BearerToken'
*       -   name: email
*           in: path
*           description: Is a valid email
*           required: true
*           schema:
*               type: string
*       responses:
*           '200':
*               description: User information
*               content:
*               application/json:
*                   schema:
*                   $ref: '#/components/schemas/user'
*           '401':
*               description: Unauthorized
*           '400':
*               description: Bad Request
*    
* components:
*   parameters:
*       BearerToken:
*           name: Authorization
*           in: header
*           description: Word *'Bearer Token'* authentication 
*           example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNDU1ZDY5OTgtMTNkYy00ZmI1LWFiNGQtMzk2MWQ0ZGQxZjlhIiwiaWF0IjoxNjc3NjE1NzczLCJleHAiOjE2Nzc5NjEzNzN9.QeU4nrk7MQLM3cYLpNfboRzBaSuCYqVOemWpJB2p3sU'
*           schema:
*               type: string
*           required: true
*       limitPagination:
*           name: limit
*           in: query
*           description: For pagination
*           required: false
*           schema:
*               type: number
*       offsetPagination:
*           name: offset
*           in: query
*           description: For pagination
*           required: false
*           schema:
*               type: number
*       idParameter:
*           name: id
*           in: path
*           description: UUID value is needed
*           required: true
*           schema:
*               type: string
*   schemas:
*       usersResponse:
*           type: object
*           properties:
*               count:
*                   type: number
*               users:
*                   $ref: '#/components/schemas/users'
*       users:
*           type: array
*           items:
*               $ref: '#/components/schemas/user'
*       user:
*           type: object
*           properties:
*               id:
*                   type: string
*               fullName:
*                   type: string
*               email:
*                   type: string
*               urlPhoto:
*                   type: string
*               isActive: 
*                   type: boolean
*               createdAt:
*                   type: string
*                   description: createdAt is a date type
*               updatedAt:
*                   type: string
*                   description: updatedAt is a date type
*             
*/