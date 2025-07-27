import express from "express";
import verifyToken from "../../../middlewares/auth.middleware";


const router = express.Router();

router.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "You accessed a protected route!",
    //@ts-ignore
    user: req.user, 
  });
});

export default router;
