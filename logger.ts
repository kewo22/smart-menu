// logger.js
import winston, { createLogger, format } from "winston";
import { MongoDB, MongoDBConnectionOptions } from "winston-mongodb";

const { combine, timestamp, json } = winston.format;

const transports: any = winston.transports


const mongoOptions: MongoDBConnectionOptions = {
    db: process.env.DATABASE_URL!,
    level: "error",
    options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
    collection: "logs",
    format: combine(format.timestamp(), format.json()),
};

export const logger = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new transports.File({
            filename: "logs/users-error.log",
            level: "error",
        }),
        new MongoDB(mongoOptions), // <-- This replaced "new transports.MongoDB({options})"
    ],
});