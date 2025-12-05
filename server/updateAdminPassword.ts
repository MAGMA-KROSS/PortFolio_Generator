import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./src/models/user.model";
import dotenv from "dotenv";

dotenv.config();

const updatePassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/portfoliogen");
    console.log("MongoDB connected");

    const email = "amd.imad69@gmail.com"; // your admin email
    const newPassword = "Imada69"; // must match regex: letters+digits, no special chars

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await User.updateOne({ email }, { password: hashedPassword });

    if (result.modifiedCount > 0) {
      console.log("Admin password updated successfully!");
    } else {
      console.log("No changes made (check if admin exists)");
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updatePassword();
