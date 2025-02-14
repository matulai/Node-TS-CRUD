import { IncomingMessage, ServerResponse } from "http";
import { UserService } from "../service/userService.js";
import { streamToData } from "../utils/functions.js";
import type { User } from "../types/types.js";

const userService = new UserService();

// @GET /api/users
async function getUsers(_req: IncomingMessage, res: ServerResponse) {
  try {
    const users: User[] = await userService.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
}

// @GET /api/user/:id
async function getUserById(
  _req: IncomingMessage,
  res: ServerResponse,
  id: number
) {
  try {
    const user: User = await userService.findUserById(id);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }
}

async function createNewUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const reqData: User = await streamToData(req);
    const newUser: User = await userService.createUser(reqData);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newUser));
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }
}

export { getUsers, getUserById, createNewUser };
