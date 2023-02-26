import { Sequelize } from "sequelize";

export const db = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USERNAME as string,
    process.env.DB_PASSWORD as string,
    {
        host: 'localhost',
        dialect: 'postgres',
        port: +(process.env.DB_PORT as string),
        logging: false,
        define: {
            timestamps: true
        }
    })