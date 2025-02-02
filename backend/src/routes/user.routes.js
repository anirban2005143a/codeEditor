import { Router } from "express";
import {
  checking_token,
  LoginUser,
  RegisterUser,
  checkingotp,
  generateandsetOTP,
} from "../controller/user.controller.js";
import {
  authloginmw,
  authsignupmw,
} from "../Middleware/checking_parameters.js";
import { authtoken } from "../Middleware/Auth.js";
import { executeCode } from "../controller/user.controller.js";
// console.log("aaya hu routes ");
const userrouter = Router();
userrouter.route("/Register").post(authsignupmw, RegisterUser);
userrouter.route("/login").post(authloginmw, LoginUser);
userrouter.route("/checking_auth_token").post(authtoken, checking_token);
userrouter.route("/sendingOTP").post(generateandsetOTP);
userrouter.route("/checkingOTP").post(checkingotp);
userrouter.route("/Executingcode").post(executeCode);
export default userrouter;
