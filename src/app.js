import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')))
app.use('/api', routes);

app.use((req,res,next) => {
res.status(404).send('Not Found');
});
app.use((err,req,res,next)=> {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
})
export default app;