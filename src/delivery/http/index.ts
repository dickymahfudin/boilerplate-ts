import services from "@application/service";
import UserHttp from "./UserHttp";

const userHttp = new UserHttp(services.userService);

export default [userHttp];
