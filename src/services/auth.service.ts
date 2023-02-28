import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { generateJWT } from '../helpers/generate-jwt';
import { inputNewUser, IUser } from '../interfaces/user.interface';

const usersService = new UsersService();
export class AuthService {
    async login(email: string, password: string) {
        try {
            const user = await usersService.getOneByEmail(email);
            const { password: encryptPassword, isActive, id }: any = user;
            if (!isActive) {
                throw new Error('User is unathorized');
            }
            if (password) {
                const validPassword = bcrypt.compareSync(password, encryptPassword);
                if (!validPassword) {
                    throw new Error('Email / Password do not match');
                }
            }
            const token = await generateJWT(id);
            delete user.dataValues.password;
            return { token, user }
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async signUp(newUser: inputNewUser) {
        try {
            const user = await usersService.create(newUser);
            const { id }: any = user;
            const token = await generateJWT(id);
            return { token, user }
        } catch (error) {
            throw new Error(error as string);
        }
    }
}