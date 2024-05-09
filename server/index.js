import express from "express";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { PORT } from "./config.js";
import indexRoutes from "./routes/index.routes.js";
import userRoutes from "./routes/users.routes.js";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

app.use(cors());

app.use(express.json());

app.use(indexRoutes);
app.use(userRoutes);

app.use(express.static(join(__dirname, "../client/dist")));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
