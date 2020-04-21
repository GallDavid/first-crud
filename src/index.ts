import * as express from 'express';
import { Request, Response, Application } from 'express';
import { database } from './lib/database';

const app: Application = express();
app.use(express.json());
const { PORT = 3000 } = process.env;
// const PORT = process.env.PORT || 3000

interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  created_at?: string;
  updated_at?: string;
}

app.get('/', async (req: Request, res: Response) => {
  res.json({
    message: 'hello world',
  });
});

// index
app.get('/user', async (req: Request, res: Response) => {
  const users: Array<User> = await database('users').select();
  res.json(users);
});

// show
app.get('/user/:id', async (req: Request, res: Response) => {
  try {
    const user: User = await database('users').select().where({ id: req.params.id }).first();
  res.json(user);
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// create
app.post('/user', async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age
    }

    await database('users').insert(user);
    res.sendStatus(201);
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
});


// update
app.put('/user/:id', async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age
    }
  
    await database('users').update(user).where({ id: req.params.id });
    res.sendStatus(200);
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// delete
app.delete('/user/:id', async (req: Request, res: Response) => {
  try {
    await database('users').delete().where({ id: req.params.id });
  res.sendStatus(204);
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});