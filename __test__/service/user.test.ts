import { UserService } from "../../src/service/userService";
import type { User } from "../../src/types/types";

// toStrictEqual: Pa objetoc y verifica que TODO sea exactamente igual.
// toEqual: Pa objetos pero ignora claves con valor undefined, etc.
// toBe: Pa valores primitivos, en objetos verifica que la referencias sean iguales.

const userService: UserService = new UserService();

afterEach(() => {
  userService.cleanBD();
});

test("Obtener la cantidad de todos los usuarios", () => {
  userService.createUser({
    first_name: "Leo",
    last_name: "Pablo",
    email: "leo@pablo.com",
    gender: "Female",
  });

  const data: User[] = userService.findAll();
  expect(data.length).toBe(1);
});

test("Obtener un usuario por id", () => {
  const user: User = userService.createUser({
    first_name: "Leo",
    last_name: "Pablo",
    email: "leo@pablo.com",
    gender: "Female",
  });

  const data: User = userService.findUserById(user.id!);
  expect(data.id).toBe(user.id);
});

test("Obtener un usuario por id inexistente", () => {
  expect(() => userService.findUserById(100)).toThrow("User not found");
});

test("Se crea un usuario", () => {
  const user: User = userService.createUser({
    first_name: "Leo",
    last_name: "Pablo",
    email: "leo@pablo.com",
    gender: "Female",
  });

  expect(user.id).toBeDefined();
});

test("Se actualiza un usuario existente", () => {
  const user: User = userService.createUser({
    first_name: "Leo",
    last_name: "Pablo",
    email: "leo@pablo.com",
    gender: "Female",
  });

  const updatedUser: User = userService.updateUser(user.id!, {
    first_name: "Lalo",
    last_name: "Pedro",
    email: "lalo@pedro.com",
    gender: "Male",
  });

  expect(updatedUser.id).toBe(user.id);
  expect(updatedUser.first_name).toBe("Lalo");
});

test("Se acualiza un usuario inexistente", () => {
  expect(() =>
    userService.updateUser(100, {
      first_name: "Leo",
      last_name: "Pablo",
      email: "leo@pablo.com",
      gender: "Female",
    })
  ).toThrow("User not found");
});

test("Se elimina un usuario", () => {
  const user: User = userService.createUser({
    first_name: "Leo",
    last_name: "Pablo",
    email: "leo@pablo.com",
    gender: "Female",
  });

  const data: string = userService.deleteUserById(user.id!);

  expect(data).toBe("User deleted");
});
