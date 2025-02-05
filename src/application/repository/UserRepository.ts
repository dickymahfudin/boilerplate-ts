import BaseRepository from "./BaseRepository";
import IUserRepository from "@interfaces/repository/IUserRepository";
import { IUser, UserModel } from "@models/userModel";

class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.model.findOne({ email });
  }
}

export default UserRepository;
