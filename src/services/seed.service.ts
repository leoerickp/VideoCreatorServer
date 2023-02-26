import { User } from '../models/user';
import { USERS, VIDEOS } from '../data/seed.data';
import { UsersService } from './users.service';
import { Video } from '../models/video';
import { RandomInt } from '../helpers/random-int';
import { Follower } from '../models/follower';
import { db } from '../database/connectiondb';
import { DataTypes } from 'sequelize';
import { Like } from '../models/like';


export class SeedService {
    public async createSeed() {
        await this.createTables();
        this.setConstrains();

    }

    private setConstrains() {
        User.hasMany(Video, { foreignKey: 'userId', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
        Video.belongsTo(User, { foreignKey: 'userId' });

        User.belongsToMany(User, { as: 'creators', through: Follower, foreignKey: 'userId', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
        User.belongsToMany(User, { as: 'followers', through: Follower, foreignKey: 'followerId', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });

        User.belongsToMany(Video, { through: Like, foreignKey: 'userId', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
        Video.belongsToMany(User, { through: Like, foreignKey: 'videoId', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
        User.hasMany(Like);
        Like.belongsTo(User);
        Video.hasMany(Like);
        Like.belongsTo(Video);

    }


    private async createTables() {
        try {
            //await User.sync({ force: true });
            //const userIds: string[] = await this.loadUsers();
            //await Video.sync({ force: true });
            //this.loadVideos(userIds);
            await Follower.sync({ force: true });
            await Like.sync({ force: true });
        } catch (error) {

        }
    }

    private async loadUsers(): Promise<string[]> {
        const usersService = new UsersService();
        let userIds: string[] = [];
        try {
            for (const user of USERS) {
                const newUser = await usersService.create(user);
                userIds.push(newUser?.id as string);
            }
        } catch (error) {
        }
        return userIds
    }
    private async loadVideos(userIds: string[]) {
        for (const video of VIDEOS) {
            await Video.create({ ...video, userId: userIds[RandomInt(userIds?.length - 1 || 0)] });
        }

    }
}