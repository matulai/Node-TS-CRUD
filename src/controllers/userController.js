import { UserService } from "../service/userService";
import { streamToData } from "../utils/functions";
const userService = new UserService();

// @GET /api/users
async function getUsers(req, res) {
  try {
    const users = await userService.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

// @GET /api/user/:id
async function getUserById(req, res, id) {
  try {
    const user = await userService.findUserById(id);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }
}

async function createNewUser(req, res) {
  try {
    const newUser = await userService.createUser(streamToData(req));

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newUser));
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }
}

export { getUsers, getUserById, createNewUser };
