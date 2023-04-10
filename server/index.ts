import app from "./app";
import http from "http";
import { PORT } from "./utils/config";

const server = http.createServer(app);

console.log(PORT);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
