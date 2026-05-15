import { Request, Response } from 'express';
import { AuthenticateUserService } from './services/AuthenticateUserService';

export class AuthController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const authenticateUser = new AuthenticateUserService();
      const result = await authenticateUser.execute({ email, passwordText: password });
      
      return res.json(result);
    } catch (error: any) {
      return res.status(401).json({ error: error.message }); // 401 = Unauthorized (Não autorizado)
    }
  }
}