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
      .select('title description imageUrl price tags createdAt')
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
    const { title, description, imageUrl, price, tags } = req.body;

    // Lightweight runtime checks (complements Mongoose validation)
    if (!title || !imageUrl || typeof price !== 'number') {
      return res.status(400).json({ error: "Invalid input: Title, Image URL, and numeric Price are required" });
    }

    // Create project - Mongoose will apply schema validation
    const newProject = await Project.create({
      title,
      description,
      imageUrl,
      price,
      tags,
      //@ts-ignore
      user: req.user._id // From auth middleware
    });

    // Filter response fields
    const safeProject = {
      id: newProject._id,
      title: newProject.title,
      imageUrl: newProject.imageUrl,
      price: newProject.price,
      createdAt: newProject.createdAt
    };

    res.status(201).json(safeProject);

  } catch (err) {
    // Handle Mongoose validation errors
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