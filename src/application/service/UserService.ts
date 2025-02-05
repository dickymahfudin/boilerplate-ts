import { IUser } from "@models/userModel";
import BaseService from "./BaseService";
import IUserService from "@interfaces/service/IUserService";
import IUserRepository from "@interfaces/repository/IUserRepository";

class UserService extends BaseService<IUser> implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {
    super(userRepository, "user");
  }
}

export default UserService;
