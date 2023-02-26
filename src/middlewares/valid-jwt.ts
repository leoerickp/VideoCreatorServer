import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import { User } from "../models/user";

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.header('Authorization');
    const token = authorization?.replace('Bearer ', '');
    if (!token) {

        return res.status(StatusCodes.UNAUTHORIZED).json({
            msg: 'Token authorization is required',
        })
    }
    try {
        const { uuid }: any = jwt.verify(token, process.env.JWT_SECRET as string);

        const user = await User.findByPk(uuid);
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                msg: 'Token is not valid',
            })
        }
        const { isActive }: any = user;
        if (!isActive) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                msg: 'Token is not valid, user blocked',
            })
        }

        req.body = { ...req.body, user: user.dataValues }
        next();
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            msg: 'Token is not valid',
        })
    }

}
