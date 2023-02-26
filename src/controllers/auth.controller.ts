import { Request, Response } from 'express';
import { UnauthorizedException, BadRequestException } from '../helpers/error-messages-handler';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();
export class AuthController {
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const { token, user } = await authService.login(email, password);
            res.json({ token, user });
        } catch (error) {
            UnauthorizedException(error, res);
        }
    }

    async signUp(req: Request, res: Response) {
        try {
            const newUser = await authService.signUp({ ...req.body });
            res.json({ ...newUser });
        } catch (error) {
            BadRequestException(error, res);
        }
    }
}