import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export const BadRequestException = (error: any | undefined, res: Response) => {
    const { message }: any = error;
    if (message) {
        res.status(StatusCodes.BAD_REQUEST).json({ statuscode: StatusCodes.BAD_REQUEST, message });
    }
}

export const NotFoundException = (error: any | undefined, res: Response) => {
    const { message }: any = error;
    if (message) {
        res.status(StatusCodes.NOT_FOUND).json({ statuscode: StatusCodes.NOT_FOUND, message });
    }
}

export const UnauthorizedException = (error: any | undefined, res: Response) => {
    const { message }: any = error;
    if (message) {
        res.status(StatusCodes.UNAUTHORIZED).json({ statuscode: StatusCodes.UNAUTHORIZED, message });
    }
}
