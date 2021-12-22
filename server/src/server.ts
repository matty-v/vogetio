import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('tiny'));

app.get("/", async (_: Request, res: Response) => {
  res.json({ health: "OK" });
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`Using DB connection: ${process.env.DATABASE_URL}`);
  console.log(`vogetio server is listening on port ${PORT}...`);
});
