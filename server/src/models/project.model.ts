import { Schema, model } from "mongoose";
import { string } from "zod";

interface Project {
  title: string;          // Use lowercase 'string' (TypeScript convention)
  description?: string;   // Optional
  imageUrl: string;
  price: number;         // Changed to Number
  createdAt?: Date;
  tags?: string[]
}

const ProjectSchema = new Schema<Project>({
  title: { 
    type: String, 
    required: true 
  },
  description: String,    // No 'required' (optional field)
  imageUrl: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  tags: {  // <-- New tags field
    type: [String], // Array of strings
    default: []     // Default empty array
  }
});

 
export const Project = model<Project>('Project', ProjectSchema);