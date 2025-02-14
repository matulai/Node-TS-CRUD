import fs from "fs";
import { Readable } from "stream";
import type { User } from "../types/types.js";

function writeDataToFile(fileName: string, data: any) {
  fs.writeFileSync(fileName, JSON.stringify(data), "utf-8");
}

function readFile(fileName: string): string {
  return fs.readFileSync(fileName, "utf-8");
}

function streamToData(stream: Readable): Promise<User> {
  return new Promise((resolve, reject) => {
    let body = "";

    stream
      .on("data", chunk => {
        body += chunk.toString();
      })
      .on("end", () => {
        resolve(JSON.parse(body));
      })
      .on("error", err => {
        reject(err);
      });
  });
}

export { writeDataToFile, streamToData, readFile };
