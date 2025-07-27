import express from "express";
import { Router } from "express";
import { getProjects } from "../controllers/project.controller";
import authMiddleware from "../../../middlewares/auth.middleware";
import { createProject } from "../controllers/project.controller"; 
import { deleteProject } from "../controllers/project.controller";
import { updateProject } from "../controllers/project.controller";
const router = Router();

router.get('/',(req,res)=>{
  res.json({message: "Project route is working successfully!"})
})

router.post("/", authMiddleware, createProject);

router.delete("/:id",authMiddleware, deleteProject);

router.put("/:id", authMiddleware, updateProject);

export default router;