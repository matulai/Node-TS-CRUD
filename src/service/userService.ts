import { writeDataToFile, readFile } from "../utils/functions.js";
import type { User } from "../types/types.js";

const users = JSON.parse(readFile("src/data/users.json"));

const typedUsers: User[] = users as User[];

class UserService {
  findAll(): Promise<User[]> {
    return new Promise(resolve => {
      resolve(typedUsers);
    });
  }

  findUserById(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      const user = typedUsers.find(user => user.id == id);
      if (user) {
        resolve(user);
      } else {
        reject("User not found");
      }
    });
  }

  createUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      if (user) {
        const newUser = { ...user, id: user.id ?? this.#generateId() };
        typedUsers.push(newUser);
        writeDataToFile("src/data/users.json", typedUsers);
        resolve(newUser);
      } else {
        reject("You cannot do that");
      }
    });
  }

  cleanBD() {
    writeDataToFile("src/data/users.json", typedUsers.slice(0, 100));
  }

  #generateId() {
    return typedUsers.length + 1;
  }
}

export { UserService };
