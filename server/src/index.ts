
import app from './server';

app.listen(process.env.PORT, () => {
    console.log(  `Server is running on port ${process.env.PORT}  ${'http://localhost:4000/'}`);
    });