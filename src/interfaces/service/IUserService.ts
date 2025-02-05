import { IGenericService } from "@interfaces/service/IGenericService";
import { IUser } from "@models/userModel";

interface IUserService extends IGenericService<IUser> {}

export default IUserService;
