import { IGenericRepository } from "@interfaces/repository/IGenericRepository";
import { IUser } from "@models/userModel";

interface IUserRepository extends IGenericRepository<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
}

export default IUserRepository;
