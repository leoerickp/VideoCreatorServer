import express, { Application } from 'express';
import cors from 'cors';
import { join } from 'path';
import { corsOptions } from '../config/cors-options';
import { publicRoutes } from '../routes/public.routes';
import { db } from '../database/connectiondb';
import { seedRoutes } from '../routes/seed.routes';
import { usersRoutes } from '../routes/users.routes';
import { videosRoutes } from '../routes/videos.routes';
import { authRoutes } from '../routes/auth.routes';
import { followersRoutes } from '../routes/followers.routes';
import { likesRoutes } from '../routes/likes.routes';

export class Server {
    private app: Application;
    private port: number | string;
    private path = {
        public: '/',
        auth: '/api/auth',
        followers: '/api/followers',
        likes: '/api/likes',
        seed: '/api/seed',
        users: '/api/users',
        videos: '/api/videos',
    }
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.connectToDB();

        this.setMiddlewares();

        this.setRoutes();

    }
    private async connectToDB() {
        try {
            await db.authenticate();
            console.log('Database connected');
        } catch (error) {
            throw new Error(error as any);

        }
    }

    private setMiddlewares() {
        this.app.use(cors(corsOptions));
        this.app.use(express.static(join(__dirname, '../../public/')));
        this.app.use(express.json());
    }

    private setRoutes() {
        if (process.env.STATE === 'dev') {
            this.app.use(this.path.seed, seedRoutes);
        }
        this.app.use(this.path.auth, authRoutes);
        this.app.use(this.path.followers, followersRoutes);
        this.app.use(this.path.likes, likesRoutes);
        this.app.use(this.path.users, usersRoutes);
        this.app.use(this.path.videos, videosRoutes);
        this.app.use(this.path.public, publicRoutes);
    }

    public bootstrap() {
        this.app.listen(this.port, () => {
            console.log('Server is running on port:', this.port);
        });
    }
}