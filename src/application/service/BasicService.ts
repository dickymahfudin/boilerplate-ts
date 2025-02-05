import BaseService from "./BaseService";
import { IGenericService } from "@interfaces/service/IGenericService";
import { IGenericRepository } from "@interfaces/repository/IGenericRepository";

class BasicService<T> extends BaseService<T> implements IGenericService<T> {
  constructor(
    protected readonly repository: IGenericRepository<T>,
    protected readonly key: string,
  ) {
    super(repository, key);
  }
}

export default BasicService;
