import { Router } from "express";

import {
    getCard,
    getAllCards,
    updateCard,
    deleteCard,
} from "../controller/vcardController";

import { protect } from "../controller/authenticationController";

const router = Router();

router.use(protect);

// ADMIN ROUTES
//router.use(authController.restrictTo('admin'));

router.route("/").get(getAllCards).post();

router.route("/:id").get(getCard).patch(updateCard).delete(deleteCard);

export default router;
