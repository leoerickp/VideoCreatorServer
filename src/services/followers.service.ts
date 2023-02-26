import { inputNewFollower, IFollower } from '../interfaces/follower.interface';
import { IUser } from '../interfaces/user.interface';
import { Follower } from '../models/follower';


export class FollowersService {
    async create(newLike: inputNewFollower, user: IUser): Promise<IFollower | undefined> {
        try {
            const { id: followerId } = user;
            const follower = await Follower.create({ ...newLike, followerId });
            return { ...follower.dataValues };
        } catch (error) {
            if (error) {
                throw new Error('Id: duplicate key value violates unique constraint');
            }
        }
    }
    async getAllFollowers(user: IUser, limit: number = 10, offset: number = 0) {
        try {
            const { count, rows } = await Follower.findAndCountAll({
                where: {
                    userId: user.id
                },
                limit,
                offset
            });
            return { count, Followers: rows }
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async getAllFolloweds(user: IUser, limit: number = 10, offset: number = 0) {
        try {
            const { count, rows } = await Follower.findAndCountAll({
                where: {
                    followersId: user.id
                },
                limit,
                offset
            });
            return { count, Followeds: rows }
        } catch (error) {
            throw new Error(error as string);
        }
    }
    async getOneByPK(userId: string, followerId: string) {
        const follower = await Follower.findOne({
            where: {
                userId,
                followerId
            }
        });
        if (!follower) {
            throw new Error(`userId: ${userId} and followerId: ${followerId} not found`);
        }
        return follower;
    }


    async remove(userId: string, followerId: string) {
        const follower = await this.getOneByPK(userId, followerId);
        await follower.destroy()
        return { userId, followerId };
    }
}