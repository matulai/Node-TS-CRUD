import http from "http";
import {
  getUsers,
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
} from "./controllers/userController.js";

const server: http.Server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (!req.url) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Bad Request: URL is missing" }));
    } else {
      if (req.url === "/api/users" && req.method === "GET") {
        getUsers(req, res);
      } else if (
        req.url.match(/^\/api\/user\/([0-9]+)$/) &&
        req.method === "GET"
      ) {
        const id: number = Number(req.url.split("/")[3]);
        getUserById(req, res, id);
      } else if (req.url === "/api/user" && req.method === "POST") {
        createNewUser(req, res);
      } else if (
        req.url.match(/^\/api\/user\/([0-9]+)$/) &&
        req.method === "PUT"
      ) {
        const id: number = Number(req.url.split("/")[3]);
        updateUserById(req, res, id);
      } else if (
        req.url.match(/^\/api\/user\/([0-9]+)$/) &&
        req.method === "DELETE"
      ) {
        const id: number = Number(req.url.split("/")[3]);
        deleteUserById(req, res, id);
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Content not avaible" }));
      }
    }
  }
);

const PORT: string | number = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
