import * as bcrypt from 'bcrypt';
import { generateJWT } from '../../src/helpers/generate-jwt';
import { AuthService } from '../../src/services/auth.service';
import { UsersService } from '../../src/services/users.service';
describe('AuthService test', () => {
    const user = {
        id: "455d6998-13dc-4fb5-ab4d-3961d4dd1f9a",
        fullName: "Leo Erick Pereyra Rodriguez",
        email: "leoerickp@gmail.com",
        password: "$2b$10$HcipnYNjlLWjLg6K2iR3Nuuix3D8yzuh0NCnSsbCUz9VnNOJh7bgW",
        urlPhoto: null,
        isActive: true,
        createdAt: "2023-02-23T16:11:33.702Z",
        updatedAt: "2023-02-23T16:11:33.702Z"
    }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNDU1ZDY5OTgtMTNkYy00ZmI1LWFiNGQtMzk2MWQ0ZGQxZjlhIiwiaWF0IjoxNjc3MjA1OTQ3LCJleHAiOjE2Nzc1NTE1NDd9.4DyLf_MoyGN4Vjz0u5EaAuANNJ7Ml5g3b26Hpb3HwWo";
    const authService = new AuthService();
    const usersService = new UsersService();
    const email = "leoerickp@gmail.com";
    const fullName = "Jhon Smith";
    const password = "123456";

    beforeAll(() => {
    })
    test('should be logged', async () => {
        jest.spyOn(usersService, 'getOneById').mockImplementation(() => user as any);

        //jest.spyOn(bcrypt, 'compareSync').mockResolvedValue(true as never)
        const mockFn = jest.fn(generateJWT);
        // expect(await authService.login(email, password)).toBe({ token, user });
        //expect(mockFn).toHaveBeenCalled();
    })
})