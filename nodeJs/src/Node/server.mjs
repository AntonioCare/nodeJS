import { createServer } from "node:http";

const server = createServer((req, response) => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "text/html");
  response.end(
    "<html><body><h1>Welcome To my Server with Node</h1></body></html>"
  );
});

server.listen(3000, () => {
  console.log("Server avviato con successo!");
});
