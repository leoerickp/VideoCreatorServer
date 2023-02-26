import { Request, Response } from "express";
import { BadRequestException, NotFoundException } from "../helpers/error-messages-handler";
import { LikesService } from "../services/likes.service";

const likesService = new LikesService();
export class LikesController {
    async create(req: Request, res: Response) {

        try {
            const { user } = req.body;
            const newLike = await likesService.create({ ...req.body }, user);
            res.json({ ...newLike });
        } catch (error) {
            BadRequestException(error, res);
        }
    }
    async getAll(req: Request, res: Response): Promise<void> {
        const { user } = req.body;
        const result = await likesService.getAll(user);
        res.json({ ...result });
    }
    async getOneById(req: Request, res: Response) {
        try {
            const { videoId } = req.params;
            const { id } = req.body.user;
            const like = await likesService.getOneByPK(videoId, id);
            res.json(like);
        } catch (error) {
            NotFoundException(error, res);
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const { videoId } = req.params;
            const { id } = req.body.user;
            const like = await likesService.remove(videoId, id);
            res.json(like);
        } catch (error) {
            NotFoundException(error, res);
        }
    }
}