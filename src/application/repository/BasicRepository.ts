import { IGenericRepository } from "@interfaces/repository/IGenericRepository";
import BaseRepository from "./BaseRepository";
import { Model, Document } from "mongoose";

class BasicRepository<T extends Document> extends BaseRepository<T> implements IGenericRepository<T> {
  constructor(model: Model<T>) {
    super(model);
  }
}

export default BasicRepository;
