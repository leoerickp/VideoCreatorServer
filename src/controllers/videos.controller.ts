import { Response, Request } from 'express'
import { BadRequestException, NotFoundException } from '../helpers/error-messages-handler';
import { VideosService } from '../services/videos.service';

const videosService = new VideosService();
export class VideosController {
    async create(req: Request, res: Response) {

        try {
            const { user } = req.body;
            const newVideo = await videosService.create({ ...req.body }, user);
            res.json({ ...newVideo });
        } catch (error) {
            BadRequestException(error, res);
        }
    }
    async getAll(req: Request, res: Response): Promise<void> {
        const { user } = req.body;
        const result = await videosService.getAll(user, { ...req.query });
        res.json({ ...result });
    }

    async getAllMyVideos(req: Request, res: Response): Promise<void> {
        const { user } = req.body;
        const result = await videosService.getAllMyVideos(user, { ...req.query });
        res.json({ ...result });
    }

    async getAllMyFavorites(req: Request, res: Response): Promise<void> {
        const { user } = req.body;
        const result = await videosService.getAllMyFavorites(user, { ...req.query });
        res.json({ ...result });
    }

    async getAllPublished(req: Request, res: Response): Promise<void> {
        const { user } = req.body;
        const result = await videosService.getAllPublished(user, { ...req.query });
        res.json({ ...result });
    }
    async getOneById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const video = await videosService.getOneById(id);
            res.json(video)
        } catch (error) {
            NotFoundException(error, res);
        }
    }
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const video = await videosService.update(id, { ...req.body });
            res.json(video);
        } catch (error) {
            NotFoundException(error, res);
        }
    }
    async remove(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const video = await videosService.remove(id);
            res.json(video);
        } catch (error) {
            NotFoundException(error, res);
        }
    }
}