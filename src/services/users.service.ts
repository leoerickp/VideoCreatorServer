import * as bcrypt from 'bcrypt';
import { inputNewUser, inputUpdatedUser, IUser } from '../interfaces/user.interface';
import { User } from '../models/user';

export class UsersService {

    async create(newUser: inputNewUser): Promise<IUser | undefined> {
        try {
            const { password } = newUser;
            const salt = bcrypt.genSaltSync();
            newUser.password = bcrypt.hashSync(password, salt);
            const user = await User.create({ ...newUser });
            delete user.dataValues.password;
            return { ...user.dataValues };
        } catch (error) {
            if (error) {
                throw new Error('Email: duplicate key value violates unique constraint');
            }
        }
    }
    async getAll({ limit = 10, offset = 0 }: any) {
        try {
            const { count, rows } = await User.findAndCountAll({
                limit,
                offset
            });
            return { count, users: rows }
        } catch (error) {
            throw new Error(error as string);
        }
    }
    async getOneById(id: string) {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error(`${id} not found`);
        }
        return user;
    }
    async getOneByEmail(email: string) {
        const user = await User.scope('withPassword').findOne({
            where: {
                email
            },
        });
        if (!user) {
            throw new Error(`${email} not found`);
        }
        return user;
    }
    async update(id: string, updatedUser: inputUpdatedUser) {
        const user = await this.getOneById(id);
        if (updatedUser.password) {
            const salt = bcrypt.genSaltSync();
            updatedUser.password = bcrypt.hashSync(updatedUser.password, salt);
        }
        return await user.update({ ...updatedUser })
    }
    async remove(id: string) {
        const user = await this.getOneById(id);
        return await user.update({ isActive: false })
    }
}