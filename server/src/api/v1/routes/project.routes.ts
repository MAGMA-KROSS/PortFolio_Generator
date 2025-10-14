import { Router } from "express";
import authMiddleware from "../../../middlewares/auth.middleware";
import { createProject, deleteProject, updateProject, getProjects } from "../controllers/project.controller";
import { upload } from "../../../middlewares/cloudinary";
import { checkRole } from "../../../middlewares/role.middleware";

const router = Router();

router.get("/", getProjects);


router.post("/", authMiddleware, checkRole(["admin"]), upload.single("image"), createProject);

router.put("/:id", authMiddleware,checkRole(["admin"]),  updateProject);

router.delete("/:id", authMiddleware,checkRole(["admin"]),  deleteProject);

export default router;
