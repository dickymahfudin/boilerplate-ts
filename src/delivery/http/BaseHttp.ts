import { Router, Request } from "express";
import { Filter } from "@interfaces/http/general";

interface IBaseHttp {
  routes(): void;
}

export abstract class BaseHttp implements IBaseHttp {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  abstract routes(): void;

  getFilter(req: Request) {
    const filter = req?.query as Filter;
    filter.page = filter.page ? Math.max(parseInt(filter.page.toString(), 10), 1) : 1;
    filter.limit = filter.limit ? Math.max(parseInt(filter.limit.toString(), 10), 1) : 10;
    return filter;
  }
}
