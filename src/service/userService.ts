import users from "../data/users.json" assert { type: "json" };
import type { User } from "../types/types.js";

import { writeDataToFile } from "../utils/functions.js";

class UserService {
  findAll() {
    return new Promise(resolve => {
      resolve(users);
    });
  }

  findUserById(id: number) {
    return new Promise((resolve, reject) => {
      const user = users.find(user => user.id == id);
      if (user) {
        resolve(user);
      } else {
        reject("User not found");
      }
    });
  }

  createUser(user: User) {
    return new Promise((resolve, reject) => {
      if (user) {
        const newUser = { ...user, id: user.id ?? this.#generateId() };
        users.push(newUser);
        writeDataToFile("data/users.json", users);
        resolve(newUser);
      } else {
        reject("You cannot do that");
      }
    });
  }

  cleanBD() {
    writeDataToFile("data/users.json", users.slice(0, 100));
  }

  #generateId() {
    return users.length + 1;
  }
}

export { UserService };
