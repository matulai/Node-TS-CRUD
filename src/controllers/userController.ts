import { IncomingMessage, ServerResponse } from "http";
import { UserService } from "@/service/userService";
import { streamToData } from "@/utils/functions";
import type { User } from "@/types/types";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // @GET /api/users
  async getUsers(_req: IncomingMessage, res: ServerResponse): Promise<void> {
    try {
      const users: User[] = await this.userService.findAll();

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(users));
    } catch (error) {
      this.handleError(res, error, 500);
    }
  }

  // @GET /api/user/:id
  async getUserById(
    _req: IncomingMessage,
    res: ServerResponse,
    id: string
  ): Promise<void> {
    try {
      const user: User = await this.userService.findUserById(id);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    } catch (error) {
      this.handleError(res, error, 404);
    }
  }

  // @POST /api/user/:id body: User
  async createNewUser(
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> {
    try {
      const reqData: User = await streamToData(req);

      if (!reqData || !reqData.email) {
        throw new Error("Invalid user data");
      }

      const newUser: User = await this.userService.createUser(reqData);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newUser));
    } catch (error) {
      this.handleError(res, error, 400);
    }
  }

  // @PUT /api/user/:id body: User
  async updateUserById(
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> {
    try {
      const toUpdateUser: User = await streamToData(req);

      if (!toUpdateUser || !toUpdateUser.id) {
        throw new Error("Invalid user data");
      }

      const updatedUser: User = await this.userService.updateUser(toUpdateUser);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedUser));
    } catch (error) {
      this.handleError(res, error, 404);
    }
  }

  // DELETE /api/user/:id
  async deleteUserById(
    _req: IncomingMessage,
    res: ServerResponse,
    id: string
  ): Promise<void> {
    try {
      const message: string = await this.userService.deleteUserById(id);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: message }));
    } catch (error) {
      this.handleError(res, error, 404);
    }
  }

  // Método genérico para manejar errores
  private handleError(
    res: ServerResponse,
    error: unknown,
    statusCode: number
  ): void {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: error instanceof Error ? error.message : "Unexpected error",
      })
    );
  }
}
