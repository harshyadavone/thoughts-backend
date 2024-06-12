import express from "express";
import authContoroller from "../controllers/authController";


const router = express.Router();

router.post("/signup", express.json(), authContoroller.signup);
router.post("/signin", express.json(), authContoroller.signin);

export default router;
