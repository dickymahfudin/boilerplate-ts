import { Model, Document } from "mongoose";
import { IGenericRepository } from "../../interfaces/repository/IGenericRepository";
import { Filter, Pagination } from "@interfaces/http/general";

abstract class BasicRepository<T extends Document> implements IGenericRepository<T> {
  constructor(protected model: Model<T>) {}

  async findAll(filter: Filter): Promise<{ data: T[]; pagination: Pagination }> {
    const { page = 1, limit = 10, search = "", sort = "", sortBy = "" } = filter;
    const query: any = {};

    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }];
    }

    const skip = (page - 1) * limit;

    const sortOptions = sort ? { [sortBy]: sort } : {};

    const data = await this.model.find(query).sort(sortOptions).skip(skip).limit(limit);
    const total = await this.model.countDocuments(query);
    const totalPage = Math.ceil(total / limit);

    return { data, pagination: { page, limit, total, totalPage } };
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id);
    return !!result;
  }
}

export default BasicRepository;
