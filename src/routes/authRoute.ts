import express from "express";
import authContoroller from "../controllers/authController";


const router = express.Router();

router.post("/signup", authContoroller.signup);
router.post("/signin", authContoroller.signin);

export default router;
