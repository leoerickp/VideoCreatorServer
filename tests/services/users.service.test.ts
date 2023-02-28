import { UsersService } from "../../src/services/users.service";
import { User } from '../../src/models/user';

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

    const usersService = new UsersService();
    test('should be list count and users', async () => {
        jest.spyOn(User, 'findAndCountAll').mockImplementation(() => ({ count: result.count, rows: result.users } as any));
        expect(await usersService.getAll({})).toEqual(result)
    })
    test('should find one user', async () => {
        jest.spyOn(User, 'findByPk').mockImplementation(() => result.users[0] as any);
        expect(await usersService.getOneById("d05a96e3-279e-4f43-9a7b-245bd7f6664d")).toEqual(result.users[0])
    })
    test('should update one user', async () => {

        const modifiedField = { isActive: true }
        const updatedVideo = { ...result.users[0], ...modifiedField }
        const user = {
            update() {
                return { ...result.users[0], ...modifiedField }
            }
        }
        jest.spyOn(usersService, 'getOneById').mockImplementation(() => user as any);
        expect(await usersService.update("d05a96e3-279e-4f43-9a7b-245bd7f6664d", { id: "455d6998-13dc-4fb5-ab4d-3961d4dd1f9a", isActive: true })).toEqual({ ...result.users[0], isActive: true })
    })
    test('should block one usuario', async () => {

        const user = {
            update() {
                return { ...result.users[0], isActive: false }
            }
        }
        jest.spyOn(usersService, 'getOneById').mockImplementation(() => user as any);
        expect(await usersService.remove("d05a96e3-279e-4f43-9a7b-245bd7f6664d")).toEqual({ ...result.users[0], isActive: false })
    })
})