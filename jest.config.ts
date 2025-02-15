// jest.config.ts
import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  transform: {
    ".(ts|tsx)": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|js)$",
  // Funca pero tsc no lo reconoce, y el error persistente es molesto de ver.
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default jestConfig;
