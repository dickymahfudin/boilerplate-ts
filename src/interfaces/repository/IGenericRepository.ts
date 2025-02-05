import { Filter, Pagination } from "@interfaces/http/general";

export interface IGenericRepository<T> {
  findAll(filter: Filter): Promise<{ data: T[]; pagination: Pagination }>;
  findById(id: string): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
