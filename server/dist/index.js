"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server")); //?Importamos el servidor de express que creamos con el metodo http de node y no de express
server_1.default.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}  ${'http://localhost:4000/'}`);
});
