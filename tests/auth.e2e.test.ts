import dotenv from 'dotenv';
dotenv.config();
import express, { Application, response } from 'express';
import request from "supertest";
import { authRoutes } from '../src/routes/auth.routes';
import { StatusCodes } from 'http-status-codes';
const app = express();
const path = '/api/auth';
const user = {
    id: "455d6998-13dc-4fb5-ab4d-3961d4dd1f9a",
    fullName: "Leo Erick Pereyra Rodriguez",
    email: "leoerickp@gmail.com",
    password: "123456",
    isActive: true,
}
describe('Auth API E2E test', () => {
    beforeAll(() => {
        app.use(express.json());
        //app.use(express.urlencoded({ extended: true }));
        app.use(path, authRoutes);
    })
    describe('Login E2E test', () => {
        test('should be logged an user', async () => {
            const { email, password } = user;
            const response = await request(app).post(path + '/login')
                .send({ email, password })
            //.set('Accept', 'application/json');
            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.body.token).toBeTruthy();
        });
        test('should not be logged with wrong password', async () => {
            const { email, password } = user;
            const response = await request(app).post(path + '/login')
                .send({ email, password: password + '1234' })
            expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
            expect(response.body.token).toBeFalsy();
        });
        test('should not be logged with wrong email', async () => {
            const { email, password } = user;
            const response = await request(app).post(path + '/login')
                .send({ email: '!' + email, password: password })
            expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
            expect(response.body.token).toBeFalsy();
        });
    });

    describe('Sign up E2E test', () => {
        test('should not be signed up without fullName', async () => {
            const { email, password } = user;
            const response = await request(app).post(path + '/sign-up')
                .send({ email, password })
            expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.token).toBeFalsy();
        });
        test('should not be signed up with existing email', async () => {
            const { email, password, fullName } = user;
            const response = await request(app).post(path + '/sign-up')
                .send({ email, password: password + '1234', fullName })
            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.body.token).toBeFalsy();
        });
        test('should be signed up (fail this test, because the email already exists', async () => {
            const { email, password, fullName } = user;
            const response = await request(app).post(path + '/sign-up')
                .send({ email: "leoerickpereyra@google.com", password, fullName })
            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.body.token).toBeTruthy();
            expect(response.body.user).toBeTruthy();
        });
    });


})