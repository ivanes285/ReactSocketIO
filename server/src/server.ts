import cors from 'cors';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import { Server as SocketServer } from 'socket.io';
import dotenv from 'dotenv';
const app = express();


//importan: Configuracion de socket.io
const server = http.createServer(app);  //?Llamamos al mudos http de node para crear un servidor ya que express lo crea pero con otras configuraciones
const io = new SocketServer(server);


const optionsCors = {
    origin: "*",
    optionSuccessStatus: 200,
};


//Middlewares
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors(optionsCors));


export default app ;