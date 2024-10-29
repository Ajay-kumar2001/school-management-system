import express from "express";
 const router=express.Router();
import { userServices } from "../controllers/userControllers";
import { upload } from "../../../middlewares/multer";
router.post("/register",userServices.userRegister);
router.post('/send-email',upload.array("file"),userServices.sendEmail);
export default router;