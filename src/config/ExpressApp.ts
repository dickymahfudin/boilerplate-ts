import express from "express";
import cors from "cors";
import { env } from "@config/config";
import errorHandler from "@middleware/errorHandler";
import handleResponse from "@middleware/response";
import handleRequest from "@middleware/request";

class ExpressApp {
  private app: express.Application;
  private httpControllers: any[];

  constructor(httpControllers: any[]) {
    this.app = express();
    this.httpControllers = httpControllers;
  }

  private plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());

    this.app.use(handleRequest);
    this.app.use(handleResponse);

    this.httpControllers.forEach((controller) => {
      this.app.use(controller.router);
      controller.router.stack.forEach((middleware: any) => {
        const file = controller.constructor.name;
        if (middleware.route) {
          middleware.route.file = file;
        } else if (middleware.name === "router" && middleware.handle && middleware.handle.stack) {
          middleware.handle.stack.forEach((subMiddleware: any) => {
            if (subMiddleware.route) {
              subMiddleware.route.file = file;
            }
          });
        }
      });
    });

    this.app.use(errorHandler);
  }

  private listRoutes(): void {
    console.log("\n📌 Registered Routes:");
    const routes: { methods: string; path: string; file: string }[] = [];

    const cleanPath = (regexp: string): string => {
      return regexp
        .replace(/\\\//g, "/")
        .replace(/\/\?\(\?=\/\|\$\)/g, "")
        .replace(/\(\?:\^\|\$\)/g, "")
        .replace(/\?\(\?=\.\$\)/g, "")
        .replace(/\(\?:\/\)\?/g, "/")
        .replace(/\^/g, "")
        .replace(/\$$/g, "")
        .replace(/\/+/g, "/");
    };

    const extractRoutes = (stack: any[], prefix = "") => {
      stack.forEach((middleware) => {
        if (middleware.route) {
          const methods = Object.keys(middleware.route.methods)
            .map((m) => m.toUpperCase())
            .join(", ");

          routes.push({
            methods,
            path: prefix + middleware.route.path,
            file: middleware.route.file,
          });
        } else if (middleware.name === "router" && middleware.handle && middleware.handle.stack) {
          extractRoutes(middleware.handle.stack, prefix + cleanPath(middleware.regexp.source));
        }
      });
    };

    extractRoutes(this.app._router.stack);
    console.table(routes);
  }

  public start(): void {
    this.plugins();
    if (env.NODE_ENV === "development") {
      this.listRoutes();
    }
    this.app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`);
    });
  }
}

export default ExpressApp;
