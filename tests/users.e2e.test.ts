import dotenv from 'dotenv';
dotenv.config();
import express, { NextFunction, Request, Response } from 'express';
import request from "supertest";
import { usersRoutes } from '../src/routes/users.routes';
import { StatusCodes } from 'http-status-codes';
import { validateJWT } from '../src/middlewares/valid-jwt';

const app = express();
const path = '/api/users';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNDU1ZDY5OTgtMTNkYy00ZmI1LWFiNGQtMzk2MWQ0ZGQxZjlhIiwiaWF0IjoxNjc3MjA1OTQ3LCJleHAiOjE2Nzc1NTE1NDd9.4DyLf_MoyGN4Vjz0u5EaAuANNJ7Ml5g3b26Hpb3HwWo";
const user = {
    id: "455d6998-13dc-4fb5-ab4d-3961d4dd1f9a",
    fullName: "Leo Erick Pereyra Rodriguez",
    email: "leoerickp@gmail.com",
    password: "$2b$10$HcipnYNjlLWjLg6K2iR3Nuuix3D8yzuh0NCnSsbCUz9VnNOJh7bgW",
    isActive: true,
}
describe('Users API E2E test', () => {
    beforeAll(() => {
        app.use(path, usersRoutes);
    })
    beforeEach(() => {
        jest.clearAllMocks();
    })
    describe('GET/', () => {
        test('should response status code 401 (Unauthorized) without token', async () => {
            const expectedResponse = {
                msg: "Token authorization is required"
            };
            const response = await request(app).get(path).send();
            expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
            expect(response.body).toEqual(expectedResponse);
        });
        test('should response status code 200 with token', async () => {
            const response = await request(app)
                .get(path)
                .set('Authorization', 'Bearer ' + token);
            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.body.count).toBeGreaterThanOrEqual(0);
        });
    });

    describe('GET/id', () => {
        test('should response status code 401 (Unauthorized) without token', async () => {
            const expectedResponse = {
                msg: "Token authorization is required"
            };
            const response = await request(app)
                .get(path + '/' + '455d6998-13dc-4fb5-ab4d-3961d4dd1f9a')
            expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
            expect(response.body).toEqual(expectedResponse);
        });
    });
    describe('GET/id', () => {
        test('should response status code 200 with token', async () => {
            const response = await request(app)
                .get(path + '/' + user.id)
                .set('Authorization', 'Bearer ' + token);
            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.body.fullName).toEqual(user.fullName);
        });
    })
})