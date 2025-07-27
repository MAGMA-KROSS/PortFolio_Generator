import { Request, Response } from "express";
import {Project} from "../../../models/project.model"; 
import { error } from "console";

export const getProjects = async (req: Request, res: Response) => {
  try {
    // Fetch all projects from MongoDB
    const projects = await Project.find({});
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};


export const createProject = async(req:Request,res:Response)=>{
  try{
    const {title,description,imageUrl,price,tags}=req.body;

    if(!title || !imageUrl || !price){
      return res.status(400).json({error:" Title, Image URL and Price are required fields."});
    }

    const newProject = await Project.create({
      title,
      description,
      imageUrl,
      price,
      tags,
      //@ts-ignore
      user:req.user.id
    })
    res.status(201).json(newProject);

  } catch(err){
    res.status(500).json({error: "Failed to create project"});
  }
}

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findByIdAndDelete(projectId);
    
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project deleted" }); // Success
  } catch (err) {
    res.status(500).json({ error: "Failed to delete project" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const { title, description, imageUrl, price, tags } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { title, description, imageUrl, price, tags },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(updatedProject); // ✅ Send updated project
  } catch (err) {
    res.status(500).json({ error: "Failed to update project" });
  }
};