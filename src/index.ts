import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

import userRouter from './routes/users.routes';

const app = express();

createConnection();

app.use(cors());

app.use(morgan('dev'))

app.use(express.json());

app.listen(4000);

//Routes
app.use('/users', userRouter);