import { Router } from "express";

import {
    login,
    register,
    logout,
    protect,
} from "../controller/authenticationController";
import {
    setID,
    getAllUsers,
    getUser,
    updateMe,
    deleteMe,
    updateUser,
    deleteUser,
    createUser,
} from "../controller/userController";

const router = Router();

// AUTHENTICATION ROUTES
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

//router.post('/forgotPassword', authController.forgotPassword);
//router.patch('/resetPassword/:token', authController.resetPassword);

// USER ROUTES
// Protect all routes after this middleware
router.use(protect);

//router.patch('/updateMyPassword', authController.updatePassword);
router.get("/me", setID, getUser);
router.patch("/update", updateMe);
router.delete("/deleteMe", deleteMe);

// ADMIN ROUTES
//router.use(authController.restrictTo('admin'));

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
