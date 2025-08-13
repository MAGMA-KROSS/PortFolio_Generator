import mongoose, { Schema, Document } from "mongoose";

interface ICartProduct {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  price: number;
  image: string;
}

interface ICart extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  products: ICartProduct[];
  totalPrice: number;
  totalQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const cartProductSchema = new Schema<ICartProduct>({
  productId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

const cartSchema = new Schema<ICart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    products: [cartProductSchema],
    totalPrice: { type: Number, required: true, default: 0 },
    totalQuantity: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Cart = mongoose.model<ICart>("Cart", cartSchema);
export default Cart;
