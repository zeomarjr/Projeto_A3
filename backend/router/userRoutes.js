import express from "express"
import { login,CreateUser, updateUser,getUserProfile} from "../controller/auth.js"
import upload from "../middleware/upload.js";

const router = express.Router()
router.post("/login", login)
router.post("/criar", CreateUser)
router.put("/edit", upload.single("foto"), updateUser);
router.get("/getUserProfile",getUserProfile);

export default router 