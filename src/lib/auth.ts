import { Request, Response, NextFunction } from "express";
import { User } from "../app/models/user";
import { database } from "./database";
import * as jwt from "jsonwebtoken";
import * as jwtConfig from '../../config/jwt.json';

enum Method {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  destroy = 'DELETE'
}

interface AnonymusEndpoint {
  path: String;
  method: Method;
}

const anonymusEndpoints: Array<AnonymusEndpoint> = [
  {
    path: '/user',
    method: Method.post
  },
  {
    path: '/login',
    method: Method.post
  },
]

/* const isAnonymusEndpoint = (req: Request): boolean => {
  const path = req.path;
  const method = req.method;
  for  (let anonymusEndpoint of anonymusEndpoints) {
    if(anonymusEndpoint.method === req.method && anonymusEndpoint.path === req.path) {
      return true;
    }
  }
  return false;
}
 */

const isAnonymusEndpoint = (req: Request): boolean => {
  return !!(anonymusEndpoints.find(anonymusEndpoint => (anonymusEndpoint.method === req.method && anonymusEndpoint.path === req.path)))
}

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (isAnonymusEndpoint(req)) {
      return next();
    }
    const token: string = req.headers.authorization.split(' ')[1];
    const info = jwt.verify(token, jwtConfig.secret);
    const userId: number = info.userId;
    const user: User = await database('users').where({ id: userId }).first();
    res.locals.user = user;
    next()
  } catch(error) {
    res.sendStatus(401);
  }
}