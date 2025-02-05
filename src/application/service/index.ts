import repositories from "@application/repository";

import UserService from "./UserService";

const userService = new UserService(repositories.userRepository);

export default {
  userService,
};
