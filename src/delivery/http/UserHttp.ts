import { Request, Response, Router } from "express";
import UserService from "@application/service/UserService";
import { BaseHttp } from "./BaseHttp";
import { IUser, UserSchema } from "@models/userModel";
import validate from "@middleware/validation";

class UserHttp extends BaseHttp {
  constructor(private readonly userService: UserService) {
    super();
  }

  routes(): void {
    const userRouter = Router();
    this.router.use("/user", userRouter);

    userRouter.post("/", validate(UserSchema), this.create.bind(this));
    userRouter.get("/", this.get.bind(this));
    userRouter.get("/:id", this.getById.bind(this));
    userRouter.post("/:id", validate(UserSchema), this.update.bind(this));
    userRouter.delete("/:id", this.delete.bind(this));
  }

  async create(req: Request, res: Response) {
    const user = await this.userService.create(req.body as Partial<IUser>);
    res.customResponse(user);
  }

  async get(req: Request, res: Response) {
    const filter = this.getFilter(req);
    const users = await this.userService.getAll(filter);
    res.customResponse(users);
  }

  async getById(req: Request, res: Response) {
    const user = await this.userService.getById(req.params.id);
    res.customResponse(user);
  }

  async update(req: Request, res: Response) {
    const user = await this.userService.update(req.params.id, req.body as Partial<IUser>);
    res.customResponse(user);
  }

  async delete(req: Request, res: Response) {
    const user = await this.userService.delete(req.params.id);
    res.customResponse(user);
  }
}

export default UserHttp;
