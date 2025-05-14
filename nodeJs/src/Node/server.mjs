import { createServer } from "node:http";

const server = createServer((req, response) => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");
  const jsonBody = JSON.stringify({ location: "Mars" });
  response.end(jsonBody);
});

server.listen(3000, () => {
  console.log("Server avviato con successo!");
});
