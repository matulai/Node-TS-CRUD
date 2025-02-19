import { UserService } from "../../src/service/userService";
import type { User } from "../../src/types/types";
import { randomUUID } from "crypto";

// toStrictEqual: Pa objetoc y verifica que TODO sea exactamente igual.
// toEqual: Pa objetos pero ignora claves con valor undefined, etc.
// toBe: Pa valores primitivos, en objetos verifica que la referencias sean iguales.

const userService: UserService = new UserService();

afterAll(() => {
  userService.closePool();
});

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

  expect(user.id).toBeDefined();
  const data: User = await userService.findUserById(user.id!);
  expect(data.id).toBe(user.id);
});

test("Obtener un usuario por id inexistente", async () => {
  expect(
    async () => await userService.findUserById(randomUUID())
  ).rejects.toThrow("user not found");
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

  expect(user.id).toBeDefined();

  const updatedUser: User = await userService.updateUser({
    id: user.id!,
    first_name: "Lalo",
    last_name: "Pedro",
    email: "lalo@pedro.com",
    gender: "Male",
  });

  expect(updatedUser.id).toBe(user.id);
  expect(updatedUser.first_name).toBe("Lalo");
});

test("Se acualiza un usuario inexistente", () => {
  expect(
    async () =>
      await userService.updateUser({
        id: randomUUID(),
        first_name: "Leo",
        last_name: "Pablo",
        email: "leo@pablo.com",
        gender: "Female",
      })
  ).rejects.toThrow("user not found");
});

test("Se elimina un usuario", async () => {
  const user: User = await userService.createUser({
    first_name: "Leo",
    last_name: "Pablo",
    email: "leo@pablo.com",
    gender: "Female",
  });

  expect(user.id).toBeDefined();

  const data: string = await userService.deleteUserById(user.id!);

  expect(data).toBe("user deleted success");
});
