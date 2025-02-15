import { writeDataToFile, readFile } from "@/utils/functions";
import type { User } from "@/types/types";

// No es necesario el fs para escribir en el archivo json
// con lo siguiente lo tratas como un array cualquier y va.
const users = JSON.parse(readFile("src/data/users.json"));

const typedUsers: User[] = users as User[];

class UserService {
  #avaiblesIds: number[] = [];

  findAll(): User[] {
    return typedUsers;
  }

  findUserById(id: number): User {
    const user: User | undefined = typedUsers.find(user => user.id == id);
    if (user) {
      return user;
    } else {
      throw new Error("User not found");
    }
  }

  createUser(user: User): User {
    if (user) {
      const newUser: User = { id: this.#generateId(), ...user };
      typedUsers.push(newUser);
      // writeDataToFile("src/data/users.json", typedUsers);
      return newUser;
    } else {
      throw new Error("You cannot do that");
    }
  }

  updateUser(id: number, toUpdateUser: User): User {
    const userIndex: number = typedUsers.findIndex(user => user.id === id);

    if (userIndex !== -1 && toUpdateUser) {
      const updatedUser: User = {
        id: typedUsers[userIndex]!.id,
        ...toUpdateUser,
      };
      typedUsers[userIndex] = updatedUser;
      // writeDataToFile("src/data/users.json", typedUsers);
      return updatedUser;
    } else {
      throw new Error("User not found");
    }
  }

  deleteUserById(id: number): string {
    const userIndex: number = typedUsers.findIndex(user => user.id == id);
    if (userIndex !== -1) {
      typedUsers.splice(userIndex, 1);
      this.#avaiblesIds.push(id);
      // writeDataToFile("src/data/users.json", updatedTypedUsers);
      return "User deleted";
    } else {
      throw new Error("User not found");
    }
  }

  cleanBD(): void {
    writeDataToFile("src/data/users.json", []);
  }

  #generateId(): number {
    return this.#avaiblesIds.shift() ?? typedUsers.length + 1;
  }
}

export default UserService;
