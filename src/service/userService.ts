import { writeDataToFile, readFile } from "../utils/functions.js";
import type { User } from "../types/types.js";

const users = JSON.parse(readFile("src/data/users.json"));

const typedUsers: User[] = users as User[];

class UserService {
  #avaiblesIds: number[] = [];

  findAll(): Promise<User[]> {
    return new Promise(resolve => {
      resolve(typedUsers);
    });
  }

  findUserById(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      const user: User | undefined = typedUsers.find(user => user.id == id);
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
        const newUser: User = { id: this.#generateId(), ...user };
        typedUsers.push(newUser);
        writeDataToFile("src/data/users.json", typedUsers);
        resolve(newUser);
      } else {
        reject("You cannot do that");
      }
    });
  }

  updateUser(id: number, toUpdateUser: User): Promise<User> {
    return new Promise((resolve, reject) => {
      const user: User | undefined = typedUsers.find(user => user.id == id);
      if (user && user.id && toUpdateUser) {
        const updatedUser: User = { id: user.id, ...toUpdateUser };
        const updatedTypedUsers = typedUsers.filter(user => user.id === id);
        writeDataToFile("src/data/users.json", updatedTypedUsers);
        resolve(updatedUser);
      } else {
        reject("User not found");
      }
    });
  }

  deleteUserById(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const user: User | undefined = typedUsers.find(user => user.id == id);
      if (user) {
        const updatedTypedUsers = typedUsers.filter(user => user.id === id);
        this.#avaiblesIds.push(id);
        writeDataToFile("src/data/users.json", updatedTypedUsers);
        resolve("User deleted");
      } else {
        reject("User not found");
      }
    });
  }

  cleanBD(): void {
    writeDataToFile("src/data/users.json", []);
  }

  #generateId(): number {
    return this.#avaiblesIds.shift() ?? typedUsers.length + 1;
  }
}

export { UserService };
