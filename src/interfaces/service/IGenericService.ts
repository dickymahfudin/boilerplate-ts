import BaseResult from "@interfaces/types/baseResult";
import { Filter, Pagination } from "@interfaces/http/general";

export interface IGenericService<T> {
  getAll(filter: Filter): Promise<BaseResult<Record<string, T[] | Pagination>>>;
  getById(id: string): Promise<BaseResult<Record<string, T> | undefined>>;
  create(data: Partial<T>): Promise<BaseResult<Record<string, T>>>;
  update(id: string, data: Partial<T>): Promise<BaseResult<Record<string, T | null>>>;
  delete(id: string): Promise<BaseResult<Record<string, boolean>>>;
}
