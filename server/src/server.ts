import cors from 'cors';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import { Server as SocketServer } from 'socket.io';
import dotenv from 'dotenv';
import path from 'path';
const app = express();

//importan: Configuracion de socket.io
const server = http.createServer(app); //?Llamamos a los metodos http de node para crear un servidor ya que express lo crea pero con otras configuraciones
const io = new SocketServer(server, { cors: { origin: '*' } }); //!Aqui configuramos cors para que acepte cualquier origen en este caso desde el front
   

//!Aqui se configura el socket.io para que escuche eventos
io.on('connection', (socket) => {

   //?Escucha el evento 'message' que se envia desde el frontend y lo Reenvio al resto de clientes conectados
    socket.on('message', (message) => {
        socket.broadcast.emit('message', {
         body: message,
         from : socket.id
        }); 
    });
});

const optionsCors = {
    origin: '*',
    optionSuccessStatus: 200
};

//Middlewares
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors(optionsCors));

//Static files
//?Aqui se configura la carpeta donde se encuentra el dist del frontend para que el servidor pueda servirlo
 //? Agregamos en el script de build cd ../client && pnpm build para que se ejecute el build de react y se cree la carpeta dist en el cliente
const dist = path.resolve(__dirname, '../dist');
console.log(dist)
app.use(express.static(dist));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
  });
export default server;
