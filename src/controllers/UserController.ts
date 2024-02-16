import { Request, Response } from 'express';
import { AppDataSource } from "../index"
import { User } from '../entities/Userdel';

export const getUsers = async (req: Request, res: Response) => {
  const users = await AppDataSource.manager.find(User);
  res.json(users);
};