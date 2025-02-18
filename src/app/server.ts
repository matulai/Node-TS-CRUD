import http from "node:http";
import { UserController } from "@/controllers/userController";
import { createUsersTable } from "@/persistencia/pool";

export class Server {
  private httpServer: http.Server;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.httpServer = http.createServer(
      (req: http.IncomingMessage, res: http.ServerResponse) => {
        if (!req.url) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Bad Request: URL is missing" }));
        } else {
          if (req.url === "/api/users" && req.method === "GET") {
            this.userController.getUsers(req, res);
          } else if (
            req.url.match(/^\/api\/user\/([0-9a-fA-F-]{36})$/) &&
            req.method === "GET"
          ) {
            const id: string = req.url.split("/")[3]!;
            this.userController.getUserById(req, res, id);
          } else if (req.url === "/api/user" && req.method === "POST") {
            this.userController.createNewUser(req, res);
          } else if (req.url === "/api/user" && req.method === "PUT") {
            this.userController.updateUserById(req, res);
          } else if (
            req.url.match(/^\/api\/user\/([0-9a-fA-F-]{36})$/) &&
            req.method === "DELETE"
          ) {
            const id: string = req.url.split("/")[3]!;
            this.userController.deleteUserById(req, res, id);
          } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Content not avaible" }));
          }
        }
      }
    );
  }

  private async createTables(): Promise<void> {
    await createUsersTable();
  }

  async start(): Promise<void> {
    await this.createTables();
    const PORT: string | number = process.env.PORT || 3000;
    this.httpServer.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  }

  stop(): void {
    this.httpServer.close(error => {
      if (error) {
        throw error;
      }
    });
  }

  getServerhttp(): http.Server {
    return this.httpServer;
  }
}
