import { IUser } from "@models/userModel";
import BasicService from "./BasicService";
import IUserService from "@interfaces/service/IUserService";
import IUserRepository from "@interfaces/repository/IUserRepository";

class UserService extends BasicService<IUser> implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {
    super(userRepository, "user");
  }
}

export default UserService;
