import express from "express";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import {
    getUsers,
} from "./controllers/UserController";


const app = express();
const PORT = process.env.PORT || 3002;

export const AppDataSource = new DataSource({
  type: "oracle",
  connectString: "localhost:3307/orcl",
  username: "System",
  password: "Aruna1234",
  entities: [User],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    app.use(express.json());

    // Routes
    app.get("/users", getUsers);
    // app.get("/users/:id", getUserById);
    // app.post("/users", createUser);
    // app.put("/users/:id", updateUser);
    // app.delete("/users/:id", deleteUser);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));

