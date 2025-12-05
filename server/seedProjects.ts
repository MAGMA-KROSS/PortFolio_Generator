import mongoose from "mongoose";
import { Project } from "./src/models/project.model"; // adjust path to your Project model

// Connect to MongoDB
const MONGO_URI = "mongodb://localhost:27017/portfoliogen"; // replace with your DB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

interface ProjectData {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  zipUrl: string; // <-- add this
}

// Base64 image placeholder for all projects (optional, keeping imageUrl relative)
const base64Image = "data:image/jpeg;base64,..."; // same as before

const projects: ProjectData[] = [];

for (let i = 1; i <= 10; i++) {
  projects.push({
    title: `Project ${i}`,
    description: `This is the urllll desciption for project ${i}.`,
    price: Math.floor(Math.random() * 1000) + 100,
    imageUrl: `/images/project${i}.jpg`, // <-- relative path
    zipUrl: `https://example.com/project${i}.zip`, // <-- dummy URL for testing
  });
}

const seed = async () => {
  try {
    await Project.deleteMany(); // optional: clears existing projects
    await Project.insertMany(projects);
    console.log("Seeded 10 projects successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seed();
