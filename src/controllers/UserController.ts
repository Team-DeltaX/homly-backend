import { Request, Response } from 'express';
import { AppDataSource } from "../index"
import { HomlyUser } from '../entities/User';

export const getUsers = async (req: Request, res: Response) => {
  const users = await AppDataSource.manager.find(HomlyUser);
  res.json(users);
};