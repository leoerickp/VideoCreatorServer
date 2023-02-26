import { Request, Response } from "express"
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

export const ValidFields = (req: Request, res: Response, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json(errors);
    }
    next();
}