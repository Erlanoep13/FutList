import { Request, Response } from 'express';
import { CreateUserService } from './services/CreateUserService';
import { ListUsersService } from './services/ListUsersService';
import { UpdateUserService } from './services/UpdateUserService';
import { DeleteUserService } from './services/DeleteUserService';

export class UserController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const createUserService = new CreateUserService();
      const user = await createUserService.execute({ email, passwordText: password });
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const listUsers = new ListUsersService();
      const users = await listUsers.execute();
      return res.json(users);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id as string, 10);
    const { email, password, isActive } = req.body;
    
    try {
      const updateUserService = new UpdateUserService();
      const user = await updateUserService.execute({ id, email, passwordText: password, isActive });
      return res.json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    // CORREÇÃO AQUI: Forçando o tipo para number
    const id = parseInt(req.params.id as string, 10);
    
    try {
      const deleteUserService = new DeleteUserService();
      await deleteUserService.execute(id);
      return res.status(204).send(); 
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}