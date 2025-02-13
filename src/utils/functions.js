import fs from "fs";

function writeDataToFile(fileName, data) {
  fs.writeFileSync(fileName, JSON.stringify(data), "utf-8", error => {
    if (error) {
      console.log(error);
    }
  });
}

async function streamToData(readableStream) {
  let body = [];
  return readableStream
    .on("data", chunk => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
    });
}

export { writeDataToFile, streamToData };
