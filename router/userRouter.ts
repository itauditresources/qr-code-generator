import { Router } from "express";

import {
    login,
    register,
    protect,
} from "../controller/authenticationController";
import {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
} from "../controller/userController";

const staffRouter = Router();

// AUTHENTICATION ROUTES
staffRouter.route("/login").post(login);
staffRouter.route("/register").post(register);

// USER ROUTES
staffRouter.route("/").get(getAllUsers);
staffRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default staffRouter;
