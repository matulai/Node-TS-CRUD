import http from "http";
import {
  getUsers,
  getUserById,
  createNewUser,
} from "./controllers/userController";

const server = http.createServer((req, res) => {
  if (req.url === "/api/users" && req.method === "GET") {
    getUsers(req, res);
  } else if (req.url.match(/^\/api\/user\/([0-9]+)$/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    getUserById(req, res, id);
  } else if (req.url === "/api/user" && req.method === "POST") {
    createNewUser(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Content not avaible" }));
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
