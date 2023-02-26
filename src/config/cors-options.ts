import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    optionsSuccessStatus: 200
}