import { UserService } from "../../src/service/userService.js";
import type { User } from "../../src/types/types.js";

// toStrictEqual: Pa objetoc y verifica que TODO sea exactamente igual.
// toEqual: Pa objetos pero ignora claves con valor undefined, etc.
// toBe: Pa valores primitivos, en objetos verifica que la referencias sean iguales.

let userService: UserService = new UserService();

afterEach(() => {
  userService.cleanBD();
});

test("Obtener la cantidad de todos los usuarios", async () => {
  await userService.createUser({
    first_name: "Leo",
    last_name: "Pablo",
    email: "leo@pablo.com",
    gender: "Female",
  });

  const data: User[] = await userService.findAll();
  expect(data.length).toBe(1);
});

test("Obtener un usuario por id", async () => {
  const user: User = await userService.createUser({
    first_name: "Leo",
    last_name: "Pablo",
    email: "leo@pablo.com",
    gender: "Female",
  });

  const data: User = await userService.findUserById(user.id!);
  expect(data.id).toBe(user.id);
});

test("Obtener un usuario por id inexistente", async () => {
  await expect(userService.findUserById(100)).rejects.toBe("User not found");
});

test("Se crea un usuario", async () => {
  const user: User = await userService.createUser({
    first_name: "Leo",
    last_name: "Pablo",
    email: "leo@pablo.com",
    gender: "Female",
  });

  expect(user.id).toBeDefined();
});

test("Se actualiza un usuario existente", async () => {
  const user: User = await userService.createUser({
    first_name: "Leo",
    last_name: "Pablo",
    email: "leo@pablo.com",
    gender: "Female",
  });

  const updatedUser: User = await userService.updateUser(user.id!, {
    first_name: "Lalo",
    last_name: "Pedro",
    email: "lalo@pedro.com",
    gender: "Male",
  });

  expect(updatedUser.id).toBe(user.id);
});

test("Se acualiza un usuario inexistente", async () => {
  await expect(
    userService.updateUser(100, {
      first_name: "Leo",
      last_name: "Pablo",
      email: "leo@pablo.com",
      gender: "Female",
    })
  ).rejects.toBe("User not found");
});

test("Se elimina un usuario", async () => {
  const user: User = await userService.createUser({
    first_name: "Leo",
    last_name: "Pablo",
    email: "leo@pablo.com",
    gender: "Female",
  });

  const data: string = await userService.deleteUserById(user.id!);

  expect(data).toBe("User deleted");
});
