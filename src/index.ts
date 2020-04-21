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
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
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
    const user: User = await database('users').select().where({ id: req.params.id }).first();
    if (user) {
      const newUser: User = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age
      }
      await database('users').update(user).where({ id: req.params.id });
      res.sendStatus(200);
    } else {
    res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// delete
app.delete('/user/:id', async (req: Request, res: Response) => {
  try {
    const user: User = await database('users').select().where({ id: req.params.id }).first();
    if (user) {
      await database('users').delete().where({ id: req.params.id });
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
});

interface Group {
  id?: string;
  name: string;
  description: string;
  location: string;
  maximalSize: number;
}

// index
app.get('/group', async (req: Request, res: Response) => {
  const groups: Array<Group> = await database('groups').select();
  res.json(groups);
});

// show
app.get('/group/:id', async (req: Request, res: Response) => {
  try {
    const group: Group = await database('groups').select().where({ id: req.params.id }).first();
    if (group) {
      res.json(group);
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// create
app.post('/group', async (req: Request, res: Response) => {
  try {
    const group: Group = {
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      maximalSize: req.body.maximalSize
    }
    await database('groups').insert(group);
    res.sendStatus(201);
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
});


// update
app.put('/group/:id', async (req: Request, res: Response) => {
  try {
    const group: Group = await database('groups').select().where({ id: req.params.id }).first();
    if (group) {
      const newGroup: Group = {
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        maximalSize: req.body.maximalSize
      }
      await database('groups').update(group).where({ id: req.params.id });
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// delete
app.delete('/group/:id', async (req: Request, res: Response) => {
  try {
    const group: Group = await database('groups').select().where({ id: req.params.id }).first();
    if (group) {
      await database('groups').delete().where({ id: req.params.id });
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});