import { UserService } from "../../src/service/userService.js";
import type { User } from "../../src/types/types.js";

// toStrictEqual: Pa objetoc y verifica que TODO sea exactamente igual.
// toEqual: Pa objetos pero ignora claves con valor undefined, etc.
// toBe: Pa valores primitivos, en objetos verifica que la referencias sean iguales.

let userService: UserService;

beforeEach(() => {
  userService = new UserService();
});

afterEach(() => {
  userService.cleanBD();
});

test("Obtener la cantidad de todos los usuarios", () => {
  return userService.findAll().then((data: User[]) => {
    expect(data.length).toBe(100);
  });
});

test("Obtener un usuario por id", () => {
  return userService.findUserById(1).then(data => {
    expect(data).toStrictEqual({
      id: 1,
      first_name: "Elita",
      last_name: "Epple",
      email: "eepple0@mayoclinic.com",
      gender: "Female",
    });
  });
});

test("Se crea un usuario", () => {
  return userService
    .createUser({
      first_name: "Matias",
      last_name: "Matias",
      email: "matias@matias.com",
      gender: "Male",
    })
    .then(user => {
      expect(user).toStrictEqual({
        id: expect.any(Number),
        first_name: "Matias",
        last_name: "Matias",
        email: "matias@matias.com",
        gender: "Male",
      });
    });
});
