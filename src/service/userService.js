import users from "../data/users.json";

import { writeDataToFile } from "../utils/functions";

class UserService {
  findAll() {
    return new Promise(resolve => {
      resolve(users);
    });
  }

  findUserById(id) {
    return new Promise((resolve, reject) => {
      const user = users.find(user => user.id == id);
      if (user) {
        resolve(user);
      } else {
        reject("User not found");
      }
    });
  }

  createUser(user) {
    return new Promise((resolve, reject) => {
      if (user) {
        const newUser = { id: this.#generateId(), ...user };
        users.push(newUser);
        writeDataToFile("data/users.json", users);
        resolve(newUser);
      } else {
        reject("You cannot do that");
      }
    });
  }

  cleanBD() {
    const newUsers = users.slice(0, 100);
    users = newUsers;
    writeDataToFile("data/users.json", users);
  }

  #generateId() {
    return users.length + 1;
  }
}

export { UserService };
