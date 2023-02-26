import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { SeedService } from '../services/seed.service';

const seedService = new SeedService();
export class SeedController {
    async createSeed(req: Request, res: Response) {
        try {
            await seedService.createSeed()
            res.json('Seed successfully!!');
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }
}