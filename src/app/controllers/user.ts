import { User} from "../models/user";
import { database } from "../../lib/database";
import { Request, Response } from "express";
import * as userSerializer from '../serializers/user';
import * as bcrypt from 'bcrypt';

export const index = async (req: Request, res: Response) => {
  const users: Array<User> = await database('users').select();
  res.json(users);
};

export const show = async (req: Request, res: Response) => {
  try {
    const user: User = await database('users').select().where({ id: req.params.id }).first();
    console.log(user);
    if (typeof user !== 'undefined') {
      res.json(userSerializer.show(user))
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
    console.log('REQ', req.body.password, 'HASH', encryptedPassword);
    const user: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: encryptedPassword,
      age: req.body.age
    }
    await database('users').insert(user);
    res.sendStatus(201);
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const user: User = await database('users').select().where({ id: req.params.id }).first();
    if (user) {
      const newUser: User = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age
      }
      await database('users').update(newUser).where({ id: req.params.id });
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const destroy = async (req: Request, res: Response) => {
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
};