import services from "@application/service";
import UserHttp from "./UserHttp";
import BasicHttp from "./BasicHttp";
import { AddressModel, AddressSchema, IAddress } from "@models/addressModel";

const userHttp = new UserHttp(services.userService);
const addressHttp = new BasicHttp<IAddress>(AddressModel, "address", AddressSchema, "address");

export default [userHttp, addressHttp];
