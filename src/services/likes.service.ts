import { ILike, inputNewLike } from "../interfaces/like.interface";
import { IUser } from "../interfaces/user.interface";
import { Like } from "../models/like";


export class LikesService {
    async create(newLike: inputNewLike, user: IUser): Promise<ILike | undefined> {
        try {
            const { id: userId } = user;
            const like = await Like.create({ ...newLike, userId });
            return { ...like.dataValues };
        } catch (error) {
            if (error) {
                throw new Error('Id: duplicate key value violates unique constraint');
            }
        }
    }
    async getAll(user: IUser, limit: number = 10, offset: number = 0) {
        try {
            const { count, rows } = await Like.findAndCountAll({
                where: {
                    userId: user.id
                },
                limit,
                offset
            });
            return { count, Likes: rows }
        } catch (error) {
            throw new Error(error as string);
        }
    }
    async getOneByPK(videoId: string, userId: string) {
        const like = await Like.findOne({
            where: {
                videoId,
                userId
            }
        });
        if (!like) {
            throw new Error(`userId: ${userId} and videoId: ${videoId} not found`);
        }
        return like;
    }


    async remove(videoId: string, userId: string) {
        const like = await this.getOneByPK(videoId, userId);
        return await like.destroy();
    }
}