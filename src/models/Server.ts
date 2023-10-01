import express from "express";
import "dotenv/config";
import cors from "cors";
import { router as authRouter } from "../routes/auth.routes";
import { router as todosRouter } from "../routes/todo.routes";
import { dbConnection } from "../DB/config";

interface appPaths {
  auth: string;
  todos: string;
}

export class Server {
  private app = express();
  private port: string = process.env.PORT as string;
  private Paths: appPaths = {
    auth: "/api/auth",
    todos: "/api/todos",
  };
  constructor() {
    this.middlewares();
    this.routes();
    this.DB();
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`server listen in port ${this.port}`);
    });
  }
  middlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }
  routes(): void {
    this.app.use(this.Paths.auth, authRouter);
    this.app.use(this.Paths.todos, todosRouter);
  }
  DB(): void {
    dbConnection();
  }
}
