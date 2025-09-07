import { Router } from "express";
import { getCurrentuser, loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router=Router();

router.route("/register").post(
    upload.single("profilePicture"),registerUser
)

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT,logoutUser)

router.route("/getUser").post(verifyJWT,getCurrentuser)

router.route("/refresh-token").post(refreshAccessToken)

export default router;