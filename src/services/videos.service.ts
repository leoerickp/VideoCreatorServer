import { IUser } from "../interfaces/user.interface";
import { inputNewVideo, inputUpdatedVideo, IVideo } from "../interfaces/videos.interface";
import { Video } from "../models/video";
import { User } from "../models/user";
import { Like } from '../models/like';
import { Follower } from '../models/follower';



export class VideosService {

    async create(newVideo: inputNewVideo, user: IUser): Promise<IVideo | undefined> {
        try {
            const { id: userId } = user;
            const video = await Video.create({ ...newVideo, userId });
            return { ...video.dataValues };
        } catch (error) {
            if (error) {
                throw new Error('Id: duplicate key value violates unique constraint');
            }
        }
    }
    async getAll(user: IUser, { limit = 10, offset = 0 }: any) {
        try {
            const { count, rows } = await Video.findAndCountAll({
                where: {
                    userId: user.id
                },
                limit,
                offset
            });
            return { count, videos: rows }
        } catch (error) {
            throw new Error(error as string);
        }
    }
    async getAllMyVideos(user: IUser, { limit = 10, offset = 0 }: any) {
        try {
            const { count, rows } = await Video.findAndCountAll({
                where: {
                    userId: user.id
                },
                include: [
                    { model: Like, required: false, where: { userId: user.id } },
                    {
                        model: User,
                        include: [{ model: Follower, required: false }]
                    }
                ],
                limit,
                offset,
                order: [
                    ['updatedAt', 'DESC']
                ]
            });
            return { count, videos: rows }
        } catch (error) {
            throw new Error(error as string);
        }
    }
    async getAllMyFavorites(user: IUser, { limit = 10, offset = 0 }: any) {
        try {
            const { count, rows } = await Video.findAndCountAll({
                include: [
                    { model: Like, required: true, where: { userId: user.id } },
                    {
                        model: User,
                        include: [{ model: Follower, required: false, where: { followerId: user.id } }]
                    }
                ],
                limit,
                offset,
                order: [
                    ['updatedAt', 'DESC']
                ]
            });
            return { count, videos: rows }
        } catch (error) {
            throw new Error(error as string);
        }
    }
    async getAllPublished(user: IUser, { limit = 10, offset = 0 }: any) {
        try {
            const { count, rows } = await Video.findAndCountAll({
                where: {
                    published: true
                },
                include: [
                    {
                        model: Like, required: false, where: { userId: user.id },
                    },
                    {
                        model: User,
                        include: [{ model: Follower, required: false, where: { followerId: user.id } }]
                    }
                ],
                limit,
                offset,
                order: [
                    ['updatedAt', 'DESC']
                ]
            });
            return { count, videos: rows }
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async getOneById(id: string) {
        const video = await Video.findByPk(id);
        if (!video) {
            throw new Error(`${id} not found`);
        }
        return video;
    }

    async update(id: string, updatedVideo: inputUpdatedVideo) {
        const video = await this.getOneById(id);
        return await video.update({ ...updatedVideo });
    }
    async remove(id: string) {
        const video = await this.getOneById(id);
        return await video.destroy();
    }
}