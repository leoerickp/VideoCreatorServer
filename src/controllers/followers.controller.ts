import { Request, Response } from "express";
import { BadRequestException, NotFoundException } from "../helpers/error-messages-handler";
import { FollowersService } from "../services/followers.service";

const followersService = new FollowersService();
export class FollowersController {
    async create(req: Request, res: Response) {

        try {
            const { user } = req.body;
            const newFollower = await followersService.create({ ...req.body }, user);
            res.json({ ...newFollower });
        } catch (error) {
            BadRequestException(error, res);
        }
    }
    async getAllFollowers(req: Request, res: Response): Promise<void> {
        const { user } = req.body;
        const result = await followersService.getAllFollowers(user);
        res.json({ ...result });
    }
    async getAllFolloweds(req: Request, res: Response): Promise<void> {
        const { user } = req.body;
        const result = await followersService.getAllFolloweds(user);
        res.json({ ...result });
    }

    async getOneById(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const { followerId } = req.body.user;
            const follower = await followersService.getOneByPK(userId, followerId);
            res.json(follower);
        } catch (error) {
            NotFoundException(error, res);
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const { id: followerId } = req.body.user;
            const follower = await followersService.remove(userId, followerId);
            res.json(follower);
        } catch (error) {
            NotFoundException(error, res);
        }
    }
}