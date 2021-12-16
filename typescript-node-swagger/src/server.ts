import express from 'express';
import infoRoute from './routes'

const app = express();

app.get('/info', infoRoute)

app.listen(3000, () => console.log('listening on port 3000'))