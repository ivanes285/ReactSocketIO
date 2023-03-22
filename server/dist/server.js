"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
//importan: Configuracion de socket.io
const server = http_1.default.createServer(app); //?Llamamos a los metodos http de node para crear un servidor ya que express lo crea pero con otras configuraciones
const io = new socket_io_1.Server(server, { cors: { origin: '*' } }); //!Aqui configuramos cors para que acepte cualquier origen en este caso desde el front
//!Aqui se configura el socket.io para que escuche eventos
io.on('connection', (socket) => {
    //?Escucha el evento 'message' que se envia desde el frontend y lo Reenvio al resto de clientes conectados
    socket.on('message', (message) => {
        socket.broadcast.emit('message', {
            body: message,
            from: socket.id
        });
    });
});
const optionsCors = {
    origin: '*',
    optionSuccessStatus: 200
};
//Middlewares
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)(optionsCors));
//Static files
//?Aqui se configura la carpeta donde se encuentra el dist del frontend para que el servidor pueda servirlo
//? Agregamos en el script de build cd ../client && pnpm build para que se ejecute el build de react y se cree la carpeta dist en el cliente
const dist = path_1.default.resolve(__dirname, '../../client/dist');
console.log(dist);
app.use(express_1.default.static(dist));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '../../client/dist/index.html'));
});
exports.default = server;
