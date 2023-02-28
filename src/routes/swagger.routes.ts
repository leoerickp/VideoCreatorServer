import { Application, Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';

// Metadata info about API
const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: ' Video Creator API',
            version: '1.0.0',
            description: 'Video Creator API manage data for .... This is an example created for this project. It was written using [https://editor.swagger.io/](https://editor.swagger.io/) as editor and **swagger-jsdoc** and **swagger-ui-express** component'
        }
    },
    apis: ['src/routes/*.routes.ts']
}

//Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

//Function to setup out docs
export const swaggerDocs = (app: Application, path: string, port: number | string) => {
    app.use(path, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get(`${path}.json`, (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log(`Version 1 Docs available on http://localhost:${port}/api/docs`)
}