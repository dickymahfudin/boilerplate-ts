import { Request, Response, Router } from "express";
import BasicService from "@application/service/BasicService";
import BasicRepository from "@application/repository/BasicRepository";
import { z } from "zod";
import validate from "@middleware/validation";
import { Model, Document } from "mongoose";
import { Filter } from "@interfaces/http/general";
class BasicHttp<T extends Document> {
  public router: Router;
  private readonly service: BasicService<T>;
  private readonly model: Model<T>;
  private readonly key: string;
  private readonly schema: z.ZodObject<any, any, any, any, any>;
  private readonly routeGroup: string;

  constructor(model: Model<T>, key: string, schema: z.ZodObject<any, any, any, any, any>, routeGroup: string) {
    const repository = new BasicRepository<T>(model);
    this.model = model;
    this.key = key;
    this.schema = schema;
    this.routeGroup = routeGroup;
    this.service = new BasicService(repository, key);
    this.router = Router();
    this.routes();
  }

  routes(): void {
    console.log(this.routeGroup);
    const router = Router();
    this.router.use(`/${this.routeGroup}`, router);

    router.post("/", validate(this.schema), this.create.bind(this));
    router.get("/", this.get.bind(this));
    router.get("/:id", this.getById.bind(this));
    router.post("/:id", validate(this.schema), this.update.bind(this));
    router.delete("/:id", this.delete.bind(this));
  }

  getFilter(req: Request) {
    const filter = req?.query as Filter;
    filter.page = filter.page ? Math.max(parseInt(filter.page.toString(), 10), 1) : 1;
    filter.limit = filter.limit ? Math.max(parseInt(filter.limit.toString(), 10), 1) : 10;
    return filter;
  }

  async create(req: Request, res: Response) {
    const user = await this.service.create(req.body as Partial<T>);
    res.customResponse(user);
  }

  async get(req: Request, res: Response) {
    const filter = this.getFilter(req);
    const users = await this.service.getAll(filter);
    res.customResponse(users);
  }

  async getById(req: Request, res: Response) {
    const user = await this.service.getById(req.params.id);
    res.customResponse(user);
  }

  async update(req: Request, res: Response) {
    const user = await this.service.update(req.params.id, req.body as Partial<T>);
    res.customResponse(user);
  }

  async delete(req: Request, res: Response) {
    const user = await this.service.delete(req.params.id);
    res.customResponse(user);
  }
}

export default BasicHttp;
