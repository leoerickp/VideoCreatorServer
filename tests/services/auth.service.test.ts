import dotenv from 'dotenv';
dotenv.config();
import { UsersService } from "../../src/services/users.service";
import { AuthService } from "../../src/services/auth.service";
import { User } from '../../src/models/user';
import { IUser } from "../../src/interfaces/user.interface";

describe('UsersService test', () => {
    const result = {
        count: 3,
        users: [
            {
                "id": "5fb68c1c-e68b-454a-adb9-84dd38d32070",
                "fullName": "Erick Pereyra",
                "email": "erick@google.com",
                "urlPhoto": null,
                "isActive": true,
                "createdAt": "2023-02-23T16:11:33.827Z",
                "updatedAt": "2023-02-23T16:11:33.827Z"
            },
            {
                "id": "a7f6d457-efb4-4ead-bac6-3460ab6bda18",
                "fullName": "Fabiana kosky",
                "email": "koskky@google.com",
                "urlPhoto": null,
                "isActive": false,
                "createdAt": "2023-02-23T16:11:33.931Z",
                "updatedAt": "2023-02-23T16:11:33.931Z"
            },
            {
                "id": "24911cb8-60cf-4c74-a65b-e74ce19873cd",
                "fullName": "Juan Perez",
                "email": "juanperez@google.com",
                "urlPhoto": null,
                "isActive": true,
                "createdAt": "2023-02-23T16:11:34.025Z",
                "updatedAt": "2023-02-23T16:11:34.025Z"
            }
        ]
    }
    const user: IUser = {
        id: "455d6998-13dc-4fb5-ab4d-3961d4dd1f9a",
        fullName: "Leo Erick Pereyra Rodriguez",
        email: "leoerickp@gmail.com",
        password: "123456",
        isActive: true,
    }
    const usersService = new UsersService();
    const authService = new AuthService();
    test('should be logged one user', async () => {
        const { email, password } = user;
        const response = await authService.login(email, password);
        expect(response.token).toBeTruthy();
    })

    test('should be signed up one user', async () => {
        const { email, password, fullName } = user;
        jest.spyOn(usersService, 'create').mockImplementation(() => user as any);
        const response = await authService.signUp({ email: 'A4' + email, password, fullName });
        expect(response).toBeTruthy();
    })

})