import { Request, Response } from "express";
import { Project } from "../../../models/project.model";
import { error } from "console";
import { z } from 'zod';
import mongoose from "mongoose";
export const getProjects = async (req: Request, res: Response) => {
  try {
    // Pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    // Field selection (whitelist)
    const projects = await Project.find({})
      .select('title description imageUrl price tags createdAt zipUrl')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Newest first

    res.json({
      page,
      results: projects,
      total: await Project.countDocuments() // For pagination UI
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};


export const createProject = async (req: Request, res: Response) => {
  try {
    console.log("REQ BODY:", req.body);          // Log all incoming body fields
    console.log("REQ FILE:", req.file);          // Log uploaded file info (if any)
    //@ts-ignore
    console.log("USER FROM TOKEN:", req.user);   // Log user info from auth middleware

    const imageUrlFromFile = req.file?.path;
    const numericPrice = Number(req.body.price);

    const { title, description, tags, zipUrl } = req.body;  // <-- zipUrl added
    const imageUrl = imageUrlFromFile;
    const price = numericPrice;

    if (!title || !imageUrl || typeof price !== 'number' || isNaN(price)) {
      console.log("Validation failed: Missing or invalid fields");
      return res.status(400).json({
        error: "Invalid input: Title, Image URL, and numeric Price are required"
      });
    }

    // Create project - Mongoose will apply schema validation
    const newProject = await Project.create({
      title,
      description,
      imageUrl,
      price,
      tags,
      zipUrl,  // <-- added zipUrl here
      //@ts-ignore
      user: req.user._id
    });

    // Filter response fields
    const safeProject = {
      id: newProject._id,
      title: newProject.title,
      imageUrl: newProject.imageUrl,
      price: newProject.price,
      createdAt: newProject.createdAt
    };

    console.log("Project created successfully:", safeProject);

    res.status(201).json(safeProject);

  } catch (err) {
    console.error("Error creating project:", err);

    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Project creation failed" });
  }
};



export const deleteProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;

    // 1. Strict ID format validation
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid project ID format"
      });
    }

    // 2. Admin-only deletion
    const deletedProject = await Project.findByIdAndDelete(
      projectId
      // Note: Admin check is handled by middleware
      // so no need to include it in the query
    );

    // 3. Handle missing project
    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        error: "Project not found"
      });
    }

    // 4. Success response
    res.json({
      success: true,
      message: "Project deleted by admin",
      deletedId: deletedProject._id,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    // 5. Special handling for malformed IDs
    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).json({
        success: false,
        error: "Malformed project ID"
      });
    }

    // 6. Generic error (logs full error for debugging)
    console.error("[Admin] Delete project error:", err);
    res.status(500).json({
      success: false,
      error: "Admin deletion failed - please try again"
    });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    // LOGS
    console.log("REQ PARAMS:", req.params);
    console.log("REQ BODY:", req.body);
    //@ts-ignore
    console.log("REQ USER:", req.user);

    const projectId = req.params.id;

    const { title, description, imageUrl, price, tags, zipUrl } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { title, description, imageUrl, price, tags, zipUrl }, // <-- zipUrl added
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(updatedProject); 
  } catch (err) {
    console.error("Error in updateProject:", err);
    res.status(500).json({ error: "Failed to update project" });
  }
};
