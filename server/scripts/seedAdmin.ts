import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../src/models/user.model"; // adjust the path if needed
import dotenv from "dotenv";

dotenv.config();

// Replace with your admin details
const adminData = {
  name: "marcel admin",
  email: "amd.marcel@gmail.com",
  password: "Marcel69!", // plaintext, will be hashed
  role: "admin",
};

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/portfoliogen");
    console.log("MongoDB connected");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    // Create admin user
    const admin = new User({
      ...adminData,
      password: hashedPassword,
    });

    await admin.save();
    console.log("Admin created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
};

seedAdmin();
