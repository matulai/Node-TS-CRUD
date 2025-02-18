import type { User } from "@/types/types";
import { UserDAO } from "@/persistencia/dao/userDAO";

export class UserService {
  private userDAO: UserDAO;

  constructor() {
    this.userDAO = new UserDAO();
  }

  async findAll(): Promise<User[]> {
    return await this.userDAO.getAllUsers();
  }

  async findUserById(id: string): Promise<User> {
    return await this.userDAO.getUser(id);
  }

  async createUser(user: User): Promise<User> {
    return await this.userDAO.addUser(user);
  }

  async updateUser(user: User): Promise<User> {
    return this.userDAO.updateUser(user);
  }

  async deleteUserById(id: string): Promise<string> {
    return await this.userDAO.deleteUser(id);
  }

  async cleanBD(): Promise<string> {
    return this.userDAO.deleteAllUsers();
  }
}
