
import server from './server';   //?Importamos el servidor de express que creamos con el metodo http de node y no de express

server.listen(process.env.PORT, () => {
    console.log(  `Server is running on port ${process.env.PORT}  ${'http://localhost:4000/'}`);
    });