/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  extensionsToTreatAsEsm: [".ts"],
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["dist/test"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
