import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project",
          required: true,
        },
        title: { type: String, required: true },
        description: { type: String },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
        image: { type: String },
      },
    ],
    totalQuantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    paymentStatus: { type: String, default: "pending" }, // can be updated later
    paymentMethod: { type: String }, // optional for now
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);
export default Order;
