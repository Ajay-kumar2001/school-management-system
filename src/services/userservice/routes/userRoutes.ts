import express from "express";
 const router=express.Router();
import { userServices } from "../controllers/userControllers";
router.post("/register",userServices.userRegister);
router.post('/send-email',userServices.sendEmail);
export default router;