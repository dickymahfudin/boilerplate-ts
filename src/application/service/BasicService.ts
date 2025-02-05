import { IGenericRepository } from "@interfaces/repository/IGenericRepository";
import { IGenericService } from "@interfaces/service/IGenericService";
import BaseResult from "@interfaces/types/baseResult";
import { messageGeneral } from "@constants/general";
import { Filter, Pagination } from "@interfaces/http/general";

abstract class BasicService<T> implements IGenericService<T> {
  constructor(
    protected readonly repository: IGenericRepository<T>,
    protected readonly key: string,
  ) {}

  async getAll(filter: Filter): Promise<BaseResult<Record<string, T[] | Pagination>>> {
    const data = await this.repository.findAll(filter);
    return {
      status: true,
      message: messageGeneral.DATA_RETRIEVED,
      data: { [this.key]: data.data, pagination: data.pagination },
    };
  }

  async getById(id: string): Promise<BaseResult<Record<string, T> | undefined>> {
    const result = await this.repository.findById(id);
    const message = result ? messageGeneral.DATA_RETRIEVED : messageGeneral.DATA_NOT_FOUND;
    const data = result ? { [this.key]: result } : undefined;
    return {
      status: !!result,
      code: result ? 200 : 404,
      message,
      data,
    };
  }

  async create(data: Partial<T>): Promise<BaseResult<Record<string, T>>> {
    const createdData = await this.repository.create(data);
    return {
      status: true,
      code: 201,
      message: messageGeneral.DATA_CREATED,
      data: { [this.key]: createdData },
    };
  }

  async update(id: string, data: Partial<T>): Promise<BaseResult<Record<string, T | null>>> {
    const updatedData = await this.repository.update(id, data);
    return {
      status: true,
      message: messageGeneral.DATA_UPDATED,
      data: { [this.key]: updatedData },
    };
  }

  async delete(id: string): Promise<BaseResult<Record<string, boolean>>> {
    const success = await this.repository.delete(id);
    return {
      status: success,
      message: success ? messageGeneral.DATA_DELETED : messageGeneral.FAILED_TO_DELETE,
      data: { [this.key]: success },
    };
  }
}

export default BasicService;
