import express, { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/api", async (req: Request, res: Response) => {
  res.json({ message: "Hello, this is server!" });
});

app.get("/api/users", async (req: Request, res: Response) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
