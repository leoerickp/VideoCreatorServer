import { Response, Request } from 'express'
import { BadRequestException, NotFoundException } from '../helpers/error-messages-handler';
import { UsersService } from '../services/users.service';

const usersService = new UsersService();
export class UsersController {
    async create(req: Request, res: Response) {

        try {
            const newUser = await usersService.create({ ...req.body });
            res.json({ ...newUser });
        } catch (error) {
            BadRequestException(error, res);
        }
    }
    async getAll(req: Request, res: Response): Promise<void> {
        const result = await usersService.getAll({ ...req.query });
        res.json({ ...result });
    }
    async getOneById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await usersService.getOneById(id);
            res.json(user)
        } catch (error) {
            NotFoundException(error, res);
        }
    }
    async getOneByEmail(req: Request, res: Response) {
        try {
            const { email } = req.params;
            const user = await usersService.getOneByEmail(email);
            res.json(user)
        } catch (error) {
            NotFoundException(error, res);
        }
    }
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await usersService.update(id, { ...req.body });
            res.json(user);
        } catch (error) {
            NotFoundException(error, res);
        }
    }
    async remove(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await usersService.remove(id);
            res.json(user);
        } catch (error) {
            NotFoundException(error, res);
        }
    }
}