import { IncomingMessage, ServerResponse } from "http";
import { UserService } from "../service/userService.js";
import { streamToData } from "../utils/functions.js";
import type { User } from "../types/types.js";

const userService: UserService = new UserService();

// @GET /api/users
function getUsers(_req: IncomingMessage, res: ServerResponse): void {
  try {
    const users: User[] = userService.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
}

// @GET /api/user/:id
function getUserById(
  _req: IncomingMessage,
  res: ServerResponse,
  id: number
): void {
  try {
    const user: User = userService.findUserById(id);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }
}

// @POST /api/user/:id body: User
async function createNewUser(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  try {
    const reqData: User = await streamToData(req);
    const newUser: User = userService.createUser(reqData);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newUser));
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }
}

// @PUT /api/user/:id body: User
async function updateUserById(
  req: IncomingMessage,
  res: ServerResponse,
  id: number
): Promise<void> {
  try {
    const toUpdateUser: User = await streamToData(req);
    const updatedUser: User = userService.updateUser(id, toUpdateUser);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updatedUser));
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }
}

// DELETE /api/user/:id
function deleteUserById(
  _req: IncomingMessage,
  res: ServerResponse,
  id: number
): void {
  try {
    const message: string = userService.deleteUserById(id);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: message }));
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }
}

export { getUsers, getUserById, createNewUser, updateUserById, deleteUserById };
