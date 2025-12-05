import mongoose, { Schema, model, Document, Types } from "mongoose";

export interface IProductInOrder {
  productId: Types.ObjectId;
  title: string;
  description?: string;
  quantity: number;
  price: number;
  image?: string;
  zipUrl: string;               // project ZIP file cloud URL
  isDownloaded: boolean;        // one-time download tracking
  downloadLink?: string;        // temporary signed URL
  downloadExpiresAt?: Date;     // temporary URL expiration
}

export interface IOrder extends Document {
  userId: Types.ObjectId;
  userName: string;
  userEmail: string;
  products: IProductInOrder[];
  totalQuantity: number;
  totalPrice: number;
  paymentStatus: "pending" | "success" | "failed";
  paymentMethod?: string;
  paymentOrderId?: string;
  paymentId?: string;
  paymentSignature?: string;
  createdAt: Date;
  updatedAt: Date;
}

const productInOrderSchema = new Schema<IProductInOrder>(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true,index:true },
    title: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    image: { type: String },
    zipUrl: { type: String, required: true },
    isDownloaded: { type: Boolean, default: false },
    downloadLink: { type: String },
    downloadExpiresAt: { type: Date },
  },
  { _id: false } // no separate _id for product subdocuments
);

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    products: [productInOrderSchema],
    totalQuantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },

    /** PAYMENT FIELDS **/
    paymentStatus: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    paymentMethod: { type: String },
    paymentOrderId: { type: String },
    paymentId: { type: String },
    paymentSignature: { type: String },
  },
  { timestamps: true }
);

const Order = model<IOrder>("Order", orderSchema);
export default Order;
